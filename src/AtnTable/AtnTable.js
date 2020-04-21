import React from "react";
import "./container.css";
import "./scrollbar.css";
import "./menu/menutop.css";
import "./menu/menubot.css";
import "./menu/menuleft.css";
import "./menu/menuright.css";
import { nvl, fillColumnsTableData, sortColumns, sortData, getLastPage, getCorrectPage, treeBuilderLoad } from "./AtnEngine.js";
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
  return (
    <span>
      <b>{nvl(column.title, " ")}:</b> {nvl(row[column.field], " ")}
    </span>
  );
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

const fillDataInfo = (_columns) => {
  let dataInfo = {};

  let _userColumns = _columns.filter(col => !col.service);

  let _groupColumns = _userColumns.filter(col => !col.tree && col.group.id > 0);
  _groupColumns = sortColumns(_groupColumns, [['group', 'id'], ['id']]);

  let _treeColumn = _columns.find(col => col.tree);

  dataInfo.isTreeData = _treeColumn !== undefined;
  dataInfo.treeColumn = _treeColumn;
  dataInfo.hasGroups = _groupColumns.length > 0;
  dataInfo.isGroupData = !dataInfo.isTreeData && dataInfo.hasGroups;
  dataInfo.isPlainData = !dataInfo.isTreeData && !dataInfo.isGroupData;
  _columns.find(col => col.field === "#GROUP_COLUMN").visibility.visible = dataInfo.isGroupData;

  let _sortColumns = _userColumns.filter(col => col.group.id === 0);
  _sortColumns = sortColumns(_sortColumns, [['sort', 'id'], ['id']]);

  let _orderColumns = sortColumns(_sortColumns, [['id']]);

  let _headColumns = _columns.filter(col => col.group.id === 0 && col.visibility.visible);

  let _totalColumnsWidth = _headColumns.reduce((w, col) => 1 + w + col.width, -1);

  dataInfo.userColumns = _userColumns;
  dataInfo.groupColumns = _groupColumns;
  dataInfo.sortColumns = _sortColumns;
  dataInfo.orderColumns = _orderColumns;
  dataInfo.headColumns = _headColumns;
  dataInfo.totalColumnsWidth = _totalColumnsWidth;

  return dataInfo;
}

export default class AtnTable extends React.Component {
  constructor(props) {
    super(props);

    let columns = fillColumnsTableData(nvl(props.columns, []));
    columns = sortColumns(columns);
    let dataInfo = fillDataInfo(columns);
    let data = sortData(nvl(props.data, []), dataInfo);

    let renders = nvl(props.renders, {});
    renders.renderHeaderCell = nvl(props.renderHeaderCell, renderHeaderCell);
    renders.renderDataGroupCell = nvl(props.renderDataGroupCell, renderDataGroupCell);
    renders.renderDataCell = nvl(props.renderDataCell, renderDataCell);
    renders.renderTotalsCell = nvl(props.renderTotalsCell, renderTotalsCell);
    renders.renderDetailsPanel = props.renderDetailsPanel;

    this.state = {
      title: nvl(props.title, ""),
      columns: columns,
      data: data,
      totals: nvl(props.totals, {}),

      dataInfo: dataInfo,

      currentPage: nvl(props.currentPage, 0),
      pageSize: nvl(props.pageSize, 10),
      pageSizeOptions: nvl(props.pageSizeOptions, [5, 10, 20, 0]),
      lastPage: getLastPage(data, dataInfo, nvl(props.pageSize, 10)),

      renders: renders,

      selectedRow: undefined,
    };

    this.setTitle = this.setTitle.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.setData = this.setData.bind(this);
    this.openTreeLevel = this.openTreeLevel.bind(this);
    this.closeTreeLevel = this.closeTreeLevel.bind(this);
    this.setColumnsAndData = this.setColumnsAndData.bind(this);
    this.setTotals = this.setTotals.bind(this);

    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.setPageSize = this.setPageSize.bind(this);
    
    this.setSelectedRow = this.setSelectedRow.bind(this);
    this.scrollToSelectedRow = this.scrollToSelectedRow.bind(this);
  }

  setTitle(_title) {
    this.setState({ title: _title });
  }

  setColumns(_columns = this.state.columns, _fillColumns = true, _sortColumns = true) {
    if (_fillColumns) {
      _columns = fillColumnsTableData(_columns);
    }
    if (_sortColumns) {
      _columns = sortColumns(_columns);
    }
    let _dataInfo = fillDataInfo(_columns);
    let _lastPage = getLastPage(this.state.data, this.state.dataInfo, this.state.pageSize);
    let _currentPage = getCorrectPage(_lastPage, this.state.currentPage);
    this.setState({ columns: _columns, currentPage: _currentPage, dataInfo: _dataInfo, lastPage: _lastPage });
  }

