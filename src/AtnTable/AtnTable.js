import React from "react";
import "./container.css";
import "./scrollbar.css";
import "./menu/menutop.css";
import "./menu/menubot.css";
import "./menu/menuleft.css";
import "./menu/menuright.css";
import { fillColumnsTableData, fillRowsTableData, sortColumns, sortData } from "./AtnEngine.js";
import AtnContent from "./content/AtnContent.js";
import AtnMenu from "./menu/AtnMenu.js";

const renderHeaderCell = (column, column_index) => {
  return column.title;
}

const renderDataCell = (row, row_index, column, column_index) => {
  return row[column.field];
}

const renderTotalsCell = (totals, column, column_index) => {
  let text = totals[column.field] || "";
  if (column_index === 0) {
    text = (totals["First-Column-Text"] || "") + text;
  }
  return text;
}

export default class AtnTable extends React.Component {
  constructor(props) {
    super(props);

    let columns = fillColumnsTableData(props.columns);
    columns = sortColumns(columns);
    let data = fillRowsTableData(props.data);
    data = sortData(data, columns);

    let renders = props.renders || {};
    renders.renderHeaderCell = renders.renderHeaderCell || renderHeaderCell;
    renders.renderDataCell = renders.renderDataCell || renderDataCell;
    renders.renderTotalsCell = renders.renderTotalsCell || renderTotalsCell;

    this.state = {
      memProps: props,
      title: props.title,
      columns: columns,
      data: data,
      totals: props.totals,

      renders: renders
    };

    this.setTitle = this.setTitle.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.setData = this.setData.bind(this);
    this.setTotals = this.setTotals.bind(this);

    this.updateTitle = this.updateTitle.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateTotals = this.updateTotals.bind(this);
  }

  setTitle(_title) {
    this.setState({ title: _title });
  }

  setColumns(_columns) {
    _columns = fillColumnsTableData(_columns);
    _columns = sortColumns(_columns);
    this.setState({ columns: _columns });
  }

  setData(_data) {
    _data = fillRowsTableData(_data);
    _data = sortData(_data);
    this.setState({ data: _data });
  }

  setTotals(_totals) {
    this.setState({ totals: _totals });
  }

  updateTitle(_title) {
    this.setState({ title: _title });
  }

  updateColumns(_columns, _sortColumns = true, _sortData = true) {
    if (_sortData) {
      _columns = _sortColumns ? sortColumns(_columns) : _columns;
      let _data = sortData(this.props.data);
      this.setState({ columns: _columns, data: _data });
    } else {
      _columns = _sortColumns ? sortColumns(_columns) : _columns;
      this.setState({ columns: _columns });
    }
  }

  updateData(_data, _sortData = true) {
    _data = _sortData ? sortData(_data) : _data;
    this.setState({ data: _data });
  }

  updateTotals(totals) {
    this.setState({ totals: totals });
  }

  render() {
    let visibleColumns = this.state.columns.filter((col) => col.visibility.visible);
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
                tableRef={this}
                columns={visibleColumns}
                data={this.state.data}
                totals={this.state.totals}
                renders={this.state.renders}
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