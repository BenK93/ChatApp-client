import React, { PureComponent } from "react";
import last from "lodash/last";
import uniqBy from "lodash/uniqBy";
import isArray from "lodash/isArray";
import queryString from "query-string";

import "./chat-room-component.scss";
import HeaderComponent from "../header/header-component";
import LeftMenuComponent from "../left-menu/left-menu-component";
import MessageComponent from "../message/message-component";
import TextInputComponent from "../text-input-container/text-input-container";

export default class ChatRoomComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.setGlobalVariables();

    this.state = {
      messages: [
        {
          userName: this.roomName,
          content: `Hi ${this.userName}, welcome to chat!`,
        },
      ],
    };
  }

  setGlobalVariables() {
    const { userName, roomName } = queryString.parse(
      this.props.location.search
    );

    this.userName = userName;
    this.roomName = roomName;
    this.latestDate = new Date();
  }

  componentDidMount() {
    this.createRoom();

    this.interval = setInterval(this.getMessages, 1000);
  }

  componentDidUpdate(prevState) {
    const { messages: prevMessages } = prevState;
    const { messages: currentMessages } = this.state;

    if (prevMessages !== currentMessages) {
      this.scrollableElement.scrollTop = this.scrollableElement.scrollHeight;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createRoom() {
    const data = {
      roomName: this.roomName,
      userNames: [this.userName],
    };

    fetch("http://localhost:5000/rooms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  getMessages = async () => {
    const response = await fetch(
      `http://localhost:5000/rooms/messages/${this.roomName}/${this.latestDate}`
    );

    const newMessages = await response.json();

    if (newMessages.length === 0) return;

    this.latestDate = last(newMessages).date;

    this.addMessages(newMessages);
  };

  addMessages = (newMessages) => {
    newMessages = isArray(newMessages) ? newMessages : [newMessages];
    const { messages } = this.state;

    this.setState({
      messages: uniqBy([...messages, ...newMessages], "_id"),
    });
  };

  renderMessages() {
    const { messages } = this.state;

    return messages.map(this.renderMessage);
  }

  renderMessage = (message, index) => {
    const { userName, content } = message;

    return (
      <MessageComponent
        key={index}
        userName={userName}
        content={content}
        isSelf={this.userName === userName}
      />
    );
  };

  render() {
    return (
      <div className="chat-component">
        <div className="outer-chat-container">
          <div className="header-component-wrapper">
            <HeaderComponent />
          </div>

          <div className="inner-chat-container">
            <div className="left-menu-component-wrapper">
              <LeftMenuComponent roomName={this.roomName} />
            </div>

            <div className="inner-chat">
              <div
                id="messages-component-wrapper"
                ref={(element) => (this.scrollableElement = element)}
              >
                <div id="messages-container">{this.renderMessages()}</div>
              </div>

              <div className="text-component-wrapper">
                <TextInputComponent
                  userName={this.userName}
                  roomName={this.roomName}
                  addMessages={this.addMessages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
