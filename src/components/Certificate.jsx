import { forwardRef } from 'react'
import Emblem from './Emblem.jsx'
import Guilloche from './Guilloche.jsx'
import Stamp from './Stamp.jsx'
import { AGENCY, REPUBLIC } from '../lib/constants.js'
import { formatDate, formatTime, stampTilt } from '../lib/format.js'
import '../styles/certificate.css'

// Lacre bordó con borde festoneado
function WaxSeal() {
  const points = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2
    const r = i % 2 === 0 ? 48 : 43
    return `${50 + r * Math.cos(angle)},${50 + r * Math.sin(angle)}`
  }).join(' ')

  return (
    <svg className="wax-seal" viewBox="0 0 100 100" aria-hidden="true">
      <polygon points={points} fill="#8C2F39" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#F5F0E5" strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="50" cy="50" r="31" fill="#7A2731" />
      <path d="M50 30 L66 44 L62 44 L62 66 L38 66 L38 44 L34 44 Z" fill="#F5F0E5" fillOpacity="0.85" />
      <rect x="46" y="54" width="8" height="12" fill="#7A2731" />
    </svg>
  )
}

const Certificate = forwardRef(function Certificate({ movement, object }, ref) {
  const day = formatDate(movement.date.slice(0, 10))
  const name = object?.name ?? 'Objeto dado de baja'

  return (
    <article ref={ref} className="certificate" aria-label={`Certificado de traslado ${movement.id}`}>
      <div className="cert-frame">
        <Guilloche className="cert-guilloche cert-guilloche-left" opacity={0.22} />
        <Guilloche className="cert-guilloche cert-guilloche-right" opacity={0.22} />

        <header className="cert-header">
          <Emblem size={64} />
          <p className="cert-republic">{REPUBLIC}</p>
          <p className="cert-agency">{AGENCY}</p>
        </header>

        <h2 className="cert-title">Certificado de traslado</h2>

        <p className="cert-body">
          Se certifica que el objeto <strong>“{name}”</strong>
          {object && (
            <>
              , titular del pasaporte <span className="mono">{object.id}</span>,
            </>
          )}{' '}
          ha sido autorizado para abandonar la jurisdicción de <strong>“{movement.from}”</strong> y
          trasladarse a <strong>“{movement.to}”</strong>.
        </p>

        <p className="cert-reason">Motivo declarado: “{movement.reason}”.</p>

        <dl className="cert-facts">
          <div>
            <dt>Estado</dt>
            <dd className="cert-approved">Aprobado</dd>
          </div>
          <div>
            <dt>Expediente</dt>
            <dd className="mono">{movement.id}</dd>
          </div>
          <div>
            <dt>Fecha de emisión</dt>
            <dd>
              {day}, {formatTime(movement.date)}
            </dd>
          </div>
        </dl>

        <footer className="cert-footer">
          <div className="cert-signature">
            <svg viewBox="0 0 160 50" aria-hidden="true" className="cert-scribble">
              <path
                d="M6 34 C 20 6, 30 44, 42 22 S 58 10, 62 30 S 80 40, 92 18 C 98 8, 104 36, 116 26 S 140 20, 154 30"
                fill="none"
                stroke="#1e3a8a"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span className="cert-signer">Director Nacional de Migraciones Objetuales</span>
          </div>

          <div className="cert-seals">
            <WaxSeal />
            <Stamp
              className="cert-stamp"
              title="TRASLADO AUTORIZADO"
              lines={[day, `A ${movement.to.toUpperCase()}`]}
              footer={movement.id}
              tilt={stampTilt(movement.id + 'cert', 10)}
              size={128}
              animate
              delay={0.85}
            />
          </div>
        </footer>

        <p className="cert-disclaimer">
          Este documento carece de validez legal, pero posee absoluta validez doméstica.
        </p>
      </div>
    </article>
  )
})

export default Certificate
