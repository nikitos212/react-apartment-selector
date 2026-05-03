import './IconButton.scss'

const ICONS = {
  plus: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M10 4.5v11" />
      <path d="M4.5 10h11" />
    </svg>
  ),
  trash: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M3.75 5.25h12.5" />
      <path d="M8 5.25V3.75h4v1.5" />
      <path d="M5.5 5.25l.65 11h7.7l.65-11" />
      <path d="M8.5 8.25v5.5" />
      <path d="M11.5 8.25v5.5" />
    </svg>
  ),
  close: (
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M5.5 5.5l9 9" />
      <path d="M14.5 5.5l-9 9" />
    </svg>
  ),
}

export default function IconButton({
  icon,
  label,
  onClick,
  className = '',
  disabled = false,
  variant = 'primary',
}) {
  return (
    <button
      className={`icon-button icon-button--${variant} ${className}`.trim()}
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
    >
      {ICONS[icon]}
    </button>
  )
}
