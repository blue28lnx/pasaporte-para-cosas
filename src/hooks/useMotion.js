import { useEffect, useRef, useState } from 'react'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// Número que sube desde 0 (o desde el valor anterior) hasta el valor final.
export function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0)
  const fromRef = useRef(value)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target)
      return
    }
    const from = fromRef.current
    const start = performance.now()
    let frame
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = Math.round(from + (target - from) * eased)
      setValue(current)
      fromRef.current = current
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return value
}

// Marca un elemento como visible cuando entra en pantalla (una sola vez).
export function useInView(options = { threshold: 0.25 }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, visible]
}

// Inclinación 3D y brillo holográfico que siguen al puntero sobre un documento.
export function useTilt(maxDeg = 6) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    const finePointer = window.matchMedia?.('(pointer: fine)').matches
    if (!finePointer) return

    let frame
    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(x - 0.5) * maxDeg * 2}deg`)
        el.style.setProperty('--rx', `${(0.5 - y) * maxDeg * 2}deg`)
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
        el.classList.add('is-tilting')
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(frame)
      el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--rx', '0deg')
      el.classList.remove('is-tilting')
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [maxDeg])

  return ref
}
