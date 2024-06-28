import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async() => {
  const response = await axios.get(baseUrl);
  return response.data.sort((a,b) => b.likes - a.likes)
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
}

const update = async(newObj) => {
  const response = await axios.put(`${baseUrl}/${newObj.id}}`, newObj);
  return response.data;
}

const remove = async(id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

const getComment = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const getId = () => (100000 * Math.random()).toFixed(0)

const postComment = async (id, content) => {
  const object = { content, id: getId() }
  const response = await axios.post(`${baseUrl}/${id}/comments`, object)
  return response.data
}

export default { getAll, getId, create, update, setToken, remove, getComment, postComment };
