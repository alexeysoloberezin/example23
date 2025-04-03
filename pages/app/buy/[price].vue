<script setup lang="ts">
import AppLayout from "~/src/layouts/AppLayout.vue";
import api from '~/utils/api'
import Timer from "~/src/components/blocks/Timer.vue";
import {useUserStore} from "~/store/userStora";
import PaymentRadio from "~/src/components/ui/PaymentRadio.vue";
import Tooltip from 'primevue/tooltip';
import Label from "~/src/components/ui/Label.vue";
import InputText from "primevue/inputtext";
import AppWrapper from "~/src/layouts/AppWrapper.vue";



const toast = useToast()
const loading = ref(false)
const savedUrl = ref('')
const route = useRoute()
const tariff =  route.params.price

const userStore = useUserStore()

const {user} = storeToRefs(userStore)
const {initUser} = userStore
const thanks = ref(true)

const createPaymentMethod = async (payment: string, curr: string ) => {
  thanks.value = false
  if (!curr) {
    toast.add({severity: "error", summary: "Ошибка", detail: "Выберите валюту", life: 3000});
    return
  }

  loading.value = true

  try {
    const response = await api.post(
        '/create-invoice',
        {
          email: user.value?.email || email.value,
          alreadyCreated: !!user.value,
          paymentMethod: payment,
          tariff: tariff ? +tariff : 15,
          currency: curr,
        }
    )

    if (response.data.success) {
      savedUrl.value = response.data.data.paymentUrl
      setTimeout(() => {
        window.location.href = response.data.data.paymentUrl
      }, 1000)
    }
  } catch (error: any) {
    console.error('Ошибка запроса:', error.response?.data || error.message)
    toast.add({
      severity: "error",
      summary: "Ошибка",
      detail: error?.response.data?.message || error.response?.data?.error?.error || error.message,
      life: 3000
    });
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  try {
    const response = await api.get(
        '/get-products'
    )

    console.log('Ответ от API:', response.data)
  } catch (error: any) {
    console.error('Ошибка запроса:', error.response?.data || error.message)
  }
})

const loadingRef = ref(false)

const reinitUser = async () => {
  loadingRef.value = true
  const res = await initUser(true, false)
  loadingRef.value = false
}
const {locale} = useI18n()

const list = ref([
  {name: 'USD / EUR / KZT / UAH <br/> и др.',image: '/visamaster.png', tooltip: "Оплата по карте", code: 'STRIPE', currency: "USD"},
  {name: 'Платежи из России <b>RUB</b>',image: '/cards.png', tooltip: "Оплата по карте", code: 'BANK131', currency: "RUB"},
  {name: 'EUR PAYPAL',image: "/paypal.png", tooltip: "", code: 'PAYPAL', currency: "EUR"},
  {name: 'USD PAYPAL',image: "/paypal.png", tooltip: "", code: 'PAYPAL', currency: "USD"},
])

const email = ref('')

const createLink = (item: any) => {
  if(loading.value){
    return
  }

  if(user.value){
    createPaymentMethod(item.code,  item.currency)
    return
  }

  if(!email.value){
    toast.add({ severity: 'error', summary: 'Error', detail: 'Введите E-mail', life: 3000 });
    return
  }
  createPaymentMethod(item.code,  item.currency)
}

// const checkWebHook = async () => {
//   try {
//     const response = await api.post(
//         '/check-email',
//         {
//           to: "alexeysoloberezinsolo@gmail.com"
//         }
//     )
//
//     if (response.data.success) {
//       window.location.href = response.data.data.paymentUrl
//       savedUrl.value = response.data.data.paymentUrl
//     }
//   } catch (error: any) {
//     console.error('Ошибка запроса:', error.response?.data || error.message)
//     toast.add({
//       severity: "error",
//       summary: "Ошибка",
//       detail: error.response?.data?.error?.error || error.message,
//       life: 3000
//     });
//   } finally {
//     loading.value = false
//   }
// }
</script>

