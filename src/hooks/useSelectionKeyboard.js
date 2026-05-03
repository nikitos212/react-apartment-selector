import { useCallback } from 'react'
import { APARTMENTS, ENTRANCES } from '../constants/selection'

export function useSelectionKeyboard({
  addDraftToTable,
  chooseEntrance,
  closeSelection,
  entranceFocusIndex,
  selectedEntrance,
  setActivePanel,
  setApartmentFocusIndex,
  setEntranceFocusIndex,
  toggleApartment,
}) {
  const moveFocus = useCallback(
    (panel, direction) => {
      const list = panel === 'entrance' ? ENTRANCES : APARTMENTS
      const setFocusIndex =
        panel === 'entrance' ? setEntranceFocusIndex : setApartmentFocusIndex

      setFocusIndex((current) => {
        const next = current + direction

        if (next < 0) {
          return list.length - 1
        }

        if (next >= list.length) {
          return 0
        }

        return next
      })
    },
    [setApartmentFocusIndex, setEntranceFocusIndex],
  )

  return useCallback(
    (panel, event, option, index) => {
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault()
        addDraftToTable()
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        closeSelection()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        moveFocus(panel, 1)
        return
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        moveFocus(panel, -1)
        return
      }

      if (event.key === 'ArrowRight' && panel === 'entrance') {
        event.preventDefault()
        chooseEntrance(ENTRANCES[entranceFocusIndex], entranceFocusIndex)
        return
      }

      if (event.key === 'ArrowLeft' && panel === 'apartment') {
        event.preventDefault()
        setActivePanel('entrance')
        setEntranceFocusIndex(ENTRANCES.indexOf(selectedEntrance))
        return
      }

      if (event.key === 'Enter') {
        event.preventDefault()

        if (panel === 'entrance') {
          chooseEntrance(option, index)
        } else {
          toggleApartment(option, index)
        }
      }
    },
    [
      addDraftToTable,
      chooseEntrance,
      closeSelection,
      entranceFocusIndex,
      moveFocus,
      selectedEntrance,
      setActivePanel,
      setEntranceFocusIndex,
      toggleApartment,
    ],
  )
}
