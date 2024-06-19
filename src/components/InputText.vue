<template>
  <input
    required
    v-model="userInfo"
    @input="
      handleInput($event);
      props.v?.$touch();
    "
    :class="{ form: form, invalid: isInfoInvalid() }"
  />
  <i :class="{ 'form-i': form }">{{ props.type }}</i>
</template>
<script setup lang="ts">
import { ErrorMessageEnum } from "../types/errors";
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: string;
  v?: {
    $invalid: boolean;
    $dirty: boolean;
    $touch: Function;
  };
  error?: string;
  type: string;
  form?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: string): void;
}>();

const userInfo = ref(props.modelValue);

const handleInput = (event: any) => {
  if (!event.target) return;
  userInfo.value = event.target.value;
  emit("update:modelValue", event.target.value);
};

const { EmailIsNotValid, UserInUse, NotFound } = ErrorMessageEnum;
const isInfoInvalid = () => {
  if (props.v)
    return (
      (props.v.$invalid && props.v.$dirty) ||
      (props.error === EmailIsNotValid && props.type === "Email") ||
      props.error === UserInUse ||
      props.error === NotFound
    );
};

watch(
  () => props.modelValue,
  () => {
    userInfo.value = props.modelValue;
  }
);
</script>
<style scoped>
@import "../assets/css/formInputs.css";
</style>
