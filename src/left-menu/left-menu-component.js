import React, { PureComponent } from "react";
import uniq from "lodash/uniq";

import "./left-menu-component.scss";

export default class LeftMenuComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userNames: [],
    };
  }

  componentDidMount() {
    this.interval = setInterval(this.getUserNames, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getUserNames = async () => {
    const response = await fetch(
      `http://localhost:5000/rooms/getRoom/${this.props.roomName}`
    );

    const room = await response.json();

    this.setState({
      userNames: uniq([...this.state.userNames, ...room.userNames]),
    });
  };

  renderUserNames() {
    const { userNames } = this.state;
    return userNames.map((userName, index) => (
      <div className="participant-name" key={index}>
        {userName}
      </div>
    ));
  }

  render() {
    return (
      <div className="left-menu-component">
        <div className="room-container">
          <h2 className="header">Room Name:</h2>
          <h2 className="header room">{this.props.roomName}</h2>
        </div>

        <div className="participants-container">
          <h2 className="header">Participants:</h2>

          <div className="items-wrapper">{this.renderUserNames()}</div>
        </div>
      </div>
    );
  }
}
