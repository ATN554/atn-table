import React from "react";
import { ReactComponent as Icon } from "./button.svg";
import "./sort-button.css";

export default function AtnToggleButton(props) {
  const {
    disabled,
    order,
    radio,
    onChange
  } = props;

  const getClassName = (_order, _sameState) => {
    if (disabled) {
      if (_sameState) {
        return "atn-sort-button-" + _order + " disabled checked";
      } else {
        return "atn-sort-button-" + _order + " disabled";
      }
    } else {
      if (_sameState) {
        if (radio) {
          return "atn-sort-button-" + _order + " checked";
        } else {
          return "atn-sort-button-" + _order + " active checked";
        }
      } else {
        return "atn-sort-button-" + _order + " active";
      }
    }
  }

  const getProps = (_order) => {
    let sameState = order === _order;
    return ((disabled) || (radio && sameState)) ?
      {
        className: getClassName(_order, sameState)
      } :
      {
        className: getClassName(_order, sameState),
        onClick: () => onChange(sameState ? undefined : _order),
        onTouchEnd: () => onChange(sameState ? undefined : _order)
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