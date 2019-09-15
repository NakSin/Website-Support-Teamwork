import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default class CreateDialogBoard extends Component {
  state = {
    name: "",
    ticket: 0,
    created: "",
  };

  handleChangeName = (e) => {
    let created = new Date();
    this.setState({ name: e.target.value });
    this.setState({
      created:
        created.getHours() +
        ":" +
        created.getMinutes() +
        " - " +
        created.getDate() +
        "/" +
        (created.getMonth() + 1) +
        "/" +
        created.getFullYear(),
    });
  };

  handleCreateButton = (e) => {
    e.preventDefault();
    let { name, ticket, created } = this.state;
    if (name != null) {
      this.props.onCreateButton({ name, ticket, created });
      this.setState({ name: "" });
      this.setState({ created: "" });
    }
  };

  render() {
    return (
      <div className="create-dialog-board">
        <div className="create-dialog-container">
          <form className="form-group">
            <div className="row my-2">
              <div className="col-sm-12 text-center text-uppercase font-weight-bolder">
                Create board
              </div>
            </div>
            <p>
              <input
                className="form-control"
                type="text"
                placeholder="What the name of board"
                onChange={this.handleChangeName}
              />
            </p>
            <p>
              <FontAwesomeIcon
                style={{ color: "#ed6c5a", marginRight: "5px" }}
                icon={faLock}
              ></FontAwesomeIcon>
              This board will be <b>private</b>
            </p>
            <hr className="my-2" />
            <div className="footer">
              <button
                className="btn btn-sm btn-outline-primary text-uppercase font-weight-bolder"
                onClick={this.handleCreateButton}
              >
                Create
              </button>
              <button
                className="btn btn-sm btn-outline-secondary text-uppercase font-weight-bolder float-right"
                onClick={this.props.onCloseDialog}
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
