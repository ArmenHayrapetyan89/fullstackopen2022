import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);

  console.log("CREATE: ", response.data);
  return response.data;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAll, setToken, create };