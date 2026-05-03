import { useEffect, useRef } from 'react'
import IconButton from '../IconButton/IconButton'
import SelectionOption from '../SelectionOption/SelectionOption'
import './SelectionPanel.scss'

export default function SelectionPanel({
  title,
  options,
  getLabel,
  isOptionSelected,
  onOptionClick,
  onClose,
  onAdd,
  showAdd = false,
  addDisabled = false,
  panel,
  activePanel,
  focusIndex,
  onFocusIndexChange,
  onPanelFocus,
  onOptionKeyDown,
}) {
  const optionRefs = useRef([])

  useEffect(() => {
    if (panel === activePanel) {
      optionRefs.current[focusIndex]?.focus()
    }
  }, [activePanel, focusIndex, panel])

  return (
    <section
      className="selection-panel"
      aria-label={title}
      onFocus={onPanelFocus}
    >
      <div className="selection-panel__header">
        <h2 className="selection-panel__title">{title}</h2>
        <IconButton
          icon="close"
          label={`Закрыть окно "${title}"`}
          variant="ghost"
          onClick={onClose}
        />
      </div>

      <div
        className="selection-panel__options"
        role="listbox"
        aria-multiselectable={showAdd || undefined}
      >
        {options.map((option, index) => (
          <SelectionOption
            key={option}
            selected={isOptionSelected(option)}
            ariaSelected={isOptionSelected(option)}
            buttonRef={(node) => {
              optionRefs.current[index] = node
            }}
            onClick={() => onOptionClick(option, index)}
            onFocus={() => onFocusIndexChange(index)}
            onKeyDown={(event) => onOptionKeyDown(event, option, index)}
          >
            {getLabel(option)}
          </SelectionOption>
        ))}

        {showAdd && (
          <button
            className="selection-panel__add-button"
            type="button"
            onClick={onAdd}
            onKeyDown={(event) => {
              if (event.ctrlKey && event.key === 'Enter') {
                event.preventDefault()
                onAdd()
              }

              if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
              }
            }}
            disabled={addDisabled}
          >
            Добавить
          </button>
        )}
      </div>
    </section>
  )
}
