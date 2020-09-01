import React, { PureComponent } from "react";

import "./text-input-container-component.scss";
import LightTooltipComponent from "../light-tooltip/light-tooltip-component";

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 16;

export default class TextInputComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.keys = [];
    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  setContent(content) {
    this.setState({
      content,
    });
  }

  handleKeyDown = (event) => {
    this.keys[event.keyCode] = true;
    if (this.keys[ENTER_KEY_CODE] && !this.keys[SPACE_KEY_CODE]) {
      event.preventDefault();
      this.sendMessage();
    }
  };

  handleKeyUp = (event) => {
    delete this.keys[event.keyCode];
  };

  sendMessage = async () => {
    const { content } = this.state;
    const { userName, roomName } = this.props;

    if (!content) return;

    const data = {
      userName,
      content,
      roomName,
      date: new Date(),
    };

    document.getElementById("text-input").value = "";

    await fetch("http://localhost:5000/messages/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    this.setState({ content: null });
  };

  render() {
    return (
      <div className="text-component">
        <textarea
          id="text-input"
          type="text"
          placeholder="Type your message here..."
          onChange={(event) => this.setContent(event.target.value)}
        />

        <LightTooltipComponent title="Send Message" placement="top">
          <button className="icon-button send" onClick={this.sendMessage}>
            <i className="fas fa-paper-plane fa-lg" />
          </button>
        </LightTooltipComponent>
      </div>
    );
  }
}
