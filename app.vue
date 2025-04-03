<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "~/store/userStora";

const { locale, setLocale } = useI18n();

onNuxtReady(() => {
  console.log("✅ Страница загружена, метрики подключены!");

  // 🔹 Google Tag Manager
  const gtmScript = document.createElement("script");
  gtmScript.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TQKBLGGM');
    `;
  document.head.appendChild(gtmScript);

  const gtmNoscript = document.createElement("noscript");
  gtmNoscript.innerHTML = `
      <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TQKBLGGM"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
    `;
  document.body.prepend(gtmNoscript);

  // 🔹 Яндекс.Метрика
  const yandexScript = document.createElement("script");
  yandexScript.innerHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();for (var j = 0; j < document.scripts.length; j++) {
      if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(100467923, "init", {clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
    `;
  document.head.appendChild(yandexScript);

  const yandexNoscript = document.createElement("noscript");
  yandexNoscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/100467923" style="position:absolute; left:-9999px;" alt="" /></div>`;
  document.body.appendChild(yandexNoscript);

  // 🔹 Facebook Pixel
  const fbScript = document.createElement("script");
  fbScript.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '1302067127553439'); fbq('track', 'PageView');
    `;
  document.head.appendChild(fbScript);

  const fbNoscript = document.createElement("noscript");
  fbNoscript.innerHTML = `
      <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1302067127553439&ev=PageView&noscript=1"/>
    `;
  document.body.appendChild(fbNoscript);
});


// Проверяем, есть ли язык в localStorage
// const savedLanguage = localStorage.getItem("language");
//
// if (savedLanguage) {
//   setLocale(savedLanguage); // Устанавливаем сохранённый язык
// } else {
//   localStorage.setItem("language", locale.value); // Сохраняем текущий язык по умолчанию
// }

useHead({
  title: "Neuro Aura"
});

const userStore = useUserStore()

const {initUser} = userStore

onMounted(() => {
  initUser(true, true)
})
</script>
