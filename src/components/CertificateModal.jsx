import { useRef } from 'react'
import Modal from './Modal.jsx'
import Certificate from './Certificate.jsx'
import { printElement } from '../lib/print.js'

export default function CertificateModal({ movement, object, onClose }) {
  const certRef = useRef(null)

  return (
    <Modal title={`Certificado de traslado ${movement.id}`} onClose={onClose} wide>
      <Certificate ref={certRef} movement={movement} object={object} />
      <div className="certificate-toolbar">
        {object && (
          <a href={`#/pasaportes/${object.id}`} className="btn" onClick={onClose}>
            Ver pasaporte
          </a>
        )}
        <button type="button" className="btn btn-primary" onClick={() => printElement(certRef.current)}>
          Imprimir o guardar PDF
        </button>
      </div>
    </Modal>
  )
}
