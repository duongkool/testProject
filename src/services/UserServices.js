import axios from "./axios";

const fetchAllUser = (page) => {
  return axios.get(`users?page=${page}`);
};
const createUser = (name, job) => {
  return axios.post(`users`, { name, job });
};
const editUser = (name, job) => {
  return axios.post(`users`, { name, job });
};
const deleteUser = (id) => {
  return axios.delete(`users/${id}`);
};
const loginAPI = (email, password) => {
  return axios.post(`login`, { email, password });
};
export { fetchAllUser, createUser, editUser, deleteUser, loginAPI };
