import { useState } from 'react'
import { AGENCY } from '../lib/constants.js'

export default function Footer({ onResetDemo }) {
  const [confirming, setConfirming] = useState(false)

  return (
    <footer className="site-footer">
      <p>
        {AGENCY}. Organismo ficticio: los documentos emitidos carecen de validez legal, pero poseen
        absoluta validez doméstica.
      </p>
      {confirming ? (
        <div className="footer-confirm" role="group" aria-label="Confirmar restauración">
          <span>Se reemplazarán todos los registros por los de demostración.</span>
          <button
            type="button"
            className="btn btn-danger btn-solid"
            onClick={() => {
              onResetDemo()
              setConfirming(false)
            }}
          >
            Restaurar
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => setConfirming(false)}>
            Cancelar
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-quiet" onClick={() => setConfirming(true)}>
          Restaurar datos de demostración
        </button>
      )}
    </footer>
  )
}
