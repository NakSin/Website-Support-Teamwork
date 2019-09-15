import React, { Component } from "react";
import Task from "./task";
import CreateTask from "./createtask";
import { Scrollbars } from "react-custom-scrollbars";
import { load, create, edit } from "../axiosfunction/listFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "./component.css";

export default class List extends Component {
  state = {
    isOnClick: false,
    isLoadName: false,
    newName: "",
    listId: "",
    tasks: [],
  };

  UNSAFE_componentWillUpdate = () => {
    let { tasks, isLoadName } = this.state;
    if (this.props.nameLoad) {
      load(this.props.list.id).then((res) => {
        for (var i = 0; i < res.length; i++) {
          let { listId } = this.state;
          if (res[i].listId === listId) {
            if (
              tasks[i].id === res[i]._id &&
              tasks[i].nameTask !== res[i].taskname
            ) {
              tasks[i].nameTask = res[i].taskname;
              this.props.editName({ isLoadName });
            }
          }
        }
      });
    }
  };

  UNSAFE_componentWillMount = () => {
    const listId = this.props.list.id;
    this.setState({ listId: listId });
    this.handleLoadList(listId);
  };

  handleLoadList = (listId) => {
    load(listId).then((res) => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          let { listId, tasks } = this.state;
          if (res[i].listId === listId) {
            const currentTask = tasks;
            const nextTask = currentTask.concat([
              {
                id: res[i]._id,
                nameTask: res[i].taskname,
                listId: res[i].listId,
                numberTicket: res[i].numberticket,
                created: res[i].created,
                detail: res[i].detail,
                ticketId: res[i].ticketId,
                loading: res[i].loading,
              },
            ]);
            this.setState({ tasks: nextTask });
          }
        }
      }
    });
  };

  handleHideInput = () => {
    let { isOnClick } = this.state;
    const currentState = isOnClick;
    this.setState({ isOnClick: !currentState });
  };

  handleChangeName = (e) => {
    this.setState({ newName: e.target.value });
  };

  handleEditName = () => {
    let { listId, newName } = this.state;
    edit(listId, newName);
  };

  handleNameTask = ({ name, numberTicket, created, detail, loading }) => {
    let listId = this.props.list.id;
    let { tasks } = this.state;
    let ticketId = [];
    let value = {
      name,
      numberTicket,
      created,
      listId,
      detail,
      ticketId,
      loading,
    };
    create(value).then(() => {
      load(listId).then((res) => {
        if (res) {
          for (var i = 0; i < 1; i++) {
            const currentTask = tasks;
            const nextTask = currentTask.concat([
              {
                id: res[res.length - 1]._id,
                nameTask: name,
                numberTicket: numberTicket,
                created: created,
                detail: detail,
                ticketId: ticketId,
                loading: loading,
              },
            ]);
            this.setState({ tasks: nextTask });
          }
        }
      });
      this.handleHideInput();
    });
  };

  handleChangeTask = ({ infoTaskClick }) => {
    let { listId } = this.state;
    load(listId).then((res) => {
      if (res) {
        let infoTask = infoTaskClick;
        for (var i = 0; i < res.length; i++) {
          if (res[i]._id === infoTaskClick.idTask) {
            if (res[i].detail !== infoTaskClick.detailTask) {
              infoTask.detailTask = res[i].detail;
              infoTask.loading = res[i].loading;
            }
          }
        }
        this.props.onTaskClick({ infoTask });
      }
    });
  };

  render() {
    const { tasks, isOnClick } = this.state;
    const task = tasks.map((currentTask, index) => {
      return (
        <Task
          task={currentTask}
          key={index}
          onTaskClick={this.handleChangeTask}
        ></Task>
      );
    });
    return (
      <div className="list">
        <div className="list-head bg-primary">
          <input
            className="input-name-list"
            defaultValue={this.props.list.nameList}
            onChange={this.handleChangeName}
          ></input>
          <div className="icon-button" onClick={this.handleEditName}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </div>
          <div className="icon-button" onClick={this.props.remove}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <Scrollbars
          style={{
            height: isOnClick ? "76%" : "90%",
          }}
        >
          <div className="task-wrapper bg-light">
            <CreateTask
              isOnClick={isOnClick}
              hideInput={this.handleHideInput}
              onCreateButton={this.handleNameTask}
            ></CreateTask>
            {task}
          </div>
        </Scrollbars>
      </div>
    );
  }
}
