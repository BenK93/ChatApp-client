import React, { PureComponent } from "react";
import uniq from "lodash/uniq";

import "./left-menu-component.scss";
import { socket } from "../chat-room/chat-room-component";

export default class LeftMenuComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userNames: this.props.room.userNames,
    };
  }

  componentDidMount() {
    this.getUserNames();
    socket.on("user joined", this.addUser);
    socket.on("user left", this.removeUser);
  }

  componentWillUnmount() {
    socket.off("user joined", this.addUser);
    socket.off("user left", this.removeUser);
  }

  addUser = (data) => {
    const { userNames } = this.state;
    if (data.roomName !== this.props.room.roomName) return;
    this.setState({
      userNames: uniq([...userNames, ...data.existingUserNames, data.userName]),
    });
  };

  removeUser = (data) => {
    const { userNames } = this.state;
    const { userName, roomName } = data;

    if (roomName !== this.props.room.roomName) return;

    const index = userNames.indexOf(userName);
    const newUserNames = userNames;
    newUserNames.splice(index);

    this.setState({
      userNames: [...newUserNames],
    });
  };

  getUserNames = async () => {
    const response = await fetch(
      `http://localhost:5000/rooms/getRoom/${this.props.room.roomName}`
    );

    const room = await response.json();

    if (!room) return;

    this.setState({
      userNames: uniq([...this.state.userNames, ...room.userNames]),
    });
  };

  renderUserNames() {
    const { userNames } = this.state;
    return userNames.map((userName, index) => {
      return userName === this.props.userName ? (
        <div className="participant-name" key={index}>
          <b>{userName} (Me)</b>
        </div>
      ) : (
        <div className="participant-name" key={index}>
          {userName}
        </div>
      );
    });
  }

  render() {
    const { room } = this.props;
    return (
      <div className="left-menu-component">
        <div className="room-container">
          <h2 className="header">Room Name:</h2>
          <h2 className="header room">{room ? room.roomName : ""}</h2>
        </div>

        <div className="participants-container">
          <h2 className="header">Participants:</h2>

          <div className="items-wrapper">{this.renderUserNames()}</div>
        </div>
      </div>
    );
  }
}
