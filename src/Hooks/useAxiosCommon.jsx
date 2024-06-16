import axios from "axios";

const axiosCommon = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_URL,
});
const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;