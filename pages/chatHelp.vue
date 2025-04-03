<script setup>
import { ref, onMounted } from 'vue'

// Подключение к Supabase
const supabase = useSupabase()

// Генерация анонимного ID пользователя
const userId = localStorage.getItem('chatUserId') || crypto.randomUUID()
localStorage.setItem('chatUserId', userId)

// Переменные
const chatId = ref(null)
const messages = ref([])
const newMessage = ref('')

// Функция для создания нового чата
const createChat = async () => {
  const { data, error } = await supabase.from('chats').insert([{ user_id: userId }]).select().single()

  if (error) {
    console.error('Ошибка создания чата:', error.message)
    return
  }

  chatId.value = data.id
  localStorage.setItem('chatId', data.id) // Сохраняем ID чата
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

// Загружаем сообщения этого чата
const fetchMessages = async () => {
  if (!chatId.value) return

  const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId.value)
      .order('created_at', { ascending: true })

  messages.value = data
}

// Подписываемся на новые сообщения
supabase
    .channel('chat-room')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, (payload) => {
      if (payload.new.chat_id === chatId.value) {
        messages.value.push(payload.new)
      }
    })
    .subscribe()

// Функция отправки сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  if (!chatId.value) await createChat()

  await supabase.from('messages').insert([
    {
      chat_id: chatId.value,
      user_id: userId,
      content: newMessage.value
    }
  ])

  newMessage.value = ''
}

onMounted(loadChat)
</script>

<template>
  <div class="chat-box">
    <h3>Ваш чат</h3>
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message" :class="{ me: msg.user_id === userId }">
<!--        <span>{{ msg.user_id === userId ? 'Вы' : 'Поддержка' }}</span>-->
        <p>{{ msg.content }}</p>
      </div>
    </div>
    <div class="input-box">
      <input v-model="newMessage" placeholder="Введите сообщение..." @keyup.enter="sendMessage"/>
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<style scoped>
.chat-box {
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.09);
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.message {
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 6px;
  background: rgba(241, 241, 241, 0.1);
}

.me {
  text-align: right;
  background: #007bff;
}

.input-box {
  display: flex;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
