import React from "react";
import "./container.css";
import "./scrollbar.css";
import "./menu/menutop.css";
import "./menu/menubot.css";
import "./menu/menuleft.css";
import "./menu/menuright.css";
import { nvl, fillColumnsTableData, sortColumns, sortData, getCorrectPage } from "./AtnEngine.js";
import AtnContent from "./content/AtnContent.js";
import AtnMenu from "./menu/AtnMenu.js";
import AtnSettingsPanel from "./settings-panel/AtnSettingsPanel.js";
import AtnGroupBar from "./group-bar/AtnGroupBar.js";
import AtnPageBar from "./page-bar/AtnPageBar.js";
import AtnPageSizeOptions from "./page-bar/AtnPageSizeOptions.js";

const renderHeaderCell = (column, column_index) => {
  return nvl(column.title, " ");
}

const renderDataGroupCell = (row, row_index, column, column_index) => {
  return <span><b>{nvl(column.title, " ")}:</b> {nvl(row[column.field], " ")}</span>;
}

const renderDataCell = (row, row_index, column, column_index) => {
  return nvl(row[column.field], " ");
}

const renderTotalsCell = (totals, column, column_index) => {
  let text = nvl(totals[column.field], " ");
  if (column_index === 0) {
    text = (nvl(totals["First-Column-Text"], "")) + text;
  }
  return text;
}

export default class AtnTable extends React.Component {
  constructor(props) {
    super(props);

    let columns = fillColumnsTableData(nvl(props.columns, []));
    columns = sortColumns(columns);
    let data = sortData(nvl(props.data, []), columns);

    let renders = nvl(props.renders, {});
    renders.renderHeaderCell = nvl(renders.renderHeaderCell, renderHeaderCell);
    renders.renderDataGroupCell = nvl(renders.renderDataGroupCell, renderDataGroupCell);
    renders.renderDataCell = nvl(renders.renderDataCell, renderDataCell);
    renders.renderTotalsCell = nvl(renders.renderTotalsCell, renderTotalsCell);

    this.state = {
      title: nvl(props.title, ""),
      columns: columns,
      data: data,
      totals: nvl(props.totals, {}),

      currentPage: nvl(props.currentPage, 0),
      pageSize: nvl(props.pageSize, 10),
      pageSizeOptions: nvl(props.pageSizeOptions, [5, 10, 20, 0]),

      renders: renders
    };

    this.setTitle = this.setTitle.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.setData = this.setData.bind(this);
    this.setTotals = this.setTotals.bind(this);

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
  }

  setTitle(_title) {
    this.setState({ title: _title });
  }

  setColumns(_columns = this.state.columns, _fillColumns = true, _sortColumns = true, _sortData = true) {
    if (_fillColumns) {
      _columns = fillColumnsTableData(_columns);
    }
    if (_sortData) {
      _columns = _sortColumns ? sortColumns(_columns) : _columns;
      let _data = sortData(this.state.data, _columns);
      let _currentPage = getCorrectPage(_data, _columns, this.state.pageSize, this.state.currentPage);
      this.setState({ columns: _columns, data: _data, currentPage: _currentPage });
    } else {
      _columns = _sortColumns ? sortColumns(_columns) : _columns;
      let _currentPage = getCorrectPage(this.state.data, _columns, this.state.pageSize, this.state.currentPage);
      this.setState({ columns: _columns, currentPage: _currentPage });
    }
  }

  setData(_data = this.state.data, _sortData = true) {
    _data = _sortData ? sortData(nvl(_data, []), this.state.columns) : _data;
    let _currentPage = getCorrectPage(_data, this.state.columns, this.state.pageSize, this.state.currentPage);
    this.setState({ data: _data, currentPage: _currentPage });
  }

  setTotals(_totals = {}) {
    this.setState({ totals: _totals });
  }

  setCurrentPage(_page = 0) {
    let _currentPage = getCorrectPage(this.state.data, this.state.columns, this.state.pageSize, _page);
    this.setState({ currentPage: _currentPage });
  }

  setPageSize(_pageSize = 10) {
    if (this.state.pageSizeOptions.includes(_pageSize)) {
      let _currentPage = getCorrectPage(this.state.data, this.state.columns, _pageSize, this.state.currentPage);
      this.setState({ pageSize: _pageSize, currentPage: _currentPage });
    }
  }

