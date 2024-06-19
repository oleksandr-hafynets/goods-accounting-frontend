<template>
  <div class="warpper-form">
    <Button icon="pi pi-sign-out" @click="logout()" class="logout" />
    <div class="card">
      <div class="content">
        <DataTable
          dataKey="id"
          :value="products"
          :loading="loading"
          :paginator="true"
          :rowHover="true"
          :rows="3"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          v-model:filters="additionalS.filters"
          filterDisplay="menu"
          v-model:selection="selectedGoods"
          :globalFilterFields="[
            'title',
            'description',
            'count',
            'category',
            'price',
          ]"
          tableStyle="min-width: 65rem"
          responsiveLayout="scroll"
          editMode="cell"
        >
          <template #header>
            <div class="header flex justify-content-between">
              <h2 class="text-xl text-900 font-bold">Products</h2>
              <div class="flex gap-5">
                <Button
                  type="button"
                  icon="pi pi-filter-slash"
                  label="Clear"
                  outlined
                  @click="clearFilter()"
                />
                <IconField iconPosition="left">
                  <InputIcon>
                    <i class="pi pi-search" />
                  </InputIcon>
                  <InputText
                    v-model="additionalS.filters['global'].value"
                    placeholder="Keyword Search"
                  />
                </IconField>
                <Button
                  v-if="authS.role === 'ADMIN'"
                  icon="pi pi-plus"
                  @click="changeModalValue()"
                  aria-label="Filter"
                />
                <Button
                  v-if="authS.role === 'ADMIN'"
                  icon="pi pi-pencil"
                  @click="updateGood()"
                  aria-label="Filter"
                />
                <Button
                  v-if="authS.role === 'ADMIN'"
                  icon="pi pi-trash"
                  @click="deleteGood()"
                  aria-label="Filter"
                />
              </div>
            </div>
          </template>
          <template #empty> No goods found. </template>
          <template #loading> Loading goods data. Please wait. </template>

          <Column
            v-if="authS.role === 'ADMIN'"
            selectionMode="single"
            headerStyle="width: 3rem"
          />
          <Column header="Image">
            <template #body="slotProps">
              <img
                :src="`${slotProps.data.image}`"
                :alt="slotProps.data.image"
              />
            </template>
          </Column>

          <Column
            sortable
            field="title"
            header="Title"
            style="min-width: 12rem"
          >
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>

          <Column sortable field="description" header="Description">
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              /> </template
          ></Column>

          <Column sortable field="price" header="Price">
            <template #body="slotProps">
              {{ formatCurrency(slotProps.data.price) }}
            </template>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              />
            </template>
          </Column>

          <Column field="category" header="Category" sortable>
            <template #filter="{ filterModel }">
              <InputText
                v-model="filterModel.value"
                type="text"
                class="p-column-filter"
                placeholder="Search by name"
              /> </template
          ></Column>
          <Column
            header="Count"
            field="count"
            key="count"
            sortable
            sortField="count"
            filterField="count"
            dataType="numeric"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputNumber
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                placeholder="0"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <div class="section-wapper">
      <div class="section-relative">
        <section>
          <div v-for="n in 880" :key="n">
            <span class="back-span"></span>
          </div>
        </section>
      </div>
    </div>
  </div>

  <ModalForm
    v-if="modalForm"
    @close="changeModalValue()"
    :goods="selectedGoods"
  />
</template>

<script setup lang="ts">
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import DataTable from "primevue/datatable";
import InputNumber from "primevue/inputnumber";
import Column from "primevue/column";
import ModalForm from "../components/ModalForm.vue";
import { ref, onMounted } from "vue";
import { goodsStore } from "../store/goodsStore";
import { authStore } from "../store/authStore";
import { additionalStore } from "../store/additional";
import { useRouter } from "vue-router";

const router = useRouter();
const store = goodsStore();
const authS = authStore();
const additionalS = additionalStore();
const loading = ref(true);
const modalForm = ref(false);

const products = ref([]);
const selectedGoods = ref();

const clearFilter = () => {
  additionalS.initFilters();
};

const formatCurrency = (value: any) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const getAllGoods = async () => {
  await store.getAll();
  products.value = store.goods;
};

const changeModalValue = async () => {
  modalForm.value = !modalForm.value;
  selectedGoods.value = "";
  await getAllGoods();
};

const updateGood = async () => {
  if (!selectedGoods.value) return;
  modalForm.value = !modalForm.value;
};

const deleteGood = async () => {
  await store.deleteGood(selectedGoods.value.id);
  await getAllGoods();
};

const logout = async () => {
  localStorage.removeItem("token");
  await router.push("/sign-in");
};

onMounted(async () => {
  await store.getAll();
  products.value = store.goods;
  loading.value = false;
});
</script>

<style scoped>
@import "../assets/css/table.css";
@import "../assets/css/background.css";
</style>
