import React from "react";
import "./container.css";
import "./scrollbar.css";
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

    column.type = column.type || 'text';
    column.align = column.align || 'left';

    column.tableData.id = column_idx;
    column.tableData.droppableId = getUID();
    column.tableData.draggableId = getUID();

    column.tableData.group = column.tableData.group || {};
    column.tableData.group.id = column.tableData.group.id || 0;
    column.tableData.group.order = column.tableData.group.order || 'asc';

    column.tableData.order = column.tableData.order || {};
    column.tableData.order.id = column.tableData.order.id || 0;
    column.tableData.order.order = column.tableData.order.order || 'none';

    column.tableData.filter = column.tableData.filter || [{value: '', type: '='}];
  });
  return columns;
}

export default class AtnTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memProps: props,
      title: props.title,
      columns: fillColumnsTableData(props.columns),
      data: props.data,
      totals: props.totals,
      
      updateTitle: false, 
      updateColumns: false,
      updateData: false,
      updateTotals: false
    };

    this.updateTitle = this.updateTitle.bind(this);
    this.updateColumns = this.updateColumns.bind(this);
    this.updateData = this.updateData.bind(this);
    this.updateTotals = this.updateTotals.bind(this);
  }

  updateTitle(title) {
    this.setState({ title, updateTitle: !this.state.updateTitle });
  }

  updateColumns(columns) {
    this.setState({ columns: columns, updateColumns: !this.state.updateColumns });
  }

  updateData(data) {
    this.setState({ data: data, updateData: !this.state.updateData });
  }

  updateTotals(totals) {
    this.setState({ totals: totals, updateTotals: !this.state.updateTotals });
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let changed = { update: false };
    if (prevState.memProps.updateTitle !== nextProps.updateTitle) {
      changed.title = nextProps.title;
      changed.updateTitle = nextProps.updateTitle;
      changed.update = true;
    }
    if (prevState.memProps.updateColumns !== nextProps.updateColumns) {
      changed.columns = nextProps.columns;
      changed.columns = nextProps.columns;
      changed.update = true;
    }
    if (prevState.memProps.updateData !== nextProps.updateData) {
      changed.data = nextProps.data;
      changed.updateData = nextProps.updateData;
      changed.update = true;
    }
    if (prevState.memProps.updateTotals !== nextProps.updateTotals) {
      changed.totals = nextProps.totals;
      changed.updateTotals = nextProps.updateTotals;
      changed.update = true;
    }
    if (changed.update) {
      return { ...prevState, ...changed, memProps: nextProps }
    } else {
      return null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.updateTitle !== nextState.updateTitle ||
      this.state.updateColumns !== nextState.updateColumns ||
      this.state.updateData !== nextState.updateData ||
      this.state.updateTotals !== nextState.updateTotals;
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
                tableRef={this}
                columns={this.state.columns}
                data={this.state.data}
                totals={this.state.totals}
                updateColumns={this.state.updateColumns}
                updateData={this.state.updateData}
                updateTotals={this.state.updateTotals}
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