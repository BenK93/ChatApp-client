import React, { useEffect } from "react";
import queryString from "query-string";
import Header from "../header/Header";
import Text from "../text/Text";
import LeftMenu from "../leftMenu/LeftMenu";
import "./Chat.scss";

let messagesElement;

const getMessagesComponent = () => {
  messagesElement = document.getElementById("messages-component-wrapper");
};

const scrollDown = () => {
  messagesElement.scrollTop = messagesElement.scrollHeight;
};

export default ({ location }) => {
  const { name, room } = queryString.parse(location.search);

  useEffect(() => {
    createUser();
    createRoom();
    getMessagesComponent();
    scrollDown();
  });

  const createUser = () => {
    fetch("http://localhost:5000/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
      }),
    });
  };

  const createRoom = () => {
    const data = {
      name: room,
      messeges: null,
      users: null,
    };

    fetch("http://localhost:5000/rooms/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <div className="chat-component">
      <div className="outer-chat-container">
        <div className="header-component-wrapper">
          <Header />
        </div>

        <div className="inner-chat-container">
          <div className="left-menu-component-wrapper">
            <LeftMenu room={room} name={name} />
          </div>

          <div className="inner-chat">
            <div id="messages-component-wrapper">
              {/* Here will be messages */}
            </div>
            <div className="text-component-wrapper">
              <Text sender={name} room={room} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
