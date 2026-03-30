import axiosClient from "./axios";

const getProductsAPI = async () => {
  // TODO: Implement get products logic
  const URL = `/api/products`;
  return axiosClient.get(URL);
};
const getProductBySlugAPI = async (slug) => {
  const URL = `/api/products/${slug}`;
  return axiosClient.get(URL);
};

const addProductAPI = async (data) => {
  const URL = `/api/admin/products`;
  return axiosClient.post(URL, data);
};
const updateProductAPI = async (id, data) => {
  const URL = `/api/admin/products/edit/${id}`;
  return axiosClient.put(URL, data);
};
export { getProductsAPI, getProductBySlugAPI, addProductAPI, updateProductAPI };
