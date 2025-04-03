<script setup lang="ts">
import {useSupabase} from "~/utils/supabase";
import AuthWrapper from "~/src/components/ui/AuthWrapper.vue";
import InputText from "primevue/inputtext";
import Label from "~/src/components/ui/Label.vue";
import Button from "primevue/button";
import Select from 'primevue/select';
import InputOtp from 'primevue/inputotp';


import * as yup from "yup";
import {useField, useForm} from "vee-validate";
import axios from "axios";
import api from "~/utils/api";
import {useWindowSize} from "@vueuse/core";

const toast = useToast();
const supabase = useSupabase()
const schema = yup.object({
  email: yup.string().email("Введите корректный email").required("Email обязателен"),
  phone: yup.string().min(5, "Введите корректный phone").required("Phone обязателен"),
  password: yup.string().min(6, "Минимум 6 символов").required("Пароль обязателен"),
});

useHead({
  title: "Neuro Aura | Register"
});
const loading = ref(false)
const {width, height} = useWindowSize()


const {handleSubmit, errors} = useForm({validationSchema: schema});
const {value: email} = useField<string>("email");
const {value: password} = useField<string>("password");
const {value: phone} = useField<string>("phone");
const country = ref<any>("");
const emailCode = ref('')

const countryList = ref([
  {code: 'US', name: 'United States'},
  {code: 'CA', name: 'Canada'},
  {code: 'GB', name: 'United Kingdom'},
  {code: 'DE', name: 'Germany'},
  {code: 'FR', name: 'France'},
  {code: 'IT', name: 'Italy'},
  {code: 'ES', name: 'Spain'},
  {code: 'AU', name: 'Australia'},
  {code: 'JP', name: 'Japan'},
  {code: 'CN', name: 'China'},
  {code: 'IN', name: 'India'},
  {code: 'BR', name: 'Brazil'},
  {code: 'MX', name: 'Mexico'},
  {code: 'RU', name: 'Russia'},
  {code: 'ZA', name: 'South Africa'},
  {code: 'KR', name: 'South Korea'},
  {code: 'NL', name: 'Netherlands'},
  {code: 'SE', name: 'Sweden'},
  {code: 'CH', name: 'Switzerland'},
  {code: 'TR', name: 'Turkey'},
  {code: 'PL', name: 'Poland'},
  {code: 'BE', name: 'Belgium'},
  {code: 'AT', name: 'Austria'},
  {code: 'DK', name: 'Denmark'},
  {code: 'NO', name: 'Norway'},
  {code: 'FI', name: 'Finland'},
  {code: 'IE', name: 'Ireland'},
  {code: 'PT', name: 'Portugal'},
  {code: 'GR', name: 'Greece'},
  {code: 'AR', name: 'Argentina'},
  {code: 'CL', name: 'Chile'},
  {code: 'CO', name: 'Colombia'},
  {code: 'NZ', name: 'New Zealand'},
  {code: 'TH', name: 'Thailand'},
  {code: 'MY', name: 'Malaysia'},
  {code: 'ID', name: 'Indonesia'},
  {code: 'SG', name: 'Singapore'},
  {code: 'SA', name: 'Saudi Arabia'},
  {code: 'AE', name: 'United Arab Emirates'},
  {code: 'EG', name: 'Egypt'},
  {code: 'VN', name: 'Vietnam'},
  {code: 'PH', name: 'Philippines'},
  {code: 'IL', name: 'Israel'},
  {code: 'UA', name: 'Ukraine'},
  {code: 'HU', name: 'Hungary'},
  {code: 'CZ', name: 'Czech Republic'}
])
// 🔹 Авторизация в Supabase
const emailIsConfirmed = ref(false)
const showEmailConfirm = ref(false)
const loadingConfirm = ref(false)

const iWantConfirmEmail = ref(true)

