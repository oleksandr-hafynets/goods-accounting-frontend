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
import { ref, watch } from "vue";

const props = defineProps<{
  modelValue: number | undefined;
  type: string;
  form: boolean;
  v?: {
    $invalid: boolean;
    $dirty: boolean;
    $touch: Function;
  };
}>();

const emit = defineEmits<{
  (e: "update:modelValue", val: number | undefined): void;
}>();

const userInfo = ref(props.modelValue);

const handleInput = (event: any) => {
  if (!event.target || isNaN(+event.target.value)) {
    userInfo.value = event.target.value.slice(0, event.target.value.length - 1);
    return;
  }
  const param = +event.target.value;
  userInfo.value = param;
  emit("update:modelValue", param);
};

const isInfoInvalid = () => {
  if (props.v) return props.v.$invalid && props.v.$dirty;
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
