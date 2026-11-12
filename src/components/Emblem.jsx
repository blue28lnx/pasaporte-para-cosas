import { useId } from 'react'

// Emblema institucional de la República Doméstica: una casa dentro de un escudo circular.
export default function Emblem({ size = 56, tone = 'dark', className = '' }) {
  const id = useId().replace(/:/g, '')
  const fg = tone === 'dark' ? '#174C3C' : '#F5F0E5'
  const bg = tone === 'dark' ? '#F5F0E5' : '#174C3C'

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Emblema de la República Doméstica"
    >
      <defs>
        <path id={`ring-${id}`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="58" fill={bg} stroke={fg} strokeWidth="2" />
      <circle cx="60" cy="60" r="53" fill="none" stroke={fg} strokeWidth="0.75" />
      <circle cx="60" cy="60" r="35" fill="none" stroke={fg} strokeWidth="0.75" />
      <text fill={fg} fontSize="8.2" fontFamily="'Libre Caslon Text', Georgia, serif" letterSpacing="1.6">
        <textPath href={`#ring-${id}`} startOffset="0">
          REPÚBLICA DOMÉSTICA ✦ ORDEN Y LUGAR ✦
        </textPath>
      </text>
      {/* Casa */}
      <path d="M60 36 L80 54 L75 54 L75 78 L45 78 L45 54 L40 54 Z" fill={fg} />
      <rect x="55" y="63" width="10" height="15" fill={bg} />
      <circle cx="60" cy="51" r="3.2" fill={bg} />
      {/* Ramas */}
      <path d="M38 84 q22 10 44 0" fill="none" stroke={fg} strokeWidth="1.5" />
      <path d="M42 86 l-3 -4 M48 88 l-2 -5 M78 86 l3 -4 M72 88 l2 -5" stroke={fg} strokeWidth="1.2" />
    </svg>
  )
}
