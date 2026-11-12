export default function NotFound({ title = 'Trámite inexistente', message }) {
  return (
    <div className="archive-empty">
      <h1>{title}</h1>
      <p>
        {message ??
          'Esta ventanilla no existe o el expediente fue dado de baja. Volvé al inicio para empezar de nuevo.'}
      </p>
      <a href="#/" className="btn btn-primary">
        Volver al inicio
      </a>
    </div>
  )
}
