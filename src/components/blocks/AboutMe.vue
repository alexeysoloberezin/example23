<script setup lang="ts">

</script>

<template>
  <div class="container">
    <div class="aboutMe">
      <div>
        <img class="aboutMe-image" src="/aboutme.jpg" alt="">
      </div>
      <div class="aboutMe-info">
        <h3>{{ $t('landing.aboutMe.title') }}</h3>
        <div v-html="$t('landing.aboutMe.content')" class="aboutMe-info-content">
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aboutMe {
  display: grid;
  //flex-direction: column;
  //align-items: center;
  //text-align: center;
  align-items: center;
  grid-template-columns: 320px 1fr;
  gap: 10px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  margin-bottom: 80px;
  padding: 30px;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    padding: 15px;
  }
  &-image {
    width: 310px;
    aspect-ratio: 1/1;
    object-fit: cover;
    object-position: 0 -35px;
    border-radius: 50%;
    //border-radius: 12px;
  }

  &-info {
    h3 {
      margin-bottom: 12px;
    }

    &-content {
      opacity: 0.7;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

  }
}
</style>