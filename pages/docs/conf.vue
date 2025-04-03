<script setup lang="ts">
const sections = {
  general: "",
  purposes: "",
  types: "",
  usage: "",
  storage: "",
  security: "",
  rights: "",
  updates: "",
  contacts: ""
};
const {locale} = useI18n();

</script>

<template>
  <div>
    <div class="container lesson-content py-5">
      <a href="/">
        <div class="logo-text" style="white-space: nowrap">Neuro Aura</div>
      </a>

      <a href="/">
        <Button class="mb-4 mt-4" variant="outlined">{{ $t('registerPage.button.back') }}</Button>
      </a>


      <div v-if="locale === 'ru'">
        <strong>1. Общие положения</strong>
        <p>1.1. Настоящая Политика обработки персональных данных (далее – «Политика») определяет порядок обработки и защиты персональных данных пользователей (далее – «Пользователь» или «Вы») при использовании сайта [вставьте название сайта или компании] (далее – «Сайт»).</p>
        <p>1.2. Сайт обрабатывает только электронную почту и номер телефона Пользователей, необходимые для выполнения следующих целей.</p>

        <strong>2. Цели обработки персональных данных</strong>
        <p>2.1. Мы собираем и обрабатываем ваш email и номер телефона для следующих целей:</p>
        <ul>
          <li>Регистрация на сайте.</li>
          <li>Отправка уведомлений, связанных с процессом обучения (например, подтверждения регистрации, доступа к материалам).</li>
          <li>Рассылка информационных сообщений или маркетинговых материалов (если Пользователь дал согласие).</li>
          <li>Связь с Пользователем по вопросам, связанным с работой Сайта.</li>
        </ul>

        <strong>3. Типы персональных данных</strong>
        <p>3.1. Мы обрабатываем следующие персональные данные:</p>
        <ul>
          <li>Адрес электронной почты.</li>
          <li>Номер телефона.</li>
        </ul>
        <p>3.2. Мы не собираем и не храним другие персональные данные, такие как имя, адрес проживания и т. д.</p>

        <strong>4. Использование персональных данных</strong>
        <p>4.1. Мы используем ваш email и номер телефона исключительно для выполнения целей, указанных в п. 2.1.</p>
        <p>4.2. Мы не передаем ваши данные третьим лицам, за исключением случаев, когда это необходимо для выполнения договора (например, использование сторонних сервисов для рассылки уведомлений или связи с пользователем).</p>

        <strong>5. Срок хранения данных</strong>
        <p>5.1. Мы храним ваш email и номер телефона в нашей системе до тех пор, пока вы являетесь зарегистрированным пользователем нашего сайта или до момента отписки от рассылки (если применимо).</p>

        <strong>6. Безопасность данных</strong>
        <p>6.1. Мы принимаем все разумные меры для защиты вашего email и номера телефона от несанкционированного доступа и утечек данных.</p>
        <p>6.2. Вся передача данных на нашем сайте происходит через защищенные каналы связи.</p>

        <strong>7. Права Пользователей</strong>
        <p>7.1. Пользователь имеет право на доступ к своим данным, их исправление или удаление. Для этого необходимо связаться с нами через контактную информацию, указанную на сайте.</p>
        <p>7.2. Пользователь также имеет право отозвать свое согласие на обработку персональных данных в любой момент, для чего достаточно отписаться от рассылок или обратиться к нам с соответствующим запросом.</p>

        <strong>8. Обновления Политики</strong>
        <p>8.1. Мы можем время от времени обновлять эту Политику. Все изменения будут опубликованы на этой странице, и они вступят в силу с момента публикации.</p>

        <strong>9. Контакты</strong>
        <p>9.1. Для получения дополнительных сведений о политике обработки персональных данных, а также для реализации своих прав, Пользователь может обратиться к нам по электронной почте: <a href="mailto:neuro.aura@mail.ru">neuro.aura@mail.ru</a>.</p>
      </div>
      <div v-else>
        <div>
          <strong>1. General Provisions</strong>
          <p>1.1. This Privacy Policy (hereinafter referred to as the "Policy") defines the procedure for processing and protecting personal data of users (hereinafter referred to as the "User" or "You") when using the website [insert website or company name] (hereinafter referred to as the "Website").</p>
          <p>1.2. The Website processes only the User's email and phone number, which are necessary for the following purposes.</p>

          <strong>2. Purposes of Personal Data Processing</strong>
          <p>2.1. We collect and process your email and phone number for the following purposes:</p>
          <ul>
            <li>Registration on the Website.</li>
            <li>Sending notifications related to the learning process (e.g., registration confirmation, access to materials).</li>
            <li>Sending informational messages or marketing materials (if the User has given consent).</li>
            <li>Contacting the User regarding issues related to the operation of the Website.</li>
          </ul>

          <strong>3. Types of Personal Data</strong>
          <p>3.1. We process the following personal data:</p>
          <ul>
            <li>Email address.</li>
            <li>Phone number.</li>
          </ul>
          <p>3.2. We do not collect or store other personal data such as name, residential address, etc.</p>

          <strong>4. Use of Personal Data</strong>
          <p>4.1. We use your email and phone number exclusively to fulfill the purposes specified in section 2.1.</p>
          <p>4.2. We do not share your data with third parties, except when necessary to fulfill an agreement (e.g., using third-party services to send notifications or communicate with the User).</p>

          <strong>5. Data Retention Period</strong>
          <p>5.1. We store your email and phone number in our system as long as you remain a registered user of our Website or until you unsubscribe from the mailing list (if applicable).</p>

          <strong>6. Data Security</strong>
          <p>6.1. We take all reasonable measures to protect your email and phone number from unauthorized access and data breaches.</p>
          <p>6.2. All data transmission on our Website occurs through secure communication channels.</p>

          <strong>7. User Rights</strong>
          <p>7.1. The User has the right to access, correct, or delete their data. To do so, please contact us using the contact information provided on the Website.</p>
          <p>7.2. The User also has the right to withdraw their consent to the processing of personal data at any time by unsubscribing from newsletters or submitting a request to us.</p>

          <strong>8. Policy Updates</strong>
          <p>8.1. We may update this Policy from time to time. All changes will be published on this page and will take effect upon publication.</p>

          <strong>9. Contact Information</strong>
          <p>9.1. For additional information about the privacy policy and to exercise your rights, the User can contact us via email: <a href="mailto:neuro.aura@mail.ru">neuro.aura@mail.ru</a>.</p>
        </div>

      </div>
    </div>
<!--    <Footer />-->
  </div>
</template>

<style scoped lang="scss">

</style>