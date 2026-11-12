export const AGENCY = 'Dirección Nacional de Migraciones Objetuales'
export const REPUBLIC = 'República Doméstica'
export const NATIONALITY = 'Doméstica'

export const CATEGORIES = [
  { value: 'electronica', label: 'Electrónica', code: 'ELE' },
  { value: 'cocina', label: 'Cocina', code: 'COC' },
  { value: 'ropa', label: 'Ropa', code: 'ROP' },
  { value: 'decoracion', label: 'Decoración', code: 'DEC' },
  { value: 'herramientas', label: 'Herramientas', code: 'HER' },
  { value: 'otros', label: 'Otros', code: 'OTR' },
]

export const ROOMS = ['Cocina', 'Dormitorio', 'Baño', 'Living', 'Escritorio', 'Patio']
export const OTHER = 'Otro'

export const STATUS_HOME = 'En territorio nacional'
export const STATUS_ABROAD = 'En circulación'

export const EMOJI_SUGGESTIONS = [
  '☕', '🔌', '📱', '🎧', '🔑', '👓', '📺', '🧦',
  '✂️', '🔨', '🪴', '📚', '🧴', '🥄', '🧥', '🕯️',
]

export const REASON_SUGGESTIONS = [
  'Acompañar un café de madrugada',
  'Visita temporal por trabajo',
  'Reunificación familiar con otros objetos',
  'Exilio por desorden en su lugar de origen',
  'Turismo de fin de semana',
]

export function categoryLabel(value) {
  return CATEGORIES.find((c) => c.value === value)?.label ?? 'Otros'
}

export function categoryCode(value) {
  return CATEGORIES.find((c) => c.value === value)?.code ?? 'OTR'
}
