import React, { Component } from "react";
import Navbar from "./navbar";
import CreateDialogBoard from "./createdialogboard";
import {
  load,
  create,
  remove,
  manager,
  inside,
} from "../axiosfunction/boardFunc";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPlus, faStar } from "@fortawesome/free-solid-svg-icons";
import "./component.css";

import { Card } from "antd";
import "antd/dist/antd.css";

const Board = (props) => {
  return (
    <Card.Grid className="board bg-primary" hoverable style={{ width: 250 }}>
      <div className="board-cover" onClick={props.goInside}>
        {props.userId === props.board.usersjoin[0]._id ? (
          <FontAwesomeIcon
            style={{ fontSize: "18px", margin: "10px 10px" }}
            icon={faStar}
          />
        ) : null}
      </div>
      <div className="row mx-auto">
        <div className="col-sm-10 align-self-center">
          Name: {props.board.nameBoard}
        </div>
        {props.userId === props.board.usersjoin[0]._id ? (
          <div className="col-sm-2 text-center" style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{ fontSize: "18px", marginTop: "10px" }}
              icon={faTrash}
              onClick={props.remove}
            />
          </div>
        ) : null}
      </div>
      <div className="row mx-auto">
        <div className="col-sm-10 align-self-center">{props.board.created}</div>
        <div className="col-sm-2 text-center" style={{ zIndex: "2" }}>
          <FontAwesomeIcon
            style={{ fontSize: "18px", marginTop: "10px" }}
            icon={faUserPlus}
            onClick={props.managerUser}
          />
        </div>
      </div>
    </Card.Grid>
  );
};

export default class BoardList extends Component {
  state = {
    userId: "",
    isOnClick: false,
    boards: [],
  };

  UNSAFE_componentWillMount = () => {
    const userToken = localStorage.userToken;
    const decode = jwt_decode(userToken);
    this.setState({ userId: decode.id });
    this.handleLoadListBoard(decode.id);
  };

  handleLoadListBoard = (userId) => {
    load(userId).then((res) => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          const currentBoard = this.state.boards;
          const nextBoard = currentBoard.concat([
            {
              id: res[i]._id,
              nameBoard: res[i].boardname,
              ticket: res[i].ticket,
              created: res[i].created,
              usersjoin: res[i].usersjoin,
            },
          ]);
          this.setState({ boards: nextBoard });
        }
      }
    });
  };

  handlePushPath = () => {
    localStorage.removeItem("userToken");
    this.props.history.push("/");
  };

  handleShowDialogBoard = () => {
    this.setState({ isOnClick: true });
  };

  handleCloseDialogBoard = () => {
    this.setState({ isOnClick: false });
  };

  handleNameBoard = ({ name, ticket, created }) => {
    let { userId, boards } = this.state;
    let value = { name, ticket, created, userId };
    create(value).then(() => {
      load(userId).then((res) => {
        if (res) {
          const currentBoard = boards;
          const nextBoard = currentBoard.concat([
            {
              id: res[res.length - 1]._id,
              nameBoard: name,
              ticket: ticket,
              created: created,
              usersjoin: res[res.length - 1].usersjoin,
            },
          ]);
          this.setState({ boards: nextBoard });
        }
      });
      this.handleCloseDialogBoard();
    });
  };

  handleRemoveBoard = (index) => {
    let { boards } = this.state;
    const currentBoard = boards;
    const deleteBoard = currentBoard[index].id;
    currentBoard.splice(index, 1);
    remove(deleteBoard);
    this.setState({ boards: currentBoard });
  };

  handleManagerUser = (index) => {
    let { boards } = this.state;
    const currentBoard = boards;
    const nameBoard = currentBoard[index].nameBoard;
    const boardId = currentBoard[index].id;
    manager(boardId).then((res) => {
      if (res) {
        this.props.history.push("/manager/" + nameBoard.replace(/\s/g, ""));
      }
    });
  };

  handleGoInside = (index) => {
    let { boards } = this.state;
    const currentBoard = boards;
    const nameBoard = currentBoard[index].nameBoard;
    const boardId = currentBoard[index].id;
    inside(boardId).then((res) => {
      if (res) {
        this.props.history.push("/list/" + nameBoard.replace(/\s/g, ""));
      }
    });
  };

  render() {
    const { userId, boards, isOnClick } = this.state;
    const listBoard = boards.map((currentBoard, index) => {
      return (
        <Board
          userId={userId}
          board={currentBoard}
          key={index}
          remove={() => this.handleRemoveBoard(index)}
          managerUser={() => this.handleManagerUser(index)}
          goInside={() => this.handleGoInside(index)}
        ></Board>
      );
    });
    return (
      <div>
        <Navbar onPushPath={this.handlePushPath}></Navbar>
        <div className="row align-items-center mx-auto">
          <Card.Grid
            className="board bg-secondary"
            style={{ position: "relative", width: 220 }}
          >
            <div
              style={{ padding: "26px" }}
              onClick={this.handleShowDialogBoard}
            >
              <p className="p">Create new board...</p>
            </div>
            {isOnClick && (
              <CreateDialogBoard
                onCloseDialog={this.handleCloseDialogBoard}
                onCreateButton={this.handleNameBoard}
              ></CreateDialogBoard>
            )}
          </Card.Grid>
          {listBoard}
        </div>
      </div>
    );
  }
}