const confirmEmail = async () => {
  loading.value = true
  try {
    const response = await api.post(
        '/send-email', {
          to: email.value,
        }
    )

    if (response.status === 200) {
      toast.add({
        severity: "success",
        summary: "Проверьте почту",
        detail: 'Вам на почту отправлено сообщение с кодом',
        life: 3000
      });
      showEmailConfirm.value = true
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

const verifyEmail = async () => {
  loadingConfirm.value = true
  emailIsConfirmed.value = false


  if (emailCode.value.length !== 4) {
    return
  }

  try {
    const response = await api.post(
        '/confirm-email', {
          to: email.value,
          code: emailCode.value
        }
    )

    if (response.status === 200) {
      toast.add({severity: "success", summary: "Success", detail: 'Code confirmed', life: 3000});
      emailIsConfirmed.value = true
      await signIn()
    }
  } catch (error: any) {
    console.error('Ошибка запроса:', error.response?.data || error.message)
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: error.response?.data?.message || error.message,
      life: 3000
    });
    emailIsConfirmed.value = false
  } finally {
    loadingConfirm.value = false
  }
}

watch(emailCode, (newValue) => {
  if (newValue.length === 4 && loadingConfirm.value !== true) {
    verifyEmail()
  }
});

const submit = handleSubmit(async () => {
  if (iWantConfirmEmail.value) {
    await confirmEmail()
  } else {
    await signIn()
  }
})
const {locale} = useI18n()


onMounted(() => {
  toast.add({ severity: 'success', summary: 'Success', detail: 'Успешно созданно', life: 300000 });


  const savedPhone = localStorage.getItem('savedPhone')
  if(savedPhone){
    phone.value = savedPhone
  }
})

const signIn = async () => {
  loading.value = true
  try {
    const {error, data: dataUser} = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      phone: phone.value,
    });

    if (error) {
      toast.add({severity: 'error', summary: 'Error', detail: error.message, life: 3000});
      emailIsConfirmed.value = false
    } else {
      const {data, error} = await supabase
          .from("profiles")
          .update({
            country: '',  // Сохраняем код страны (например, "US")
            phone: phone.value            // Обновляем номер телефона
          })
          .eq("id", dataUser.user.id)
          .select('*')
          .single()

      localStorage.setItem('mainUser', JSON.stringify(data))
      toast.add({severity: 'success', summary: 'Success', detail: 'Аккаунт создан', life: 3000});
      navigateTo(`/${locale.value || 'en'}/app/courses/view/1/1`)
    }
    loading.value = false
  } catch (error: any) {
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: error.response?.data?.message || error.message,
      life: 3000
    });
    emailIsConfirmed.value = false
  } finally {
    emailIsConfirmed.value = false
  }
}

const showPassword = ref(false); // true = показывать пароль

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<template>
  <div>
    <Toast/>

    <AuthWrapper image="/bg1.jpg">
      <div class="authForm">
        <div class="bg-surface-0 dark:bg-surface-900 authForm-bb shadow rounded-border w-full lg:w-6/12 mx-auto">
          <div v-if="emailIsConfirmed" class="flex flex-column align-items-center">
            <div class="text-center text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              {{ $t('registerPage.title') }}
            </div>
            <img src="/load.gif" class="max-w-fit mx-auto" style="border-radius: 50%" alt=""/>
          </div>


          <div v-else-if="showEmailConfirm" class="flex flex-column align-items-center">
            <div class="text-center text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
              {{ $t('registerPage.subtitle') }}
            </div>
            <div class="text-center">{{ $t('registerPage.spam') }}</div>
            <InputOtp v-model="emailCode" :disabled="loadingConfirm" class="mx-auto mt-3 w-fit"/>
            <Button label="Назад" variant="outlined" class="mx-auto mt-3">
              {{ $t('registerPage.button.back') }}
            </Button>
          </div>
          <form v-else @submit.prevent="submit">
            <div class="text-center mb-4">
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">
                {{ $t('registerPage.title') }}
              </div>
              <div>
                {{ $t('registerPage.subtitle') }}
              </div>
            </div>

            <Stepper value="1" class="basis-[50rem]">
              <StepList>
                <Step value="1">{{ width > 700 ? $t('registerPage.form.email') : '' }}</Step>
                <Step value="2">{{ width > 700 ? $t('registerPage.form.password') : '' }}</Step>
                <Step value="3">{{ width > 700 ? $t('registerPage.form.phone') : '' }}</Step>
              </StepList>
              <StepPanels>
                <StepPanel v-slot="{ activateCallback }" value="1">
                  <div class="text-center mb-2">
                    <Label inputId="email1">{{ $t('registerPage.form.email') }}</Label>
                    <InputText v-model="email" id="email1" type="text" :placeholder="$t('registerPage.form.email')"
                               class="w-full mb-2"/>
                    <span class="text-red-500 text-sm" v-if="errors.email">{{ errors.email }}</span>

                    <div class="flex items-center gap-2 my-1">
                      <Checkbox v-model="iWantConfirmEmail" inputId="confirm" name="confirm" binary />
                      <label for="confirm"> {{ $t('registerPage.confirm') }}</label>
                    </div>
                    <Message severity="error" v-if="!iWantConfirmEmail" class="my-2">
                      {{ $t('registerPage.message.confirm_email') }}
                    </Message>
                  </div>
                  <div class="flex  justify-end">
                    <Button :label="$t('action.next')" icon="pi pi-arrow-right" :disabled="!!errors.email || !email" iconPos="right" class="w-full"
                            @click="activateCallback('2')"/>
                  </div>
                  <NuxtLink :to="`/${locale || 'en'}/app/login`" class="font-medium w-full  no-underline  text-primary cursor-pointer">
                    <Button type="submit" variant="outlined" :label="$t('registerPage.form.auth')" icon="pi pi-user"
                            class=" mt-2 w-full"/>
                  </NuxtLink>
                </StepPanel>
                <StepPanel v-slot="{ activateCallback }" value="2">
                  <div>
                    <Label inputId="password1">{{ $t('registerPage.form.password') }}</Label>
                    <div class="relative mb-2">
                      <InputText
                          v-model="password"
                          id="password1"
                          :type="showPassword ? 'text' : 'password'"
                          :placeholder="$t('registerPage.form.password')"
                          class="w-full pr-10"
                      />

                      <!-- Кнопка-глазик -->
                      <button type="button" @click="togglePasswordVisibility" class="btn-show-pass">
                        <i :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"></i>
                      </button>
                    </div>
                    <span class="text-red-500 text-sm" v-if="errors.password">{{ errors.password }}</span>
                  </div>
                  <div class="flex pt-0 gap-2 justify-between">
                    <Button :label="$t('action.back')" variant="outlined" icon="pi pi-arrow-left" @click="activateCallback('1')"/>
                    <Button :label="$t('action.next')" :disabled="!!errors.password || !password" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')"/>
                  </div>
                </StepPanel>
