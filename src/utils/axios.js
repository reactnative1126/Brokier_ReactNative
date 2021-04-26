import axios from "axios";
import configs from "@constants/configs";

// const axiosConfig = axios.create({
//     baseURL: configs.apiURL,
//     headers: {
//         "Content-Type": "application/json",
//         "Content-Transfer-Encoding": "application/gzip",
//         "Accept": "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Headers": "Content-Type",
//         "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS"
//     }
// })

axios.defaults.baseURL = configs.apiURL;
axios.defaults.responseType = "json";
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.headers.common = { "Content-Transfer-Encoding": "application/gzip" };
axios.defaults.headers.common = { "Access-Control-Allow-Origin": "*" };
axios.defaults.headers.common = { "Access-Control-Allow-Headers": "Content-Type" };
axios.defaults.headers.common = { "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS" };

export default axios;