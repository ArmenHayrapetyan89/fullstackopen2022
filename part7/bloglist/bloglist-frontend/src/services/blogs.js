import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  };

  const newObject = {
    title,
    author,
    url,
  };

  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const newBlog = { ...blog, likes: blog.likes + 1 };

  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog, config);
  return response.data;
};

const deleteObject = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);

  return response.data;
};

export default { getAll, setToken, create, update, deleteObject };
