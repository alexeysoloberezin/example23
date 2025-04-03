<script setup lang="ts">

</script>

<template>
  <div class="page-loader">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="50"
        height="50"
        class="loader"
    >
      <circle cx="25" cy="25" r="20" stroke="#030812" stroke-width="4" fill="none" />
      <circle
          cx="25"
          cy="25"
          r="20"
          stroke="blue"
          stroke-width="4"
          fill="none"
          stroke-dasharray="126.92"
          stroke-dashoffset="126.92"
          class="circle"
      />
    </svg>
  </div>
</template>

<style scoped lang="scss">
.page-loader{
  display: flex;
  justify-content: center;
  margin: 15px 0;
}
.loader {
  animation: rotate 2s linear infinite;
  margin: 0 auto;
}

.circle {
  animation: dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 126.92;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: 126.92;
  }
}

@keyframes color {
  0% {
    stroke: #6187F2;
  }
  50% {
    stroke: #F829DC;
  }
  100% {
    stroke: #6187F2;
  }
}
</style>