import Emblem from './Emblem.jsx'
import { AGENCY, REPUBLIC } from '../lib/constants.js'
import '../styles/layout.css'

const LINKS = [
  { href: '#/', label: 'Inicio', match: (s) => s.length === 0 },
  { href: '#/pasaportes', label: 'Pasaportes', match: (s) => s[0] === 'pasaportes' },
  { href: '#/registrar', label: 'Registrar objeto', match: (s) => s[0] === 'registrar' },
  { href: '#/traslado', label: 'Solicitar traslado', match: (s) => s[0] === 'traslado' },
]

export default function Header({ segments }) {
  return (
    <header className="site-header">
      <div className="letterhead">
        <a href="#/" className="letterhead-brand" aria-label={`${AGENCY}, ir al inicio`}>
          <Emblem size={52} tone="light" />
          <span className="letterhead-text">
            <span className="letterhead-republic">{REPUBLIC}</span>
            <span className="letterhead-agency">{AGENCY}</span>
          </span>
        </a>
        <p className="letterhead-office">
          Ventanilla única de trámites
          <span>Atención las 24 h, incluso a medianoche en la heladera</span>
        </p>
      </div>
      <nav className="tabs" aria-label="Secciones">
        {LINKS.map((link) => {
          const active = link.match(segments)
          return (
            <a
              key={link.href}
              href={link.href}
              className={`tab${active ? ' is-active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {link.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
