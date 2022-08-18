import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;
let config;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  config = {
    headers: { Authorization: token },
  };
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  return axios.post(baseUrl, newObject, config);
};

const update = (newObject) => {
  return axios.put(`${baseUrl}/${newObject.id}`, newObject, config);
};

const remove = (Object) => {
  return axios.delete(`${baseUrl}/${Object.id}`, config);
};
export default {
  getAll,
  create,
  update,
  setToken,
  remove,
};
