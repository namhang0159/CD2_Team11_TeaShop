import axiosClient from "./axios";

export const GetCategories = async () => {
  const URL = `/api/admin/categories`;
  return axiosClient.get(URL);
};
export const AddCategory = async (data) => {
  const URL = `/api/admin/categories`;
  return axiosClient.post(URL, data);
};
export const DeleteCategory = async (id) => {
  const URL = `/api/admin/categories/${id}`;
  return axiosClient.delete(URL);
};
