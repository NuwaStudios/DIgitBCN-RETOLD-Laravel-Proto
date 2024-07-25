import { Form } from '@/Components/form/Form.jsx'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { Fragment, useContext, useEffect, useState } from 'react'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { IArrowUpDown, ITrash } from '@/icons.jsx'
import { Combobox, Transition } from '@headlessui/react'

export function Crafters () {
  const { craftsObj, setCraftsObj, craftersList } = useContext(CraftsContext)

  const [listedCrafters, setListedCrafters] = useState(craftersList || [])
  const [selectedCrafters, setSelectedCrafters] = useState(craftsObj.crafters || [])

  useEffect(() => {
    setListedCrafters(craftersList.filter(crafter => !selectedCrafters.some(selectedCrafter => selectedCrafter.person.id === crafter.person.id)))
  }, [craftersList])

  const handleAddCrafter = (selectedCrafter) => {
    if (selectedCrafter) {
      setSelectedCrafters([...selectedCrafters, selectedCrafter])
      setListedCrafters(listedCrafters.filter(crafter => crafter.person.id !== selectedCrafter.person.id))
    }
  }

  const handleRemoveCrafter = (crafterToRemove) => {
    setSelectedCrafters(selectedCrafters.filter(crafter => crafter.person.id !== crafterToRemove.person.id))
    setListedCrafters([...listedCrafters, crafterToRemove])
  }

  useEffect(() => {
    craftsObj.crafters = [...selectedCrafters]
    setCraftsObj(() => ({ ...craftsObj }))
  }, [selectedCrafters])

  return (
    <Form.Fieldset legend={`Crafters (${craftsObj.crafters.length})`}>
      <Form.Group>
        <SelectCrafter
          value={null}
          onChange={handleAddCrafter}
          options={listedCrafters}
          placeholder='Select a crafter'
        />
      </Form.Group>
      <Form.GroupXl>
        <ListContainer>
          {selectedCrafters.map((crafter, index) => (
            <ListItem
              key={index}
              href={`/crafters/${crafter.person.id}`}
              header={crafter.person.e41_appellation_firstname + ' ' + crafter.person.e41_appellation_lastname}
            >
              <PrimaryButton
                onClick={e => {
                  e.preventDefault()
                  handleRemoveCrafter(crafter)
                }}
                remove
              >
                <ITrash />
              </PrimaryButton>
            </ListItem>
          ))}
        </ListContainer>
      </Form.GroupXl>
    </Form.Fieldset>
  )
}

export function SelectCrafter ({ id, name, value, onChange, placeholder, className = '', options, children }) {
  const [query, setQuery] = useState('')

  const filteredOptions =
  query === ''
    ? options
    : options.filter(option => (`${option.person.e41_appellation_firstname} '${option.person.e41_appellation_middlename}' ${option.person.e41_appellation_lastname}`).toLowerCase().includes(query.toLowerCase()))

  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <div className='relative'>
        <Combobox value={options?.find(option => option.id === value)} onChange={onChange} nullable>
          <div className='flex'>
            <Combobox.Input
              id={id}
              placeholder={placeholder || ((options && options[0].name) ? options[0].name : '')}
              className='w-full rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 pe-8 mt-2 '
              displayValue={option => option?.name}
              onChange={e => setQuery(e.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 top-2 flex items-center pr-2'>
              <IArrowUpDown />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Combobox.Options className='absolute max-h-40 w-full overflow-y-scroll z-10 rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none mt-2'>
              {filteredOptions?.map((option, index) => (
                <Combobox.Option key={index} value={option} className='lg:hover:bg-accent-color-muted lg:hover:dark:bg-accent-color-dark-muted py-2 px-3'>
                  {`${option.person.e41_appellation_firstname} '${option.person.e41_appellation_middlename}' ${option.person.e41_appellation_lastname}`}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </label>
  )
}
