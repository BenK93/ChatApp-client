import React from "react";
import "./message-component.scss";

export default (props) => {
  const { message, isSelf } = props;
  const date = new Date(message.date);
  return isSelf ? (
    <div className="message-component aligned-right">
      <div className="message-sender">
        <b>{message.userName}</b>
        <br></br>
        {date.getHours()}:
        {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}
      </div>
      <div className="message-content aligned-right">{message.content}</div>
    </div>
  ) : (
    <div className="message-component">
      <div className="message-content">{message.content}</div>
      <div className="message-sender">
        <b>{message.userName}</b>
        <br></br>
        {date.getHours()}:
        {(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}
      </div>
    </div>
  );
};
