export interface Goods {
  image: File;
  title: string;
  description: string;
  category: string;
  price: number;
  count: number;
}

export interface ReqGoods {
  image: string | File;
  title: string;
  description: string;
  category: string;
  price: number;
  count: number;
  id: string;
}
