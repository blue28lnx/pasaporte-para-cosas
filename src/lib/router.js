import { useEffect, useState } from 'react'

function currentPath() {
  const hash = window.location.hash.replace(/^#/, '')
  return hash || '/'
}

export function navigate(path) {
  if (currentPath() === path) return
  window.location.hash = path
}

// Router mínimo basado en el hash: #/pasaportes/OBJ-00001
export function useHashRoute() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const onChange = () => {
      setPath(currentPath())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  const segments = path.split('/').filter(Boolean)
  return { path, segments }
}
