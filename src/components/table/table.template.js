const CODES = {
  A: 65,
  Z: 90
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col=${index}>
      ${col}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function toCell(_, col) {
  return `
    <div class="cell" contenteditable data-col=${col}></div>
  `
}

function createRow(number, content) {
  const resize = number
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''

  return `
    <div class="row" data-type="resizable" data-row='${number}'>
      <div class="row-info">
        ${number ? number : ''}
        ${resize}
      </div>

      <div class="row-data">
        ${content}
      </div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(0, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    const number = i + 1;
    rows.push(createRow(number, cells))
  }
  return rows.join('')
}
