import { defineStore } from "pinia";
import type { Goods, ReqGoods } from "../types/goods";
import {
  addGoods,
  deleteGoodById,
  getAllGoods,
  updateGoods,
} from "../service/goods";
import { ref } from "vue";

export const goodsStore = defineStore("goods", () => {
  const goods = ref([]);
  const add = async (goods: Goods) => {
    return await addGoods(goods);
  };

  const update = async (goods: ReqGoods) => {
    return await updateGoods(goods);
  };

  const deleteGood = async (id: string) => {
    return await deleteGoodById(id);
  };

  const getAll = async () => {
    const data = await getAllGoods();
    goods.value = data;
  };

  return { add, getAll, goods, update, deleteGood };
});
