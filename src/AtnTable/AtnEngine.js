import getUID from "../UID/uid.js";
import Moment from 'moment';

export function fillColumnsTableData(columns) {
  let hasActionColumn = columns.findIndex((col) => col.field === '#ACTION_COLUMN') !== -1;
  let hasGroupColumn = columns.findIndex((col) => col.field === '#GROUP_COLUMN') !== -1;

  if (!hasActionColumn) {
    let actionColumn = {
      title: "Действия",
      field: "#ACTION_COLUMN",
      width: 90,
      visible: false,
      groupable: false,
      sortable: true,
      draggable: false,
      tableData: { id: -2 }
    };
    columns.push(actionColumn);
  }
  if (!hasGroupColumn) {
    let groupColumn = {
      title: "Группа",
      field: "#GROUP_COLUMN",
      width: 90,
      visible: false,
      groupable: false,
      sortable: true,
      draggable: false,
      tableData: { id: -1 }
    };
    columns.push(groupColumn);
  }

  columns.forEach((column, column_idx) => {
    if (!column.tableData) {
      column.tableData = {};
    }

    column.type = column.type || 'text'; // 'text', 'number', 'date'
    column.align = column.align || 'left'; // 'left', 'center', 'right'
    column.visible = column.visible !== undefined ? column.visible : true;
    column.groupable = column.groupable !== undefined ? column.groupable : true;
    column.sortable = column.sortable !== undefined ? column.sortable : true;
    column.draggable = column.draggable !== undefined ? column.draggable : true;

    if (!column.tableData.id || column.tableData.id > 0) {
      column.tableData.id = column_idx + 1;
    }
    column.tableData.droppableId = getUID();
    column.tableData.draggableId = getUID();

    column.tableData.group = column.tableData.group || {};
    column.tableData.group.id = column.tableData.group.id || undefined; // 1, 2, ...
    column.tableData.group.order = column.tableData.group.order || undefined; // 'asc', 'desc'

    column.tableData.sort = column.tableData.sort || {};
    column.tableData.sort.id = column.tableData.sort.id || undefined; // 1, 2, ...
    column.tableData.sort.order = column.tableData.sort.order || undefined; // 'asc', 'desc'
    column.tableData.sort.comparator = column.tableData.sort.comparator || compareValues; // data1, data2, column

    column.tableData.filter = column.tableData.filter || [{ value: undefined, type: undefined }];
  });
  return reorderColumns(columns, [['group', 'id'], ['id']]);
}

export function fillRowsTableData(rows, columns) {
  rows.forEach((row, row_idx) => {
    if (!row.tableData) {
      row.tableData = {};
    }

    row.tableData.id = (row_idx + 1);

    row.tableData.group = row.tableData.group || {};
    row.tableData.group.id = row.tableData.group.id || undefined;
    row.tableData.group.title = row.tableData.group.title || undefined;
    row.tableData.group.level = row.tableData.group.level || undefined;
    row.tableData.group.open = row.tableData.group.open || undefined;
  });
  return sortRows(rows, columns);
}

function compareColumns(column1, column2, key) {
  let value1 = column1.tableData;
  key.forEach((k) => { value1 = value1[k]; });
  let value2 = column2.tableData;
  key.forEach((k) => { value2 = value2[k]; });

  if (value1 && !value2) {
    return 1;
  } else if (!value1 && value2) {
    return -1;
  } else if (value1 && value2) {
    return value1 - value2;
  }
  return 0;
}

export function reorderColumns(columns, keys) {
  columns.sort(function (column1, column2) {
    let result = 0;
    let i = 0;
    let ii = keys.length;
    while (i < ii && result === 0) {
      result = compareColumns(column1, column2, keys[i]);
      i++;
    }
    return result;
  });
  return columns;
}

function getValue(value, column) {
  let _type = column.type;
  let _value = value;
  if (_type === "number") {
    _value = Number(_value);
  } else if (_type === "date") {
    let _format = column.format || "DD.MM.YYYY";
    _value = Moment(_value, _format).toDate();
  }
  return _value;
}

function compareValues(value1, value2, column) {
  let _value1 = getValue(value1, column);
  let _value2 = getValue(value2, column);
  if (column.tableData.group.id) {
    if (_value1 > _value2) {
      return column.tableData.group.order === "asc" ? 1 : -1;
    } else if (_value1 < _value2) {
      return column.tableData.group.order === "asc" ? -1 : 1;
    }
  } else {
    if (column.tableData.sort.id) {
      if (_value1 > _value2) {
        return column.tableData.sort.order === "asc" ? 1 : -1;
      } else if (_value1 < _value2) {
        return column.tableData.sort.order === "asc" ? -1 : 1;
      }
    }
  }
  return 0;
}

function compareRows(row1, row2, columns) {
  let result = 0;
  let i = 0;
  let ii = columns.length;
  while (i < ii && result === 0) {
    let column = columns[i];
    let field = column.field;
    let comparator = column.tableData.sort.comparator;
    result = comparator(row1[field], row2[field], column);
    i++;
  }
  return result;
}

export function sortRows(rows, columns) {
  let _columns = columns.slice(0);
  _columns = reorderColumns(_columns, [['group', 'id'], ['sort', 'id'], ['id']]);
  rows.sort(function (row1, row2) {
    return compareRows(row1, row2, _columns);
  });
  return rows;
}