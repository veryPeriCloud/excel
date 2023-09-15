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

  onMousedown(event) {
    const type = event.target.dataset.resize;
    if (type) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const currentCol = $parent.data.col
      const currentRow = $parent.data.row

      const coords = $parent.getCoords();

      const tableHeight = this.$root.$el.offsetHeight;
      const tableWidth = this.$root.$el.offsetWidth;
      let value;

      $resizer.css({
        opacity: 1,
      })

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          value = coords.width + delta

          $resizer.css({
            right: -delta + 'px',
            bottom: -tableHeight + 'px'
          })
        } else {
          const delta = e.pageY - coords.bottom
          value = coords.height + delta

          $resizer.css({
            bottom: -delta + 'px',
            right: -tableWidth + 'px'
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
        if (type === 'col') {
          this.$root
              .findAll(`[data-col="${currentCol}"]`)
              .forEach((col) => {
                col.style.width = value + 'px'
              })
        } else {
          this.$root
              .find(`[data-row="${currentRow}"]`).style.height = value + 'px'
        }

        $resizer.css({
          bottom: 0,
          right: 0,
          opacity: 0,
        });
      }
    }
  }
}
