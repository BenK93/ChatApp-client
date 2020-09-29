import React, { PureComponent } from "react";
import uniqBy from "lodash/uniqBy";
import queryString from "query-string";
import io from "socket.io-client";

import "./chat-room-component.scss";
import HeaderComponent from "../header/header-component";
import LeftMenuComponent from "../left-menu/left-menu-component";
import MessageComponent from "../message/message-component";
import TextInputComponent from "../text-input-container/text-input-container-component";

const END_POINT = "http://100.24.236.188";
let socket = io(END_POINT);

class ChatRoomComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.setGlobalVariables();

    this.state = {
      // Starting with a welcome message from the room.
      messages: [
        {
          userName: this.roomName,
          content: `Hi ${this.userName}, welcome to chat!`,
          date: new Date(),
        },
      ],
      // Creating a initial room with this username.
      room: {
        roomName: this.roomName,
        userNames: [this.userName],
      },
    };
  }

  /**
   * Setting the global variables from the location.search parameters.
   */
  setGlobalVariables() {
    const { userName, roomName } = queryString.parse(
      this.props.location.search
    );

    this.userName = userName;
    this.roomName = roomName;
    this.joinDate = new Date();
  }

  componentDidMount() {
    this.createRoom();
    window.onbeforeunload = (event) => {
      event.preventDefault();
      this.removeUser();
    };
    socket.on("user joined", this.AddNewUserMessage);
    socket.on("message sent", this.getMessage);
  }

  componentDidUpdate(prevState) {
    const { messages: prevMessages } = prevState;
    const { messages: currentMessages } = this.state;

    if (prevMessages !== currentMessages) {
      this.scrollableElement.scrollTop = this.scrollableElement.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.removeUser();
    socket.off("message sent", this.getMessage);
    socket.off("user joined", this.AddNewUserMessage);
  }

  /**
   * Creating or getting a room from server.
   */
  async createRoom() {
    console.log("in create room");
    const data = {
      roomName: this.roomName,
      userName: this.userName,
    };

    const response = await fetch(`${END_POINT}/rooms/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const room = await response.json();

    this.setState({ room });
  }

  // With socket.io implementation:
  getMessage = (message) => {
    this.addMessage(message);
  };

  addMessage = (message) => {
    const { messages } = this.state;
    this.setState({
      messages: uniqBy([...messages, message], "_id"),
    });
  };

  AddNewUserMessage = (data) => {
    if (this.userName === data.userName || this.roomName !== data.roomName)
      return;

    const message = {
      userName: data.userName,
      content: `${data.userName} joined the room!`,
      date: new Date(),
    };

    this.setState({
      messages: uniqBy([...this.state.messages, message], "content"),
    });
  };

  removeUser = async () => {
    await fetch(`${END_POINT}/rooms/removeUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomName: this.roomName,
        userName: this.userName,
      }),
    });
  };

  renderMessages() {
    const { messages } = this.state;

    return messages.map(this.renderMessage);
  }

  renderMessage = (message, index) => {
    return (
      <MessageComponent
        key={index}
        message={message}
        isSelf={this.userName === message.userName}
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
              <LeftMenuComponent
                room={this.state.room}
                userName={this.userName}
                socket={socket}
              />
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export { ChatRoomComponent, socket };
