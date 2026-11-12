import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Dashboard from './views/Dashboard.jsx'
import PassportsView from './views/PassportsView.jsx'
import RegisterView from './views/RegisterView.jsx'
import NotFound from './views/NotFound.jsx'
import { useRegistry } from './hooks/useRegistry.js'
import { useHashRoute } from './lib/router.js'

export default function App() {
  const registry = useRegistry()
  const { segments } = useHashRoute()

  let view
  if (segments.length === 0) view = <Dashboard registry={registry} />
  else if (segments[0] === 'pasaportes' && !segments[1]) view = <PassportsView registry={registry} />
  else if (segments[0] === 'registrar') view = <RegisterView registry={registry} />
  else view = <NotFound />

  return (
    <div className="app">
      <Header segments={segments} />
      <main className="page" id="contenido">
        {view}
      </main>
      <Footer onResetDemo={registry.resetDemo} />
    </div>
  )
}
