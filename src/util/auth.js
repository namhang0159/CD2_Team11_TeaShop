const { default: axios } = require("axios");

const Login = async (email, password) => {
  // TODO: Implement login logic
  const data = { email, password };
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`;
  return axios.post(URL, data);
};
export { Login };
