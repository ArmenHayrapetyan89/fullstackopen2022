import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const updateVotes = async (object) => {
  const newObject = {
    content: object.content,
    votes: object.votes + 1,
    id: object.id,
  };

  const response = await axios.put(`${baseUrl}/${object.id}`, newObject);

  return response.data;
};

export default {
  getAll,
  createNew,
  updateVotes,
};
