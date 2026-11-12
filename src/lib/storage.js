import { createSeed } from './seed.js'

const STORAGE_KEY = 'pasaporte-para-cosas:v1'

function isValid(data) {
  return (
    data &&
    Array.isArray(data.objects) &&
    Array.isArray(data.movements) &&
    data.counters &&
    Number.isFinite(data.counters.objects) &&
    Number.isFinite(data.counters.movements)
  )
}

// Carga el registro guardado; si no hay nada (primera visita) o está dañado, usa la demo.
export function loadRegistry() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (isValid(parsed)) return parsed
    }
  } catch {
    // localStorage no disponible o JSON corrupto: se arranca con la demo
  }
  return createSeed()
}

export function saveRegistry(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Sin espacio o modo privado estricto: la app sigue funcionando en memoria
  }
}