  render() {
    const { 
      title,
      columns,
      data,
      totals,
      currentPage,
      pageSize,
      pageSizeOptions,
      renders
    } = this.state;

    let _columns = columns;

    let _userColumns = _columns.filter(col => !col.service);

    let _groupColumns = _userColumns.filter(col => !col.tree && col.group.id > 0);
    _groupColumns = sortColumns(_groupColumns, [['group', 'id'], ['id']]);

    let _sortColumns = _userColumns.filter(col => col.group.id === 0);
    _sortColumns = sortColumns(_sortColumns, [['sort', 'id'], ['id']]);

    let _orderColumns = sortColumns(_sortColumns, [['id']]);
    
    let _headColumns = _columns.filter(col => col.group.id === 0 && col.visibility.visible);

    let _totalColumnsWidth = _headColumns.reduce((w, col) => 1 + w + col.width, -1);

    let dataInfo = {};
    dataInfo.isTreeData = _userColumns.some(col => col.tree);
    dataInfo.hasGroups = _groupColumns.length > 0;
    dataInfo.isGroupData = !dataInfo.isTreeData && dataInfo.hasGroups;
    dataInfo.isPlainData = !dataInfo.isTreeData && !dataInfo.isGroupData;

    _columns.find(col => col.field === "#GROUP_COLUMN").visibility.visible = dataInfo.isGroupData;

    return (
      <table className="atn-container">
        <thead className="atn-container-th">
          <tr className="atn-toolbar-tr">
            <td className="atn-toolbar">
              <div className="atn-title">
                {title}
              </div>
              <div style={{ height: "32px", lineHeight: "32px" }}>
                Панель кнопок
              </div>
            </td>
          </tr>
          {
            dataInfo.isGroupData
              &&
            <tr className="atn-groupbar-tr">
              <td className="atn-groupbar">
                <AtnGroupBar
                  title="Группировка"
                  columns={_groupColumns}
                  renders={this.state.renders}
                  updateData={this.setData}
                />
              </td>
            </tr>
          }
        </thead>
        <tbody className="atn-container-tb">
          <tr className="atn-content-mid-tr">
            <td className="atn-content-mid">
              <AtnMenu
                mainClass="atn-mtop"
                contentClass="atn-mtop-content"
                buttonClass="atn-mtop-button"
              >
                <div></div>
              </AtnMenu>
              <AtnMenu
                mainClass="atn-mleft"
                contentClass="atn-mleft-content"
                buttonClass="atn-mleft-button"
              >
                <AtnSettingsPanel
                  dataInfo={dataInfo}
                  dataSettingsTitle="Настройка отображения данных"
                  groupTitle="Группировка"
                  groupColumns={_groupColumns}
                  sortTitle="Сортировка"
                  sortColumns={_sortColumns}
                  columnsSettingsTitle="Настройка порядка и отображения колонок"
                  orderColumns={_orderColumns}
                  renders={renders}
                  updateColumns={this.setColumns}
                  updateData={this.setData}
                />
              </AtnMenu>
              <AtnContent
                dataInfo={dataInfo}
                columns={_headColumns}
                groupColumns={_groupColumns}
                totalColumnsWidth={_totalColumnsWidth}
                data={data}
                currentPage={currentPage}
                pageSize={pageSize}
                totals={totals}
                renders={renders}
                updateColumns={this.setColumns}
                updateData={this.setData}
              />
              <AtnMenu
                mainClass="atn-mright"
                contentClass="atn-mright-content"
                buttonClass="atn-mright-button"
              >
                <div></div>
              </AtnMenu>
              <AtnMenu
                mainClass="atn-mbot"
                contentClass="atn-mbot-content"
                buttonClass="atn-mbot-button"
              >
                <AtnPageSizeOptions
                  pageSize={pageSize}
                  pageSizeOptions={pageSizeOptions}
                  onChange={this.setPageSize}
                />
              </AtnMenu>
            </td>
          </tr>
        </tbody>
        <tfoot className="atn-container-tf">
          <tr className="atn-container-tr">
            <td className="atn-footer">
              <AtnPageBar
                columns={_userColumns}
                data={data}
                currentPage={currentPage}
                pageSize={pageSize}
                setCurrentPage={this.setCurrentPage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}