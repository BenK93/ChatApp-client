import React from "react";
import "./Message.scss";

export default (props) => {
  // const { sender, messageContent, isSelf } = props;
  const isSelf = props.isSelf;

  return isSelf ? (
    <div className="message-component aligned-right">
      <div className="message-sender">Oded Nir</div>
      <div className="message-content">Hi! my name is Oded</div>
    </div>
  ) : (
    <div className="message-component">
      <div className="message-content">Hi! my name is Chen</div>
      <div className="message-sender">Chen Giladi</div>
    </div>
  );
};
