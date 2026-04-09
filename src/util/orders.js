import axiosClient from "./axios";

export const GetOrdersAPI = async () => {
  const URL = `/api/admin/orders`;
  return axiosClient.get(URL);
};
export const UpdateOrderStatusAPI = async (id, status) => {
  const URL = `/api/admin/orders/${id}/status`;
  return axiosClient.put(URL, { status });
};
export const GetOrderDetailByIdAPI = async (id) => {
  const URL = `/api/admin/orders/${id}`;
  return axiosClient.get(URL);
};
