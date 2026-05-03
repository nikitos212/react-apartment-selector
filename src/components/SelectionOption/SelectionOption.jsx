import './SelectionOption.scss'

export default function SelectionOption({
  children,
  selected = false,
  onClick,
  onFocus,
  onKeyDown,
  buttonRef,
  ariaSelected,
}) {
  return (
    <button
      ref={buttonRef}
      className={`selection-option${selected ? ' selection-option--selected' : ''}`}
      type="button"
      role="option"
      aria-selected={ariaSelected ?? selected}
      onClick={onClick}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  )
}
