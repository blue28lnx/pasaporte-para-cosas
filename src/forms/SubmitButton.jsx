// Botón de envío que muestra un sello girando mientras se procesa el trámite.
export default function SubmitButton({ processing, label, processingLabel }) {
  return (
    <button
      type="submit"
      className={`btn btn-primary btn-lg submit-btn${processing ? ' is-processing' : ''}`}
      aria-busy={processing}
      disabled={processing}
    >
      {processing && <span className="submit-stamp" aria-hidden="true" />}
      <span aria-live="polite">{processing ? processingLabel : label}</span>
    </button>
  )
}
