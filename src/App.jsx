import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import AuthorizationModal from './components/AuthorizationModal.jsx'
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
  const [authorizedId, setAuthorizedId] = useState(null)

  const closeAuthorization = useCallback(() => setAuthorizedId(null), [])
  const handleAuthorized = useCallback((movement) => setAuthorizedId(movement.id), [])

  const authorized = registry.movements.find((m) => m.id === authorizedId)
  const authorizedObject = authorized && registry.objects.find((o) => o.id === authorized.objectId)

  let view
  const [section, param, extra] = segments
  if (!section) view = <Dashboard registry={registry} />
  else if (section === 'pasaportes' && !param) view = <PassportsView registry={registry} />
  else if (section === 'pasaportes')
    view = (
      <PassportDetail key={param} registry={registry} objectId={param} justIssued={extra === 'emitido'} />
    )
  else if (section === 'registrar') view = <RegisterView registry={registry} />
  else if (section === 'traslado')
    view = <TransferView registry={registry} objectId={param} onAuthorized={handleAuthorized} />
  else view = <NotFound />

  return (
    <div className="app">
      <Header segments={segments} />
      <main className="page" id="contenido">
        {view}
      </main>
      <Footer onResetDemo={registry.resetDemo} />

      {authorized && (
        <AuthorizationModal movement={authorized} object={authorizedObject} onClose={closeAuthorization} />
      )}
    </div>
  )
}
