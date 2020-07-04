import axios from "axios";

export const load = (boardId) => {
  return axios
    .get("http://localhost:5000/listsboard/" + boardId)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const create = (infoList) => {
  return axios
    .post("http://localhost:5000/listsboard/", infoList)
    .catch((err) => {
      console.log(err);
    });
};

export const remove = (listId) => {
  return axios
    .post("http://localhost:5000/listsboard/remove", { listId })
    .catch((err) => {
      console.log(err);
    });
};

export const removeTask = (taskId) => {
  return axios
    .delete("http://localhost:5000/listsboard/removeTask/" + taskId)
    .catch((err) => {
      console.log(err);
    });
};
