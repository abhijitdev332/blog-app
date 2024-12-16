import axios from "axios";
const AxiosInt = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});
AxiosInt.defaults.withCredentials = true;

export default AxiosInt;
