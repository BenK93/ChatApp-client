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
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  getRedirectedLink() {
    const { userName, roomName } = this.state;
    return `/chat?userName=${userName}&roomName=${roomName}`;
  }

  handleClick = (event) => {
    const { userName, roomName } = this.state;
    if (!userName || !roomName) {
      event.preventDefault();
    }
  };

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
