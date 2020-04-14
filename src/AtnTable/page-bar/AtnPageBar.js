import React from "react";
import "./page-bar.css";
import { getLastPage } from "../AtnEngine.js";

export default function AtnPageBar(props) {
  
  var lastPage = getLastPage(props.data, props.columns, props.pageSize);

  const getPageArray = () => {
    let p1 = Math.max(props.currentPage - 2, 0);
    let p2 = Math.min(p1 + 4, lastPage);
    p1 = Math.max(p2 - 4, 0);
    let pages = [];
    for (var i = p1; i <= p2; i++) {
      pages.push(i);
    }
    return pages;
  }

  var pageArray = getPageArray();

  return (
    <div 
      className="atn-page-bar-container"
    >
      <input
        className="atn-page-bar-btn"
        type="button"
        value="⇐"
        onClick={() => { props.tableRef.setCurrentPage(0) }}
        onTouchEnd={() => { props.tableRef.setCurrentPage(0) }}
      />
      <input
        className="atn-page-bar-btn"
        type="button"
        value="←"
        onClick={() => { props.tableRef.setCurrentPage(props.currentPage - 1) }}
        onTouchEnd={() => { props.tableRef.setCurrentPage(props.currentPage - 1) }}
      />
      {pageArray.map((el) => (
        <input
          key={"pb-btn-" + el}
          className={props.currentPage === el ? "atn-page-bar-btn checked" : "atn-page-bar-btn"}
          type="button"
          value={el+1}
          onClick={() => { props.tableRef.setCurrentPage(el) }}
          onTouchEnd={() => { props.tableRef.setCurrentPage(el) }}
        />
      ))}
      <input
        className="atn-page-bar-btn"
        type="button"
        value="→"
        onClick={() => { props.tableRef.setCurrentPage(props.currentPage + 1) }}
        onTouchEnd={() => { props.tableRef.setCurrentPage(props.currentPage + 1) }}
      />
      <input
        className="atn-page-bar-btn"
        type="button"
        value="⇒"
        onClick={() => { props.tableRef.setCurrentPage(lastPage) }}
        onTouchEnd={() => { props.tableRef.setCurrentPage(lastPage) }}
      />
    </div>
  );
}