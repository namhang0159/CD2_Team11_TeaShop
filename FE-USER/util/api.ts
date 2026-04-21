import { sl } from "date-fns/locale";
import axiosClient from "./axios";

export interface RegisterPayload {
  full_name: string;
  email: string;
  phone_number?: string;
  password: string;
}

export const RegisterAPI = (data: RegisterPayload) => {
  const API_URL = `/api/register`;
  return axiosClient.post(API_URL, data);
};
export interface LoginPayload {
  email: string;
  password: string;
}
export const LoginAPI = (data: LoginPayload) => {
  const API_URL = `/api/login`;
  return axiosClient.post(API_URL, data);
};
export const FetchMeAPI = () => {
  const API_URL = `/api/me`;
  return axiosClient.get(API_URL);
};
export const GetProductsAPI = () => {
  const API_URL = `/api/products`;
  return axiosClient.get(API_URL);
};
export const GetProductDetailAPI = (slug: string) => {
  const API_URL = `/api/products/${slug}`;
  return axiosClient.get(API_URL);
};
export const GetCartAPI = () => {
  if (!localStorage.getItem("token")) {
    return Promise.reject("No token");
  }
  const API_URL = `/api/cart`;
  return axiosClient.get(API_URL);
};
export const AddToCartAPI = (variant_id: number, quantity: number) => {
  const API_URL = `/api/cart`;
  return axiosClient.post(API_URL, { variant_id, quantity });
};
export const RemoveFromCartAPI = (cart_id: number) => {
  const API_URL = `/api/cart/${cart_id}`;
  return axiosClient.delete(API_URL);
};
export const UpdateCartAPI = (itemId: number, quantity: number) => {
  return axiosClient.put(`/api/cart/${itemId}`, { quantity });
};
export const GetAddressesAPI = () => {
  const API_URL = `/api/addresses`;
  return axiosClient.get(API_URL);
};
export const CreateAddressAPI = (data: any) => {
  const API_URL = `/api/addresses`;
  return axiosClient.post(API_URL, data);
};
export const RemoveAddressAPI = (id: number) => {
  const API_URL = `/api/addresses/${id}`;
  return axiosClient.delete(API_URL);
};
export const GetPaymentMethodsAPI = () => {
  const API_URL = `/api/payment-methods`;
  return axiosClient.get(API_URL);
};
export const CreateOrderAPI = (
  payment_method_id: number,
  shipping_address_id: number,
  shipping_fee: number,
) => {
  const data = {
    payment_method_id,
    shipping_address_id,
    shipping_fee,
  };
  const API_URL = `/api/orders/checkout`;
  return axiosClient.post(API_URL, data);
};
export const GetVNPAYPaymentURLAPI = (order_id: number) => {
  const API_URL = `/api/payment/vnpay/${order_id}`;
  return axiosClient.post(API_URL);
};
export const GetOrdersAPI = () => {
  const API_URL = `/api/orders`;
  return axiosClient.get(API_URL);
};
export const GetPostsAPI = () => {
  const API_URL = `/api/posts`;
  return axiosClient.get(API_URL);
};
export const GetPostDetailAPI = (slug: string) => {
  const API_URL = `/api/posts/${slug}`;
  return axiosClient.get(API_URL);
};
