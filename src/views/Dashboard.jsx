import { useState } from 'react'
import WhereaboutsList from '../components/WhereaboutsList.jsx'
import { searchObjects } from '../lib/search.js'
import { relativeDay } from '../lib/format.js'
import '../styles/dashboard.css'

export default function Dashboard({ registry }) {
  const { objects, stats, recentMovements } = registry
  const [query, setQuery] = useState('')
  const results = query.trim() ? searchObjects(objects, query).slice(0, 5) : []
  const byId = Object.fromEntries(objects.map((o) => [o.id, o]))
  const latest = recentMovements.slice(0, 5)

  return (
    <div className="dashboard">
      <section className="dash-hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Controlamos las fronteras. Incluso las de tu habitación.</h1>
        <p className="dash-lead">
          Cada objeto de la casa tiene pasaporte, domicilio y antecedentes de viaje. Cuando algo
          cambia de habitación, queda sellado. Cuando no lo encontrás, lo buscás acá.
        </p>

        <form className="dash-search" role="search" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="where-search">¿Dónde dejaste…?</label>
          <input
            id="where-search"
            type="search"
            placeholder="Objeto o número de pasaporte"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </form>
        {query.trim() && (
          <div className="dash-results" aria-live="polite">
            <WhereaboutsList objects={results} query={query} />
          </div>
        )}

        <div className="dash-actions">
          <a href="#/registrar" className="btn btn-primary btn-lg">
            Registrar nuevo objeto
          </a>
          <a href="#/pasaportes" className="btn">
            Ver pasaportes emitidos
          </a>
        </div>
      </section>

      <aside className="ledger" aria-label="Libro de registros">
        <div className="ledger-head">
          <h2>Libro de registros</h2>
          <span className="mono">Folio {String(stats.movements + 1).padStart(3, '0')}</span>
        </div>
        <dl className="ledger-stats">
          <div>
            <dt>Objetos registrados</dt>
            <dd>{stats.objects}</dd>
          </div>
          <div>
            <dt>Traslados realizados</dt>
            <dd>{stats.movements}</dd>
          </div>
          <div>
            <dt>Objetos en circulación</dt>
            <dd>{stats.abroad}</dd>
          </div>
        </dl>

        <h3 className="ledger-subtitle">Últimos movimientos</h3>
        {latest.length === 0 ? (
          <p className="ledger-empty">
            Todavía no hay traslados. <a href="#/traslado">Solicitá el primero</a>.
          </p>
        ) : (
          <ol className="ledger-entries">
            {latest.map((m) => {
              const object = byId[m.objectId]
              return (
                <li key={m.id}>
                  <a href={`#/pasaportes/${m.objectId}`} className="ledger-entry">
                    <span className="ledger-emoji" aria-hidden="true">
                      {object?.emoji ?? '📦'}
                    </span>
                    <span className="ledger-body">
                      <span className="ledger-name">{object?.name ?? 'Objeto dado de baja'}</span>
                      <span className="ledger-route">
                        {m.from} <span aria-label="hacia">→</span> {m.to}
                      </span>
                    </span>
                    <span className="ledger-meta">
                      <span className="mono">{m.id}</span>
                      <span>{relativeDay(m.date)}</span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ol>
        )}
      </aside>
    </div>
  )
}
