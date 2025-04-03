<script setup lang="ts">
import {useSupabase} from "~/utils/supabase";
import AuthWrapper from "~/src/components/ui/AuthWrapper.vue";
import InputText from "primevue/inputtext";
import Label from "~/src/components/ui/Label.vue";
import Button from "primevue/button";
import api from "~/utils/api";

const toast = useToast();
const supabase = useSupabase()

useHead({
  title: "Neuro Aura | Register"
});
const loading = ref(false)

const email = ref("");

const resetPassword = async () => {
  loading.value = true
  try {
    const response = await api.post(
        '/reset-password', {
          to: email.value,
        }
    )

    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Проверьте почту",
        detail: 'Вам на почту отправлено сообщение с ссылкой',
        life: 3000
      });
    }
  } catch (error: any) {
    console.error('Ошибка запроса:', error.response?.data || error.message)
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: error.response?.data?.error?.error || error.message,
      life: 3000
    });
  } finally {
    loading.value = false
  }
}

const submit = async () => {
  await resetPassword()
}
</script>


<template>
  <div>
    <Toast/>

    <AuthWrapper image="/bg1.jpg">
      <div class="authForm">
        <div class="bg-surface-0 dark:bg-surface-900 authForm-bb shadow rounded-border w-full lg:w-6/12 mx-auto">
          <form  @submit.prevent="submit">
            <div class="text-center mb-8">
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                Восстановление пароля
              </div>
              <div>
                Вам на почту придет ссылка для сброса пароля.
              </div>
            </div>

            <Label inputId="email1">{{ $t('form.email') }}</Label>
            <InputText v-model="email" id="email1" type="email" :placeholder="$t('form.email')" class="w-full mb-2"/>

            <Button type="submit" :disabled="loading" :loading="loading"  :label="'Восстановить пароль'"  class="w-full mt-4"/>
          </form>
        </div>
      </div>
    </AuthWrapper>
  </div>
</template>

<style scoped lang="scss">

</style>