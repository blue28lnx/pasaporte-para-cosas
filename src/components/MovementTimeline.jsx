import Stamp from './Stamp.jsx'
import { formatDate, formatDateTime, stampTilt } from '../lib/format.js'
import { useInView } from '../hooks/useMotion.js'

// Cada entrada aparece al entrar en pantalla y su sello cae en ese momento.
function Entry({ stamp, children, className = '' }) {
  const [ref, visible] = useInView({ threshold: 0.3 })
  return (
    <li ref={ref} className={`timeline-item ${className}${visible ? ' is-visible' : ''}`}>
      <div className="timeline-stamp">{stamp(visible)}</div>
      <div className="timeline-card">{children}</div>
    </li>
  )
}

const INKS = ['green', 'mid']

// Historial migratorio: línea de tiempo con un sello por cada traslado.
export default function MovementTimeline({ object, movements, onShowCertificate }) {
  const ordered = [...movements].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <section className="history" aria-labelledby="history-title">
      <div className="history-head">
        <h2 id="history-title">Historial migratorio</h2>
        <span>
          {ordered.length === 0
            ? 'Sin traslados registrados'
            : `${ordered.length} ${ordered.length === 1 ? 'traslado registrado' : 'traslados registrados'}`}
        </span>
      </div>

      <ol className="timeline">
        {ordered.map((m, index) => (
          <Entry
            key={m.id}
            stamp={(visible) => (
              <Stamp
                title="TRASLADO AUTORIZADO"
                lines={[formatDate(m.date.slice(0, 10)), `A ${m.to.toUpperCase()}`]}
                footer={m.id}
                tilt={stampTilt(m.id)}
                ink={INKS[index % INKS.length]}
                size={96}
                animate={visible}
                delay={0.2}
              />
            )}
          >
            <p className="timeline-route">
              {m.from}{' '}
              <span className="arrow" aria-label="hacia">
                →
              </span>{' '}
              {m.to}
            </p>
            <div className="timeline-field">
              <span>Fecha y hora</span>
              <span>{formatDateTime(m.date)}</span>
            </div>
            <div className="timeline-field">
              <span>Número de expediente</span>
              <span className="mono">{m.id}</span>
            </div>
            <div className="timeline-field">
              <span>Estado</span>
              <span>Aprobado</span>
            </div>
            <div className="timeline-field timeline-reason">
              <span>Motivo</span>
              <span>“{m.reason}”</span>
            </div>
            {onShowCertificate && (
              <div className="timeline-actions">
                <button type="button" className="btn" onClick={() => onShowCertificate(m)}>
                  Ver certificado
                </button>
              </div>
            )}
          </Entry>
        ))}

        <Entry
          className="timeline-origin"
          stamp={(visible) => (
            <Stamp
              title="PASAPORTE EMITIDO"
              lines={[formatDate(object.issuedAt), object.origin.toUpperCase()]}
              tilt={6}
              ink="mid"
              size={96}
              animate={visible}
              delay={0.2}
            />
          )}
        >
          <p className="timeline-route">Emisión del pasaporte en {object.origin}</p>
          <div className="timeline-field">
            <span>Fecha de emisión</span>
            <span>{formatDate(object.issuedAt)}</span>
          </div>
        </Entry>
      </ol>

      {ordered.length === 0 && (
        <div className="history-empty">
          Este objeto nunca salió de su jurisdicción.{' '}
          <a href={`#/traslado/${object.id}`}>Solicitá su primer traslado</a>.
        </div>
      )}
    </section>
  )
}
