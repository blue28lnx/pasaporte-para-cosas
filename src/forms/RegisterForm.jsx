import { useState } from 'react'
import Field from './Field.jsx'
import RoomSelect, { resolveRoom } from './RoomSelect.jsx'
import { CATEGORIES, EMOJI_SUGGESTIONS } from '../lib/constants.js'
import { todayISO } from '../lib/format.js'

const SAME_AS_ORIGIN = '__origen__'

const initialState = () => ({
  name: '',
  category: '',
  emoji: '',
  origin: { choice: '', custom: '' },
  location: { choice: SAME_AS_ORIGIN, custom: '' },
  issuedAt: todayISO(),
})

function countGraphemes(text) {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return [...new Intl.Segmenter('es', { granularity: 'grapheme' }).segment(text)].length
  }
  return Array.from(text).length
}

function validate(form) {
  const errors = {}
  const name = form.name.trim()
  if (!name) errors.name = 'Escribí el nombre del objeto.'
  else if (name.length < 2) errors.name = 'El nombre debe tener al menos 2 caracteres.'
  else if (name.length > 40) errors.name = 'El nombre no puede superar los 40 caracteres.'

  if (!form.category) errors.category = 'Elegí una categoría.'

  const emoji = form.emoji.trim()
  if (!emoji) errors.emoji = 'Elegí un emoji que sirva de fotografía.'
  else if (countGraphemes(emoji) > 1) errors.emoji = 'Usá un solo emoji.'
  else if (/^[\p{L}\p{N}\s]+$/u.test(emoji)) errors.emoji = 'Eso no parece un emoji.'

  if (!resolveRoom(form.origin)) errors.origin = 'Indicá el lugar de origen del objeto.'
  if (form.location.choice !== SAME_AS_ORIGIN && !resolveRoom(form.location)) {
    errors.location = 'Indicá dónde está el objeto ahora.'
  }

  if (!form.issuedAt) errors.issuedAt = 'Indicá la fecha de emisión.'
  else if (form.issuedAt > todayISO()) errors.issuedAt = 'La fecha de emisión no puede ser futura.'

  return errors
}

export default function RegisterForm({ onSubmit, nextNumber }) {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key, value) => {
    const next = { ...form, [key]: value }
    setForm(next)
    if (submitted) setErrors(validate(next))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    setSubmitted(true)
    if (Object.keys(found).length > 0) {
      const first = e.currentTarget.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }
    const origin = resolveRoom(form.origin)
    const location = form.location.choice === SAME_AS_ORIGIN ? origin : resolveRoom(form.location)
    onSubmit({
      name: form.name,
      category: form.category,
      emoji: form.emoji.trim(),
      origin,
      location,
      issuedAt: form.issuedAt,
    })
  }

  return (
    <form className="gov-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="gov-fieldset">
        <legend>
          <span className="legend-index">A</span> Identidad del objeto
        </legend>

        <Field id="name" label="Nombre del objeto" error={errors.name} hint="Como lo llaman en la casa.">
          {(props) => (
            <input
              {...props}
              type="text"
              maxLength={40}
              placeholder="Ej.: Taza de café"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
            />
          )}
        </Field>

        <Field id="category" label="Categoría" error={errors.category}>
          {(props) => (
            <select {...props} value={form.category} onChange={(e) => update('category', e.target.value)}>
              <option value="">Elegí una categoría</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id="emoji"
          label="Fotografía (emoji representativo)"
          error={errors.emoji}
          hint="Tocá uno de la lista o escribí el tuyo."
          className="field-wide"
        >
          {(props) => (
            <div className="emoji-picker">
              <input
                {...props}
                type="text"
                className="emoji-input"
                maxLength={8}
                placeholder="?"
                value={form.emoji}
                onChange={(e) => update('emoji', e.target.value)}
              />
              <div className="emoji-grid" role="group" aria-label="Emojis sugeridos">
                {EMOJI_SUGGESTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`emoji-option${form.emoji === emoji ? ' is-selected' : ''}`}
                    aria-pressed={form.emoji === emoji}
                    onClick={() => update('emoji', emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Field>
      </fieldset>

      <fieldset className="gov-fieldset">
        <legend>
          <span className="legend-index">B</span> Domicilio
        </legend>

        <Field id="origin" label="Lugar de origen" error={errors.origin} hint="Donde vive habitualmente.">
          {(props) => (
            <RoomSelect value={form.origin} onChange={(v) => update('origin', v)} inputProps={props} />
          )}
        </Field>

        <Field id="location" label="Ubicación actual" error={errors.location}>
          {(props) => (
            <div className="room-select">
              <select
                {...props}
                value={form.location.choice === SAME_AS_ORIGIN ? SAME_AS_ORIGIN : 'otra'}
                onChange={(e) =>
                  update(
                    'location',
                    e.target.value === SAME_AS_ORIGIN
                      ? { choice: SAME_AS_ORIGIN, custom: '' }
                      : { choice: '', custom: '' },
                  )
                }
              >
                <option value={SAME_AS_ORIGIN}>La misma que el origen</option>
                <option value="otra">Está en otro lugar</option>
              </select>
              {form.location.choice !== SAME_AS_ORIGIN && (
                <RoomSelect
                  value={form.location}
                  onChange={(v) => update('location', v)}
                  inputProps={{ 'aria-label': 'Habitación actual' }}
                  placeholder="¿En qué habitación está?"
                />
              )}
            </div>
          )}
        </Field>
      </fieldset>

      <fieldset className="gov-fieldset">
        <legend>
          <span className="legend-index">C</span> Datos del documento
        </legend>

        <Field id="issuedAt" label="Fecha de emisión" error={errors.issuedAt}>
          {(props) => (
            <input
              {...props}
              type="date"
              max={todayISO()}
              value={form.issuedAt}
              onChange={(e) => update('issuedAt', e.target.value)}
            />
          )}
        </Field>

        <div className="field field-readonly">
          <span className="field-label">Número de pasaporte asignado</span>
          <span className="readonly-value mono">{nextNumber}</span>
          <p className="field-hint">Se asigna automáticamente al emitir.</p>
        </div>
      </fieldset>

      <div className="form-footer">
        <p className="form-oath">
          Declaro bajo juramento doméstico que los datos consignados son verdaderos y que el objeto no
          tiene antecedentes de pérdida intencional.
        </p>
        <button type="submit" className="btn btn-primary btn-lg">
          Emitir pasaporte
        </button>
      </div>
    </form>
  )
}
