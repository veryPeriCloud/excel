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
      console.log($resizer)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const currentCol = $parent.$el.textContent.trim();
      const cols = document.querySelectorAll(`[data-col="${currentCol}"]`)
      const coords = $parent.getCoords();

      document.onmousemove = (e) => {
        if (type === 'col') {
          const delta = e.pageX - coords.right
          const value = coords.width + delta
          $parent.$el.style.width = value + 'px'
          $parent.$el.classList.add('resize');

          cols.forEach((col) =>{
            col.style.width = value + 'px';
            col.classList.add('resize')
          })
        } else {
          const delta = e.pageY - coords.bottom
          const value = coords.height + delta
          $parent.$el.style.height = value + 'px'
          $parent.$el.classList.add('resize');
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        $parent.$el.classList.remove('resize');
        cols.forEach((col) =>{
          col.classList.remove('resize')
        })
      }
    }
  }
}
