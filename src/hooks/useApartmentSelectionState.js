import { useEffect, useMemo, useState } from 'react'
import { HOUSES } from '../constants/houses'

const STORAGE_KEY = 'apartment-selector:house-selections'

function createEmptySelections() {
  return HOUSES.reduce((acc, house) => {
    acc[house] = {}
    return acc
  }, {})
}

function cloneSelection(selection) {
  return Object.entries(selection).reduce((acc, [entrance, apartments]) => {
    acc[entrance] = [...apartments]
    return acc
  }, {})
}

function getSavedSelections() {
  const emptySelections = createEmptySelections()

  if (typeof window === 'undefined') {
    return emptySelections
  }

  try {
    const savedSelections = window.localStorage.getItem(STORAGE_KEY)

    if (!savedSelections) {
      return emptySelections
    }

    const parsedSelections = JSON.parse(savedSelections)

    return HOUSES.reduce((acc, house) => {
      const houseSelection = parsedSelections?.[house]

      acc[house] =
        houseSelection && typeof houseSelection === 'object' && !Array.isArray(houseSelection)
          ? cloneSelection(houseSelection)
          : {}

      return acc
    }, {})
  } catch {
    return emptySelections
  }
}

function saveSelections(houseSelections) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(houseSelections))
  } catch {
    // localStorage can be unavailable in private or restricted browser modes.
  }
}

function hasDraftSelection(draftSelection) {
  return Object.values(draftSelection).some((apartments) => apartments.length > 0)
}

export function useApartmentSelectionState() {
  const [houseSelections, setHouseSelections] = useState(getSavedSelections)
  const [activeHouse, setActiveHouse] = useState(null)
  const [draftSelection, setDraftSelection] = useState({})
  const [selectedEntrance, setSelectedEntrance] = useState(null)
  const [activePanel, setActivePanel] = useState('entrance')
  const [entranceFocusIndex, setEntranceFocusIndex] = useState(0)
  const [apartmentFocusIndex, setApartmentFocusIndex] = useState(0)

  const canAdd = useMemo(() => hasDraftSelection(draftSelection), [draftSelection])

  useEffect(() => {
    saveSelections(houseSelections)
  }, [houseSelections])

  const openSelection = (house) => {
    const currentSelection = houseSelections[house] ?? {}

    setActiveHouse(house)
    setDraftSelection(cloneSelection(currentSelection))
    setSelectedEntrance(null)
    setActivePanel('entrance')
    setEntranceFocusIndex(0)
    setApartmentFocusIndex(0)
  }

  const closeSelection = () => {
    setActiveHouse(null)
    setDraftSelection({})
    setSelectedEntrance(null)
    setActivePanel('entrance')
  }

  const clearHouse = (house) => {
    setHouseSelections((current) => ({
      ...current,
      [house]: {},
    }))

    if (activeHouse === house) {
      closeSelection()
    }
  }

  const chooseEntrance = (entrance, index) => {
    setSelectedEntrance(entrance)
    setEntranceFocusIndex(index)
    setActivePanel('apartment')
    setApartmentFocusIndex(0)
  }

  const toggleApartment = (apartment, index) => {
    setApartmentFocusIndex(index)
    setDraftSelection((current) => {
      const entranceKey = String(selectedEntrance)
      const currentApartments = current[entranceKey] ?? []
      const nextApartments = currentApartments.includes(apartment)
        ? currentApartments.filter((item) => item !== apartment)
        : [...currentApartments, apartment].sort((first, second) => first - second)

      const nextSelection = { ...current }

      if (nextApartments.length === 0) {
        delete nextSelection[entranceKey]
      } else {
        nextSelection[entranceKey] = nextApartments
      }

      return nextSelection
    })
  }

  const addDraftToTable = () => {
    if (!activeHouse || !canAdd) {
      return
    }

    setHouseSelections((current) => ({
      ...current,
      [activeHouse]: cloneSelection(draftSelection),
    }))
    closeSelection()
  }

  return {
    activeHouse,
    activePanel,
    apartmentFocusIndex,
    canAdd,
    houseSelections,
    draftSelection,
    entranceFocusIndex,
    selectedEntrance,
    addDraftToTable,
    chooseEntrance,
    clearHouse,
    closeSelection,
    openSelection,
    setActivePanel,
    setApartmentFocusIndex,
    setEntranceFocusIndex,
    toggleApartment,
  }
}
