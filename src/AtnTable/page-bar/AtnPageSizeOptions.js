import React from "react";
import "./page-bar.css";

export default function AtnPageSizeOptions(props) {
  return (
    <ul
      className="atn-pso-container"
    >
      {props.pageSizeOptions.map((el, el_idx) => (
        <li
          key={"li-" + el_idx}
          className={el === props.pageSize ? "atn-pso-option checked" : "atn-pso-option"}
          onClick={() => props.onChange(el)}
          onTouchEnd={() => props.onChange(el)}
        >
          {el === 0 ? "Все" : el}
        </li>
      ))}
    </ul>
  );
}