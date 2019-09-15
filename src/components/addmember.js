import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default class AddMember extends Component {
  state = {
    email: "",
  };

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  handleSendEmail = (e) => {
    e.preventDefault();
    let { email } = this.state;
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email != null && re.test(String(email).toLowerCase())) {
      this.props.onSend({ email });
      alert("Add Success");
    } else {
      alert("Wrong Email");
    }
    this.setState({ email: "" });
    window.location.reload(true);
  };

  render() {
    const { email } = this.state;
    return (
      <div>
        <form className="d-flex justify-content-center">
          <div className="form-inline" style={{ marginTop: "30px" }}>
            <input
              type="text"
              className="to_gray addMember form-control"
              placeholder="Make Sure Email Correct"
              onChange={this.handleChangeEmail}
              value={email}
            />
            <button
              className="btn btn-dark btn-sm"
              style={{
                marginLeft: "5px",
              }}
              onClick={this.handleSendEmail}
            >
              <FontAwesomeIcon style={{ fontSize: "15px" }} icon={faPlus} />
            </button>
          </div>
        </form>
      </div>
    );
  }
}
