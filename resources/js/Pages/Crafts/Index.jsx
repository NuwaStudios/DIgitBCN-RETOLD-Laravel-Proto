import Header from '@/Components/header/Header'
import { ListContainer } from '@/Components/listContainer/ListContainer'
import { ListItem } from '@/Components/listContainer/partials/ListItem'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useState, useEffect } from 'react'

export default function Index({ auth, crafts }) {
  const [isFilterVisible, setFilterVisible] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({})
  const [filteredCrafts, setFilteredCrafts] = useState([])

  console.log(crafts)

  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible)
  }

  const getUniqueValuesWithCount = (property) => {
    const uniqueValues = [...new Set(crafts.map(craft => craft[property]))]
    const valueCounts = {}
    crafts.forEach(craft => {
      const value = craft[property]
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
    const filteredCrafts = applyFilters()
    setFilteredCrafts(filteredCrafts)
  }, [selectedFilters])


  return (
    <AuthenticatedLayout authUser={auth.user} title='Dashboard'>
      <div className='flex justify-between '>
        <Header title='Crafts' breadcrumb={['Crafts']} />
        <button
          className='self-center cursor-pointer bg-accent-color-dark-muted rounded text-white p-1 h-fit w-16 text-sm'
          onClick={toggleFilter}>{isFilterVisible ? 'Close' : 'Filter'}</button>
      </div>



      {isFilterVisible && (
        <div className='bg-white dark:bg-background-color-dark-muted rounded mb-3 p-5 flex justify-between'>
          <div>
            <p className='font-semibold mb-3'>Filter the crafts</p>
            <div className='flex w-fit gap-4 text-sm'>
              {['e53_country', 'is_public'].map(property => (
                <div className='border-r dark:border-gray-800 pr-10' key={property}>
                  <h2 className="font-semibold mb-1">{property === 'e53_country' ? 'Country' : 'Public'}</h2>
                  {getUniqueValuesWithCount(property, crafts).map(({ value, count }) => (
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
          {filteredCrafts.length > 0
            ? (
              filteredCrafts.map((craft) => (
                < ListItem key={craft.id} href={route('crafts.show', craft.id)} header={craft.e35_title_english} body={craft.is_public === 1 ? 'Public' : 'Private'} editable viewable />
              ))
            )
            : (
              <p className='p-4 font-sm text-gray-500'>Either no crafts are created yet or no crafts match the selected filters</p>
            )}
        </ListContainer>
      </div>
    </AuthenticatedLayout>
  )
}
