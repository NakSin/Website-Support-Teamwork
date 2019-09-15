import axios from "axios";

export const load = userId => {
  return axios
    .get("http://localhost:5000/boards/" + userId)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const create = infoBoard => {
  return axios.post("http://localhost:5000/boards/", infoBoard).catch(err => {
    console.log(err);
  });
};

export const remove = boardId => {
  return axios.delete("http://localhost:5000/boards/" + boardId).catch(err => {
    console.log(err);
  });
};

export const manager = boardId => {
  return axios
    .get("http://localhost:5000/boards/token/" + boardId)
    .then(res => {
      localStorage.setItem("boardToken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const inside = boardId => {
  return axios
    .get("http://localhost:5000/boards/token/" + boardId)
    .then(res => {
      localStorage.setItem("boardToken", res.data);
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
