import axios from "axios";
import { apiBaseUrl } from "./constant";
// const baseUrl = "/api/login";

const login = async (credentials) => {
  const response = await axios.post(`${apiBaseUrl}/login`, credentials);
  return response.data;
};

export default { login };