<!--                <StepPanel v-slot="{ activateCallback }" value="3">-->
<!--                  <div class="mb-2">-->
<!--                    <Label inputId="country">{{ $t('registerPage.form.country') }}</Label>-->
<!--                    <Select v-model="country" :options="countryList" filter optionLabel="name"-->
<!--                            placeholder="Select a Country" class="w-full md:w-56">-->
<!--                      <template #value="slotProps">-->
<!--                        <div v-if="slotProps.value" class="flex items-center">-->
<!--                          <img :src="`https://flagcdn.com/w320/${slotProps.value.code.toLowerCase()}.png`"-->
<!--                               style="max-width: 20px;" class="mr-2" alt=""/>-->
<!--                          <div>{{ slotProps.value.name }}</div>-->
<!--                        </div>-->
<!--                        <span v-else>-->
<!--                          {{ slotProps.placeholder }}-->
<!--                        </span>-->
<!--                      </template>-->
<!--                      <template #option="slotProps">-->
<!--                        <div class="flex items-center">-->
<!--                          <img :src="`https://flagcdn.com/w40/${slotProps.option.code.toLowerCase()}.png`"-->
<!--                               style="max-width: 20px;" class="mr-2" alt=""/>-->
<!--                          <div>{{ slotProps.option.name }}</div>-->
<!--                        </div>-->
<!--                      </template>-->
<!--                    </Select>-->
<!--                  </div>-->
<!--                  <div class="flex pt-0 gap-2 justify-between">-->
<!--                    <Button label="Back" variant="outlined" icon="pi pi-arrow-left" @click="activateCallback('2')"/>-->
<!--                    <Button label="Next" :disabled="!country" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('4')"/>-->
<!--                  </div>-->
<!--                </StepPanel>-->

                <StepPanel v-slot="{ activateCallback }" value="3">
                  <div class="mb-2">
                    <Label inputId="phone">{{ $t('registerPage.form.phone') }}</Label>
                    <InputText id="phone" v-model="phone" type="phone" :placeholder="$t('registerPage.form.phone')"
                               class="w-full mb-2"/>
                    <span class="text-red-500 text-sm" v-if="errors.phone">{{ errors.phone }}</span>

                    <Button type="submit" :loading="loading" :disabled="loading || !!errors.phone || !phone" :label="$t('registerPage.form.register')"
                            icon="pi pi-user" class="w-full mt-2"/>
                  </div>
                  <div class="flex pt-0 gap-2 justify-between">
                    <Button label="Back" class="w-full" variant="outlined" icon="pi pi-arrow-left" @click="activateCallback('2')"/>
                  </div>
                </StepPanel>
              </StepPanels>
            </Stepper>



          </form>
        </div>
      </div>
    </AuthWrapper>
  </div>
</template>

<style scoped lang="scss">

</style>