import axios from "axios";

export const load = (taskId) => {
  return axios
    .get("http://localhost:5000/comments/" + taskId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create = (infoComment) => {
  return axios
    .post("http://localhost:5000/comments/", infoComment)
    .catch((err) => {
      console.log(err);
    });
};

export const edit = (commentId, newContent) => {
  return axios
    .post("http://localhost:5000/comments/edit/" + commentId, { newContent })
    .catch((err) => {
      console.log(err);
    });
};

export const remove = (commentId) => {
  return axios
    .post("http://localhost:5000/comments/delete/" + commentId)
    .catch((err) => {
      console.log(err);
    });
};
