import Header from '@/Components/header/Header'
import { ListContainer } from '@/Components/listContainer/ListContainer'
import { ListItem } from '@/Components/listContainer/partials/ListItem'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useState, useEffect } from 'react'

export default function Index({ auth, buildings }) {
  const [isFilterVisible, setFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})
  const [filteredBuildings, setFilteredBuildings] = useState([])

  console.log(buildings)

  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible)
  }

  const getUniqueValuesWithCount = (property) => {
    const uniqueValues = [...new Set(buildings.map(building => building[property]))]
    const valueCounts = {}
    buildings.forEach(building => {
      const value = building[property]
      valueCounts[value] = (valueCounts[value] || 0) + 1
    })
    return uniqueValues.map(value => ({ value, count: valueCounts[value] }))
  }

  const handleCheckboxChange = (property, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [property]: {
        ...(prevState[property] || {}),
        [value]: !(prevState[property]?.[value] || false)
      }
    }))
  }

  const applyFilters = () => {
    return buildings.filter(building => {
      return Object.entries(selectedFilters).every(([property, values]) => {
        if (!Object.values(values).some(value => value === true)) return true
        if (property === 'e53_country') {
          return Object.entries(values).some(([value, checked]) => {
            if (!checked) return false
            return building[property] === value
          })
        } else if (property === 'is_public') {
          const selectedValues = Object.entries(values).filter(([value, checked]) => checked).map(([value]) => parseInt(value))
          if (selectedValues.length === 0) return true
          return selectedValues.includes(building[property] === 1 ? 1 : 0)
        }
        return true
      })
    })
  }

  const resetFilters = () => {
    setSelectedFilters({})
  }

  useEffect(() => {
    const filteredBuildings = applyFilters()
    setFilteredBuildings(filteredBuildings)
  }, [selectedFilters])

  return (
    <AuthenticatedLayout authUser={auth.user} title='Dashboard'>
      <div className='flex justify-between '>
        <Header title='Buildings' breadcrumb={['Buildings']} />
        <button
          className='self-center cursor-pointer bg-accent-color-dark-muted rounded text-white p-1 h-fit w-16 text-sm'
          onClick={toggleFilter}>{isFilterVisible ? 'Close' : 'Filter'}</button>
      </div>

      {isFilterVisible && (
        <div className='bg-white dark:bg-background-color-dark-muted rounded mb-3 p-5 flex justify-between'>
          <div>
            <p className='font-semibold mb-3'>Filter the buildings</p>
            <div className='flex w-fit gap-4 text-sm'>
              {['e53_country', 'is_public'].map(property => (
                <div className='border-r dark:border-gray-800 pr-10' key={property}>
                  <h2 className="font-semibold mb-1">{property === 'e53_country' ? 'Country' : 'Public'}</h2>
                  {getUniqueValuesWithCount(property, buildings).map(({ value, count }) => (
                    <div key={value} className="flex items-center">
                      <input
                        type="checkbox"
                        id={value}
                        name={value}
                        value={value}
                        className="mr-1"
                        checked={selectedFilters[property]?.[value] === true}
                        onChange={() => handleCheckboxChange(property, value)}
                      />
                      <label htmlFor={value}>{property === 'e53_country' ? value : value === 1 ? 'Yes' : 'No'} <span className="text-gray-400">({count})</span></label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <button className="text-sm rounded text-gray-500 h-fit bg-accent-color-muted dark:bg-text-dark-muted dark:text-gray-300 px-2" onClick={resetFilters}>Reset Filters</button>
          </div>
        </div>
      )}

      <div className='grow p-4 rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'>
        <ListContainer>
          {filteredBuildings.length > 0
            ? (
              filteredBuildings.map((building) => (
                console.log(building),
                <ListItem key={building.id} href={route('buildings.show', building.id)} header={building.e35_title_english} body={building.is_public === 1 ? 'Public' : 'Private'} editable viewable />
              ))
            )
            : (
              <p className='p-4 font-sm text-gray-500'>Either no buildings are created yet or no buildings match the selected filters</p>
            )}
        </ListContainer>
      </div>
    </AuthenticatedLayout>
  )
}
