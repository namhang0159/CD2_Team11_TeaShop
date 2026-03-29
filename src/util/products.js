const { default: axios } = require("axios");

const getProductsAPI = async () => {
  // TODO: Implement get products logic
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
  return axios.get(URL);
};
const getProductBySlugAPI = async (slug) => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`;
  return axios.get(URL);
};
export { getProductsAPI, getProductBySlugAPI };
