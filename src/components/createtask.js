import React, { Component } from "react";
import "./component.css";

export default class CreateTask extends Component {
  constructor(props) {
    super(props);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.handleClearInput = this.handleClearInput.bind(this);
    this.state = {
      name: "",
      numberTicket: 0,
      created: "",
      detail: "",
      loading: 0,
    };
  }

  handleChangeName(e) {
    let created = new Date();
    this.setState({ name: e.target.value });
    this.setState({ numberTicket: 0 });
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
    this.setState({ detail: "Add Detail..." });
    this.setState({ loading: 0 });
  }

  handleCreateButton(e) {
    e.preventDefault();
    let { name, numberTicket, created, detail, loading } = this.state;
    if (name != null) {
      this.props.onCreateButton({
        name,
        numberTicket,
        created,
        detail,
        loading,
      });
      this.setState({ name: "" });
      this.setState({ numberTicket: 0 });
      this.setState({ created: "" });
      this.setState({ detail: "" });
      this.setState({ loading: 0 });
    }
  }

  handleClearInput() {
    if (this.state.name != null) {
      this.setState({ name: "" });
    }
    this.props.hideInput();
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <div
          className="create-new"
          style={{
            display: this.props.isOnClick ? "none" : "inline-block",
            margin: "5px 15px 5px 10px",
            width: "245px",
          }}
          onClick={this.props.hideInput}
        >
          Create new task here
        </div>
        {this.props.isOnClick ? (
          <div className="input-create-new ">
            <input
              className="input-task"
              placeholder="Write name of new task..."
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
