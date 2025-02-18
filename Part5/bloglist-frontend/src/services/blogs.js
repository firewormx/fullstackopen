import axios from "axios";
import { apiBaseUrl } from "./constant";
// const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(`${apiBaseUrl}/blogs`);
  return response.data;
};

const getId = async (id) => {
  const response = await axios.get(`${apiBaseUrl}/blogs/${id}`);
  return response.data;
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${apiBaseUrl}/blogs`, newObj, config);
  return response.data;
};

const update = async (id, newObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${apiBaseUrl}/blogs/${id}`, newObj, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${apiBaseUrl}/blogs/${id}`, config);
  return response.data;
};

export default { getAll, getId, create, update, setToken, remove };
