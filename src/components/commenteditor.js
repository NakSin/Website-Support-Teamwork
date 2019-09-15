import React, { Component } from "react";
import { load, create, edit, remove } from "../axiosfunction/commentFunc";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import "./component.css";
const { TextArea } = Input;
const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment-author">{props.comments.author}</div>
      <div className="comment-content">
        {props.comments.isEdit ? (
          <div>
            <TextArea
              className="w-50"
              defaultValue={props.comments.content}
              autoSize={true | false}
              onChange={props.onChangeEdit}
            />
            <Button
              type="primary"
              onClick={() => props.action(4, props.comments.commentId)}
            >
              SAVE
            </Button>
          </div>
        ) : (
          props.comments.content
        )}
      </div>
      <div className="comment-action">
        {props.userId !== props.comments.userId ? (
          <span onClick={() => props.action(0, props.comments.commentId)}>
            Reply
          </span>
        ) : null}
      </div>
      {props.userId === props.comments.userId ? (
        <div className="comment-action">
          <span onClick={() => props.action(1, props.comments.commentId)}>
            Edit
          </span>
          {props.comments.isDelete ? (
            <div>
              <span
                className="text-danger"
                onClick={() => props.delete(props.comments.commentId)}
              >
                Delete comment
              </span>
              <span onClick={() => props.action(5, props.comments.commentId)}>
                Cancel
              </span>
            </div>
          ) : (
            <span onClick={() => props.action(2, props.comments.commentId)}>
              Delete
            </span>
          )}{" "}
        </div>
      ) : null}
      {props.comments.isReply ? (
        <TextArea
          style={{ margin: "0 8px" }}
          className="w-50"
          placeholder="Typing your reply here..."
          autoSize={true | false}
        />
      ) : null}
    </div>
  );
};

export default class CommemtEditor extends Component {
  state = {
    content: "",
    comments: [],
    isReply: false,
    isEdit: false,
    isDelete: false,
    contentEdit: "",
  };

  componentDidMount = () => {
    const taskId = this.props.taskId;
    this.handleLoadComment(taskId);
  };

  handleLoadComment = (taskId) => {
    load(taskId).then((res) => {
      if (res) {
        for (var i = 0; i < res.length; i++) {
          let { comments, isReply, isEdit, isDelete } = this.state;
          const currentComment = comments;
          const nextComment = currentComment.concat([
            {
              commentId: res[i]._id,
              author: res[i].author,
              content: res[i].content,
              userId: res[i].userId,
              isReply: isReply,
              isEdit: isEdit,
              isDelete: isDelete,
            },
          ]);
          this.setState({ comments: nextComment });
        }
      }
    });
  };

  handleOnChangeComment = (e) => {
    this.setState({ content: e.target.value });
  };

  handleClickSend = () => {
    let { content } = this.state;
    let { taskId, userId, userName } = this.props;
    let infoComment = {
      taskId: taskId,
      author: userName,
      content: content,
      userId: userId,
    };
    create(infoComment).then(() => {
      load(infoComment.taskId).then((res) => {
        if (res) {
          let { comments, isReply, isEdit, isDelete } = this.state;
          const currentComment = comments;
          const nextComment = currentComment.concat([
            {
              commentId: res[res.length - 1]._id,
              author: infoComment.author,
              content: infoComment.content,
              userId: infoComment.userId,
              isReply: isReply,
              isEdit: isEdit,
              isDelete: isDelete,
            },
          ]);
          this.setState({ comments: nextComment });
        }
      });
    });
    this.setState({ content: "" });
  };

  handleChoiceAction = (action, commentId) => {
    let { comments, isEdit, isReply, isDelete } = this.state;
    let commentAction = comments;
    let currentReply = isReply;
    let currentEdit = isEdit;
    let currentDelete = isDelete;

    for (var i = 0; i < comments.length; i++) {
      if (commentId === comments[i].commentId) {
        if (action === 0 && !comments[i].isReply) {
          commentAction[i] = {
            ...commentAction[i],
            isReply: !currentReply,
            isEdit: currentEdit,
            isDelete: currentDelete,
          };
        } else if (action === 0 && comments[i].isReply) {
          commentAction[i] = {
            ...commentAction[i],
            isReply: currentReply,
          };
        } else if (action === 1 && !comments[i].isEdit) {
          commentAction[i] = {
            ...commentAction[i],
            isReply: currentReply,
            isEdit: !currentEdit,
            isDelete: currentDelete,
          };
        } else if ((action === 1 || action === 4) && comments[i].isEdit) {
          commentAction[i] = {
            ...commentAction[i],
            isEdit: currentEdit,
          };
          this.handleEditComment(comments[i].commentId);
        } else if (action === 2 && !comments[i].isDelete) {
          commentAction[i] = {
            ...commentAction[i],
            isReply: currentReply,
            isEdit: currentEdit,
            isDelete: !currentDelete,
          };
        } else if ((action === 2 || action === 5) && comments[i].isDelete) {
          commentAction[i] = {
            ...commentAction[i],
            isDelete: currentDelete,
          };
        }
      } else {
        commentAction[i] = {
          ...commentAction[i],
          isReply: currentReply,
          isEdit: currentEdit,
          isDelete: currentDelete,
        };
      }
      this.setState({
        isReply: currentReply,
        isEdit: currentEdit,
        isDelete: currentDelete,
      });
    }
  };

  handleOnChangeEditComment = (e) => {
    this.setState({ contentEdit: e.target.value });
  };

  handleEditComment = (commentId) => {
    const { taskId } = this.props;
    let { contentEdit } = this.state;
    if (contentEdit !== "") {
      edit(commentId, contentEdit).then(() => {
        this.setState({ comments: [] });
        this.handleLoadComment(taskId);
      });
    }
  };

  handleDeleteComment = (commentId, index) => {
    let { comments } = this.state;
    let currentComment = comments;
    currentComment.splice(index, 1);
    remove(commentId);
    this.setState({ comments: currentComment });
  };

  render() {
    const { content, comments } = this.state;
    const listComment = comments.map((currentComment, index) => {
      return (
        <Comment
          comments={currentComment}
          userId={this.props.userId}
          key={index}
          action={(action, commentId) =>
            this.handleChoiceAction(action, commentId)
          }
          onChangeEdit={this.handleOnChangeEditComment}
          edit={this.handleEditComment}
          delete={(commentId) => this.handleDeleteComment(commentId, index)}
        ></Comment>
      );
    });
    return (
      <div className="comment-editor">
        {listComment}
        <TextArea
          className="w-50"
          onChange={this.handleOnChangeComment}
          value={content}
          placeholder="Comment here..."
          autoSize={true | false}
        />
        <Button type="primary" onClick={this.handleClickSend}>
          Send
        </Button>
      </div>
    );
  }
}
