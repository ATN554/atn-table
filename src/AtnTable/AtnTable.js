import React from "react";
import "./container.css";
import "./menutop.css";
import "./menubot.css";
import "./menuleft.css";
import "./menuright.css";
import getUID from "../UID/uid.js";
import AtnContent from "./AtnContent.js";
import AtnMenu from "./AtnMenu.js";

const fillColumnsTableData = (columns) => {
  columns.forEach((column, column_idx) => {
    if (!column.tableData) {
      column.tableData = {};
    }
    column.tableData.id = column_idx;
    column.tableData.droppableId = getUID();
    column.tableData.draggableId = getUID();
  });
  return columns;
}

export default class AtnTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      columns: fillColumnsTableData(props.columns),
      data: props.data,
      totals: props.totals
    };
  }

  render() {
    return (
      <table className="atn-container">
        <thead className="atn-container-th">
          <tr className="atn-toolbar-tr">
            <td className="atn-toolbar">
              <div className="atn-title">
                {this.state.title}
              </div>
              <div style={{ height: "32px", lineHeight: "32px" }}>
                Панель кнопок
              </div>
            </td>
          </tr>
          <tr className="atn-groupbar-tr">
            <td className="atn-groupbar">
              <div style={{ height: "24px", lineHeight: "24px" }}>
                Панель группы
              </div>
            </td>
          </tr>
        </thead>
        <tbody className="atn-container-tb">
          <tr className="atn-content-mid-tr">
            <td className="atn-content-mid">
              <AtnMenu
                mainClass="atn-mtop"
                contentClass="atn-mtop-content"
                buttonClass="atn-mtop-button"
              >
                Меню сверху
              </AtnMenu>
              <AtnMenu
                mainClass="atn-mleft"
                contentClass="atn-mleft-content"
                buttonClass="atn-mleft-button"
              >
                Меню слева
              </AtnMenu>
              <AtnContent
                columns={this.state.columns}
                data={this.state.data}
                totals={this.state.totals}
              />
              <AtnMenu
                mainClass="atn-mright"
                contentClass="atn-mright-content"
                buttonClass="atn-mright-button"
              >
                Меню справа
              </AtnMenu>
              <AtnMenu
                mainClass="atn-mbot"
                contentClass="atn-mbot-content"
                buttonClass="atn-mbot-button"
              >
                Меню снизу
              </AtnMenu>
            </td>
          </tr>
        </tbody>
        <tfoot className="atn-container-tf">
          <tr className="atn-container-tr">
            <td className="atn-footer">
              <div style={{ height: "24px", lineHeight: "24px" }}>
                Подвал таблицы
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}