import axios from "axios";
import configs from "../constants/configs.js";

axios.defaults.baseURL = configs.apiURL;
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.responseType = "json";


export const setAccess = () => {
    axios.defaults.headers.common["Access-Control-Allow-Headers"] = "*";
    axios.defaults.headers.common["Access-Control-Allow-Methods"] = "GET,HEAD,OPTIONS,POST,PUT";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
};

export const removeAccess = () => {
    delete axios.defaults.headers.common['Access-Control-Allow-Headers'];
    delete axios.defaults.headers.common['Access-Control-Allow-Methods'];
    delete axios.defaults.headers.common['Access-Control-Allow-Origin'];
};

export default axios;