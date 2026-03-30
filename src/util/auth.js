import axiosClient from "./axios";

const Login = async (email, password) => {
  // TODO: Implement login logic
  const data = { email, password };
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`;
  return axiosClient.post(URL, data);
};
const FetchMe = async () => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/me`;
  return axiosClient.get(URL);
};
export { Login, FetchMe };
