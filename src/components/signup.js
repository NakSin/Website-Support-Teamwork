import React, { Component } from "react";
import "./component.css";
import { signup } from "../axiosfunction/userFunc";

export default class SignUp extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    error: "",
  };

  handleRouteSingIn = (e) => {
    e.preventDefault();
    let path = "/";
    this.props.history.push(path);
  };

  handleOnChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleOnChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    let { name, email, password } = this.state;
    if (name !== "" && email !== "" && password !== "") {
      var reg = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
      var test = reg.test(password);
      if (test) {
        const user = {
          name: name,
          email: email,
          password: password,
        };
        signup(user).then((res) => {
          if (!res.data.error) {
            let path = "/";
            this.props.history.push(path);
          } else {
            this.setState({ error: res.data.error });
          }
        });
      } else {
        this.setState({ error: "Password very weak" });
      }
    } else {
      this.setState({ error: "Need to Fill all Field" });
    }

    this.setState({
      name: "",
      email: "",
      password: "",
    });
  };

  handleClearError = () => {
    this.setState({ error: "" });
  };

  render() {
    const { name, email, password, error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign Up</h5>
                {error != null ? (
                  <h6 className="text-center text-danger">{error}</h6>
                ) : null}
                <form onSubmit={this.handleOnSubmit} className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="text"
                      id="inputName"
                      className="form-control"
                      placeholder="Your name"
                      required
                      autoFocus
                      autoComplete="off"
                      value={name}
                      onChange={this.handleOnChangeName}
                      onClick={this.handleClearError}
                    />
                    <label htmlFor="inputName">Name</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoComplete="off"
                      value={email}
                      onChange={this.handleOnChangeEmail}
                      onClick={this.handleClearError}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      title="Password should look like this @Abcdefg"
                      required
                      value={password}
                      onChange={this.handleOnChangePassword}
                      onClick={this.handleClearError}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-outline-primary text-uppercase"
                    type="submit"
                  >
                    Register
                  </button>

                  <button
                    className="btn btn-lg btn-outline-secondary text-uppercase float-right"
                    onClick={this.handleRouteSingIn}
                  >
                    Sign in
                  </button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