  setData(_data = this.state.data, _sortData = true) {
    if (_sortData) {
      _data = sortData(_data, this.state.dataInfo);
    }
    let _lastPage = getLastPage(_data, this.state.dataInfo, this.state.pageSize);
    let _currentPage = getCorrectPage(_lastPage, this.state.currentPage);
    this.setState({ data: _data, currentPage: _currentPage, lastPage: _lastPage });
  }

  openTreeLevel(_row) {
    _row.tableData.tree.open = true;
    let _data = this.state.data;
    let dataInfo = this.state.dataInfo;
    let tree = dataInfo.treeColumn.tree;
    let parentReq = tree.parentField;
    let childReq = tree.childField;
    let id = _row.tableData.id;
    let _insertIdx = _data.findIndex(r => r.tableData.id === id) + 1;
    treeBuilderLoad(_data, _insertIdx, parentReq, childReq, _row, dataInfo.userColumns);
    this.setData(_data, false);
  }

  closeTreeLevel(_row) {
    _row.tableData.tree.open = false;
    let _data = this.state.data;
    let id = _row.tableData.id;
    let closeIdx = _data.findIndex(r => r.tableData.id === id) + 1;
    let len = _data.length;
    let level = _row.tableData.tree.level;
    for (let i = closeIdx; i < len; i++) {
      let r = _data[i];
      if (r.tableData.tree.level > level) {
        r.tableData.show = false;
      } else {
        break;
      }
    }
    this.setData(_data, false);
  }

  setColumnsAndData(
    _columns = this.state.columns, _fillColumns = true, _sortColumns = true,
    _data = this.state.data, _sortData = true) 
  {
    if (_fillColumns) {
      _columns = fillColumnsTableData(_columns);
    }
    if (_sortColumns) {
      _columns = sortColumns(_columns);
    }
    
    let _dataInfo = fillDataInfo(_columns);
    
    if (_sortData) {
      _data = sortData(_data, _dataInfo);
    }

    let _lastPage = getLastPage(_data, this.state.dataInfo, this.state.pageSize);
    let _currentPage = getCorrectPage(_lastPage, this.state.currentPage);

    this.setState({ 
      dataInfo: _dataInfo,
      columns: _columns,
      data: _data,
      currentPage: _currentPage,
      lastPage: _lastPage
    });
  }

  setTotals(_totals = {}) {
    this.setState({ totals: _totals });
  }

  setCurrentPage(_page = 0) {
    let _currentPage = getCorrectPage(this.state.lastPage, _page);
    this.setState({ currentPage: _currentPage });
  }

  setPageSize(_pageSize = 10) {
    if (this.state.pageSizeOptions.includes(_pageSize)) {
      let _lastPage = getLastPage(this.state.data, this.state.dataInfo, this.state.pageSize);
      let _currentPage = getCorrectPage(_pageSize, this.state.currentPage);
      this.setState({ pageSize: _pageSize, currentPage: _currentPage, lastPage: _lastPage });
    }
  }

  setSelectedRow(row) {
    let oldSelectedRow = this.state.selectedRow;
    if (oldSelectedRow) {
      oldSelectedRow.tableData.selected = false;
    }
    row.tableData.selected = true;
    this.setState({selectedRow: row});
  }

  scrollToSelectedRow() {
    let selectedRow = this.state.selectedRow;
    if (selectedRow) {
      let rowId = selectedRow.tableData.domId;
      if (rowId) {
        let rowEl = document.getElementById(rowId);
        if (rowEl) {
          rowEl.scrollIntoView({
            block: "center",
            behavior: "smooth",
          });
        }
      }
    }
  }

  componentDidMount() {
    this.scrollToSelectedRow();
  }

  componentDidUpdate() {
    this.scrollToSelectedRow();
  }

  render() {
    const { 
      title,
      data,
      totals,
      dataInfo,
      currentPage,
      lastPage,
      pageSize,
      pageSizeOptions,
      renders
    } = this.state;

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
                  columns={dataInfo.groupColumns}
                  renders={this.state.renders}
                  updateColumnsAndData={this.setColumnsAndData}
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
                  dataSettingsTitle="Порядок отображения данных"
                  groupTitle="Группировка"
                  sortTitle="Сортировка"
                  columnsSettingsTitle="Порядок отображения колонок"
                  renders={renders}
                  updateColumnsAndData={this.setColumnsAndData}
                  updateColumns={this.setColumns}
                  updateData={this.setData}
                />
              </AtnMenu>
              <AtnContent
                dataInfo={dataInfo}
                data={data}
                currentPage={currentPage}
                pageSize={pageSize}
                totals={totals}
                renders={renders}
                updateColumns={this.setColumns}
                updateData={this.setData}
                openTreeLevel={this.openTreeLevel}
                closeTreeLevel={this.closeTreeLevel}
                setSelectedRow={this.setSelectedRow}
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
                currentPage={currentPage}
                lastPage={lastPage}
                setCurrentPage={this.setCurrentPage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}