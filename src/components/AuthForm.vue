<template>
  <div class="authForm ">
    <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto">
      <div class="text-center mb-8">
        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome Back</div>
        <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-primary cursor-pointer">Create today!</a>
      </div>

      <div>
        <Label inputId="email1">Email</Label>
        <InputText id="email1" type="text" placeholder="Email address" class="w-full mb-4" />

        <Label inputId="password1">Password</Label>
        <InputText id="password1" type="password" placehoder="Password" class="w-full mb-4" />

        <Button label="Sign In" icon="pi pi-user" class="w-full" />

        <div class="flex items-center justify-between mb-12">
          <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">Forgot password?</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { ref } from 'vue';
import Label from "~/src/components/ui/Label.vue";


</script>

<style lang="scss">
.authForm{
  max-width: 700px;
  margin: 0 auto;
}
</style>
