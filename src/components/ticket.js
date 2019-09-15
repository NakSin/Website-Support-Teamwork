import React, { Component } from "react";
import { check, edit } from "../axiosfunction/ticketFunc";
import "./component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

export default class Ticket extends Component {
  constructor(props) {
    super(props);
    this.handleClickTicket = this.handleClickTicket.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleCheckDone = this.handleCheckDone.bind(this);
    this.handleRemoveTicket = this.handleRemoveTicket.bind(this);
    this.state = {
      taskId: "",
      ticketId: "",
      nameTicket: "",
      newName: "",
      isClick: false,
      check: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.setState({ taskId: this.props.ticket.taskId });
    this.setState({ ticketId: this.props.ticket.id });
    this.setState({ nameTicket: this.props.ticket.nameTicket });
    this.setState({ check: this.props.ticket.checkDone });
  }

  handleClickTicket() {
    let { ticketId, newName } = this.state;
    if (ticketId === this.props.ticket.id) {
      const currentState = this.state.isClick;
      this.setState({ isClick: !currentState });
    }
    if (newName !== "") {
      edit(ticketId, newName);
    }
  }

  handleChangeName(e) {
    this.setState({ newName: e.target.value });
  }

  handleCheckDone() {
    let { taskId, ticketId } = this.state;
    const currentState = this.state.check;
    this.setState({ check: !currentState });
    check(ticketId, !currentState);
    this.props.onLoading({ taskId, ticketId, currentState });
  }

  handleRemoveTicket() {
    this.props.onRemoveTicket();
  }

  render() {
    return (
      <div className="ticket">
        <input
          className="check"
          type="checkbox"
          checked={this.state.check}
          onChange={this.handleCheckDone}
        />
        {this.state.check ? (
          <input
            className="input-name-ticket"
            style={{ textDecoration: "line-through" }}
            value={this.state.nameTicket}
            onChange={this.handleChangeName}
            onClick={this.handleClickTicket}
          />
        ) : (
          <input
            className="input-name-ticket"
            value={this.props.ticket.nameTicket}
            onChange={this.handleChangeName}
            onClick={this.handleClickTicket}
          />
        )}
        {this.state.isClick ? (
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-sm btn-primary action"
              onClick={this.handleClickTicket}
            >
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faEdit} />
            </button>
            <button
              className="btn btn-sm btn-secondary action"
              onClick={this.handleRemoveTicket}
            >
              <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faTrash} />
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}
