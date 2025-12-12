import { EditProductDto } from "../contracts/productCreateDto";
import callApi from "../helpers/callApi";

export async function GetProducts({ page = 1, per_page = 5 }) {
  const res = await callApi().get(`/products?page=${page}&per_page=${per_page}`);

  return {
    products: res.data.data,
    totalPages: res.data.total_page,
  };
}

export async function DeleteProducts(productId:number) {
  const res = await callApi().post(`/products/${productId}/delete`);

  return {
   res
  };
}

export async function GetSingleProduct(productId:number) {
  const res = await callApi().get(`/products/${productId}`);

  res;
}

export async function EditProductsApi(productId: number, values: EditProductDto) {
  const res = await callApi().post(`/products/${productId}/update`, {
    ...values,
    price: Number(values.price),
  });

  return res; // ← مهم! خود res را برگردان
}




