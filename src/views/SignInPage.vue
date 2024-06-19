<template>
  <div>
    <section>
      <div v-for="n in 261" :key="n">
        <span></span>
      </div>
      <div class="auth-component">
        <div class="content">
          <h2>Sign In</h2>
          <div class="form">
            <div class="form-input">
              <TextInput
                v-model="user.username"
                :v="v$.username"
                type="Username"
                :error="error"
              />
              <ErrorMessage :v="v$.username" :error="error" />
            </div>
            <div class="form-input">
              <PasswordInput
                v-model="user.password"
                :v="v$.password"
                type="Password"
                :error="error"
              />
              <ErrorMessage :v="v$.password" :error="error" />
            </div>
            <button class="form-button" @click="submit()">Submit</button>
            <button class="form-button reverse" @click="signUp()">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import TextInput from "../components/InputText.vue";
import PasswordInput from "../components/InputPassword.vue";
import ErrorMessage from "../components/ErrorsComponent.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "../store/authStore";

const store = authStore();
const router = useRouter();
const error = ref("");
const user = reactive({
  username: "",
  password: "",
});

const rules = {
  username: { required },
  password: { required, minLength: minLength(6) },
};

const v$ = useVuelidate(rules, user);
const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  try {
    const data = await store.signIn({
      username: user.username,
      password: user.password,
    });
    localStorage.setItem("token", data.token);
    await router.push("/");
  } catch (err: any) {
    error.value = err.response?.data.message || "";
  }
};

const signUp = async () => {
  await router.push("/sign-up");
};
</script>

<style scoped>
@import "../assets/css/signUp.css";
</style>
