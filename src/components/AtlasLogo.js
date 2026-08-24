// Atlas brand mark — a core sphere with two crossing orbital rings and a
// satellite node, evoking global tracking / network intelligence.
// Monoline, single-color (inherits via currentColor), crisp at small sizes.
export default function AtlasLogo({ size = 22, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      role="img"
      aria-label="Atlas"
    >
      <ellipse cx="12" cy="12" rx="8.5" ry="3.3" stroke="currentColor" strokeWidth="1.1" opacity="0.5" transform="rotate(20 12 12)" />
      <ellipse cx="12" cy="12" rx="8.5" ry="3.3" stroke="currentColor" strokeWidth="1.1" opacity="0.85" transform="rotate(-20 12 12)" />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="9.1" r="1.1" fill="currentColor" />
    </svg>
  )
}
