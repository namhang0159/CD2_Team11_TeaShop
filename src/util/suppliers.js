import axiosClient from "./axios";

export const GetSuppliers = async () => {
  const URL = `/api/admin/suppliers`;
  return axiosClient.get(URL);
};
export const AddSupplier = async (data) => {
  const URL = `/api/admin/suppliers`;
  return axiosClient.post(URL, data);
};
export const DeleteSupplier = async (id) => {
  const URL = `/api/admin/suppliers/${id}`;
  return axiosClient.delete(URL);
};
