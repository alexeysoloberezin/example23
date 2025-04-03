<script setup lang="ts">
import AdminLayout from "~/src/layouts/AdminLayout.vue";

const {locale} = useI18n()
</script>

<template>
  <AdminLayout>
    <div class="container mt-4">
      <h3 class="mb-3">Admin Panel</h3>

      <div class="myGrid">
        <NuxtLink :to="`/${locale || 'en'}/app/admin/users`">
          <Card>
            <template #header>
              <img alt="user header" class="cardImage" src="/3560886.jpg"/>
            </template>
            <template #title>Список пользователей</template>
            <template #subtitle>Все пользователи с их ролями, контактами</template>
          </Card>
        </NuxtLink>

        <NuxtLink :to="`/${locale || 'en'}/app/admin/helpChats`">
          <Card>
            <template #header>
              <img alt="user header" class="cardImage" src="/3560886.jpg"/>
            </template>
            <template #title>Чаты для поддержки</template>
            <template #subtitle>Здесь будут все чаты с вопросами.</template>
          </Card>
        </NuxtLink>

        <NuxtLink :to="`/${locale || 'en'}/app/admin/courses`">
          <Card>
            <template #header>
              <img alt="user header" class="cardImage" src="/rm373batch13-016.jpg"/>
            </template>
            <template #title>Курсы</template>
            <template #subtitle>Страница с текущими курсами, на ней можно изменить добавить курсы.</template>
          </Card>
        </NuxtLink>

        <NuxtLink :to="`/${locale || 'en'}/app/admin/homeworks/users`">
          <Card>
            <template #header>
              <img alt="user header" class="cardImage" src="/hw.jpg"/>
            </template>
            <template #title>Домашки</template>
            <template #subtitle>Страница с выполнеными дз</template>
          </Card>
        </NuxtLink>

        <NuxtLink :to="`/${locale || 'en'}/app/admin/users`">
          <Card>
            <template #header>
              <img alt="user header" class="cardImage" src="/tasks-4026398_640.jpg"/>
            </template>
            <template #title>Отчеты по курсам</template>
            <template #subtitle>Все отчеты по курсам, которые приходят от людей.</template>
          </Card>
        </NuxtLink>

        <NuxtLink :to="`/${locale || 'en'}/app/admin/users`">
          <Card>
            <template #header>
              <img alt="user header" class="cardImage" src="/mailbox-341744_640.jpg"/>
            </template>
            <template #title>Заявки на форму</template>
            <template #subtitle>Заявки с лендинга будут приходить сюда.</template>
          </Card>
        </NuxtLink>


      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">
.myGrid{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
}
.cardImage{
  height: 250px;
  width: 100%;
  object-fit: cover;
}
</style>