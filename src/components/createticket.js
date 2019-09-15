import React, { Component } from "react";
import "./component.css";

export default class CreateTicket extends Component {
  constructor(props) {
    super(props);
    this.handleAddTicket = this.handleAddTicket.bind(this);
    this.handleOnChangeTicket = this.handleOnChangeTicket.bind(this);
    this.handleCreateButton = this.handleCreateButton.bind(this);
    this.state = {
      isAddTicket: false,
      name: "",
      check: false,
      created: ""
    };
  }

  handleAddTicket() {
    const currentState = this.state.isAddTicket;
    this.setState({ isAddTicket: !currentState });
  }

  handleOnChangeTicket(e) {
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
        created.getFullYear()
    });
  }

  handleCreateButton(e) {
    e.preventDefault();
    let { name, check, created } = this.state;
    if (name != null) {
      this.props.onCreateButton({ name, check, created });
      this.setState({ name: "" });
      this.setState({ check: false });
      this.setState({ created: "" });
      this.handleAddTicket();
    }
  }

  render() {
    return (
      <div className="ticket">
        <input
          className="input-name-ticket"
          placeholder="Add new Ticket"
          value={this.state.name}
          onChange={this.handleOnChangeTicket}
          onClick={this.handleAddTicket}
        />
        {this.state.isAddTicket ? (
          <div style={{ width: "30%" }}>
            <button
              className="btn btn-primary action"
              onClick={this.handleCreateButton}
            >
              CREATE
            </button>
            <button
              className="btn btn-secondary action"
              onClick={this.handleAddTicket}
            >
              CANCEL
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
