import { getStorage, ref, uploadBytes } from "firebase/storage";
import http from "../http-common";
import { Goods, ReqGoods } from "../types/goods";

export const addGoods = async (goods: Goods) => {
  const token = localStorage.getItem("token") || "";
  const storage = getStorage();
  const name = goods.title + "_" + new Date().getTime();
  const starsRef = ref(storage, `${name}.jpg`);
  await uploadBytes(starsRef, goods.image);
  const image = `https://firebasestorage.googleapis.com/v0/b/goods-accounting.appspot.com/o/${name}.jpg?alt=media`;
  const data = await http.post(
    "/api/goods",
    {
      image: image,
      title: goods.title,
      description: goods.description,
      category: goods.category,
      price: goods.price,
      count: goods.count,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data;
};

export const getAllGoods = async () => {
  const data = await http.get("/api/goods");
  return data.data;
};

export const deleteGoodById = async (id: string) => {
  const token = localStorage.getItem("token") || "";
  const data = await http.delete("/api/goods/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const updateGoods = async (good: ReqGoods) => {
  const token = localStorage.getItem("token") || "";
  let image = "";
  if (typeof good.image === "string") image = good.image;
  else {
    const storage = getStorage();
    const name = good.title + "_" + new Date().getTime();
    const starsRef = ref(storage, `${name}.jpg`);
    await uploadBytes(starsRef, good.image);
    image = `https://firebasestorage.googleapis.com/v0/b/goods-accounting.appspot.com/o/${name}.jpg?alt=media`;
  }
  const data = await http.put(
    "/api/goods/" + good.id,
    {
      image: image,
      title: good.title,
      description: good.description,
      category: good.category,
      price: good.price,
      count: good.count,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.data;
};
