import { OTHER, ROOMS } from '../lib/constants.js'

// Selector de habitación con opción "Otro" que habilita un texto libre.
// value: { choice, custom }
export default function RoomSelect({ value, onChange, exclude, inputProps, placeholder = 'Elegí una habitación' }) {
  const rooms = ROOMS.filter((r) => r !== exclude)

  return (
    <div className="room-select">
      <select
        {...inputProps}
        value={value.choice}
        onChange={(e) => onChange({ ...value, choice: e.target.value })}
      >
        <option value="">{placeholder}</option>
        {rooms.map((room) => (
          <option key={room} value={room}>
            {room}
          </option>
        ))}
        <option value={OTHER}>Otro…</option>
      </select>
      {value.choice === OTHER && (
        <input
          type="text"
          className="room-custom"
          aria-label="Nombre del lugar"
          placeholder="Ej.: Lavadero, Auto, Balcón"
          maxLength={30}
          value={value.custom}
          onChange={(e) => onChange({ ...value, custom: e.target.value })}
        />
      )}
    </div>
  )
}

export function resolveRoom({ choice, custom }) {
  if (choice === OTHER) {
    const text = custom.trim()
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : ''
  }
  return choice
}
