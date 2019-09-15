import axios from "axios";

export const load = (boardId, userId) => {
  return axios
    .get("http://localhost:5000/manager/" + boardId)
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].id === userId && res.data[i].role === "Board Master") {
          res.statusText = "Master";
        }
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const remove = (member) => {
  return axios
    .post("http://localhost:5000/manager/remove", member)
    .catch((err) => {
      console.log(err);
    });
};

export const send = (member) => {
  return axios
    .post("http://localhost:5000/manager/add", member)
    .catch((err) => {
      console.log(err);
    });
};
