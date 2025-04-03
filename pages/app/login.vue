<script setup lang="ts">
import { useSupabase} from "~/utils/supabase";
import AuthWrapper from "~/src/components/ui/AuthWrapper.vue";
import InputText from "primevue/inputtext";
import Label from "~/src/components/ui/Label.vue";
import Button from "primevue/button";
import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import {useUserStore} from "~/store/userStora";
const toast = useToast();
const supabase = useSupabase()

useHead({
  title: "Neuro Aura | Login"
});

const schema = yup.object({
  email: yup.string().email("Введите корректный email").required("Email обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
});
const {locale} = useI18n()

const { handleSubmit, errors } = useForm({ validationSchema: schema });
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

const loading = ref(false)
const userStore = useUserStore()
const {initUser, setUser} = userStore

// 🔹 Авторизация в Supabase
const signIn = handleSubmit(async () => {
  loading.value = true;
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    loading.value = false;
    toast.add({ severity: 'error', summary: 'Error', detail: error.message, life: 3000 });
  } else {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Успешный вход!', life: 3000 });

    const { data: userData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data?.user?.id)
        .single();

    if(!error && userData){
      setUser(userData)

      setTimeout(() => {
        loading.value = false;
        navigateTo(`/${locale.value || 'en'}/app/courses/view/1/1`)
      }, 2000)
    }
  }
});

const showPassword = ref(false); // true = показывать пароль

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
const route = useRoute()
onMounted(() => {
  if(route.query.email){
    email.value = route.query?.email as string || ''
  }
})
</script>


<template>
  <div>
    <Toast />

    <AuthWrapper image="/bg1.jpg">
      <div class="authForm">
        <div class="bg-surface-0 dark:bg-surface-900 authForm-bb  shadow rounded-border w-full lg:w-6/12 mx-auto">
          <div class="text-center mb-6">
            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-2">{{ $t('title.auth') }}</div>
          </div>

          <!-- ВАЛИДАЦИЯ + АВТОРИЗАЦИЯ -->
          <form @submit.prevent="signIn">
            <Label inputId="email1">{{ $t('form.email') }}</Label>
            <InputText v-model="email" id="email1" type="text" :placeholder="$t('form.email')" class="w-full mb-2" />
            <span class="text-red-500 text-sm " v-if="errors.email">{{ errors.email }}</span>

            <div class="mt-2"></div>
            <Label inputId="password1">{{ $t('form.password') }}</Label>
            <div class="relative mb-2">
              <InputText
                  v-model="password"
                  id="password1"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="$t('form.password')"
                  class="w-full  pr-10"
              />

              <!-- Кнопка-глазик -->
              <button
                  type="button"
                  @click="togglePasswordVisibility"
                  class="btn-show-pass"
              >
                <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
              </button>
            </div>
            <span class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</span>

            <Button type="submit" :loading="loading" :disabled="loading" :label="$t('form.enter')" icon="pi pi-user" class="w-full mt-2" />
            <NuxtLink :to="`/${locale || 'en'}/app/register`" class="font-medium no-underline  text-primary cursor-pointer">
              <Button type="submit" variant="outlined" :label="$t('form.createAcc')" icon="pi pi-user" class="w-full mt-2" />
            </NuxtLink>

            <NuxtLink :to="`/${locale || 'en'}/app/forgotPassword`" class="font-medium no-underline mt-2 flex opacity-70 text-sm text-primary cursor-pointer">
              Забыли пароль?
            </NuxtLink>

<!--            <div class="flex items-center justify-between mt-4">-->
<!--              <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">Forgot password?</a>-->
<!--            </div>-->
          </form>
        </div>
      </div>
    </AuthWrapper>
  </div>
</template>

<style scoped lang="scss">

</style>