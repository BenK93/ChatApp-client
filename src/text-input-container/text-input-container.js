import React, { PureComponent } from "react";
import "./text-input-container.scss";
import LightTooltipComponent from "../light-tooltip/light-tooltip-component";

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 16;

export default class TextInputComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      content: null,
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  setContent(content) {
    this.setState({
      content,
    });
  }

  handleKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE && event.keyCode !== SPACE_KEY_CODE) {
      event.preventDefault();
      this.sendMessage();
    }
  };

  sendMessage = async () => {
    const { content } = this.state;
    const { userName, roomName, addMessages } = this.props;

    if (!content) return;

    const data = {
      userName,
      content,
      roomName,
      date: new Date(),
    };

    const response = await fetch("http://localhost:5000/messages/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const message = await response.json(response.body);
    addMessages(message);

    document.getElementById("text-input").value = "";
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
