import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { IArrowUpDown } from '@/icons.jsx'

export function SelectOrganisation ({ id, value, onChange, placeholder, className = '', options, children }) {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option => (option.e41_appellation_english).toLowerCase().includes(query.toLowerCase()))

  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <div className='relative'>
        <Combobox value={options?.find(option => option.id === value)} onChange={onChange} nullable>
          <div className='flex'>
            <Combobox.Input
              id={id}
              placeholder={placeholder}
              className='w-full rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 pe-8 mt-2 '
              displayValue={option => option?.e41_appellation_english}
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
                  {option.e41_appellation_english}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </label>
  )
}
