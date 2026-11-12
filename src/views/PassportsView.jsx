import { useState } from 'react'
import Emblem from '../components/Emblem.jsx'
import { searchObjects } from '../lib/search.js'
import '../styles/passports.css'

export default function PassportsView({ registry }) {
  const { objects } = registry
  const [query, setQuery] = useState('')
  const results = searchObjects(objects, query)

  return (
    <div>
      <div className="section-head">
        <div>
          <h1>Pasaportes emitidos</h1>
          <p>Buscá por nombre o número de pasaporte para saber dónde está cada objeto.</p>
        </div>
        <a href="#/registrar" className="btn btn-primary">
          Registrar nuevo objeto
        </a>
      </div>

      <div className="archive-search" role="search">
        <label htmlFor="archive-q" className="visually-hidden">
          Buscar pasaporte
        </label>
        <input
          id="archive-q"
          type="search"
          placeholder="Ej.: taza, cargador, OBJ-00002"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <span className="archive-count" aria-live="polite">
          {results.length} {results.length === 1 ? 'expediente' : 'expedientes'}
        </span>
      </div>

      {objects.length === 0 ? (
        <div className="archive-empty">
          <p>El archivo está vacío. Ningún objeto tiene documentación todavía.</p>
          <a href="#/registrar" className="btn btn-primary">
            Registrar el primer objeto
          </a>
        </div>
      ) : results.length === 0 ? (
        <div className="archive-empty">
          <p>Ningún pasaporte coincide con “{query}”.</p>
          <button type="button" className="btn" onClick={() => setQuery('')}>
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <ul className="booklets">
          {results.map((o, i) => (
            <li key={o.id} style={{ '--i': i }}>
              <a href={`#/pasaportes/${o.id}`} className="booklet-link">
                <div className="booklet-3d">
                  <div className="booklet-page" aria-hidden="true">
                    <span className="booklet-page-label">Visado vigente</span>
                    <span className="booklet-page-room">{o.location}</span>
                    <span className="booklet-page-emoji">{o.emoji}</span>
                  </div>
                  <div className="booklet">
                    <Emblem size={34} tone="light" />
                    <span className="booklet-title">Pasaporte</span>
                    <span className="booklet-emoji" aria-hidden="true">
                      {o.emoji}
                    </span>
                    <span className="booklet-name">{o.name}</span>
                    <span className="booklet-number mono">{o.id}</span>
                  </div>
                </div>
                <div className="booklet-location">
                  <span>Ubicación actual</span>
                  <strong>{o.location}</strong>
                  {o.location !== o.origin && <em>Origen: {o.origin}</em>}
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
