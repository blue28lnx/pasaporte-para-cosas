import { useId } from 'react'
import '../styles/stamp.css'

// Sello migratorio circular. El texto exterior rodea el sello como en los sellos de goma reales.
export default function Stamp({
  title = 'TRASLADO AUTORIZADO',
  lines = [],
  footer,
  tilt = -8,
  ink = 'green',
  size = 170,
  animate = false,
  className = '',
}) {
  const id = useId().replace(/:/g, '')
  const [first, ...rest] = title.split(' ')
  const second = rest.join(' ')

  return (
    <div
      className={`stamp stamp-${ink}${animate ? ' stamp-animate' : ''} ${className}`}
      style={{ '--tilt': `${tilt}deg`, width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" role="img" aria-label={[title, ...lines, footer].filter(Boolean).join('. ')}>
        <defs>
          <path id={`top-${id}`} d="M 26,100 a 74,74 0 1,1 148,0" />
          <path id={`bottom-${id}`} d="M 18,100 a 82,82 0 0,0 164,0" />
          <filter id={`rough-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="2.2" />
          </filter>
        </defs>
        <g filter={`url(#rough-${id})`} className="stamp-ink">
          <circle cx="100" cy="100" r="95" fill="none" strokeWidth="4" />
          <circle cx="100" cy="100" r="88" fill="none" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="62" fill="none" strokeWidth="1.2" />
          <text fontSize="12" letterSpacing="2" fontWeight="700" textAnchor="middle">
            <textPath href={`#top-${id}`} startOffset="50%">
              MIGRACIONES OBJETUALES
            </textPath>
          </text>
          <text fontSize="11" letterSpacing="2.5" fontWeight="700" textAnchor="middle">
            <textPath href={`#bottom-${id}`} startOffset="50%" side="right">
              ✦ REPÚBLICA DOMÉSTICA ✦
            </textPath>
          </text>
          <line x1="44" y1="84" x2="156" y2="84" strokeWidth="1.2" />
          <line x1="44" y1="118" x2="156" y2="118" strokeWidth="1.2" />
          <text x="100" y="80" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="1">
            {first}
          </text>
          <text x="100" y="105" fontSize={second.length > 10 ? 15 : 19} fontWeight="800" textAnchor="middle" letterSpacing="1">
            {second}
          </text>
          {lines.slice(0, 2).map((line, i) => (
            <text
              key={i}
              x="100"
              y={133 + i * 14}
              fontSize={Math.min(11, 150 / Math.max(line.length, 1))}
              fontWeight="600"
              textAnchor="middle"
            >
              {line}
            </text>
          ))}
          {footer && (
            <text x="100" y="64" fontSize="10" fontWeight="600" textAnchor="middle" letterSpacing="0.5">
              {footer}
            </text>
          )}
        </g>
      </svg>
    </div>
  )
}
