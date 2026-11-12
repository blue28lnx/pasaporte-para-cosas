import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { STATUS_ABROAD, STATUS_HOME } from '../lib/constants.js'
import { caseId, passportId } from '../lib/format.js'
import { createSeed } from '../lib/seed.js'
import { loadRegistry, saveRegistry } from '../lib/storage.js'

const statusFor = (location, origin) => (location === origin ? STATUS_HOME : STATUS_ABROAD)

// Estado central del registro migratorio: objetos, movimientos y contadores.
export function useRegistry() {
  const [data, setData] = useState(loadRegistry)
  const dataRef = useRef(data)

  // Persistencia: cada cambio queda guardado en localStorage
  useEffect(() => {
    saveRegistry(data)
  }, [data])

  // Si otra pestaña modifica el registro, se sincroniza
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key && e.key.startsWith('pasaporte-para-cosas')) {
        const next = loadRegistry()
        dataRef.current = next
        setData(next)
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Calcula el próximo estado de forma síncrona para poder devolver
  // el objeto o movimiento recién creado a quien llamó la acción.
  const commit = useCallback((next) => {
    dataRef.current = next
    setData(next)
  }, [])

  const registerObject = useCallback(
    (input) => {
      const prev = dataRef.current
      const number = prev.counters.objects + 1
      const object = {
        id: passportId(number),
        name: input.name.trim(),
        category: input.category,
        emoji: input.emoji,
        origin: input.origin,
        location: input.location,
        issuedAt: input.issuedAt,
        status: statusFor(input.location, input.origin),
      }
      commit({
        ...prev,
        objects: [...prev.objects, object],
        counters: { ...prev.counters, objects: number },
      })
      return object
    },
    [commit],
  )

  const transferObject = useCallback(
    ({ objectId, to, reason }) => {
      const prev = dataRef.current
      const object = prev.objects.find((o) => o.id === objectId)
      if (!object) return null
      const number = prev.counters.movements + 1
      const movement = {
        id: caseId(number),
        objectId,
        from: object.location,
        to,
        reason: reason.trim(),
        date: new Date().toISOString(),
      }
      commit({
        ...prev,
        objects: prev.objects.map((o) =>
          o.id === objectId ? { ...o, location: to, status: statusFor(to, o.origin) } : o,
        ),
        movements: [...prev.movements, movement],
        counters: { ...prev.counters, movements: number },
      })
      return movement
    },
    [commit],
  )

  const deleteObject = useCallback(
    (objectId) => {
      const prev = dataRef.current
      commit({
        ...prev,
        objects: prev.objects.filter((o) => o.id !== objectId),
        movements: prev.movements.filter((m) => m.objectId !== objectId),
      })
    },
    [commit],
  )

  const resetDemo = useCallback(() => commit(createSeed()), [commit])

  const stats = useMemo(
    () => ({
      objects: data.objects.length,
      movements: data.movements.length,
      abroad: data.objects.filter((o) => o.location !== o.origin).length,
    }),
    [data],
  )

  const recentMovements = useMemo(
    () => [...data.movements].sort((a, b) => b.date.localeCompare(a.date)),
    [data.movements],
  )

  return {
    objects: data.objects,
    movements: data.movements,
    recentMovements,
    stats,
    nextObjectNumber: data.counters.objects + 1,
    registerObject,
    transferObject,
    deleteObject,
    resetDemo,
  }
}
