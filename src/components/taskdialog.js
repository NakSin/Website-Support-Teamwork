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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "antd";
import "antd/dist/antd.css";
import "./component.css";

const DetailHeader = (props) => (
  <div className="task-detail-header bg-primary">
    <input
      className="input-name-task"
      defaultValue={props.nameTask}
      onChange={props.onChangeName}
      onClick={props.onEditName}
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
  <div className="task-detail-body">
    <div className="body-left">
      <div className="body-left-top">
        {props.label !== "" ? (
          <span>
            <div
              className="label"
              style={{ backgroundColor: `${props.label}` }}
              onClick={() => props.onClearLabel(props.label)}
            ></div>
          </span>
        ) : null}
        <span>Create On: {props.createdTask} </span>
        <span>Due Date: {props.dueDate.toUTCString()}</span>
        <TextareaAutosize
          className="detail-area"
          placeholder="Description"
          defaultValue={props.detailTask}
          onChange={props.onChangeDetail}
        ></TextareaAutosize>
        <Button type="primary" onClick={props.onCreateDetail}>
          Save Detail
        </Button>
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
      <div className="card-feature" onClick={() => props.onFeature(0)}>
        <FontAwesomeIcon
          style={{ position: "absolute", top: "26%", left: "0", width: "20%" }}
          icon={faTags}
        />
        Labels
      </div>
      <div className="card-feature" onClick={() => props.onFeature(1)}>
        <FontAwesomeIcon
          style={{ position: "absolute", top: "26%", left: "0", width: "20%" }}
          icon={faClock}
        />
        Due Date
      </div>
      <div className="card-feature" onClick={() => props.onFeature(2)}>
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
    isColor: false,
    label: "",
    isDueDate: false,
    dueDate: new Date(),
    isDelete: false,
  };

  componentDidMount = () => {
    this.setState({ taskId: this.props.infoTaskClick.idTask });
    this.setState({ detailTask: this.props.infoTaskClick.detailTask });
    this.setState({ loading: this.props.infoTaskClick.loading });
    this.setState({ label: this.props.infoTaskClick.label });
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
    let { taskId, tickets } = this.state;
    let currentTicket = tickets;
    let deleteTicket = currentTicket[index].id;
    if (index === 0) {
      currentTicket.shift();
    } else {
      currentTicket.splice(index, 1);
    }
    remove(deleteTicket).then(() => {
      this.setState({ tickets: [] });
      this.handleLoadTaskDialog(taskId);
    });
  };

  handleLoading = ({ ticketId, currentState }) => {
    let { taskId, tickets } = this.state;
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

  handleFeature = (action) => {
    let { isColor, isDueDate, isDelete } = this.state;
    if (action === 0) {
      let currentState = isColor;
      this.setState({ isColor: !currentState });
      this.setState({ isDueDate: false });
      this.setState({ isDelete: false });
    } else if (action === 1) {
      let currentState = isDueDate;
      this.setState({ isColor: false });
      this.setState({ isDueDate: !currentState });
      this.setState({ isDelete: false });
    } else if (action === 2) {
      let currentState = isDelete;
      this.setState({ isColor: false });
      this.setState({ isDueDate: false });
      this.setState({ isDelete: !currentState });
    }
  };

  handleColorLabel = (color) => {
    let { taskId, isColor } = this.state;
    const arrColor = ["#DC3545", "#FFC107", "#28A745"];
    const type = "editLabel";
    if (color === "red") {
      this.setState({ label: arrColor[0] });
      edit(taskId, arrColor[0], type);
    } else if (color === "yellow") {
      this.setState({ label: arrColor[1] });
      edit(taskId, arrColor[1], type);
    } else if (color === "green") {
      this.setState({ label: arrColor[2] });
      edit(taskId, arrColor[2], type);
    }
    let currentState = isColor;
    this.setState({ isColor: !currentState });
  };

  handleClearLabel = (color) => {
    let { taskId, label } = this.state;
    const type = "editLabel";
    if (label === color) {
      this.setState({ label: "" });
      edit(taskId, "", type);
    }
  };

  handleChange = (date) => {
    let { taskId, isDueDate } = this.state;
    let utcDate = date.toUTCString();
    const type = "editDueDate";
    this.setState({ dueDate: date });
    edit(taskId, utcDate, type).then(() => {
      let currentState = isDueDate;
      this.setState({ isDueDate: !currentState });
    });
  };

  render() {
    const {
      taskId,
      tickets,
      loading,
      detailTask,
      isColor,
      label,
      isDueDate,
      dueDate,
      isDelete,
    } = this.state;
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
            {isColor ? (
              <div className="label-container bg-light border border-primary">
                <div
                  className="bg-danger"
                  onClick={() => this.handleColorLabel("red")}
                ></div>
                <div
                  className="bg-warning"
                  onClick={() => this.handleColorLabel("yellow")}
                ></div>
                <div
                  className="bg-success"
                  onClick={() => this.handleColorLabel("green")}
                ></div>
              </div>
            ) : isDueDate ? (
              <div className="duedate-container">
                <DatePicker selected={dueDate} onChange={this.handleChange} />
              </div>
            ) : isDelete ? (
              <div className="delete-container">
                <Button onClick={() => this.props.onDeleteTask({ taskId })}>
                  Sure
                </Button>
                <Button onClick={() => this.handleFeature(2)}>Not Sure</Button>
              </div>
            ) : null}
            <DetailBody
              onCreateDetail={this.handleCreateDetail}
              onChangeDetail={this.handleChangeDetail}
              ticket={ticket}
              onCreateButton={this.handleNameTicket}
              loading={loading}
              detailTask={detailTask}
              createdTask={this.props.infoTaskClick.createdTask}
              onFeature={(action) => this.handleFeature(action)}
              onClearLabel={(action) => this.handleClearLabel(action)}
              label={label}
              dueDate={dueDate}
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
