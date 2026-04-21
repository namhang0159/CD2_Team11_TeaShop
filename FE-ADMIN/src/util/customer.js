import axiosClient from "./axios";

export const GetCustomerListAPI = async () => {
  const URL = `/api/admin/customers`;
  return axiosClient.get(URL);
}
export const GetCustomerDetailByIdAPI = async (id) => {
  const URL = `/api/admin/customers/${id}`;
  return axiosClient.get(URL);
}