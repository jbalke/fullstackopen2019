import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = () => axios.get(BASE_URL).then(response => response.data);

const create = newPerson =>
  axios.post(BASE_URL, newPerson).then(response => response.data);

const update = (id, newPerson) =>
  axios.put(`${BASE_URL}/${id}`, newPerson).then(response => response.data);

const remove = id =>
  axios.delete(`${BASE_URL}/${id}`).then(response => response.data);

export default { getAll, create, update, remove };
