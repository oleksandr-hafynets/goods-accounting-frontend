<template>
  <section>
    <div v-for="n in 261" :key="n">
      <span class="back-span"></span>
    </div>
    <div class="container">
      <h1>404</h1>
      <button class="form-button" @click="back()">Back</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const back = async () => {
  await router.push("/");
};
</script>

<style scoped>
@import "../assets/css/background.css";
@import "../assets/css/nonPage.css";
</style>
