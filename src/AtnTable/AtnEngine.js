import getUID from "../UID/uid.js";
import Moment from 'moment';

export function nvl(value, placer) {
  return value === undefined ? placer : value;
}

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

    column.type = nvl(column.type, 'text'); // 'text', 'number', 'date'
    column.align = nvl(column.align, 'left'); // 'left', 'center', 'right'
    column.service = nvl(column.service, false);
    column.width = nvl(column.width, 0);

    column.dnd = nvl(column.dnd, {});
    column.dnd.droppable = nvl(column.dnd.droppable, true);
    column.dnd.headDroppableId = getUID();
    column.dnd.sortDroppableId = getUID();
    column.dnd.groupDroppableId = getUID();
    column.dnd.groupBarDroppableId = getUID();
    column.dnd.draggable = nvl(column.dnd.draggable, true);
    column.dnd.headDraggableId = getUID();
    column.dnd.sortDraggableId = getUID();
    column.dnd.groupDraggableId = getUID();
    column.dnd.groupBarDraggableId = getUID();

    column.visibility = nvl(column.visibility, {});
    column.visibility.locked = nvl(column.visibility.locked, false);
    column.visibility.visible = nvl(column.visibility.visible, true);

    column.group = nvl(column.group, {});
    column.group.locked = nvl(column.group.locked, false);
    column.group.id = nvl(column.group.id, 0); // 1, 2, ...
    column.group.order = nvl(column.group.order, 'asc'); // 'asc', 'desc'

    column.sort = nvl(column.sort, {});
    column.sort.locked = nvl(column.sort.locked, false);
    column.sort.id = nvl(column.sort.id, 0); // 1, 2, ...
    column.sort.order = nvl(column.sort.order, undefined); // 'asc', 'desc'
    column.sort.comparator = nvl(column.sort.comparator, compareValues); // data1, data2, column

    column.filter = nvl(column.filter, {});
    column.filter.locked = nvl(column.filter.locked, false);
    column.filter.values = nvl(column.filter.values, [{ value: undefined, type: undefined }]);
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
  let _columns = columns.filter(col => col.group.id > 0);
  let ckcnt = _columns.length;
  if (ckcnt === 0) {
    rows.forEach((row, row_idx) => {
      if (!row.tableData) {
        row.tableData = {};
      }
      row.tableData.id = row_idx;
      row.tableData.plain = true;
      row.tableData.group = [];
    });
  } else {
    let prevRow = {};
    rows.forEach((row, row_idx) => {
      if (!row.tableData) {
        row.tableData = {};
      }
      row.tableData.id = row_idx;
      row.tableData.plain = false;
      if (!row.tableData.group) {
        row.tableData.group = [];
      }

      let groupf;
      let gpcnt = row.tableData.group.length;
      for (let i = gpcnt - 1; i >= 0; i--) {
        groupf = row.tableData.group[i];
        let _col = _columns[i];
        if (!_col || groupf.field !== _col.field) {
          row.tableData.group = row.tableData.group.slice(0, i);
        }
      }

      let level;
      let same = true;
      let _column;
      for (level = 0; level < ckcnt; level++) {
        _column = _columns[level];
        let field = _column.field;
        let comparator = _column.sort.comparator;
        let result = comparator(prevRow[field], row[field], _column);
        if (result !== 0) {
          same = false;
          break;
        }
      }

      row.tableData.new = !same;
      row.tableData.level = level;
      _columns.forEach((col, col_index) => {
        let field = col.field;
        if (col_index < level) {
          row.tableData.group[col_index] = prevRow.tableData.group[col_index];
        } else {
          row.tableData.group[col_index] = row.tableData.group[col_index] || { field: field, open: false }
        }
      });

      groupf = row.tableData.group[0];
      groupf.show = true;
      let prevOpen = groupf.open;
      let prevShow = groupf.show;
      for (let i = 1; i < ckcnt; i++) {
        groupf = row.tableData.group[i];
        groupf.show = (prevOpen && prevShow);
        prevOpen = groupf.open;
        prevShow = groupf.show;
      }

      row.tableData.show = true;
      for (let i = 0; i < ckcnt; i++) {
        groupf = row.tableData.group[i];
        if (!groupf.open || !groupf.show) {
          row.tableData.show = false;
          break;
        }
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
