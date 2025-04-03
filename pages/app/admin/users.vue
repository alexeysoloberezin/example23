<script setup lang="ts">
import AdminLayout from "~/src/layouts/AdminLayout.vue";
import PageLoader from "~/src/components/ui/PageLoader.vue";
import { useSupabase } from "~/utils/supabase";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

const supabase = useSupabase();

const formattedTime = (timestamp: any) => {
  return dayjs.utc(timestamp).tz(dayjs.tz.guess()).fromNow();
};

// Опорные временные точки
const last24Hours = dayjs().subtract(24, "hours");
const lastThreeDays = dayjs().subtract(3, "days");

const { data: profiles, pending, error } = useAsyncData("profiles", async () => {
  const { data, error } = await supabase
      .from("profiles")
      .select("id, email, full_name, role, hasSub, phone, country, created_at")
      .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data.map((el) => ({
    ...el,
    created_at: formattedTime(el.created_at),
    created_at_raw: el.created_at, // Сохраняем оригинальную дату для вычислений
  }));
});

// Вычисляем количество зарегистрированных за последние 24 часа и 3 дня
const last24HoursUsers = computed(() => {
  return profiles.value?.filter((user) => dayjs(user.created_at_raw).isAfter(last24Hours)).length || 0;
});

const lastThreeDaysUsers = computed(() => {
  return profiles.value?.filter((user) => dayjs(user.created_at_raw).isAfter(lastThreeDays)).length || 0;
});
</script>

<template>
  <AdminLayout>
    <div class="container mt-4">
      <h3 class="mb-3">Users</h3>
      <PageLoader v-if="pending"/>
      <div v-else-if="error">Error</div>
      <div v-else>
        <!-- Блок с количеством пользователей -->
        <div class="stats mb-4">
          <p><strong>Зарегистрировано за последние 24 часа:</strong> <span>{{ last24HoursUsers }}</span></p>
          <p><strong>За последние 3 дня:</strong> <span>{{ lastThreeDaysUsers }}</span></p>
        </div>

        <!-- Таблица пользователей -->
        <DataTable :value="profiles" tableStyle="min-width: 50rem">
          <Column field="email" header="Email"></Column>
          <Column field="id" header="Id"></Column>
          <Column field="role" header="Role"></Column>
          <Column field="phone" header="Phone"></Column>
          <Column field="country" header="Country"></Column>
          <Column field="hasSub" header="Премиум акк">
            <template #body="{ data }">
              <span v-if="data.hasSub" class="pi pi-check text-green-500"></span>
              <span v-else class="pi pi-times text-red-500"></span>
            </template>
          </Column>
          <Column field="created_at" header="Дата создания"></Column>
        </DataTable>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped lang="scss">
.stats {
  background: rgba(248, 249, 250, 0.05);
  padding: 15px;
  border-radius: 5px;
  span{
    font-size: 28px;
    font-weight: 500;
    color: #14bf49;
    margin: 0 5px;
    font-family: 'Russo One';
  }
}
</style>
