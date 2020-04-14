import React from "react";
import { ReactComponent as Icon } from "./button.svg";
import "./toggle-button.css";

export default function AtnToggleButton(props) {

  const getClassName = () => {
    if (props.disabled) {
      if (props.checked) {
        return "atn-toggle-button disabled checked";
      } else {
        return "atn-toggle-button disabled";
      }
    } else {
      if (props.checked) {
        return "atn-toggle-button active checked";
      } else {
        return "atn-toggle-button active";
      }
    }
  }

  const getProps = () => {
    return props.disabled ? 
      {
        className: getClassName()
      } : 
      {
        className: getClassName(),
        onClick: props.onChange,
        onTouchEnd: props.onChange
      };
  }

  return (
    React.createElement(
      Icon,
      {
        ...getProps()
      }
    )
  );
}