import React from "react";
import "./LeftMenu.scss";

const LeftMenu = (props) => {
  const name = props.name;
  const renderName = () => {
    return <div>{name}</div>;
  };

  return (
    <div className="left-menu-component">
      <div className="room-container">
        <h2 className="header">Room Name:</h2>
        <h2 className="header room">{props.room}</h2>
      </div>

      <div className="participants-container">
        <h2 className="header">Participants:</h2>

        <div className="items-wrapper">{renderName()}</div>
      </div>
    </div>
  );
};

export default LeftMenu;
