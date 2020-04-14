import React from "react";
import { ReactComponent as Icon } from "./button.svg";
import "./sort-button.css";

export default function AtnToggleButton(props) {

  const getClassName = (order, sameState) => {
    if (props.disabled) {
      if (sameState) {
        return "atn-sort-button-" + order + " disabled checked";
      } else {
        return "atn-sort-button-" + order + " disabled";
      }
    } else {
      if (sameState) {
        if (props.radio) {
          return "atn-sort-button-" + order + " checked";
        } else {
          return "atn-sort-button-" + order + " active checked";
        }
      } else {
        return "atn-sort-button-" + order + " active";
      }
    }
  }

  const getProps = (order) => {
    let sameState = props.order === order;
    return ((props.disabled) || (props.radio && sameState)) ?
      {
        className: getClassName(order, sameState)
      } :
      {
        className: getClassName(order, sameState),
        onClick: () => props.onChange(sameState ? undefined : order),
        onTouchEnd: () => props.onChange(sameState ? undefined : order)
      };
  }

  return (
    React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Icon,
        {
          ...getProps("asc")
        }
      ),
      React.createElement(
        Icon,
        {
          ...getProps("desc")
        }
      )
    )
  );
}