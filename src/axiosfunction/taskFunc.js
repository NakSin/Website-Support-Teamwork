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

export const create = (infoTicket) => {
  return axios.post("http://localhost:5000/tasks/", infoTicket).catch((err) => {
    console.log(err);
  });
};

export const remove = (ticketId) => {
  return axios
    .post("http://localhost:5000/tasks/remove", { ticketId })
    .catch((err) => {
      console.log(err);
    });
};

export const edit = (taskId, description, type) => {
  return axios
    .post("http://localhost:5000/tasks/edit/" + taskId, { description, type })
    .catch((err) => {
      console.log(err);
    });
};

export const update = (taskId, loading) => {
  return axios
    .post("http://localhost:5000/tasks/loading/" + taskId, { loading })
    .catch((err) => {
      console.log(err);
    });
};
