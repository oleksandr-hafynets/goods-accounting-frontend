<template>
  <div class="container">
    <div class="form">
      <Button class="exit" icon="pi pi-times" @click="exit()" />
      <DragFile
        @update="(item) => setImage(item)"
        :v="v$.image"
        :url="props.goods?.image"
      />
      <div class="inputs">
        <div class="form-input">
          <TextInput
            v-model="form.title"
            type="Title"
            :v="v$.title"
            :form="true"
          />
          <ErrorMessage :v="v$.title" />
        </div>
        <div class="form-input">
          <TextInput
            v-model="form.description"
            type="Description"
            :v="v$.description"
            :form="true"
          />
          <ErrorMessage :v="v$.description" />
        </div>
        <div class="form-input">
          <TextInput
            v-model="form.category"
            type="Category"
            :v="v$.category"
            :form="true"
          />
          <ErrorMessage :v="v$.category" />
        </div>
        <div class="form-input">
          <NumberInput
            v-model="form.price"
            type="Price"
            :v="v$.price"
            :form="true"
          />
          <ErrorMessage :v="v$.price" />
        </div>
        <div class="form-input">
          <NumberInput
            v-model="form.count"
            type="Count"
            :v="v$.count"
            :form="true"
          />
          <ErrorMessage :v="v$.count" />
        </div>
        <button class="form-button" @click="submit()">Submit</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import TextInput from "../components/InputText.vue";
import NumberInput from "../components/NumberInput.vue";
import ErrorMessage from "../components/ErrorsComponent.vue";
import DragFile from "../components/DragFile.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { onMounted, reactive, ref } from "vue";
import { Form } from "../types/forms";
import { goodsStore } from "../store/goodsStore";
import { ReqGoods } from "../types/goods";

const store = goodsStore();
const props = defineProps<{ goods?: ReqGoods }>();
const emit = defineEmits<{ (e: "close"): void }>();
const form = reactive<Form>({
  image: null,
  title: "",
  description: "",
  category: "",
  price: null,
  count: null,
});

const rules = {
  image: { required },
  title: { required },
  description: { required },
  category: { required },
  price: { required },
  count: { required },
};

const v$ = useVuelidate(rules, form);
const error = ref("");

const submit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  try {
    if (props.goods)
      await store.update({
        id: props.goods.id,
        image: form.image!,
        title: form.title,
        description: form.description,
        price: form.price!,
        count: form.count!,
        category: form.category,
      });
    else
      await store.add({
        image: form.image as File,
        title: form.title,
        description: form.description,
        price: form.price!,
        count: form.count!,
        category: form.category,
      });
    exit();
  } catch (err: any) {
    error.value = err.response?.data.message || "";
  }
};

const setImage = (item: File) => {
  form.image = item;
};

const exit = () => {
  emit("close");
};

onMounted(() => {
  if (props.goods) {
    form.image = props.goods.image;
    form.title = props.goods.title;
    form.description = props.goods.description;
    form.category = props.goods.category;
    form.price = props.goods.price;
    form.count = props.goods.count;
  }
});
</script>

<style scoped>
@import "../assets/css/modalForm.css";
</style>
