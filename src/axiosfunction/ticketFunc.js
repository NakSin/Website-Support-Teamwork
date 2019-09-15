import axios from "axios";

export const load = (taskId) => {
  return axios
    .get("http://localhost:5000/tasks/" + taskId)
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

export const check = (ticketId, check) => {
  return axios
    .post("http://localhost:5000/tickets/check/" + ticketId, { check })
    .catch((err) => {
      console.log(err);
    });
};

export const remove = (taskId) => {
  return axios.delete("http://localhost:5000/lists/" + taskId).catch((err) => {
    console.log(err);
  });
};

export const edit = (ticketId, newName) => {
  return axios
    .post("http://localhost:5000/tickets/edit/" + ticketId, { newName })
    .catch((err) => {
      console.log(err);
    });
};
