<script setup lang="ts">
import {useRoute} from 'vue-router'
import {ref, onMounted} from 'vue'
import AdminLayout from "~/src/layouts/AdminLayout.vue";

const route = useRoute()
const chatId = route.params.chatId
const supabase = useSupabase()

const messages = ref([])
const newMessage = ref('')

// Загружаем сообщения чата
const fetchMessages = async () => {
  const {data} = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', chatId)
      .order('created_at', {ascending: true})

  messages.value = data
}

// Отправка сообщения
const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  const {error} = await supabase.from('messages').insert([
    {
      chat_id: chatId,
      user_id: 'admin', // Сообщение от администратора
      content: newMessage.value
    }
  ])

  if (!error) {
    newMessage.value = ''
    fetchMessages() // Обновляем чат после отправки
  } else {
    console.error("Ошибка отправки сообщения:", error.message)
  }
}

onMounted(fetchMessages)
</script>

<template>
  <AdminLayout>
    <div class="container mt-4">
      <h3 class="mb-2">Чат №{{ chatId }}</h3>

      <!-- Список сообщений -->
      <div v-if="messages.length" class="messages">
        <div v-for="msg in messages" :key="msg.id" class="message" :class="{ admin: msg.user_id === 'admin' }">
          <strong>{{ msg.user_id === 'admin' ? 'Админ' : 'Пользователь' }}</strong>: {{ msg.content }}
        </div>
      </div>
      <p v-else>Нет сообщений</p>

      <!-- Форма для ответа -->
      <div class="input-box">
        <input v-model="newMessage" placeholder="Введите сообщение..." @keyup.enter="sendMessage"/>
        <button @click="sendMessage">Отправить</button>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped>
.container {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

.messages {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: rgba(147, 184, 232, 0.06);
}

.message {
  padding: 5px 10px;
  margin: 5px 0;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.09);
}

.admin {
  text-align: right;
  background: #007bff;
}

.input-box {
  display: flex;
  margin-top: 10px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  background: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-left: 5px;
  border-radius: 4px;
  transition: 0.3s;
}

button:hover {
  background: #0056b3;
}
</style>
