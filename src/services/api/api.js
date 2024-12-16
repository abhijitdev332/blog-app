import axios from "axios";
const AxiosInt = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosInt.defaults.withCredentials = true;

export default AxiosInt;
