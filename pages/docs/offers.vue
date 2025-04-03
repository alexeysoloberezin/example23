<script setup lang="ts">
import Header from "~/src/components/Header.vue";

const {locale} = useI18n();
</script>

<template>
  <div class="container lesson-content py-5">
    <a href="/">
      <div class="logo-text" style="white-space: nowrap">Neuro Aura</div>
    </a>

    <a href="/">
      <Button class="mb-4 mt-4" variant="outlined">{{ $t('registerPage.button.back') }}</Button>
    </a>

    <div v-if="locale === 'ru'">
      <h1>ДОГОВОР ПУБЛИЧНОЙ ОФЕРТЫ</h1>

      <h2>ОБЩИЕ ПОЛОЖЕНИЯ</h2>
      <p>1.1. Настоящий документ является публичной офертой (далее – "Оферта") проекта NEURO AURA (далее – "Продавец") и
        содержит условия предоставления доступа к обучающим материалам.</p>
      <p>1.2. Приобретая доступ к курсу NEURO VISION, пользователь (далее – "Покупатель") подтверждает согласие с
        условиями Оферты.</p>
      <p>1.3. Оферта считается принятой с момента оплаты Покупателем услуг Продавца.</p>
      <p>1.4. Под "Платформой" понимается веб-сайт neuro-aura.com, используемый Продавцом для предоставления доступа к
        обучающим материалам.</p>

      <h2>ПРЕДМЕТ ДОГОВОРА</h2>
      <p>2.1. Продавец предоставляет Покупателю доступ к обучающим материалам (видеоуроки, текстовые материалы,
        аудиофайлы и т. д.) курса NEURO VISION на условиях, определённых настоящей Офертой.</p>
      <p>2.2. Доступ предоставляется в электронном формате через веб-платформу Продавца или другие методы, указанные
        Продавцом.</p>
      <p>2.3. Доступ к курсу NEURO VISION предоставляется на неограниченный срок при условии соблюдения Покупателем
        условий Оферты. Продавец оставляет за собой право изменить условия предоставления доступа в будущем, если
        информация курса станет неактуальной или будет выпущен новый курс. При этом условия доступа для ранее
        приобретенного курса остаются неизменными.</p>
      <p>2.4. Курсы могут быть обновлены или дополнены в зависимости от необходимости. Покупатель получает доступ к
        обновлениям курса NEURO VISION без дополнительных доплат.</p>

      <h2>ПОРЯДОК ОФОРМЛЕНИЯ ЗАКАЗА И ОПЛАТЫ</h2>
      <p>3.1. Оплата курсов осуществляется через платёжную систему Lavatop. Продавец не имеет доступа к данным о
        платеже.</p>
      <p>3.2. Для оформления заказа Покупатель должен пройти регистрацию, указав e-mail и номер телефона.</p>
      <p>3.3. Доступ к курсу предоставляется автоматически после подтверждения оплаты.</p>
      <p>3.4. Стоимость курсов указывается на сайте и может изменяться Продавцом.</p>

      <h2>ПРАВА И ОБЯЗАННОСТИ СТОРОН</h2>
      <h3>Продавец обязуется:</h3>
      <ul>
        <li>Предоставить доступ к обучающим материалам после оплаты.</li>
        <li>Обеспечить работоспособность платформы, за исключением случаев форс-мажора.</li>
      </ul>

      <h3>Покупатель обязуется:</h3>
      <ul>
        <li>Использовать материалы только для личного обучения.</li>
        <li>Не передавать третьим лицам доступ к курсам.</li>
        <li>Не скачивать, не распространять и не перепродавать материалы курса.</li>
      </ul>

      <h3>Продавец имеет право:</h3>
      <ul>
        <li>Изменять содержание курсов без согласования.</li>
        <li>Ограничить доступ к курсу в случае нарушения условий, а именно: передачи аккаунта третьим лицам, скачивания
          и распространения материалов, а также перепродажи курса.
        </li>
      </ul>

      <h2>ВОЗВРАТ И ОТВЕТСТВЕННОСТЬ</h2>
      <p>5.1. Возврат денежных средств возможен только в случае, если курс не был открыт после покупки. Факт открытия
        курса фиксируется автоматически и является основанием для отказа в возврате. Если хотя бы второй урок был
        просмотрен, возврат невозможен, за исключением случаев технических проблем со стороны Продавца, препятствующих
        доступу к курсу.</p>
      <p>5.2. В случае технических проблем, мешающих получению доступа к курсу, Покупатель должен обратиться в службу
        поддержки Продавца по e-mail: <a href="mailto:neuro.aura@mail.ru">neuro.aura@mail.ru</a>. Время обработки
        запросов составляет до 3 рабочих дней.</p>
      <p>5.3. Продавец не несёт ответственности за результаты обучения.</p>
      <p>5.4. Продавец не несёт ответственности за технические сбои.</p>
      <p>5.5. В случае нарушения Покупателем прав интеллектуальной собственности (распространение, копирование,
        перепродажа материалов курса), Продавец имеет право заблокировать доступ к курсу без возврата средств, а также
        обратиться в судебные инстанции для возмещения ущерба. Кроме того, Покупатель может быть привлечён к
        ответственности в соответствии с действующим законодательством Российской Федерации, включая выплату штрафов и
        компенсацию причиненного ущерба.</p>

      <h2>ФОРС-МАЖОР</h2>
      <p>6.1. Стороны освобождаются от ответственности за неисполнение обязательств в случае форс-мажорных обстоятельств
        (природные катастрофы, сбои в работе интернета и т. д.).</p>

      <h2>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h2>
      <p>7.1. Продавец оставляет за собой право вносить изменения в Оферту без предварительного уведомления.</p>
      <p>7.2. Все вопросы и претензии принимаются через e-mail: <a
          href="mailto:neuro.aura@mail.ru">neuro.aura@mail.ru</a>.</p>
      <p>7.3. Применимое право – законодательство Российской Федерации.</p>
    </div>


    <div v-if="locale === 'en'">
      <h2>PUBLIC OFFER AGREEMENT</h2>

      <h3>GENERAL PROVISIONS</h3>
      <p>1.1. This document is a public offer (hereinafter referred to as the "Offer") of the NEURO AURA project
        (hereinafter referred to as the "Seller") and contains the terms of access to educational materials.</p>
      <p>1.2. By purchasing access to the NEURO VISION course, the user (hereinafter referred to as the "Buyer")
        confirms acceptance of the Offer terms.</p>
      <p>1.3. The Offer is considered accepted from the moment the Buyer pays for the Seller’s services.</p>
      <p>1.4. The "Platform" refers to the neuro-aura.com website used by the Seller to provide access to educational
        materials.</p>

      <h3>SUBJECT OF THE AGREEMENT</h3>
      <p>2.1. The Seller provides the Buyer with access to educational materials (video lessons, text materials, audio
        files, etc.) of the NEURO VISION course under the terms specified in this Offer.</p>
      <p>2.2. Access is provided electronically through the Seller's web platform or other methods specified by the
        Seller.</p>
      <p>2.3. Access to the NEURO VISION course is provided indefinitely, provided that the Buyer complies with the
        Offer terms. The Seller reserves the right to change access conditions in the future if the course information
        becomes outdated or a new course is released. However, the access conditions for the previously purchased course
        remain unchanged.</p>
      <p>2.4. Courses may be updated or supplemented as necessary. The Buyer receives access to updates of the NEURO
        VISION course at no additional cost.</p>

      <h3>ORDERING AND PAYMENT PROCEDURE</h3>
      <p>3.1. Payment for courses is made through the Lavatop payment system. The Seller does not have access to payment
        data.</p>
      <p>3.2. To place an order, the Buyer must register by providing an email and phone number.</p>
      <p>3.3. Access to the course is granted automatically after payment confirmation.</p>
      <p>3.4. The cost of courses is indicated on the website and may be changed by the Seller.</p>

      <h3>RIGHTS AND OBLIGATIONS OF THE PARTIES</h3>
      <h4>The Seller undertakes to:</h4>
      <ul>
        <li>Provide access to educational materials after payment.</li>
        <li>Ensure the platform's functionality, except in cases of force majeure.</li>
      </ul>

      <h4>The Buyer undertakes to:</h4>
      <ul>
        <li>Use the materials solely for personal learning purposes.</li>
        <li>Not share course access with third parties.</li>
        <li>Not download, distribute, or resell course materials.</li>
      </ul>

      <h4>The Seller has the right to:</h4>
      <ul>
        <li>Modify course content without prior approval.</li>
        <li>Restrict access to the course in case of a violation of the terms, including account sharing, downloading
          and distributing materials, or reselling the course.
        </li>
      </ul>

      <h3>REFUND AND LIABILITY</h3>
      <p>5.1. A refund is only possible if the course has not been accessed after purchase. The fact of course access is
        recorded automatically and serves as a basis for a refund denial. If at least the second lesson has been viewed,
        a refund is not possible, except in cases of technical issues on the Seller’s side that prevent access to the
        course.</p>
      <p>5.2. In case of technical issues preventing access to the course, the Buyer must contact the Seller's support
        service via email: <a href="mailto:neuro.aura@mail.ru">neuro.aura@mail.ru</a>. The processing time for requests
        is up to 3 business days.</p>
      <p>5.3. The Seller is not responsible for the Buyer’s learning results.</p>
      <p>5.4. The Seller is not responsible for technical failures.</p>
      <p>5.5. In case of a violation of intellectual property rights (distribution, copying, reselling of course
        materials), the Seller has the right to block access to the course without a refund and take legal action to
        recover damages. Additionally, the Buyer may be held liable under the applicable laws of the Russian Federation,
        including fines and compensation for damages.</p>

      <h3>FORCE MAJEURE</h3>
      <p>6.1. The parties are released from liability for non-fulfillment of obligations in case of force majeure
        circumstances (natural disasters, internet failures, etc.).</p>

      <h3>FINAL PROVISIONS</h3>
      <p>7.1. The Seller reserves the right to make changes to the Offer without prior notice.</p>
      <p>7.2. All inquiries and complaints are accepted via email: <a href="mailto:neuro.aura@mail.ru">neuro.aura@mail.ru</a>.
      </p>
      <p>7.3. Governing law – legislation of the Russian Federation.</p>
    </div>
  </div>
<!--  <Footer/>-->

</template>

<style scoped lang="scss">
</style>
