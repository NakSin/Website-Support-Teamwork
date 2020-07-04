import React, { Component } from "react";
import reqwest from "reqwest";
import { load } from "../axiosfunction/commentFunc";
import "antd/dist/antd.css";
import { List, Avatar, Button, Skeleton } from "antd";
// const count = 6;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

export default class CommentReply extends Component {
  state = {
    initLoading: true,
    loading: false,
    commentsReply: [],
    list: [],
  };

  componentDidMount() {
    // this.getData((res) => {
    //   this.setState({
    //     initLoading: false,
    //     data: res.results,
    //     list: res.results,
    //   });
    // });
    const taskId = this.props.taskId;
    this.handleLoadComment(taskId);
  }

  handleLoadComment = (taskId) => {
    load(taskId).then((res) => {
      if (res) {
        console.log(res);
        // for (var i = 0; i < res.length; i++) {
        //   let { comments } = this.state;
        //   const currentComment = comments;
        //   const nextComment = currentComment.concat([
        //     {
        //       commentId: res[i]._id,
        //       author: res[i].author,
        //       content: res[i].content,
        //       userId: res[i].userId,
        //       // isReply: isReply,
        //       // isEdit: isEdit,
        //       // isDelete: isDelete,
        //     },
        //   ]);
        //   this.setState({ comments: nextComment });
        // }
      }
    });
  };

  // getData = (callback) => {
  //   reqwest({
  //     url: fakeDataUrl,
  //     type: "json",
  //     method: "get",
  //     contentType: "application/json",
  //     success: (res) => {
  //       callback(res);
  //     },
  //   });
  // };

  onLoadMore = () => {
    this.setState({
      loading: true,
      list: this.state.data.concat(
        [...new Array(3)].map(() => ({ loading: true, name: {} }))
      ),
    });

    // this.getData((res) => {
    //   const data = this.state.data.concat(res.results);
    //   this.setState(
    //     {
    //       data,
    //       list: data,
    //       loading: false,
    //     },
    //     () => {
    //       window.dispatchEvent(new Event("resize"));
    //     }
    //   );
    // });
  };

  render() {
    const { initLoading, loading, list } = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: "center",
            marginTop: 12,
            height: 32,
            lineHeight: "32px",
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title="Author"
                description={this.props.comments[0].content}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}
