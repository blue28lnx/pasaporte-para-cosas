const normalize = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

// Busca por nombre o número de pasaporte (acepta "00001", "obj-1", "taza"...)
export function searchObjects(objects, query) {
  const q = normalize(query)
  if (!q) return objects
  const digits = q.replace(/\D/g, '')
  return objects.filter((o) => {
    if (normalize(o.name).includes(q)) return true
    if (normalize(o.id).includes(q)) return true
    if (digits && Number(o.id.replace(/\D/g, '')) === Number(digits)) return true
    return false
  })
}
