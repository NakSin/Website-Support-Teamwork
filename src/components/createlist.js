import React, { Component } from "react";
import "./component.css";

export default class CreateList extends Component {
  state = {
    name: "",
    numberTask: 0,
    created: "",
  };

  handleChangeName = (e) => {
    let created = new Date();
    this.setState({ name: e.target.value });
    this.setState({ numberTask: 0 });
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
    let { name, numberTask, created } = this.state;
    if (name != null) {
      this.props.onCreateButton({ name, numberTask, created });
      this.setState({ name: "" });
      this.setState({ numberTask: 0 });
      this.setState({ created: "" });
    }
  };

  handleClearInput = () => {
    let { name } = this.state;
    if (name != null) {
      this.setState({ name: "" });
    }
    this.props.hideInput();
  };

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <div
          className="create-new"
          style={{
            display: this.props.isOnClick ? "none" : "inline-block",
            margin: "0 5px",
          }}
          onClick={this.props.hideInput}
        >
          Create new list here
        </div>
        {this.props.isOnClick ? (
          <div className="input-create-new">
            <input
              className="input-list"
              placeholder="Write name of new list..."
              onChange={this.handleChangeName}
            />
            <div className="button-action">
              <button
                className="btn btn-sm btn-outline-primary action-button"
                onClick={this.handleCreateButton}
              >
                CREATE
              </button>
              <button
                className="btn btn-sm btn-outline-secondary action-button"
                onClick={this.handleClearInput}
              >
                CANCEL
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
