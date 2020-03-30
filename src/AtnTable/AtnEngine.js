import getUID from "../UID/uid.js";
import Moment from 'moment';

export function fillColumnsTableData(columns) {
  let hasActionColumn = columns.findIndex((col) => col.field === '#ACTION_COLUMN') !== -1;
  let hasGroupColumn = columns.findIndex((col) => col.field === '#GROUP_COLUMN') !== -1;

  if (!hasActionColumn) {
    let actionColumn = {
      id: -2,
      title: "Действия",
      field: "#ACTION_COLUMN",
      width: 90,
      service: true,
      dnd: { droppable: false, draggable: false },
      visibility: { visible: false, locked: true },
      group: { locked: true },
      sort: { locked: true },
      filter: { locked: true },
    };
    columns.push(actionColumn);
  }
  if (!hasGroupColumn) {
    let groupColumn = {
      id: -1,
      title: "Группа",
      field: "#GROUP_COLUMN",
      width: 90,
      service: true,
      dnd: { droppable: false, draggable: false },
      visibility: { visible: false, locked: true },
      group: { locked: true },
      sort: { locked: true },
      filter: { locked: true },
    };
    columns.push(groupColumn);
  }

  columns.forEach((column, column_idx) => {
    if (!column) {
      column = {};
    }

    if (!column.id || column.id > 0) {
      column.id = column_idx + 1;
    }

    column.type = column.type || 'text'; // 'text', 'number', 'date'
    column.align = column.align || 'left'; // 'left', 'center', 'right'
    column.service = column.service !== undefined ? column.service : false;
    column.width = column.width !== undefined ? column.width : 0;

    column.dnd = column.dnd || {};
    column.dnd.droppable = column.dnd.droppable !== undefined ? column.dnd.droppable : true;
    column.dnd.droppableId = getUID();
    column.dnd.draggable = column.dnd.draggable !== undefined ? column.dnd.draggable : true;
    column.dnd.draggableId = getUID();

    column.visibility = column.visibility || {};
    column.visibility.locked = column.visibility.locked !== undefined ? column.visibility.locked : false;
    column.visibility.visible = column.visibility.visible !== undefined ? column.visibility.visible : true;

    column.group = column.group || {};
    column.group.locked = column.group.locked !== undefined ? column.group.locked : false;
    column.group.id = column.group.id || undefined; // 1, 2, ...
    column.group.order = column.group.order || undefined; // 'asc', 'desc'

    column.sort = column.sort || {};
    column.sort.locked = column.sort.locked !== undefined ? column.sort.locked : false;
    column.sort.id = column.sort.id || undefined; // 1, 2, ...
    column.sort.order = column.sort.order || undefined; // 'asc', 'desc'
    column.sort.comparator = column.sort.comparator || compareValues; // data1, data2, column

    column.filter = column.filter || {};
    column.filter.locked = column.filter.locked !== undefined ? column.filter.locked : false;
    column.filter.values = column.filter.values || [{ value: undefined, type: undefined }];
  });
  return columns;
}

export function fillRowsTableData(rows) {
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
  return rows;
}

function compareColumns(column1, column2, key) {
  let value1 = column1;
  key.forEach((k) => { value1 = value1[k]; });
  let value2 = column2;
  key.forEach((k) => { value2 = value2[k]; });

  if (value1 && !value2) {
    return -1;
  } else if (!value1 && value2) {
    return 1;
  } else if (value1 && value2) {
    return value1 - value2;
  }
  return 0;
}

export function sortColumns(columns, keys = [['service'], ['group', 'id'], ['id']]) {
  let _columns = columns.slice(0).sort(function (column1, column2) {
    let result = 0;
    let i = 0;
    let ii = keys.length;
    while (i < ii && result === 0) {
      result = compareColumns(column1, column2, keys[i]);
      i++;
    }
    return result;
  });
  return _columns;
}

export function getValue(value, column) {
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
  if (column.group.id) {
    if (_value1 > _value2) {
      return column.group.order === "asc" ? 1 : -1;
    } else if (_value1 < _value2) {
      return column.group.order === "asc" ? -1 : 1;
    }
  } else {
    if (column.sort.id) {
      if (_value1 > _value2) {
        return column.sort.order === "asc" ? 1 : -1;
      } else if (_value1 < _value2) {
        return column.sort.order === "asc" ? -1 : 1;
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
    let comparator = column.sort.comparator;
    result = comparator(row1[field], row2[field], column);
    i++;
  }
  return result;
}

export function sortData(data, columns) {
  let _columns = sortColumns(columns, [['service'], ['group', 'id'], ['sort', 'id'], ['id']]);
  data.sort(function (row1, row2) {
    return compareRows(row1, row2, _columns);
  });
  return data;
}

function clearValue(value) {
  return value.replace(new RegExp(";","g"), ",");
}

/* 
Разделитель строки \n
Разделитель колонок ;
*/
function saveToFile(filename, text) {
  var universalBOM = "\uFEFF";
  var blob = new Blob([universalBOM+text], { type: "text/plain;charset=utf-8" });
  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
