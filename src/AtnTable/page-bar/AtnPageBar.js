import React from "react";
import "./page-bar.css";

export default function AtnPageBar(props) {

  const getPageArray = () => {
    return [1, 2, 3, 4, 5];
  }

  return (
    <div 
      className="atn-page-bar-container"
    >
      <input
        className="atn-page-bar-btn"
        type="button"
        value="<<"
      />
      <input
        className="atn-page-bar-btn"
        type="button"
        value="<"
      />
      {getPageArray().map((el, el_idx) => (
        <input
          key={"pb-btn-" + el}
          className={props.currentPage === el_idx ? "atn-page-bar-btn atn-page-bar-btn-current" : "atn-page-bar-btn"}
          type="button"
          value={el}
        />
      ))}
      <input
        className="atn-page-bar-btn"
        type="button"
        value=">"
      />
      <input
        className="atn-page-bar-btn"
        type="button"
        value=">>"
      />
    </div>
  );
}