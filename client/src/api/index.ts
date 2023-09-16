import axios from "axios";
import { CURRENT_URL } from "../constants/domains";

const instanceAxios = axios.create({
    baseURL: CURRENT_URL,
    withCredentials: true,
});

export default instanceAxios;
