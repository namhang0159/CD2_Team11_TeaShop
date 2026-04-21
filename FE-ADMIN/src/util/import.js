import axiosClient from "./axios";

export const ImportInventoryAPI = async (data) => {
  const URL = `/api/admin/inventory/import-order`;
  return axiosClient.post(URL, data);
};
export const GetImportInventoryListAPI = async () => {
  const URL = `/api/admin/inventory/imports`;
  return axiosClient.get(URL);
};
export const GetImportInventoryDetailByIdAPI = async (id) => {
  const URL = `/api/admin/inventory/imports/${id}`;
  return axiosClient.get(URL);
};
