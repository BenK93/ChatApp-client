import React from "react";
import { Link } from "react-router-dom";
import "../chat/Chat.scss";
import "../header/Header.scss";
import LightTooltip from "../lightTooltip/LightTooltip";

export default () => {
  return (
    <div className="header-component">
      <LightTooltip title="Exit Room" placement="right">
        <Link to="/">
          <button className="icon-button back">
            <i className="fas fa-arrow-left fa-2x"></i>
          </button>
        </Link>
      </LightTooltip>
    </div>
  );
};
