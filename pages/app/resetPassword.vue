<script setup lang="ts">
import {useSupabase} from "~/utils/supabase";
import AuthWrapper from "~/src/components/ui/AuthWrapper.vue";
import InputText from "primevue/inputtext";
import Label from "~/src/components/ui/Label.vue";
import Button from "primevue/button";
import api from "~/utils/api";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";

const schema = yup.object({
  password: yup
      .string()
      .min(6, "Минимум 6 символов")
      .oneOf([yup.ref("password_repeat")], "Пароли не совпадают") // 📌 Проверка на совпадение
      .required("Пароль обязателен"),

  password_repeat: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли не совпадают") // 📌 Проверка на совпадение
      .required("Повторите пароль"),
});

const { handleSubmit, errors } = useForm({ validationSchema: schema });
const { value: password } = useField<string>("password");
const { value: password_repeat } = useField<string>("password_repeat");
const toast = useToast();
const supabase = useSupabase()

const route = useRoute()
const token = route.query.token
const email = route.query.email

useHead({
  title: "Neuro Aura | Reset Password"
});
const loading = ref(false)
const {locale} = useI18n()

const resetPassword = async () => {
  loading.value = true

  console.log(email)
  console.log(token)
  if(!email || !token){
    loading.value = false
    toast.add({ severity: 'error', summary: 'Error', detail: "Упс. Ссылка не рабочая, попробуйте пересоздать ссылку.", life: 3000 });
    return
  }

  try {
    const response = await api.post(
        '/reset-password-action', {
          to: email,
          token: token,
          password: password.value,
          password_repeat: password_repeat.value
        }
    )

    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Пароль сброшен, авторизуйтесь.",
        life: 3000
      });
      setTimeout(() => {
        navigateTo(`/${locale.value || 'en'}/app/login`)
      }, 2000)
    }
  } catch (error: any) {
    console.error('Ошибка запроса:', error.response?.data.message || error.message)
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: error.response?.data?.error|| error.message,
      life: 3000
    });
  } finally {
    loading.value = false
  }
}

const submit = handleSubmit(async () => {
  await resetPassword()
})
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
                Сброс пароля
              </div>
            </div>

            <div class="mt-2"></div>
            <Label inputId="password1">{{ $t('form.password') }}</Label>
            <InputText v-model="password" id="password1" type="password" :placeholder="$t('form.password')" class="w-full mb-2" />
            <span class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</span>

            <div class="mt-2"></div>
            <Label inputId="password_repeat">Повторите пароль</Label>
            <InputText v-model="password_repeat" id="password_repeat" type="password" :placeholder="'Повторите пароль'" class="w-full mb-2" />
            <span class="text-red-500 text-sm" v-if="errors.password">{{ errors.password_repeat }}</span>

            <Button type="submit" :disabled="loading" :loading="loading"  :label="'Восстановить пароль'"  class="w-full mt-4"/>

            <NuxtLink :to="`/${locale || 'en'}/app/login`">
              <Button  :label="'Страница логина'" variant="outlined" class="w-full mt-2"/>
            </NuxtLink>
          </form>
        </div>
      </div>
    </AuthWrapper>
  </div>
</template>

<style scoped lang="scss">

</style>