import axios from "axios";

const AxiosConfig = axios.create({
//   baseURL: process.env.BASE_URL,
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export default AxiosConfig;
