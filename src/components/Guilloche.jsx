import { memo } from 'react'

// Patrón de seguridad tipo guilloché: elipses rotadas alrededor de un centro.
function Guilloche({ count = 36, rx = 46, ry = 18, color = '#397B62', opacity = 0.18, className = '' }) {
  const ellipses = Array.from({ length: count }, (_, i) => (i * 180) / count)
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <g fill="none" stroke={color} strokeWidth="0.35" opacity={opacity}>
        {ellipses.map((angle) => (
          <ellipse key={angle} cx="60" cy="60" rx={rx} ry={ry} transform={`rotate(${angle} 60 60)`} />
        ))}
        {ellipses.map((angle) => (
          <ellipse
            key={`i${angle}`}
            cx="60"
            cy="60"
            rx={rx * 0.55}
            ry={ry * 0.9}
            transform={`rotate(${angle + 90 / count} 60 60)`}
          />
        ))}
      </g>
    </svg>
  )
}

export default memo(Guilloche)
