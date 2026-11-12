import { useState } from 'react'
import Field from './Field.jsx'
import RoomSelect, { resolveRoom } from './RoomSelect.jsx'
import { REASON_SUGGESTIONS } from '../lib/constants.js'

const emptyDestination = { choice: '', custom: '' }

function validate({ object, destination, reason }) {
  const errors = {}
  if (!object) errors.object = 'Elegí el objeto que quiere trasladarse.'
  const to = resolveRoom(destination)
  if (!to) errors.destination = 'Indicá el lugar de destino.'
  else if (object && to.toLowerCase() === object.location.toLowerCase()) {
    errors.destination = `El objeto ya está en ${object.location}. Elegí otro destino.`
  }
  const text = reason.trim()
  if (!text) errors.reason = 'Todo traslado necesita un motivo.'
  else if (text.length < 5) errors.reason = 'El motivo debe tener al menos 5 caracteres.'
  else if (text.length > 120) errors.reason = 'El motivo no puede superar los 120 caracteres.'
  return errors
}

export default function TransferForm({ objects, initialObjectId, onSubmit }) {
  const [objectId, setObjectId] = useState(
    objects.some((o) => o.id === initialObjectId) ? initialObjectId : '',
  )
  const [destination, setDestination] = useState(emptyDestination)
  const [reason, setReason] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const object = objects.find((o) => o.id === objectId)

  const revalidate = (patch) => {
    if (!submitted) return
    setErrors(validate({ object, destination, reason, ...patch }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate({ object, destination, reason })
    setErrors(found)
    setSubmitted(true)
    if (Object.keys(found).length > 0) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    onSubmit({ objectId, to: resolveRoom(destination), reason })
    setDestination(emptyDestination)
    setReason('')
    setSubmitted(false)
    setErrors({})
  }

  return (
    <form className="gov-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="gov-fieldset">
        <legend>
          <span className="legend-index">A</span> Solicitante
        </legend>

        <Field id="object" label="Objeto seleccionado" error={errors.object} className="field-wide">
          {(props) => (
            <select
              {...props}
              value={objectId}
              onChange={(e) => {
                setObjectId(e.target.value)
                setDestination(emptyDestination)
                revalidate({ object: objects.find((o) => o.id === e.target.value), destination: emptyDestination })
              }}
            >
              <option value="">Elegí un objeto con pasaporte</option>
              {objects.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.emoji} {o.name} · {o.id}
                </option>
              ))}
            </select>
          )}
        </Field>
      </fieldset>

      <fieldset className="gov-fieldset">
        <legend>
          <span className="legend-index">B</span> Itinerario
        </legend>

        <div className="field field-readonly">
          <span className="field-label">Lugar de origen (ubicación actual)</span>
          <span className="readonly-value">{object ? object.location : 'Elegí un objeto primero'}</span>
        </div>

        <Field id="destination" label="Lugar de destino" error={errors.destination}>
          {(props) => (
            <RoomSelect
              value={destination}
              exclude={object?.location}
              inputProps={{ ...props, disabled: !object }}
              onChange={(v) => {
                setDestination(v)
                revalidate({ destination: v })
              }}
            />
          )}
        </Field>

        <Field
          id="reason"
          label="Motivo del traslado"
          error={errors.reason}
          hint="Podés escribir el tuyo o elegir uno de los habituales."
          className="field-wide"
        >
          {(props) => (
            <div className="room-select">
              <textarea
                {...props}
                maxLength={120}
                placeholder="Ej.: Acompañar un café de madrugada"
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value)
                  revalidate({ reason: e.target.value })
                }}
              />
              <div className="chip-row" role="group" aria-label="Motivos habituales">
                {REASON_SUGGESTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    className="chip"
                    onClick={() => {
                      setReason(r)
                      revalidate({ reason: r })
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Field>
      </fieldset>

      <div className="form-footer">
        <p className="form-oath">
          El objeto se compromete a respetar las costumbres del lugar de destino y a no esconderse
          debajo de ningún mueble.
        </p>
        <button type="submit" className="btn btn-primary btn-lg">
          Solicitar autorización
        </button>
      </div>
    </form>
  )
}
