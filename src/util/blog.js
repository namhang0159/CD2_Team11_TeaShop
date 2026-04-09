import axiosClient from "./axios";

export const GetBlogListAPI = async () => {
  const URL = `/api/posts`;
  return axiosClient.get(URL);
};

export const GetBlogDetailByIdAPI = async (slug) => {
  const URL = `/api/posts/${slug}`;
  return axiosClient.get(URL);
};
export const CreateBlogAPI = async (data) => {
  const URL = `/api/admin/posts`;
  return axiosClient.post(URL, data);
};
export const UpdateBlogAPI = async (id, data) => {
  const URL = `/api/admin/posts/${id}`;
  return axiosClient.put(URL, data);
};
export const DeleteBlogAPI = async (id) => {
  const URL = `/api/admin/posts/${id}`;
  return axiosClient.delete(URL);
};
export const GetBlogCategoriesAPI = async () => {
  const URL = `/api/admin/post-categories`;
  return axiosClient.get(URL);
};
export const CreateBlogCategoryAPI = async (name) => {
  const URL = `/api/admin/post-categories`;
  return axiosClient.post(URL, { name });
};
export const DeleteBlogCategoryAPI = async (id) => {
  const URL = `/api/admin/post-categories/${id}`;
  return axiosClient.delete(URL);
};
