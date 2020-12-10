import axios from "axios";
import configs from "../constants/configs.js";

axios.defaults.baseURL = configs.apiURL;
axios.defaults.headers.common = { "Content-Type": "application/json" };
// axios.defaults.headers.common = { "Content-Transfer-Encoding": "application/gzip" };
// axios.defaults.headers.common = { "Access-Control-Allow-Origin": "*" };
// axios.defaults.headers.common['REPLIERS-API-KEY'] = configs.apiKey;
axios.defaults.responseType = "json";

// export const setClientToken = token => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

// export const removeClientToken = () => {
//     delete axios.defaults.headers.common['Authorization'];
// };

export default axios;