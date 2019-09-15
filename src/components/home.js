import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
          <div className="collapase navbar-collapase">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="users/signin" className="nav-link">
                  Sign In
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="users/signup" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
