import axios from "axios";
import { apiPath } from "./apiPath";

const axiosInstance = axios.create({
  baseURL: apiPath,
  timeout: 100000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

export default axiosInstance;
