import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Menu } from "antd";
import { UserOutlined, VerticalRightOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

export default class Navbar extends Component {
  state = {
    userName: "",
  };

  UNSAFE_componentWillMount = () => {
    const userToken = localStorage.userToken;
    const decode = jwt_decode(userToken);
    this.setState({ userName: decode.name });
  };

  render() {
    return (
      <Menu style={{ backgroundColor: "gainsboro" }} mode="horizontal">
        <Menu.Item key="name" icon={<UserOutlined />}>
          <a
            href={"/"}
            target="_blank"
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={{ __html: " " }}
          ></a>
          Hello {this.state.userName} !
        </Menu.Item>
        <Menu.Item
          key="Back"
          icon={<VerticalRightOutlined />}
          style={{ float: "right" }}
          onClick={this.props.onPushPath}
        >
          <a
            href={"/"}
            target="_blank"
            rel="noopener noreferrer"
            dangerouslySetInnerHTML={{ __html: " " }}
          ></a>
        </Menu.Item>
      </Menu>
    );
  }
}
