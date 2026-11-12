import { categoryCode } from './constants.js'

export function padNumber(n, size = 5) {
  return String(n).padStart(size, '0')
}

export const passportId = (n) => `OBJ-${padNumber(n)}`
export const caseId = (n) => `MIG-${padNumber(n)}`

export function todayISO() {
  const d = new Date()
  const offset = d.getTimezoneOffset() * 60000
  return new Date(d - offset).toISOString().slice(0, 10)
}

// "2026-11-12" -> "12 nov 2026" sin corrimientos por zona horaria
export function formatDate(isoDate) {
  if (!isoDate) return '—'
  const [y, m, d] = isoDate.slice(0, 10).split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatDateTime(iso) {
  const date = new Date(iso)
  return date.toLocaleString('es-AR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })
}

export function relativeDay(iso) {
  const date = new Date(iso)
  const start = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const diff = Math.round((start(new Date()) - start(date)) / 86400000)
  if (diff === 0) return `Hoy, ${formatTime(iso)}`
  if (diff === 1) return `Ayer, ${formatTime(iso)}`
  return formatDateTime(iso)
}

// Quita acentos y deja solo A-Z/0-9 para la zona de lectura mecánica
function mrzClean(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '<')
    .replace(/^<+|<+$/g, '')
}

function mrzDate(isoDate) {
  const [y, m, d] = isoDate.slice(0, 10).split('-')
  return `${y.slice(2)}${m}${d}`
}

// Dígito verificador estilo ICAO 9303 (pesos 7-3-1)
function checkDigit(text) {
  const weights = [7, 3, 1]
  let sum = 0
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    let value = 0
    if (ch >= '0' && ch <= '9') value = Number(ch)
    else if (ch >= 'A' && ch <= 'Z') value = ch.charCodeAt(0) - 55
    sum += value * weights[i % 3]
  }
  return String(sum % 10)
}

export function buildMrz(object) {
  const line1 = `P<DOM${mrzClean(object.name)}<<${mrzClean(object.origin)}`.padEnd(44, '<').slice(0, 44)
  const number = object.id.replace('-', '')
  const issued = mrzDate(object.issuedAt)
  const line2 = `${number}${checkDigit(number)}DOM${issued}${checkDigit(issued)}${categoryCode(object.category)}`
    .padEnd(43, '<')
    .slice(0, 43)
  return [line1, line2 + checkDigit(line2)]
}

// Rotación estable a partir de un texto, para que cada sello caiga distinto
export function stampTilt(seed, range = 14) {
  let hash = 0
  for (const ch of seed) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  return (Math.abs(hash) % (range * 2 + 1)) - range
}
