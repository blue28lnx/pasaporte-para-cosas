import { forwardRef } from 'react'
import Emblem from './Emblem.jsx'
import Guilloche from './Guilloche.jsx'
import Stamp from './Stamp.jsx'
import { NATIONALITY, REPUBLIC, categoryLabel } from '../lib/constants.js'
import { buildMrz, formatDate } from '../lib/format.js'
import '../styles/passport.css'

function DataField({ es, en, children, className = '' }) {
  return (
    <div className={`pp-field ${className}`}>
      <span className="pp-label">
        {es} <i>/ {en}</i>
      </span>
      <span className="pp-value">{children}</span>
    </div>
  )
}

// Página de datos del pasaporte, con guilloché, microtexto, firma, sello de emisión y MRZ.
const PassportDocument = forwardRef(function PassportDocument({ object }, ref) {
  const [mrz1, mrz2] = buildMrz(object)
  const atHome = object.location === object.origin

  return (
    <article ref={ref} className="passport" aria-label={`Pasaporte de ${object.name}`}>
      <Guilloche className="pp-guilloche" />
      <div className="pp-microtext" aria-hidden="true">
        {'REPUBLICADOMESTICA·ORDENYLUGAR·'.repeat(12)}
      </div>

      <header className="pp-header">
        <Emblem size={58} />
        <div className="pp-header-text">
          <span className="pp-republic">{REPUBLIC}</span>
          <h2 className="pp-title">Pasaporte</h2>
        </div>
        <div className="pp-header-meta">
          <DataField es="Tipo" en="Type">P</DataField>
          <DataField es="Código" en="Code">DOM</DataField>
        </div>
      </header>

      <div className="pp-body">
        <div className="pp-photo-col">
          <div className="pp-photo">
            <span aria-hidden="true">{object.emoji}</span>
          </div>
          <div className="pp-signature">
            <span className="pp-signature-ink">{object.name}</span>
            <span className="pp-label">
              Firma del titular <i>/ Holder’s signature</i>
            </span>
          </div>
        </div>

        <div className="pp-data">
          <DataField es="Número de pasaporte" en="Passport No." className="pp-number">
            <span className="mono">{object.id}</span>
          </DataField>
          <DataField es="Nombre" en="Name" className="pp-span-2 pp-name">
            {object.name}
          </DataField>
          <DataField es="Categoría" en="Category">
            {categoryLabel(object.category)}
          </DataField>
          <DataField es="Nacionalidad" en="Nationality">
            {NATIONALITY}
          </DataField>
          <DataField es="Lugar de origen" en="Place of origin">
            {object.origin}
          </DataField>
          <DataField es="Ubicación actual" en="Current location" className="pp-location">
            {object.location}
          </DataField>
          <DataField es="Fecha de emisión" en="Date of issue">
            {formatDate(object.issuedAt)}
          </DataField>
          <DataField es="Estado migratorio" en="Status">
            <span className={`pp-status ${atHome ? 'is-home' : 'is-abroad'}`}>{object.status}</span>
          </DataField>
        </div>

        <span className="pp-ghost" aria-hidden="true">
          {object.emoji}
        </span>
        <span className="pp-perforation mono" aria-hidden="true">
          {object.id.replace('-', '')}
        </span>
      </div>

      <Stamp
        className="pp-issue-stamp"
        title="PASAPORTE EMITIDO"
        lines={[formatDate(object.issuedAt), 'VENTANILLA 1']}
        ink="mid"
        size={118}
        tilt={-12}
      />

      <div className="pp-mrz mono" aria-label="Zona de lectura mecánica">
        <span>{mrz1}</span>
        <span>{mrz2}</span>
      </div>
    </article>
  )
})

export default PassportDocument
