import axios from "axios";
import { SLICE_NAMES } from "../../constants/enums";
// instance
const axios_instance = axios.create({
  baseURL: `${import.meta.env.VITE_DEPLOYED_BACKEND_HOSTNAME}/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

axios_instance.interceptors.request.use(
  (config) => {
    const token =
      JSON.parse(localStorage.getItem(SLICE_NAMES.USER))?.accessToken || null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios_instance };
