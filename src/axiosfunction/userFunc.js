import axios from "axios";

export const signin = (user) => {
  return axios
    .post("http://localhost:5000/users/signin", user)
    .then((res) => {
      if (!res.data.error) {
        localStorage.setItem("userToken", res.data);
        return res;
      } else {
        return res;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signup = (newUser) => {
  return axios
    .post("http://localhost:5000/users/signup", {
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    })
    .then((res) => {
      if (res.data.error) {
        return res;
      } else {
        return res;
      }
    });
};
