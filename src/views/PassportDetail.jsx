import { useRef, useState } from 'react'
import PassportDocument from '../components/PassportDocument.jsx'
import MovementTimeline from '../components/MovementTimeline.jsx'
import NotFound from './NotFound.jsx'
import { navigate } from '../lib/router.js'
import { printElement } from '../lib/print.js'
import '../styles/detail.css'

export default function PassportDetail({ registry, objectId, justIssued, onShowCertificate }) {
  const object = registry.objects.find((o) => o.id === objectId)
  const passportRef = useRef(null)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!object) {
    return (
      <NotFound
        title="Pasaporte no encontrado"
        message={`No hay ningún objeto con el número ${objectId}. Puede que haya sido dado de baja.`}
      />
    )
  }

  const handleDelete = () => {
    registry.deleteObject(object.id)
    navigate('/pasaportes')
  }

  return (
    <div className="detail">
      <a href="#/pasaportes" className="back-link">
        ← Volver al archivo
      </a>

      {justIssued && (
        <div className="notice" role="status">
          <strong>Pasaporte emitido.</strong> {object.name} ya tiene documentación. El siguiente paso
          es solicitar su primer traslado.
        </div>
      )}

      <div className="section-head">
        <div>
          <h1>
            <span aria-hidden="true">{object.emoji}</span> {object.name}
          </h1>
          <p>
            Hoy está en <strong>{object.location}</strong>
            {object.location !== object.origin ? `, lejos de su origen (${object.origin}).` : ', su lugar de origen.'}
          </p>
        </div>
        <div className="detail-actions">
          <a href={`#/traslado/${object.id}`} className="btn btn-primary">
            Solicitar traslado
          </a>
          <button type="button" className="btn" onClick={() => printElement(passportRef.current)}>
            Imprimir o guardar PDF
          </button>
        </div>
      </div>

      <PassportDocument ref={passportRef} object={object} />

      <MovementTimeline
        object={object}
        movements={registry.movements.filter((m) => m.objectId === object.id)}
        onShowCertificate={onShowCertificate}
      />

      <div className="revoke">
        {confirmDelete ? (
          <div className="revoke-confirm" role="group" aria-label="Confirmar baja">
            <span>
              Se eliminará el pasaporte {object.id} y todo su historial. Esta acción no se puede
              deshacer.
            </span>
            <button type="button" className="btn btn-danger btn-solid" onClick={handleDelete}>
              Dar de baja
            </button>
            <button type="button" className="btn btn-quiet" onClick={() => setConfirmDelete(false)}>
              Cancelar
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-danger" onClick={() => setConfirmDelete(true)}>
            Dar de baja el pasaporte
          </button>
        )}
      </div>
    </div>
  )
}
