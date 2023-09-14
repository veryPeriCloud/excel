import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }

  toHTML() {
    return createTable(30)
  }
  // Определяю начальные координаты x, y
  onMousedown(event) {
    const type = event.target.dataset.resize;
    if (type) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const currentCol = $parent.data.col
      const currentRow = $parent.data.row

      const cols = this.$root.findAll(`[data-col="${currentCol}"]`)
      const row = this.$root.find(`[data-row="${currentRow}"]`)
      const coords = $parent.getCoords();

      const tableHeight = this.$root.$el.offsetHeight;
      const tableWidth = this.$root.$el.offsetWidth;

      let value;
      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          value = coords.width + delta

          $resizer.$el.style.right = `-${delta}px`;
          $resizer.$el.style.bottom = `-${tableHeight}px`
        } else if (type === 'row') {
          const delta = e.pageY - coords.bottom
          value = coords.height + delta

          $resizer.$el.style.bottom = `-${delta}px`
          $resizer.$el.style.right = `-${tableWidth}px`
        }
        $resizer.$el.classList.add('resize');
        return value
      }

      document.onmouseup = () => {
        if (type === 'col') {
          cols.forEach((col) => {
            col.style.width = value + 'px'
          })
        } else if (type === 'row') {
          row.style.height = value + 'px'
        }
        $resizer.$el.style.bottom = 0
        $resizer.$el.style.right = 0
        $resizer.$el.classList.remove('resize')
        document.onmousemove = null
      }
    }
  }
}
