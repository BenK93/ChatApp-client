import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";
import "./Join.scss";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isRoomValid, setIsRoomValid] = useState(true);

  const history = useHistory();
  let inputName, inputRoom;
  let link;

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (link) {
        history.push(link);
      }
    };
  });

  const getRedirectedLink = () => {
    return `/chat?name=${name}&room=${room}`;
  };

  const handleClick = (event) => {
    if (!name || !room) {
      event.preventDefault();
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      console.log(`Name: ${name}`, `Room: ${room}`);
      if (!name) {
        setIsNameValid(false);
        if (inputName) {
          inputName.focus();
        }
      } else if (!room) {
        setIsRoomValid(false);
        if (inputRoom) {
          inputRoom.focus();
        }
      } else if (name && room) {
        link = getRedirectedLink();
        setName("");
        setRoom("");
      }
    }
  };

  return (
    <div className="join-component">
      <div className="join-title">Join</div>

      <div className="join-container">
        <div className="input-container">
          <input
            className={classnames("join-input", { invalid: !isNameValid })}
            placeholder="Name"
            onChange={(event) => {
              setIsNameValid(true);
              setName(event.target.value);
            }}
            ref={(e) => (inputName = e)}
          />

          <input
            className={classnames("join-input", { invalid: !isRoomValid })}
            placeholder="Room"
            onChange={(event) => {
              setIsRoomValid(true);
              setRoom(event.target.value);
            }}
            ref={(e) => (inputRoom = e)}
          />
        </div>

        <Link
          className="enter-button-link"
          onClick={(event) => handleClick(event)}
          to={getRedirectedLink()}
        >
          <div className="enter-button">ENTER</div>
        </Link>
      </div>
    </div>
  );
};

export default Join;
