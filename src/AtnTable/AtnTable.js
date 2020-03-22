import React from "react";
import "./container.css";
import "./menutop.css";
import "./menubot.css";
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
      columns: fillColumnsTableData(props.columns),
      data: props.data,
      totals: props.totals
    };
  }

  render() {
    return (
      <div className="content">
        <table className="atn-container">
          <thead className="atn-container-th">
            <tr className="atn-toolbar-tr">
              <td colSpan={3} className="atn-toolbar">
                <div style={{ height: "40px" }}>
                  Панель кнопок
                </div>
              </td>
            </tr>
            <tr className="atn-groupbar-tr">
              <td colSpan={3} className="atn-groupbar">
                <div style={{ height: "30px" }}>
                  Панель группы
                </div>
              </td>
            </tr>
          </thead>
          <tbody className="atn-container-tb">
            <tr className="atn-content-top-tr">
              <td colSpan={3} className="atn-menu-top">
                <AtnMenu
                  mainClass="atn-mtop"
                  contentClass="atn-mtop-content"
                  buttonClass="atn-mtop-button"
                >
                  Меню сверху
                </AtnMenu>
              </td>
            </tr>
            <tr className="atn-content-mid-tr">
              <td className="atn-menu-left">
                Меню слева
              </td>
              <td className="atn-content-mid">
                <AtnContent
                  columns={this.state.columns}
                  data={this.state.data}
                  totals={this.state.totals}
                />
              </td>
              <td className="atn-menu-right">
                Меню справа
              </td>
            </tr>
            <tr className="atn-content-bot-tr">
              <td colSpan={3} className="atn-menu-bot">
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
              <td colSpan={3} className="atn-footer">
                <div style={{ height: "40px" }}>
                  Подвал таблицы
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}