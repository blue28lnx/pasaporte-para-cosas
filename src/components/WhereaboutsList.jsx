// Resultado de búsqueda: deja bien a la vista dónde está cada objeto ahora mismo.
export default function WhereaboutsList({ objects, query }) {
  if (objects.length === 0) {
    return (
      <p className="whereabouts-empty">
        Ningún pasaporte coincide con “{query}”. Probá con otra palabra o{' '}
        <a href="#/registrar">registrá el objeto</a> para empezar a seguirle el rastro.
      </p>
    )
  }

  return (
    <ul className="whereabouts">
      {objects.map((o) => (
        <li key={o.id}>
          <a href={`#/pasaportes/${o.id}`} className="whereabouts-item">
            <span className="whereabouts-emoji" aria-hidden="true">
              {o.emoji}
            </span>
            <span className="whereabouts-name">
              {o.name}
              <span className="mono">{o.id}</span>
            </span>
            <span className="whereabouts-place">
              <span className="whereabouts-label">Está en</span>
              <strong>{o.location}</strong>
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
