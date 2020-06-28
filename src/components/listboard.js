import React, { Component } from "react";
import Navbar from "./navbar";
import CreateList from "./createlist";
import List from "./list";
import TaskDialog from "./taskdialog";
import {
  load,
  create,
  remove,
  removeTask,
} from "../axiosfunction/listboardFunc";
import jwt_decode from "jwt-decode";
import "./component.css";

export default class ListBoard extends Component {
  state = {
    isList: true,
    isOnClick: false,
    isTaskClick: false,
    isNameLoad: false,
    userId: "",
    userName: "",
    boardId: "",
    lists: [],
    tasks: {},
  };

  UNSAFE_componentWillMount = () => {
    const userToken = localStorage.userToken;
    const userDecode = jwt_decode(userToken);
    this.setState({ userId: userDecode.id });
    this.setState({ userName: userDecode.name });
    const boardToken = localStorage.boardToken;
    const boardDecode = jwt_decode(boardToken);
    this.setState({ boardId: boardDecode.id });
    this.handleLoadList(boardDecode.id);
  };

  handleLoadList = (boardId) => {
    load(boardId).then((res) => {
      if (res) {
        for (var i = 0; i < res.boardList.length; i++) {
          let { lists } = this.state;
          const currentList = lists;
          const nextList = currentList.concat([
            {
              id: res.boardList[i]._id,
              nameList: res.boardList[i].listname,
              numberTask: res.boardList[i].numbertask,
              created: res.boardList[i].created,
              taskId: res.boardList[i].taskId,
            },
          ]);
          this.setState({ lists: nextList });
        }
      }
    });
  };

  handlePushPath = () => {
    let { userName } = this.state;
    localStorage.removeItem("boardToken");
    this.props.history.push("/boards/" + userName);
  };

  handleHideInput = () => {
    let { isOnClick } = this.state;
    const currentState = isOnClick;
    this.setState({ isOnClick: !currentState });
  };

  handleShowDialog = ({ infoTask }) => {
    let { isTaskClick, boardId } = this.state;
    const currentState = isTaskClick;
    if (infoTask) {
      this.setState({ tasks: infoTask });
    } else {
      this.setState({ lists: [] });
      this.handleLoadList(boardId);
    }
    this.setState({ isTaskClick: !currentState });
  };

  handleNameList = ({ name, numberTask, created }) => {
    let { boardId, lists } = this.state;
    let value = { name, numberTask, created, boardId };
    create(value).then(() => {
      load(boardId).then((res) => {
        if (res) {
          const currentList = lists;
          const nextList = currentList.concat([
            {
              id: res.boardList[res.boardList.length - 1]._id,
              nameList: name,
              numberTask: numberTask,
              created: created,
            },
          ]);
          this.setState({ lists: nextList });
        }
      });
      this.handleHideInput();
    });
  };

  handleRemoveList = (index) => {
    let { lists, boardId } = this.state;
    const currentList = lists;
    const deleteList = currentList[index].id;
    currentList.splice(index, 1);
    remove(deleteList).then(() => {
      if (currentList !== null) {
        this.setState({ lists: [] });
        this.handleLoadList(boardId);
      }
    });
    this.setState({ lists: currentList });
  };

  handleEditLoad = ({ isLoadName }) => {
    if (isLoadName) {
      this.setState({ isNameLoad: isLoadName });
    } else {
      this.setState({ isNameLoad: isLoadName });
    }
  };

  handleDeleteTask = ({ taskId }) => {
    let { boardId, lists, isTaskClick } = this.state;
    const currentList = lists;
    let currentState = isTaskClick;
    this.setState({ isTaskClick: !currentState });
    removeTask(taskId).then(() => {
      if (currentList !== null) {
        this.setState({ lists: [] });
        this.handleLoadList(boardId);
      }
    });
  };

  render() {
    const {
      lists,
      isNameLoad,
      isList,
      isTaskClick,
      tasks,
      userId,
      userName,
      isOnClick,
    } = this.state;
    const list = lists.map((currentList, index) => {
      return (
        <List
          list={currentList}
          key={index}
          nameLoad={isNameLoad}
          editName={this.handleEditLoad}
          remove={() => this.handleRemoveList(index)}
          onTaskClick={this.handleShowDialog}
        ></List>
      );
    });
    return (
      <div>
        <Navbar onPushPath={this.handlePushPath} isList={isList}></Navbar>
        <div className="list-container">
          {isTaskClick ? (
            <div>
              <div className="cover" onClick={this.handleShowDialog}></div>
              <TaskDialog
                onTaskClick={this.handleShowDialog}
                onDeleteTask={this.handleDeleteTask}
                infoTaskClick={tasks}
                editName={this.handleEditLoad}
                userId={userId}
                userName={userName}
              ></TaskDialog>
            </div>
          ) : null}
          <div className="list-wrapper">
            <div className="list-item bg-white">
              {list}
              <CreateList
                isOnClick={isOnClick}
                hideInput={this.handleHideInput}
                onCreateButton={this.handleNameList}
              ></CreateList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
