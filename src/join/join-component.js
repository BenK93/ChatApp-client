import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";

import "./join-component.scss";

const ENTER_KEY_CODE = 13;

export default class JoinComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      userName: "",
      roomName: "",
      isNameValid: true,
      isRoomValid: true,
    };
  }

  componentDidMount() {
    // Adding an event listener for a key press
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  /**
   * Creates a link to the chat room with a user name and a room name.
   *
   * @returns {string} Link to chat.
   */
  getRedirectedLink() {
    const { userName, roomName } = this.state;
    return `/chat?userName=${userName}&roomName=${roomName}`;
  }

  /**
   * Handles a mouse click on the enter room button.
   * Will prevent the event default behavior.
   *
   * @param {*} event
   */
  handleClick = (event) => {
    const { userName, roomName } = this.state;
    if (!userName || !roomName) {
      event.preventDefault();
    }
  };

  /**
   * Handles a keyboard key press.
   * Will push to props.history the redirected link if all input are with value.
   *
   * @param {*} event
   */

  handleKeyDown = (event) => {
    const { userName, roomName } = this.state;

    if (event.keyCode !== ENTER_KEY_CODE) return;

    if (!userName) {
      this.setState({ isNameValid: false });
      this.inputName.focus();
      return;
    }

    if (!roomName) {
      this.setState({ isRoomValid: false });
      this.inputRoom.focus();
      return;
    }

    this.props.history.push(this.getRedirectedLink());
  };

  render() {
    const { isNameValid, isRoomValid } = this.state;
    return (
      <div className="join-component">
        <div className="join-title">Join</div>

        <div className="join-container">
          <div className="input-container">
            <input
              className={classnames("join-input", { invalid: !isNameValid })}
              placeholder="Name"
              onChange={(event) => {
                this.setState({
                  isNameValid: true,
                  userName: event.target.value,
                });
              }}
              ref={(e) => (this.inputName = e)}
            />

            <input
              className={classnames("join-input", { invalid: !isRoomValid })}
              placeholder="Room"
              onChange={(event) => {
                this.setState({
                  isRoomValid: true,
                  roomName: event.target.value,
                });
              }}
              ref={(e) => (this.inputRoom = e)}
            />
          </div>

          <Link
            className="enter-button-link"
            onClick={(event) => this.handleClick(event)}
            to={this.getRedirectedLink()}
          >
            <div className="enter-button">ENTER</div>
          </Link>
        </div>
      </div>
    );
  }
}
