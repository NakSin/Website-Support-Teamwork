import React, { Component } from "react";
import { load, remove, send } from "../axiosfunction/managerFunc";
import AddMember from "./addmember";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUserPlus,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./component.css";

const MembersList = (props) => (
  <tbody>
    {props.member.role === "Board Master" ? (
      <tr>
        <td>{props.member.name}</td>
        <td>{props.member.email}</td>
        <td>{props.member.role}</td>
        <td>{props.member.datejoin}</td>
        <td>
          <button
            className="btn btn-dark btn-sm"
            style={{ visibility: "hidden" }}
            onClick={props.remove}
          >
            Remove
          </button>
        </td>
      </tr>
    ) : (
      <tr>
        <td>{props.member.name}</td>
        <td>{props.member.email}</td>
        <td>{props.member.role}</td>
        <td>{props.member.datejoin}</td>
        <td>
          {props.isMaster ? (
            <button className="btn btn-dark btn-sm" onClick={props.remove}>
              Remove
            </button>
          ) : (
            <button
              className="btn btn-dark btn-sm"
              style={{ visibility: "hidden" }}
              onClick={props.remove}
            >
              Remove
            </button>
          )}
        </td>
      </tr>
    )}
  </tbody>
);

export default class ManagerUser extends Component {
  state = {
    userName: "",
    boardId: "",
    nameBoard: "",
    isMaster: false,
    isOnClick: false,
    membersjoin: [],
  };

  UNSAFE_componentWillMount = () => {
    const token = localStorage.boardToken;
    const decode = jwt_decode(token);
    const userInfo = localStorage.userToken;
    const userdecode = jwt_decode(userInfo);
    this.setState({ boardId: decode.id });
    this.setState({ nameBoard: decode.name });
    this.handleLoadUser(decode.id, userdecode.id);
  };

  handleLoadUser = (boardId, userdecode) => {
    load(boardId, userdecode).then((res) => {
      if (res) {
        if (res.statusText === "Master") {
          this.setState({ isMaster: true });
        }
        for (var i = 0; i < res.data.length; i++) {
          let { membersjoin } = this.state;
          const currentMember = membersjoin;
          const nextMember = currentMember.concat([
            {
              id: res.data[i].id,
              name: res.data[i].name,
              email: res.data[i].email,
              role: res.data[i].role,
              datejoin: res.data[i].datejoin,
            },
          ]);
          this.setState({ membersjoin: nextMember });
        }
      }
    });
  };

  handlePushPath = (e) => {
    e.preventDefault();
    localStorage.removeItem("userToken");
    this.props.history.push("/");
  };

  handleBackBoard = (e) => {
    e.preventDefault();
    this.props.history.push("/boards");
  };

  handleShowMemberList = () => {
    this.setState({ isOnClick: false });
  };

  handleRemove = (index) => {
    let { membersjoin, boardId } = this.state;
    const currentMember = membersjoin;
    const removeMember = currentMember[index].id;
    currentMember.splice(index, 1);
    const member = {
      id: removeMember,
      boardId: boardId,
    };
    remove(member);
    this.setState({ membersjoin: currentMember });
  };

  handleShowAddMember = () => {
    this.setState({ isOnClick: true });
  };

  handleSendInvite = ({ email }) => {
    let { boardId } = this.state;
    const member = {
      email: email,
      boardId: boardId,
    };
    send(member);
  };

  render() {
    const { membersjoin, isMaster, isOnClick } = this.state;
    const listMember = membersjoin.map((currentMember, index) => {
      return (
        <MembersList
          remove={() => this.handleRemove(index)}
          isMaster={isMaster}
          member={currentMember}
          key={index}
        ></MembersList>
      );
    });
    return (
      <div className="position-relative" style={{ overflow: "hidden" }}>
        <div className="manager-cover">
          <div className="text-center row">
            <div className="manager-avatar">
              <FontAwesomeIcon
                style={{ fontSize: "20px", marginTop: "5px" }}
                icon={faUsers}
              />
            </div>
          </div>
          <div className="text-center row" style={{ marginTop: "5px" }}>
            <h3 style={{ color: "white", margin: "auto" }}>Members area</h3>
          </div>
          <div className="text-center" style={{ marginTop: "5px" }}>
            <div className="btn-group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-primary btn-sm button"
                onClick={this.handleShowMemberList}
              >
                <FontAwesomeIcon icon={faUsers} />
                <span> Members in Board</span>
              </button>
              {isMaster ? (
                <button
                  type="button"
                  className="btn btn-primary btn-sm button"
                  onClick={this.handleShowAddMember}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span> Add Member</span>
                </button>
              ) : null}
              <button
                type="button"
                className="btn btn-primary btn-sm button"
                onClick={this.handleBackBoard}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span> Back</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          {!isOnClick ? (
            <table className="table table-bordered table-hover">
              <thead className="thead-light">
                <tr>
                  <th>User Name</th>
                  <th>Email User</th>
                  <th>Role</th>
                  <th>Date Join</th>
                  <th>Action</th>
                </tr>
              </thead>
              {listMember}
            </table>
          ) : (
            <AddMember onSend={this.handleSendInvite}></AddMember>
          )}
        </div>
      </div>
    );
  }
}
