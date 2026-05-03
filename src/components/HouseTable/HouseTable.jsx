import IconButton from '../IconButton/IconButton'
import { TABLE_MIN_ROWS } from '../../constants/houses'
import './HouseTable.scss'

function getRows(selection) {
  const filledRows = Object.entries(selection)
    .filter(([, apartments]) => apartments.length > 0)
    .map(([entrance, apartments]) => ({
      entrance: Number(entrance),
      apartments,
    }))
    .sort((first, second) => first.entrance - second.entrance)

  const rowsCount = Math.max(TABLE_MIN_ROWS, filledRows.length)

  return Array.from({ length: rowsCount }, (_, index) => {
    return filledRows[index] ?? { entrance: '', apartments: [] }
  })
}

export default function HouseTable({ houseNumber, selection, onClear, onAdd }) {
  const rows = getRows(selection)

  return (
    <section className="house-table" aria-labelledby={`house-${houseNumber}`}>
      <div className="house-table__header">
        <h2 className="house-table__title" id={`house-${houseNumber}`}>
          Дом {houseNumber}
        </h2>

        <div className="house-table__actions">
          <IconButton
            icon="trash"
            label={`Очистить таблицу Дом ${houseNumber}`}
            onClick={onClear}
          />
          <IconButton
            icon="plus"
            label={`Добавить квартиры в Дом ${houseNumber}`}
            onClick={onAdd}
          />
        </div>
      </div>

      <div className="house-table__body">
        <table className="house-table__grid">
          <thead>
            <tr>
              <th>Номер подъезда</th>
              <th>Номер квартиры</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.entrance || 'empty'}-${index}`}>
                <td>{row.entrance}</td>
                <td>{row.apartments.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
