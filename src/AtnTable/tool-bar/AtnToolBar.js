import React from "react";

export default function AtnToolBar(props) {
  const {
    toolbarElements
  } = props;

  return (
    <React.Fragment>
      {toolbarElements.map((el, el_idx) => {
        return React.cloneElement(el, { key: "toolbar-el-" + el_idx });
      })}
    </React.Fragment>
  );
}