import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://comein.cv/comeincv_api_test",
  timeout: 5000,
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

export default axiosInstance;
