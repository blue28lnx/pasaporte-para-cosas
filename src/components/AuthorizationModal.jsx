import Modal from './Modal.jsx'
import Stamp from './Stamp.jsx'
import { formatDate, formatTime, stampTilt } from '../lib/format.js'

// Pantalla de autorización que aparece al aprobar un traslado.
export default function AuthorizationModal({ movement, object, onClose, onShowCertificate }) {
  const day = formatDate(movement.date.slice(0, 10))

  return (
    <Modal title="Traslado autorizado" onClose={onClose}>
      <div className="authorization">
        <span className="authorization-kicker">Resolución inmediata</span>
        <h2>Traslado autorizado</h2>
        <p className="authorization-route">
          {object?.emoji} {object?.name ?? 'El objeto'} puede abandonar {movement.from} y establecerse en{' '}
          {movement.to}.
        </p>

        <div className="route-anim" aria-hidden="true">
          <span className="route-place route-from">{movement.from}</span>
          <span className="route-track">
            <span className="route-traveler">{object?.emoji ?? '📦'}</span>
          </span>
          <span className="route-place route-to">{movement.to}</span>
        </div>

        <div className="authorization-stamp-area">
          <span className="stamp-ripple" aria-hidden="true" />
          <Stamp
            title="TRASLADO AUTORIZADO"
            lines={[day, `A ${movement.to.toUpperCase()}`]}
            footer={movement.id}
            tilt={stampTilt(movement.id)}
            size={200}
            animate
            delay={1.15}
          />
        </div>

        <dl className="authorization-facts">
          <div>
            <dt>Expediente</dt>
            <dd className="mono">{movement.id}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>
              {day}, {formatTime(movement.date)}
            </dd>
          </div>
          <div>
            <dt>Destino</dt>
            <dd>{movement.to}</dd>
          </div>
        </dl>

        <div className="authorization-actions">
          <button type="button" className="btn btn-primary" onClick={onShowCertificate}>
            Ver certificado oficial
          </button>
          <a href={`#/pasaportes/${movement.objectId}`} className="btn" onClick={onClose}>
            Ver pasaporte
          </a>
          <button type="button" className="btn btn-quiet" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  )
}
