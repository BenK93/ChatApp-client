import React from "react";
import { Link } from "react-router-dom";

import "./header-component.scss";
import LightTooltipComponent from "../light-tooltip/light-tooltip-component";

export default () => {
  return (
    <div className="header-component">
      <LightTooltipComponent title="Exit Room" placement="right">
        <Link to="/">
          <button className="icon-button back">
            <i className="fas fa-arrow-left fa-2x"></i>
          </button>
        </Link>
      </LightTooltipComponent>
    </div>
  );
};
