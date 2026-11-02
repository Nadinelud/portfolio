const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export const ArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M5 11 11 5M6 5h5v5" />
  </svg>
)

export const ArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)

export const ArrowDown = (p) => (
  <svg {...base} {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
)

export const Close = (p) => (
  <svg {...base} {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
)

export const Copy = (p) => (
  <svg {...base} {...p}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
    <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
  </svg>
)

export const Check = (p) => (
  <svg {...base} {...p}>
    <path d="M3.5 8.5 6.5 11.5 12.5 4.5" />
  </svg>
)

export const Play = (p) => (
  <svg {...base} fill="currentColor" stroke="none" {...p}>
    <path d="M5 3.5v9l7.5-4.5z" />
  </svg>
)
