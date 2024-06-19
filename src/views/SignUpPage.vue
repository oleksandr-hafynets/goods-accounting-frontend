<template>
  <div>
    <section>
      <div v-for="n in 261" :key="n">
        <span></span>
      </div>
      <div class="auth-component">
        <div class="content">
          <h2>Sign Up</h2>
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
              <TextInput
                v-model="user.email"
                :v="v$.email"
                :error="error"
                type="Email"
              />
              <ErrorMessage :v="v$.email" :error="error" />
            </div>
            <div class="form-input">
              <PasswordInput
                v-model="user.password"
                :v="v$.password"
                type="Password"
              />
              <ErrorMessage :v="v$.password" />
            </div>
            <div class="form-input">
              <PasswordInput
                v-model="user.confirmPassword"
                :v="v$.confirmPassword"
                type="Confirm password"
              />
              <ErrorMessage :v="v$.confirmPassword" />
            </div>
            <button class="form-button" @click="submit()">Submit</button>
            <button class="form-button reverse" @click="signIn()">
              Sign In
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
import { email, required, sameAs, minLength } from "@vuelidate/validators";
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { authStore } from "../store/authStore";

const store = authStore();
const router = useRouter();
const error = ref("");
const user = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = {
  username: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  confirmPassword: {
    required,
    sameAs: sameAs(computed(() => user.password)),
  },
};

const v$ = useVuelidate(rules, user);
const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  try {
    const data = await store.signUp({
      username: user.username,
      email: user.email,
      password: user.password,
    });
    localStorage.setItem("token", data.token);
    await router.push("/");
  } catch (err: any) {
    error.value = err.response?.data.message || "";
  }
};

const signIn = async () => {
  await router.push("/sign-in");
};
</script>

<style scoped>
@import "../assets/css/signUp.css";
</style>
