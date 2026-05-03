import HouseTable from '../HouseTable/HouseTable'
import SelectionPanel from '../SelectionPanel/SelectionPanel'
import { HOUSES } from '../../constants/houses'
import { APARTMENTS, ENTRANCES } from '../../constants/selection'
import { useApartmentSelector } from '../../hooks/useApartmentSelector'
import './App.scss'

export default function App() {
  const {
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
    handleOptionKeyDown,
    openSelection,
    setActivePanel,
    setApartmentFocusIndex,
    setEntranceFocusIndex,
    toggleApartment,
  } = useApartmentSelector()

  return (
    <main className="app">
      <div className="app__workspace">
        <div className="app__tables" aria-label="Таблицы выбранных квартир">
          {HOUSES.map((house) => (
            <HouseTable
              key={house}
              houseNumber={house}
              selection={houseSelections[house]}
              onClear={() => clearHouse(house)}
              onAdd={() => openSelection(house)}
            />
          ))}
        </div>

        {activeHouse && (
          <div className="app__selectors" aria-label={`Выбор квартир для дома ${activeHouse}`}>
            <SelectionPanel
              title="Номер подъезда"
              panel="entrance"
              activePanel={activePanel}
              options={ENTRANCES}
              focusIndex={entranceFocusIndex}
              getLabel={(entrance) => `Подъезд ${entrance}`}
              isOptionSelected={(entrance) => entrance === selectedEntrance}
              onOptionClick={chooseEntrance}
              onClose={closeSelection}
              onPanelFocus={() => setActivePanel('entrance')}
              onFocusIndexChange={setEntranceFocusIndex}
              onOptionKeyDown={(event, option, index) =>
                handleOptionKeyDown('entrance', event, option, index)
              }
            />

            {selectedEntrance && (
              <SelectionPanel
                title="Номер квартиры"
                panel="apartment"
                activePanel={activePanel}
                options={APARTMENTS}
                focusIndex={apartmentFocusIndex}
                getLabel={(apartment) => `Квартира ${apartment}`}
                isOptionSelected={(apartment) =>
                  draftSelection[String(selectedEntrance)]?.includes(apartment) ?? false
                }
                onOptionClick={toggleApartment}
                onClose={closeSelection}
                onAdd={addDraftToTable}
                showAdd
                addDisabled={!canAdd}
                onPanelFocus={() => setActivePanel('apartment')}
                onFocusIndexChange={setApartmentFocusIndex}
                onOptionKeyDown={(event, option, index) =>
                  handleOptionKeyDown('apartment', event, option, index)
                }
              />
            )}
          </div>
        )}
      </div>
    </main>
  )
}
