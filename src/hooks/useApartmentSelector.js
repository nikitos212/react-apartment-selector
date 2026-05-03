import { useApartmentSelectionState } from './useApartmentSelectionState'
import { useSelectionKeyboard } from './useSelectionKeyboard'

export function useApartmentSelector() {
  const selectionState = useApartmentSelectionState()
  const handleOptionKeyDown = useSelectionKeyboard(selectionState)

  return {
    ...selectionState,
    handleOptionKeyDown,
  }
}
