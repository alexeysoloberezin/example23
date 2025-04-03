<script setup>
import {ref, onMounted} from 'vue'

// Подключение к Supabase
const supabase = useSupabase()

// Генерация анонимного ID пользователя
const userId = localStorage.getItem('chatUserId') || crypto.randomUUID()
localStorage.setItem('chatUserId', userId)

const toggle = ref(false)
const chatId = ref(null)
const messages = ref([])
const newMessage = ref('')
const chatDeleted = ref(false) // 🔹 Новый флаг для отслеживания удаления чата

// Функция для создания нового чата
const createChat = async () => {
  const {data, error} = await supabase.from('chats').insert([{user_id: userId}]).select().single()

  if (error) {
    console.error('Ошибка создания чата:', error.message)
    return
  }

  chatId.value = data.id
  localStorage.setItem('chatId', data.id)
  chatDeleted.value = false // 🔹 Сбрасываем флаг удаления
  messages.value = [] // 🔹 Очищаем список сообщений для нового чата
}

// Загружаем чат пользователя или создаём новый
const loadChat = async () => {
  chatId.value = localStorage.getItem('chatId')

  if (!chatId.value) {
    await createChat()
  } else {
    fetchMessages()
  }

}
// Подписываемся на новые сообщения
const channel = supabase
    .channel('chat-room')
    .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'messages'}, (payload) => {
      console.log('Новое сообщение:', payload.new) // Должно появляться в консоли
      if (payload.new.chat_id === chatId.value) {
        messages.value.push(payload.new)
      }
    })
    .subscribe()

console.log('Канал подписки:', channel)
// Загружаем сообщения чата
const fetchMessages = async () => {
  if (!chatId.value) return

  const {data, error} = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId.value)
      .order('created_at', {ascending: true})

  if (error || !data) {
    console.error('Ошибка загрузки сообщений:', error?.message)
    return
  }

  messages.value = data
}


// Функция отправки сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  if (chatDeleted.value) return // 🔹 Блокируем отправку, если чат удален

  if (!chatId.value) {
    console.warn("Chat ID отсутствует, создаем новый чат...")
    await createChat()
  }

  // Проверяем, существует ли чат
  const {data: chatExists, error: chatError} = await supabase
      .from('chats')
      .select('id')
      .eq('id', chatId.value)
      .single()

  if (chatError || !chatExists) {
    console.warn("Чат был удален. Показываем уведомление...")
    chatDeleted.value = true // 🔹 Устанавливаем флаг удаления
    return
  }

  const {data, error} = await supabase.from('messages').insert([
    {
      chat_id: chatId.value,
      user_id: userId,
      content: newMessage.value
    }
  ]).select().single()

  if (error) {
    console.error("Ошибка отправки сообщения:", error.message)
    return
  }

  sendToTelegram(data.content)

  messages.value.push(data)
  newMessage.value = ''
}

const TELEGRAM_BOT_TOKEN = '8035092308:AAGb7vjCnpwLwQC0QmSAg91K644xFOXWWBk';  // 🔹 Подставьте ваш токен
const TELEGRAM_CHAT_ID = '-1002312857714';       // 🔹 Ваш ID чата (можно узнать через @userinfobot)

const sendToTelegram = async (message) => {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: message
    })
  });

  const result = await response.json();

  if (!result.ok) {
    console.error("Ошибка при отправке в Telegram:", result);
  } else {
    console.log("Сообщение отправлено в Telegram:", result);
  }
};

// Подписка на удаление чата
onMounted(() => {
  loadChat()

  supabase
      .channel('chat-room')
      .on('postgres_changes', {event: 'DELETE', schema: 'public', table: 'chats'}, (payload) => {
        if (payload.old.id === chatId.value) {
          console.warn("Чат был удален, показываем сообщение...")
          chatDeleted.value = true // 🔹 Устанавливаем флаг удаления
          messages.value = []
          localStorage.removeItem('chatId')
        }
      })
      .subscribe()

  // setInterval(() => {
  //   fetchMessages();
  // }, 10000);
})

const deleteChat = async () => {
  if (!chatId.value) return;

  const { error } = await supabase
      .from('chats')
      .delete()
      .eq('id', chatId.value);

  if (error) {
    console.error("Ошибка удаления чата:", error.message);
    return;
  }

  console.warn("Чат удален!");

  // Очистка данных чата
  chatId.value = null;
  toggle.value = false
  messages.value = [];
  chatDeleted.value = true; // Устанавливаем флаг, что чат удален
  localStorage.removeItem('chatId');
};
</script>

<template>
  <div class="chat">
    <div v-if="toggle" class="chat-box">
      <div class="chat-line">
        <h4 class="font2 chat-box-title">
          <span>Чат поддержки</span>
        </h4>
        <span class="chat-exit" @click="deleteChat">Удалить чат</span>
      </div>

      <div class="messages">
        <!-- 🔹 Если чат удален, показываем сообщение и кнопку -->
        <div v-if="chatDeleted" class="chat-deleted-box">
          <p class="chat-deleted">Чат был удален</p>
          <button @click="createChat" class="chat-reopen-btn">Открыть новый чат</button>
        </div>

        <div v-else v-for="msg in messages" :key="msg.id" class="message" :class="{ me: msg.user_id === userId }">
          <p>{{ msg.content }}</p>
        </div>
      </div>

      <!-- 🔹 Блокируем ввод сообщений, если чат удален -->
      <div v-if="!chatDeleted" class="input-box">
        <input v-model="newMessage" placeholder="Введите сообщение..." @keyup.enter="sendMessage"/>
        <button @click="sendMessage">➤</button>
      </div>
      <span class="chat-hide" @click="toggle = !toggle">Свернуть</span>

    </div>

    <button @click="toggle = !toggle" class="chat-phone"><img src="/phone-call.png" alt=""></button>
  </div>
</template>

<style scoped>
.chat-hide{
  text-align: center;
  opacity: 0.7;
  display: flex;
  cursor: pointer;
  justify-content: center;
  margin-top: 10px;
  font-size: 14px;
}
.chat {
  position: relative;
  z-index: 1000;
}

.chat-exit {
  cursor: pointer;
  font-weight: bold;
  color: #ea2121;
}

.chat-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-box-title {
  font-size: 22px;
}

.chat-phone {
  position: fixed;
  bottom: 85px;
  right: 20px;
  width: 50px;
  padding: 0;
  border: none;
  outline: none;
  height: 50px;
  background: transparent;
  outline: none;
}

.chat-phone img {
  width: 50px;
  height: 50px;
}

.chat-box {
  width: 400px;
  max-width: 90vw;
  position: fixed;
  bottom: 65px;
  right: 20px;
  margin: 20px auto;
  z-index: 1000;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 12px rgba(92, 134, 244, 0.15);
  background: rgb(27, 35, 64);
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  width: 100%;
  margin-bottom: 10px;
}

.message {
  padding: 5px 10px;
  margin: 5px 0;
  width: fit-content;
  border-radius: 6px;
  background: rgba(241, 241, 241, 0.05);
}

.me {
  text-align: right;
  margin-left: auto;
  background: #007bff;
}

.input-box {
  display: flex;
}

.input-box input {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.input-box button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

/* 🔹 Стили для сообщения об удалении */
.chat-deleted-box {
  text-align: center;
  margin-top: 10px;
}

.chat-deleted {
  color: red;
  font-weight: bold;
}

.chat-reopen-btn {
  margin-top: 10px;
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
