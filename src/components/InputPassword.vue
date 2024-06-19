<template>
  <input
    required
    :type="bloke"
    v-model="userPassword"
    @focus="inputFocused = true"
    @blur="inputFocused = false"
    @input="
      handleInput($event);
      props.v.$touch();
    "
    :class="{
      invalid: isPasswordInvalid(),
    }"
  />
  <i>{{ props.type }} </i>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from "../types/errors";
import { ref, watch } from "vue";

const bloke = ref("password");
const props = defineProps<{
  modelValue: string;
  v: {
    $invalid: boolean;
    $dirty: boolean;
    $touch: Function;
  };
  type: string;
  error?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: string | null): void;
}>();

const userPassword = ref(props.modelValue);
const inputFocused = ref(false);
const { PasswordWrong, PasswordMinLength, PasswordIsEqual } =
  ErrorMessageEnum;

const handleInput = (event: any) => {
  if (!event.target) return;
  emit("update:modelValue", event.target.value);
};

const isPasswordInvalid = () => {
  return (
    (props.v.$invalid && props.v.$dirty) ||
    props.error === PasswordMinLength ||
    props.error === PasswordIsEqual ||
    props.error === PasswordWrong
  );
};

watch(
  () => props.modelValue,
  (data) => {
    userPassword.value = data;
  }
);
</script>
<style scoped>
@import "../assets/css/formInputs.css";
</style>
