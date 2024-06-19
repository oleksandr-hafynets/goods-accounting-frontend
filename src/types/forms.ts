export interface Form {
  image: File | null | string;
  title: string;
  description: string;
  category: string;
  price: null | number;
  count: null | number;
}
