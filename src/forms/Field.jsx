// Casillero de formulario oficial: etiqueta, ayuda y error accesibles.
export default function Field({ id, label, hint, error, children, className = '' }) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')

  return (
    <div className={`field${error ? ' has-error' : ''} ${className}`}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children({ id, 'aria-describedby': describedBy || undefined, 'aria-invalid': !!error })}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
