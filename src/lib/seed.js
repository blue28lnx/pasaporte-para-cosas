import { STATUS_ABROAD, STATUS_HOME } from './constants.js'

function daysAgo(days, hour, minute = 0) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  d.setHours(hour, minute, 0, 0)
  return d.toISOString()
}

const isoDay = (iso) => {
  const d = new Date(iso)
  const offset = d.getTimezoneOffset() * 60000
  return new Date(d - offset).toISOString().slice(0, 10)
}

// Objetos de demostración para que el sistema no arranque vacío
export function createSeed() {
  const objects = [
    {
      id: 'OBJ-00001',
      name: 'Taza de café',
      category: 'cocina',
      emoji: '☕',
      origin: 'Cocina',
      location: 'Dormitorio',
      issuedAt: isoDay(daysAgo(20, 9)),
      status: STATUS_ABROAD,
      demo: true,
    },
    {
      id: 'OBJ-00002',
      name: 'Cargador del celular',
      category: 'electronica',
      emoji: '🔌',
      origin: 'Escritorio',
      location: 'Living',
      issuedAt: isoDay(daysAgo(15, 10)),
      status: STATUS_ABROAD,
      demo: true,
    },
    {
      id: 'OBJ-00003',
      name: 'Control remoto',
      category: 'electronica',
      emoji: '📺',
      origin: 'Living',
      location: 'Living',
      issuedAt: isoDay(daysAgo(12, 18)),
      status: STATUS_HOME,
      demo: true,
    },
    {
      id: 'OBJ-00004',
      name: 'Tijera',
      category: 'herramientas',
      emoji: '✂️',
      origin: 'Escritorio',
      location: 'Escritorio',
      issuedAt: isoDay(daysAgo(8, 11)),
      status: STATUS_HOME,
      demo: true,
    },
  ]

  const movements = [
    {
      id: 'MIG-00001',
      objectId: 'OBJ-00003',
      from: 'Living',
      to: 'Dormitorio',
      reason: 'Maratón de series en la cama',
      date: daysAgo(4, 22, 40),
    },
    {
      id: 'MIG-00002',
      objectId: 'OBJ-00003',
      from: 'Dormitorio',
      to: 'Living',
      reason: 'Repatriación tras reclamo familiar',
      date: daysAgo(3, 13, 5),
    },
    {
      id: 'MIG-00003',
      objectId: 'OBJ-00002',
      from: 'Escritorio',
      to: 'Living',
      reason: 'Batería baja durante la siesta',
      date: daysAgo(1, 16, 20),
    },
    {
      id: 'MIG-00004',
      objectId: 'OBJ-00001',
      from: 'Cocina',
      to: 'Dormitorio',
      reason: 'Acompañar un café de madrugada',
      date: daysAgo(0, 7, 15),
    },
  ]

  return {
    objects,
    movements,
    counters: { objects: objects.length, movements: movements.length },
  }
}
