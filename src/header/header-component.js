import React from "react";
import { Link } from "react-router-dom";

import "./header-component.scss";
import LightTooltipComponent from "../light-tooltip/light-tooltip-component";

export default () => {
  return (
    <div className="header-component">
      <LightTooltipComponent title="Log Out" placement="right">
        <Link to="/">
          <button className="back-button">
            <i className="fas fa-arrow-left fa-2x"></i>
          </button>
        </Link>
      </LightTooltipComponent>
    </div>
  );
};
