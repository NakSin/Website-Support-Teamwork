import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import { load, create, edit, remove, update } from "../axiosfunction/taskFunc";
import CreateTicket from "./createticket";
import CommentEditor from "./commenteditor";
import Ticket from "./ticket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faTasks,
  faComments,
  faTags,
  faClock,
  faPencilAlt,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Scrollbars } from "react-custom-scrollbars";
import "./component.css";

const DetailHeader = (props) => (
  <div className="task-detail-header bg-primary">
    <input
      className="input-name-task"
      defaultValue={props.nameTask}
      onChange={props.onChangeName}
    ></input>
    <div className="icon-button" onClick={props.onEditName}>
      <FontAwesomeIcon icon={faPencilAlt} />
    </div>
    <div className="icon-button" onClick={props.onTaskClick}>
      <FontAwesomeIcon icon={faTimesCircle} />
    </div>
  </div>
);

const DetailBody = (props) => (
  <div className="task-detail-body" onClick={props.onCreateDetail}>
    <div className="body-left">
      <div className="body-left-top">
        <span>Create On: {props.createdTask} </span>
        <span>Due Date: </span>
        <TextareaAutosize
          className="detail-area"
          placeholder="Description"
          defaultValue={props.detailTask}
          onChange={props.onChangeDetail}
        ></TextareaAutosize>
      </div>
      <div className="body-left-bottom">
        <FontAwesomeIcon style={{ width: "10%" }} icon={faTasks} />
        <span>Ticket </span>
        <div className="progress">
          <div className="loading" style={{ width: `${props.loading}%` }}></div>
        </div>
        <CreateTicket onCreateButton={props.onCreateButton}></CreateTicket>
        {props.ticket}
      </div>
    </div>
    <div className="body-right">
      <div className="card-feature">
        <FontAwesomeIcon
          style={{ position: "absolute", top: "26%", left: "0", width: "20%" }}
          icon={faTags}
        />
        Labels
      </div>
      <div className="card-feature">
        <FontAwesomeIcon
          style={{ position: "absolute", top: "26%", left: "0", width: "20%" }}
          icon={faClock}
        />
        Due Date
      </div>
      <div className="card-feature">
        <FontAwesomeIcon
          style={{ position: "absolute", top: "26%", left: "0", width: "20%" }}
          icon={faTrash}
        />
        Delete
      </div>
    </div>
  </div>
);

const DetailFooter = (props) => (
  <div className="task-detail-footer">
    <FontAwesomeIcon
      style={{ width: "10%", marginBottom: "20px", fontSize: "20px" }}
      icon={faComments}
    />
    <CommentEditor
      userId={props.userId}
      userName={props.userName}
      taskId={props.taskId}
    ></CommentEditor>
  </div>
);

export default class TaskDialog extends Component {
  state = {
    taskId: "",
    newName: "",
    isLoadName: true,
    isOnDetail: false,
    detail: "",
    detailTask: "",
    tickets: [],
    loading: 0,
  };

  componentDidMount = () => {
    this.setState({ taskId: this.props.infoTaskClick.idTask });
    this.setState({ detailTask: this.props.infoTaskClick.detailTask });
    this.setState({ loading: this.props.infoTaskClick.loading });
    this.handleLoadTaskDialog(this.props.infoTaskClick.idTask);
  };

  handleLoadTaskDialog = (taskId) => {
    load(taskId).then((res) => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          let { tickets } = this.state;
          const currentTicket = tickets;
          const nextTicket = currentTicket.concat([
            {
              id: res[i]._id,
              nameTicket: res[i].ticketname,
              checkDone: res[i].checkdone,
              taskId: res[i].taskId,
            },
          ]);
          this.setState({ tickets: nextTicket });
        }
      }
    });
  };

  handleChangeName = (e) => {
    this.setState({ newName: e.target.value });
  };

  handleEditName = () => {
    let { taskId, newName, isLoadName } = this.state;
    const type = "editName";
    edit(taskId, newName, type);
    this.props.editName({ isLoadName });
  };

  handleAddDetail = () => {
    let { isOnDetail } = this.state;
    const currentState = isOnDetail;
    this.setState({ isOnDetail: !currentState });
  };

  handleChangeDetail = (e) => {
    this.setState({ detail: e.target.value });
  };

  handleCreateDetail = () => {
    let { taskId, detail } = this.state;
    const type = "editDetail";
    edit(taskId, detail, type);
  };

  handleNameTicket = ({ name, check, created }) => {
    let { taskId } = this.state;
    let value = { name, check, created, taskId };
    create(value).then(() => {
      load(taskId).then((res) => {
        if (res) {
          let { tickets } = this.state;
          const currentTicket = tickets;
          const nextTicket = currentTicket.concat([
            {
              id: res[res.length - 1]._id,
              nameTicket: name,
              checkDone: check,
              taskId: created,
            },
          ]);
          this.setState({ tickets: nextTicket });
        }
      });
    });
  };

  handleRemoveTicket = (index) => {
    let { tickets } = this.state;
    let currentTicket = tickets;
    let deleteTicket = currentTicket[index].id;
    currentTicket.splice(index, 1);
    remove(deleteTicket);
    this.setState({ tickets: currentTicket });
  };

  handleLoading = ({ taskId, ticketId, currentState }) => {
    let { tickets } = this.state;
    tickets.forEach((ele) => {
      if (ele.id === ticketId) {
        ele.checkDone = !currentState;
      }
    });
    let ticketDone = 0;
    let progress = 100 / tickets.length;
    for (var i = 0; i < tickets.length; i++) {
      if (tickets[i].checkDone) {
        ticketDone = ticketDone + 1;
      }
    }
    this.setState({ loading: progress * ticketDone });
    update(taskId, progress * ticketDone);
  };

  render() {
    const { tickets, loading, detailTask } = this.state;
    const ticket = tickets.map((currentTicket, index) => {
      return (
        <Ticket
          ticket={currentTicket}
          key={index}
          onEditTicket={this.handleEditTicket}
          onRemoveTicket={() => this.handleRemoveTicket(index)}
          onLoading={this.handleLoading}
        ></Ticket>
      );
    });
    return (
      <div className="task-dialog">
        <div className="task-detail">
          <DetailHeader
            onTaskClick={this.props.onTaskClick}
            nameTask={this.props.infoTaskClick.nameTask}
            onChangeName={this.handleChangeName}
            onEditName={this.handleEditName}
          ></DetailHeader>
          <Scrollbars>
            <DetailBody
              onCreateDetail={this.handleCreateDetail}
              onChangeDetail={this.handleChangeDetail}
              ticket={ticket}
              onCreateButton={this.handleNameTicket}
              loading={loading}
              detailTask={detailTask}
              createdTask={this.props.infoTaskClick.createdTask}
            ></DetailBody>
            <hr></hr>
            <DetailFooter
              userId={this.props.userId}
              userName={this.props.userName}
              taskId={this.props.infoTaskClick.idTask}
            ></DetailFooter>
          </Scrollbars>
        </div>
      </div>
    );
  }
}
