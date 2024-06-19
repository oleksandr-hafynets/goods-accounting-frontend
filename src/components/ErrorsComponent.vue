<template>
  <div class="error">
    <span v-if="(props.v.$error && props.v.$dirty) || props.error">
      <small class="text-error">{{ getError() }}</small>
    </span>
  </div>
</template>

<script setup lang="ts">
import { ErrorMessageEnum } from "../types/errors";
import type { ErrorObject } from "@vuelidate/core";

const props = defineProps<{
  v: {
    $error: boolean;
    $dirty: boolean;
    $errors: ErrorObject[];
    $path: string;
  };
  error?: string;
}>();

const {
  EmailIsNotValid,
  IsRequired,
  PasswordMinLength,
  PasswordIsEqual,
  UserInUse,
  PasswordWrong,
  NotFound,
} = ErrorMessageEnum;

const getError = () => {
  const { $message: message } = props.v.$errors?.[0] ?? { $message: null };
  switch (props.v.$path) {
    case "email":
      if (message === EmailIsNotValid) return EmailIsNotValid;
      else if (message === IsRequired) return IsRequired;
      else if (props.error === UserInUse) return UserInUse;
      break;
    case "password":
      if (message === IsRequired) return IsRequired;
      else if (message === PasswordMinLength) return PasswordMinLength;
      else if (props.error === PasswordWrong) return PasswordWrong;
      break;
    case "confirmPassword":
      if (message === IsRequired) return IsRequired;
      else if (message === PasswordIsEqual) return PasswordIsEqual;
      break;
    case "username":
      if (message === IsRequired) return IsRequired;
      else if (props.error === NotFound) return NotFound;
      break;
    default:
      return IsRequired;
  }
};
</script>
<style scoped>
@import "../assets/css/errors.css";
</style>
