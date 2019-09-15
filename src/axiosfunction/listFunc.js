import axios from "axios";

export const load = (listId) => {
  return axios
    .get("http://localhost:5000/lists/" + listId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create = (infoTask) => {
  return axios.post("http://localhost:5000/lists/", infoTask).catch((err) => {
    console.log(err);
  });
};

export const edit = (listId, newName) => {
  return axios
    .post("http://localhost:5000/lists/edit/" + listId, { newName })
    .catch((err) => {
      console.log(err);
    });
};
