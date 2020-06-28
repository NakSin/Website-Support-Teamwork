import React, { Component } from "react";
import "./component.css";

export default class Task extends Component {
  handleClickTask = () => {
    const infoTaskClick = {
      idTask: this.props.task.id,
      nameTask: this.props.task.nameTask,
      listId: this.props.task.listId,
      createdTask: this.props.task.created,
      detailTask: this.props.task.detail,
      loading: this.props.task.loading,
      label: this.props.task.label,
      dueDate: this.props.task.dueDate,
    };
    this.props.onTaskClick({ infoTaskClick });
  };

  render() {
    return (
      <div className="task bg-secondary" onClick={this.handleClickTask}>
        {this.props.task.label !== "" ? (
          <div
            className="label-task"
            style={{ backgroundColor: `${this.props.task.label}` }}
          ></div>
        ) : null}
        <div className="name-task">{this.props.task.nameTask}</div>
      </div>
    );
  }
}
