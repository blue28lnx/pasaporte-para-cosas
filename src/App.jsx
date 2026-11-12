import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AuthorizationModal from './components/AuthorizationModal.jsx'
import CertificateModal from './components/CertificateModal.jsx'
import Dashboard from './views/Dashboard.jsx'
import PassportsView from './views/PassportsView.jsx'
import PassportDetail from './views/PassportDetail.jsx'
import RegisterView from './views/RegisterView.jsx'
import TransferView from './views/TransferView.jsx'
import NotFound from './views/NotFound.jsx'
import { useRegistry } from './hooks/useRegistry.js'
import { useHashRoute } from './lib/router.js'

export default function App() {
  const registry = useRegistry()
  const { segments } = useHashRoute()
  // Ventana abierta: { type: 'authorization' | 'certificate', movementId }
  const [modal, setModal] = useState(null)

  const closeModal = useCallback(() => setModal(null), [])
  const handleAuthorized = useCallback(
    (movement) => setModal({ type: 'authorization', movementId: movement.id }),
    [],
  )
  const showCertificate = useCallback(
    (movement) => setModal({ type: 'certificate', movementId: movement.id }),
    [],
  )

  const modalMovement = modal && registry.movements.find((m) => m.id === modal.movementId)
  const modalObject = modalMovement && registry.objects.find((o) => o.id === modalMovement.objectId)

  let view
  const [section, param, extra] = segments
  if (!section) view = <Dashboard registry={registry} />
  else if (section === 'pasaportes' && !param) view = <PassportsView registry={registry} />
  else if (section === 'pasaportes')
    view = (
      <PassportDetail
        key={param}
        registry={registry}
        objectId={param}
        justIssued={extra === 'emitido'}
        onShowCertificate={showCertificate}
      />
    )
  else if (section === 'registrar') view = <RegisterView registry={registry} />
  else if (section === 'traslado')
    view = <TransferView registry={registry} objectId={param} onAuthorized={handleAuthorized} />
  else view = <NotFound />

  return (
    <div className="app">
      <Header segments={segments} />
      <main className="page" id="contenido">
        <div className="view" key={section ?? 'inicio'}>
          {view}
        </div>
      </main>
      <Footer onResetDemo={registry.resetDemo} />

      {modalMovement && modal.type === 'authorization' && (
        <AuthorizationModal
          movement={modalMovement}
          object={modalObject}
          onClose={closeModal}
          onShowCertificate={() => showCertificate(modalMovement)}
        />
      )}
      {modalMovement && modal.type === 'certificate' && (
        <CertificateModal movement={modalMovement} object={modalObject} onClose={closeModal} />
      )}
    </div>
  )
}
