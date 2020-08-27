import React from "react";
import "./message-component.scss";

export default (props) => {
  const { userName, content, isSelf } = props;

  return isSelf ? (
    <div className="message-component aligned-right">
      <div className="message-sender">{userName}</div>
      <div className="message-content aligned-right">{content}</div>
    </div>
  ) : (
    <div className="message-component">
      <div className="message-content">{content}</div>
      <div className="message-sender">{userName}</div>
    </div>
  );
};
