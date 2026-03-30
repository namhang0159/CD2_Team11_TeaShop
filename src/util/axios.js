import axios from "axios";

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

// ========================
// REQUEST INTERCEPTOR
// ========================
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ========================
// RESPONSE INTERCEPTOR
// ========================
axiosClient.interceptors.response.use(
  (response) => {
    // Trả luôn data cho gọn
    return response.data;
  },
  (error) => {
    // Xử lý lỗi chung
    if (error.response) {
      const status = error.response.status;

      // Token hết hạn / chưa login
      if (status === 401) {
        console.log("Unauthorized - redirect login");

        // Xoá token
        localStorage.removeItem("token");

        // Redirect login (tuỳ bạn)
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }

      // Lỗi validate
      if (status === 422) {
        return Promise.reject(error.response.data);
      }

      // Lỗi khác
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
