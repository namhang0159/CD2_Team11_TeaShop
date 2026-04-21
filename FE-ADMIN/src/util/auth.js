import axiosClient from "./axios";

const Login = async (email, password) => {
  // TODO: Implement login logic
  const data = { email, password };
  const URL = `/api/admin/login`;
  return axiosClient.post(URL, data);
};
const FetchMe = async () => {
  const URL = `/api/me`;
  return axiosClient.get(URL);
};
export { Login, FetchMe };

export const uploadAPI = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return axiosClient.post("/api/admin/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
