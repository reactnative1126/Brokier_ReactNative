const axios = require('axios');

axios.defaults.baseURL = "https://api.repliers.io";
axios.defaults.headers.common = { "Content-Type": "application/json" };
axios.defaults.headers.common['REPLIERS-API-KEY'] = "ygmJxh2vUhNxWgpWSU9AM3t7NE5YFa";
axios.defaults.responseType = "json";

export default axios;