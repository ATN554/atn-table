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

    if (!column.id || !column.service) {
      column.id = column_idx + 1;
    }

    column.type = column.type || 'text'; // 'text', 'number', 'date'
    column.align = column.align || 'left'; // 'left', 'center', 'right'
    column.service = column.service !== undefined ? column.service : false;
    column.width = column.width !== undefined ? column.width : 0;

    column.dnd = column.dnd || {};
    column.dnd.droppable = column.dnd.droppable !== undefined ? column.dnd.droppable : true;
    column.dnd.headDroppableId = getUID();
    column.dnd.sortDroppableId = getUID();
    column.dnd.groupDroppableId = getUID();
    column.dnd.groupBarDroppableId = getUID();
    column.dnd.draggable = column.dnd.draggable !== undefined ? column.dnd.draggable : true;
    column.dnd.headDraggableId = getUID();
    column.dnd.sortDraggableId = getUID();
    column.dnd.groupDraggableId = getUID();
    column.dnd.groupBarDraggableId = getUID();

    column.visibility = column.visibility || {};
    column.visibility.locked = column.visibility.locked !== undefined ? column.visibility.locked : false;
    column.visibility.visible = column.visibility.visible !== undefined ? column.visibility.visible : true;

    column.group = column.group || {};
    column.group.locked = column.group.locked !== undefined ? column.group.locked : false;
    column.group.id = column.group.id || 0; // 1, 2, ...
    column.group.order = column.group.order || 'asc'; // 'asc', 'desc'

    column.sort = column.sort || {};
    column.sort.locked = column.sort.locked !== undefined ? column.sort.locked : false;
    column.sort.id = column.sort.id || undefined; // 1, 2, ...
    column.sort.order = column.sort.order || undefined; // 'asc', 'desc'
    column.sort.comparator = column.sort.comparator || compareValues; // data1, data2, column

    column.filter = column.filter || {};
    column.filter.locked = column.filter.locked !== undefined ? column.filter.locked : false;
    column.filter.values = column.filter.values || [{ value: undefined, type: undefined }];
  });

  let fix_columns = columns.filter((col) => col.group.id > 0);
  fix_columns = sortColumns(fix_columns, [['group', 'id']]);
  fix_columns.forEach((column, column_idx) => {
    column.group.id = column_idx + 1;
  });

  fix_columns = columns.filter((col) => !col.service);
  fix_columns = sortColumns(fix_columns, [['id']]);
  fix_columns.forEach((column, column_idx) => {
    if (column.id > 0) {
      column.id = column_idx + 1;
    }
  });

  fix_columns = sortColumns(fix_columns, [['group', 'id'], ['sort', 'id'], ['id']]);
  fix_columns.forEach((column, column_idx) => {
    column.sort.id = column_idx + 1;
  });

  return columns;
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
  let _columns = columns.slice(0);
  _columns = _columns.sort(function (column1, column2) {
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
  if (_value !== undefined) {
    if (_type === "number") {
      _value = Number(_value);
    } else if (_type === "date") {
      let _format = column.format || "DD.MM.YYYY";
      _value = Moment(_value, _format).toDate();
    }
  }
  return _value;
}

function compareValues(value1, value2, column) {
  let _value1 = getValue(value1, column);
  let _value2 = getValue(value2, column);
  if (column.group.id > 0) {
    if (_value1 === undefined && _value2 === undefined) {
      return 0;
    } else if (_value1 === undefined) {
      return column.group.order === "asc" ? -1 : 1;
    } else if (_value2 === undefined) {
      return column.group.order === "asc" ? 1 : -1;
    } else if (_value1 > _value2) {
      return column.group.order === "asc" ? 1 : -1;
    } else if (_value1 < _value2) {
      return column.group.order === "asc" ? -1 : 1;
    }
  } else {
    if (column.sort.order === 'asc' || column.sort.order === 'desc') {
      if (_value1 === undefined && _value2 === undefined) {
        return 0;
      } else if (_value1 === undefined) {
        return column.sort.order === "asc" ? -1 : 1;
      } else if (_value2 === undefined) {
        return column.sort.order === "asc" ? 1 : -1;
      } else if (_value1 > _value2) {
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
  data = fillDataGroupsInfo(data, _columns);
  return data;
}

function fillDataGroupsInfo(rows, columns) {
  let compare_keys = columns.filter(col => col.group.id > 0);
  let ckcnt = compare_keys.length;
  if (ckcnt === 0) {
    rows.forEach((row, row_idx) => {
      if (!row.tableData) {
        row.tableData = {};
      }
      row.tableData.id = row_idx;
      row.tableData.group = row.tableData.group || {};
      row.tableData.group.new = false;
      row.tableData.group.open = true;
    });
  } else {
    let prevRow = { tableData: {group: {id: -1}} };
    rows.forEach((row, row_idx) => {
      if (!row.tableData) {
        row.tableData = {};
      }
      row.tableData.id = row_idx;
      let level;
      let same = true;
      let compare_key;
      for (level = 0; level < ckcnt; level++) {
        compare_key = compare_keys[level];
        let field = compare_key.field;
        let comparator = compare_key.sort.comparator;
        let result = comparator(prevRow[field], row[field], compare_key);
        if (result !== 0) {
          same = false;
          break;
        }
      }
      if (same) {
        row.tableData.group = row.tableData.group || {};
        row.tableData.group.new = false;
        row.tableData.group.open = prevRow.tableData.group.open;
        row.tableData.group.id = prevRow.tableData.group.id;
        row.tableData.group.level = prevRow.tableData.group.level;
      } else {
        row.tableData.group = row.tableData.group || {};
        row.tableData.group.new = true;
        row.tableData.group.open = row.tableData.group.open || true;
        row.tableData.group.id = level === 0 ? prevRow.tableData.group.id + 1 : prevRow.tableData.group.id;
        row.tableData.group.title = row[compare_key.field] + ". id: " + row.tableData.group.id + ". level: " + level;
        row.tableData.group.level = level;
      }

      prevRow = row;
    });
  }
  return rows;
}

function clearValue(value) {
  return value.replace(new RegExp(";", "g"), ",");
}

/* 
Разделитель строки \n
Разделитель колонок ;
*/
function saveToFile(filename, text) {
  var universalBOM = "\uFEFF";
  var blob = new Blob([universalBOM + text], { type: "text/plain;charset=utf-8" });
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
