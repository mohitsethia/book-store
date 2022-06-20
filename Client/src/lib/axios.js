import axios from "axios";
import { BASE_URL, IS_PROD } from "../utils/constants";

axios.defaults.baseURL = IS_PROD ? BASE_URL : "http://127.0.0.1:9002";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export default axios;
