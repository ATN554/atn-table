import getUID from "../UID/uid.js";
import Moment from 'moment';

export function nvl(value, placer) {
  return value === undefined ? placer : value;
}

export function fillColumnsTableData(columns) {
  let hasActionColumn = columns.some(col => col.field === '#ACTION_COLUMN');
  let hasGroupColumn = columns.some(col => col.field === '#GROUP_COLUMN');

  if (!hasActionColumn) {
    let actionColumn = {
      id: -2,
      title: "Действия",
      field: "#ACTION_COLUMN",
      width: 90,
      service: -2,
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
      service: -1,
      dnd: { droppable: false, draggable: false },
      visibility: { visible: false, locked: true },
      group: { locked: true },
      sort: { locked: true },
      filter: { locked: true },
    };
    columns.push(groupColumn);
  }

  let isTreeData = false;
  let treeColumn = columns.find(col => col.tree);
  if (treeColumn) {
    let parentField = treeColumn.tree.parentField;
    let parentColumn = columns.find(col => col.field === parentField);
    let childField = treeColumn.tree.childField;
    let childColumn = columns.find(col => col.field === childField);
    if (parentColumn && childColumn) {
      isTreeData = true;
      treeColumn.visibility = { visible: true, locked: true };
    }
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
    column.dnd.orderDroppableId = getUID();
    column.dnd.sortDroppableId = getUID();
    column.dnd.groupDroppableId = getUID();
    column.dnd.groupBarDroppableId = getUID();
    column.dnd.draggable = nvl(column.dnd.draggable, true);
    column.dnd.headDraggableId = getUID();
    column.dnd.orderDraggableId = getUID();
    column.dnd.sortDraggableId = getUID();
    column.dnd.groupDraggableId = getUID();
    column.dnd.groupBarDraggableId = getUID();

    column.visibility = nvl(column.visibility, {});
    column.visibility.locked = nvl(column.visibility.locked, false);
    column.visibility.visible = nvl(column.visibility.visible, true);

    if (isTreeData) {
      column.group = { locked: true, id: 0 };
    } else {
      column.group = nvl(column.group, {});
      column.group.locked = nvl(column.group.locked, false);
      column.group.id = nvl(column.group.id, 0); // 1, 2, ...
      column.group.order = nvl(column.group.order, 'asc'); // 'asc', 'desc'
    }

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
  let _sortColumns = _columns.filter(col => !col.service);

  data.forEach((row, row_idx) => {
    if (!row.tableData) {
      row.tableData = {};
    }
  });
  let treeColumn = _columns.find(col => col.tree);
  if (treeColumn) {
    let treeData = [];
    let plainData = data;
    let parentReq = treeColumn.tree.parentField;
    let childReq = treeColumn.tree.childField;
    let parentRow = { tableData: { tid: -1, tree: {level: -1} } };
    parentRow[childReq] = treeColumn.tree.startFrom;
    let _idTB = _sortColumns.findIndex(col => col.tree);
    let _sortColumnsBTB = _sortColumns.slice(0, _idTB+1);
    plainData.sort(function (row1, row2) {
      return compareRows(row1, row2, _sortColumnsBTB);
    });
    treeBuilder(treeData, plainData, parentReq, childReq, parentRow);
    data = fillDataTreeInfo(treeData, _sortColumns);
  } else {
    data.sort(function (row1, row2) {
      return compareRows(row1, row2, _sortColumns);
    });
    data = fillDataGroupsInfo(data, _sortColumns);
  }
  data.forEach((row, row_idx) => {
    row.tableData.id = row_idx;
    row["#ID"] = row.tableData.id;
  });

  return data;
}

export function recalcData(data, columns) {

}

function fillDataGroupsInfo(rows, columns) {
  let _columns = columns.filter(col => col.group.id > 0);
  let ckcnt = _columns.length;
  if (ckcnt === 0) {
    rows.forEach((row, row_idx) => {
      row.tableData.group = [];
    });
  } else {
    let prevRow = { tableData: {gid: -1} };
    rows.forEach((row, row_idx) => {
      row.tableData.gid = prevRow.tableData.gid;
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
          if (level === 0) {
            row.tableData.gid++;
          }
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

function fillDataTreeInfo(rows, columns) {
  let it = rows[Symbol.iterator]();
  let curIt = it.next();
  let row;
  let data = [];
  while (!curIt.done) {
    row = curIt.value;
    if (row.tableData.tree.last) {
      let level = row.tableData.tree.level;
      let lastLevel = [row];
      curIt = it.next();
      while (!curIt.done && curIt.value.tableData.tree.last && curIt.value.tableData.tree.level === level) {
        lastLevel.push(curIt.value);
        curIt = it.next();
      }
      lastLevel.sort(function (row1, row2) {
        return compareRows(row1, row2, columns);
      });
      data = data.concat(lastLevel);
    } else {
      data.push(row);
      curIt = it.next();
    }
  }

  return data;
}

// treeData = []
function treeBuilder(treeData, plainData, parentReq, childReq, parentRow, show) {
  let parentValue = parentRow[childReq];
  let currentLevel = parentRow.tableData.tree.level + 1;
  let parentChilds = false;
  let tid = parentRow.tableData.tid;
  plainData.forEach((row, row_idx) => {
    if (row[parentReq] === parentValue) {
      parentChilds = true;
      if (currentLevel === 0) {
        tid++;
        show = true;
      }
      row.tableData.tid = tid;
      row.tableData.show = show;
      if (!row.tableData.tree) {
        row.tableData.tree = {};
      }
      row.tableData.tree.level = currentLevel;
      row.tableData.tree.open = nvl(row.tableData.tree.open, false);
      treeData.push(row);
      delete plainData[row_idx]; // 1.5 times faster
      let hasSelfChilds = treeBuilder(treeData, plainData, parentReq, childReq, row, show && row.tableData.tree.open);
      row.tableData.tree.last = !hasSelfChilds;
    }
  });
  return parentChilds;
}

export function getLastPage(data, columns, pageSize) {
  if (pageSize === 0) {
    return 0;
  }
  let len;
  let isTree = columns.some(col => col.tree);
  if (isTree) {
    if (data.length === 0) {
      len = 0;
    } else {
      len = data[data.length - 1].tableData.tid;
    }
  } else {
    let hasGroups = columns.some(col => col.group.id > 0);
    if (hasGroups) {
      if (data.length === 0) {
        len = 0;
      } else {
        len = data[data.length-1].tableData.gid;
      }
    } else {
      len = data.length; 
    }
  }
  return len === 0 ? 0 : Math.floor((len-1) / pageSize);
}

export function getCorrectPage(data, columns, pageSize, page) {
  if (page <= 0) {
    return 0;
  } else {
    let lastPage = getLastPage(data, columns, pageSize);
    if (page >= lastPage) {
      return lastPage;
    } else {
      return page;
    }
  }
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
