import React from "react";
import "./page-bar.css";

export default function AtnPageBar(props) {
  const {
    currentPage,
    lastPage,
    setCurrentPage
  } = props;
  
  const getPageArray = () => {
    let p1 = Math.max(currentPage - 2, 0);
    let p2 = Math.min(p1 + 4, lastPage);
    p1 = Math.max(p2 - 4, 0);
    let pages = [];
    for (var i = p1; i <= p2; i++) {
      pages.push(i);
    }
    return pages;
  }

  const pageArray = getPageArray();

  return (
    <div 
      className="atn-page-bar-container"
    >
      <input
        className="atn-page-bar-btn"
        type="button"
        value="⇐"
        onClick={() => { setCurrentPage(0) }}
        onTouchEnd={() => { setCurrentPage(0) }}
      />
      <input
        className="atn-page-bar-btn"
        type="button"
        value="←"
        onClick={() => { setCurrentPage(currentPage - 1) }}
        onTouchEnd={() => { setCurrentPage(currentPage - 1) }}
      />
      {pageArray.map((el) => (
        <input
          key={"pb-btn-" + el}
          className={currentPage === el ? "atn-page-bar-btn checked" : "atn-page-bar-btn"}
          type="button"
          value={el+1}
          onClick={() => { setCurrentPage(el) }}
          onTouchEnd={() => { setCurrentPage(el) }}
        />
      ))}
      <input
        className="atn-page-bar-btn"
        type="button"
        value="→"
        onClick={() => { setCurrentPage(currentPage + 1) }}
        onTouchEnd={() => { setCurrentPage(currentPage + 1) }}
      />
      <input
        className="atn-page-bar-btn"
        type="button"
        value="⇒"
        onClick={() => { setCurrentPage(lastPage) }}
        onTouchEnd={() => { setCurrentPage(lastPage) }}
      />
    </div>
  );
}