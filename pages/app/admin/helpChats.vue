<script setup lang="ts">

import AdminLayout from "~/src/layouts/AdminLayout.vue";

const supabase = useSupabase()
const fetchChats = async () => {
  const { data, error } = await supabase.from('chats').select('*')

  if (error) {
    return { error: error.message }
  }

  return data
}


const { data: chats, refresh } = await useAsyncData("chats", fetchChats);
const router = useRouter()

const goToChat = (chatId: string) => {
  router.push(`/app/admin/chat/${chatId}`) // Открываем страницу чата
}

const deleteChat = async (chatId: string) => {
  if (!confirm("Вы уверены, что хотите удалить этот чат?")) return;

  const { error } = await supabase.from("chats").delete().eq("id", chatId);

  if (error) {
    alert("Ошибка при удалении чата: " + error.message);
    return;
  }

  alert("Чат удален");
  refresh(); // Обновляем список чатов
};
</script>

<template>
  <AdminLayout>
    <div class="container mt-4">
      <h3 class="mb-2">Все чаты</h3>
      <div class="chat-grid">
        <div v-for="chat in chats" :key="chat.id" class="chat-card">
          <h3>Чат №{{ chat.id.slice(0, 6) }}</h3>
          <p><strong>Пользователь:</strong> {{ chat.user_id }}</p>
          <p><strong>Создан:</strong> {{ new Date(chat.created_at).toLocaleString() }}</p>
          <button @click="goToChat(chat.id)">Открыть</button>
          <button class="delete-btn" @click="deleteChat(chat.id)">❌ Удалить</button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">
.chat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Автоадаптивные колонки */
  gap: 16px;
}
button.delete-btn {
  background: #dc3545;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: 0.3s;

  &:hover {
    background: #c82333;
  }
}
.chat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 8px;
  color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  text-align: center;
  border: 1px solid #ddd;

  h3 {
    margin: 0 0 10px;
    font-size: 18px;
  }

  p {
    font-size: 14px;
    color: #555;
    margin: 5px 0;
  }

  button {
    margin-top: 10px;
    padding: 8px 12px;
    border: none;
    background: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
      background: #0056b3;
    }
  }
}
</style>