import React, { useState, useEffect } from "react";
import "../chat/Chat.scss";
import "../text/Text.scss";
import LightTooltip from "../lightTooltip/LightTooltip";

const Text = (props) => {
  const { sender, room } = props;
  const [content, setContent] = useState("");

  const sendMessage = () => {
    if (!content) return;
    const data = {
      sender,
      content,
      room,
      date: new Date(),
    };

    fetch("http://localhost:5000/messages/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    document.getElementById("text-input").value = "";
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && event.keyCode !== 16) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="text-component">
      <textarea
        id="text-input"
        type="text"
        placeholder="Type your message here..."
        onChange={(event) => setContent(event.target.value)}
      ></textarea>
      <LightTooltip title="Send Message" placement="top">
        <button className="icon-button send" onClick={sendMessage}>
          <i className="fas fa-paper-plane fa-lg"></i>
        </button>
      </LightTooltip>
    </div>
  );
};

export default Text;