<template>
  <AppWrapper>
    <Timer/>
    <div class="container mt-4">
      <Toast/>


      <template v-if="user && user?.hasSub">
        <div class="form">
          <h3>У вас уже куплен курс</h3>
          <p>Поздравляем! Вы уже приобрели этот курс и можете приступить к обучению.</p>

          <NuxtLink :to="`/${locale || 'en'}/app/courses/view/1/1`" class="btn my-2">Перейти к курсу</NuxtLink>

          <p>Если у вас возникли вопросы, обратитесь в нашу <a href="https://t.me/neuroauro">службу поддержки</a>.</p>
        </div>
      </template>
      <template v-else>
        <div v-if="savedUrl" class="form form-thanks">
          <div class="buy-title">Спасибо за доверие!</div>
          <div class="buy-text">
            Ваша ссылка сгенерирована происходит переход на страницу оплаты.<br/>
          </div>
          <a  target="_blank" style="color: #000" class="underline mt-2 block d-block" :href="savedUrl">
            {{ $t('buy.li') }}
          </a>
          <div class="mt-4 underline cursor-pointer opacity-50" @click="savedUrl = ''">Создать новую ссылку.</div>
        </div>
        <div v-else class="flex flex-column  form">
          <div v-if="locale === 'ru'" class="buy-text">
            <div class="buy-title">Купить курс!</div>
            <div class="price-del">{{ tariff == '15' ? '30$' : "20$"}}</div>
            <div class="price-line">
              <div class="price">{{ tariff == '15' ? '15$' : "10$"}}</div>
              <div class="tariffs-tag">Скидка 50%</div>
            </div>
          </div>
          <div v-else>
            <div class="buy-text">
              <div class="buy-title">Купить курс!</div>
              <div class="price-del">{{ tariff == '15' ? '30$' : "20$"}}</div>
              <div class="price-line">
                <div class="price">{{ tariff == '15' ? '15$' : "10$"}}</div>
                <div class="tariffs-tag">Скидка 50%</div>
              </div>
            </div>
          </div>

          <div v-if="!user">
            <Label inputId="email1">Введите почту, на которую придёт доступ</Label>
            <InputText v-model="email" id="email1" type="email" :placeholder="'E-mail'" class="w-full mb-2"/>
          </div>

          <div class="w-full">
            <div class="choose-title text-center">{{ $t('buy.choose') }}</div>

            <div class="payments mb-3">
              <div v-for="el in list" :key="el.code" class="payment-card" :style="`opacity: ${loading ? '.6' : '1'}`" @click="createLink(el)">
                <div class="payment-card-img">
                  <img :src="el.image" alt="">
                </div>
                <div class="payment-card-text" v-html="loading ? 'Loading...' : el.name"></div>
              </div>
            </div>
            <div class="payments-ps">
              Принимаем к оплате как <b>российские</b>, так и <b>иностранные карты</b>.
              Для оплаты иностранной картой выберите валюту <b>(KZT, USD, EUR, UAH и др.)</b>, затем введите реквизиты карты.
            </div>


            <!--          <div class="payments mb-3">-->
            <!--            <PaymentRadio-->
            <!--                :text="'USD'"-->
            <!--                :tooltip="'Или любая другая валюта, кроме рублей'"-->
            <!--                :is-active="currency === 'USD'"-->
            <!--                @click="setCurrency('USD')"-->
            <!--            />-->
            <!--            <PaymentRadio-->
            <!--                :text="'Рубли'"-->
            <!--                :is-active="currency === 'RUB'"-->
            <!--                @click="setCurrency('RUB')"-->
            <!--            />-->
            <!--            <PaymentRadio-->
            <!--                :text="'EUR'"-->
            <!--                :is-active="currency === 'EUR'"-->
            <!--                @click="setCurrency('EUR')"-->
            <!--            />-->
            <!--          </div>-->
            <!--          <div v-if="currency && paymentMethods.length > 0" class="payments">-->
            <!--            <PaymentRadio-->
            <!--                v-for="el in paymentMethods"-->
            <!--                :key="el.code"-->
            <!--                :tooltip="el.tooltip"-->
            <!--                :image="el.image"-->
            <!--                :is-active="paymentMethod === el.code"-->
            <!--                @click="paymentMethod = el.code"-->
            <!--            />-->
            <!--          </div>-->
            <!--          <Select v-model="currency" :options="currencyList" optionLabel="name" option-value="name"-->
            <!--                  :placeholder="$t('buy.pc_1')" class="w-full md:w-56"/>-->
          </div>

          <!--        <div class="w-full">-->
          <!--          <div class="label">{{ $t('buy.choose_2') }}</div>-->
          <!--          <Select v-model="paymentMethod" :options="paymentMethods" optionLabel="name" option-value="code"-->
          <!--                  :placeholder="$t('buy.pc_2')" class="w-full md:w-56"/>-->
          <!--        </div>-->
          <!--        <Button :loading="loading" :disabled="disabledButton" :label="$t('action.buyBtn')" @click="createPaymentMethod"-->
          <!--                class="w-full"></Button>-->


          <!--        <Button label="Check" @click="checkWebHook"></Button>-->
          <!--        <Button variant="outlined" :loading="loadingRef"-->
          <!--                :disabled="loadingRef"-->
          <!--                @click="reinitUser">-->
          <!--          {{ $t('ref') }}-->
          <!--        </Button>-->
        </div>
      </template>

    </div>
  </AppWrapper>
</template>

<style scoped lang="scss">
.price {
  font-size: 37px;
  text-align: left;
  font-weight: 600;
  color: #5c86f4;
  @media (max-width: 600px) {
    font-size: 15px;
  }
  @media (max-width: 450px) {
    font-size: 13px;
  }
}
.price-del{
  font-size: 18px;
  color: #000;
  text-decoration: line-through;
  opacity: 0.5;
  font-weight: 500;
}
.payments-ps{
  font-size: 14px;
  b{
    font-weight: 600;
  }
}
.tariffs-tag {
  font-size: 17px;
  background: #000;
  color: #fff;
  padding: 3px 10px;
  border-radius: 200px;
  width: fit-content;
}
.price-line{
  display: flex;
  align-items: center;
  gap: 10px;
}
.buy-title{
  font-size: 23px;
  font-weight: 500;
  @media (max-width: 600px) {
    font-size: 21px;
  }
}
.form-thanks{
  background: #00FF7F !important;
}
.payment-card{
  background: #fff;
  border-radius: 13px;
  padding: 10px;
  display: flex;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.11);
  border: 1px solid rgba(0, 0, 0, 0.11);
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  img{
    max-width: 90%;
    max-height: 100%;
  }
  &-img{
    height: 65px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  b{
    font-weight: 700;
    display: inline-block;
  }
  &-text{

    color: #000;
    font-weight: 500;
    font-size: 17px;
    margin-bottom: 4px;
    text-align: center;
    line-height: 1;
    letter-spacing: 0.5px;
    //font-family: 'Russo One';
    @media (max-width: 600px) {
      font-size: 15px;
    }
  }
}

.buy-text {
  font-size: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.label {
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 4px;
}
.payments{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}
.form {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  color: #000;
  border-radius: 15px;
  background: #fff;
  gap: 20px;
  label{
    color: #000;
  }
}
.choose-title{
  font-size: 20px;
  font-weight: 500;
  font-family: 'Russo One';
  margin-bottom: 5px;
  color: #5c86f4;
}
</style>