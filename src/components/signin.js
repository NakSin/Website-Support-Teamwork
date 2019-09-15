import React, { Component } from "react";
import { signin } from "../axiosfunction/userFunc";
import "./component.css";
import jwt_decode from "jwt-decode";

export default class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleRouteSingUp = (e) => {
    e.preventDefault();
    let path = "/signup";
    this.props.history.push(path);
  };

  handleOnChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleOnChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    const user = {
      email: email,
      password: password,
    };

    signin(user).then((res) => {
      if (!res.data.error) {
        const userToken = localStorage.userToken;
        const decode = jwt_decode(userToken);
        this.props.history.push("/boards/" + decode.name);
      } else {
        this.setState({ error: res.data.error });
      }
    });

    this.setState({
      email: "",
      password: "",
    });
  };

  handleClearError = () => {
    this.setState({ error: "" });
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                {error != null ? (
                  <h6 className="text-center text-danger">{error}</h6>
                ) : null}
                <form onSubmit={this.handleOnSubmit} className="form-signin">
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      autoComplete="off"
                      onChange={this.handleOnChangeEmail}
                      onClick={this.handleClearError}
                      value={email}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.handleOnChangePassword}
                      onClick={this.handleClearError}
                      value={password}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>
                  <button
                    className="btn btn-lg btn-outline-primary text-uppercase"
                    type="submit"
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-lg btn-outline-secondary text-uppercase float-right"
                    onClick={this.handleRouteSingUp}
                  >
                    Sign up
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
