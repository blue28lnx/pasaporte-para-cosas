import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../hooks/useMotion.js'

// Breve "trámite en curso" antes de ejecutar la acción: le da peso al envío del formulario.
export function useProcessing(duration = 750) {
  const [processing, setProcessing] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const run = (action) => {
    if (processing) return
    if (prefersReducedMotion()) {
      action()
      return
    }
    setProcessing(true)
    timer.current = setTimeout(() => {
      setProcessing(false)
      action()
    }, duration)
  }

  return [processing, run]
}
