import React from "react";
import "./page-bar.css";

export default function AtnPageSizeOptions(props) {
  const {
    pageSize,
    pageSizeOptions,
    onChange
  } = props;

  return (
    <ul
      className="atn-pso-container"
    >
      {pageSizeOptions.map((el, el_idx) => (
        <li
          key={"li-" + el_idx}
          className={el === pageSize ? "atn-pso-option checked" : "atn-pso-option"}
          onClick={() => onChange(el)}
          onTouchEnd={() => onChange(el)}
        >
          {el === 0 ? "Все" : el}
        </li>
      ))}
    </ul>
  );
}