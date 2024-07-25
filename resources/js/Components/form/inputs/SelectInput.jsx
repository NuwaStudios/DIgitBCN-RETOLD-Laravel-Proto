// export function SelectInput ({ id, name, value, placeholder, onChange, className = '', options, children, ...props }) {
//   return (
//     <label htmlFor={id} className='flex flex-col'>
//       {children}
//       <select name={name} id={id} {...props} className={'rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 mt-2 ' + className} onChange={onChange}>
//         <option selected disabled>{placeholder}</option>
//         {
//           options.map((option, index) => {
//             return (
//               <option key={index} value={option.id} selected={option.id === value}>{option.name}</option>
//             )
//           })
//         }
//       </select>
//     </label>
//   )
// }

import { Combobox, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { IArrowUpDown } from '@/icons'

// No usar e.target.value
// onChange={e => setObj({ ...obj, SelectInput: e })}
export function SelectInput ({ id, name, value, onChange, placeholder, className = '', options, children }) {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option => option.name.toLowerCase().includes(query.toLowerCase()))

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
                <Combobox.Option key={index} value={option.id} className='lg:hover:bg-accent-color-muted lg:hover:dark:bg-accent-color-dark-muted py-2 px-3'>
                  {option.name}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </label>
  )
}

const SelectInputText = ({ id, name, value, onChange, placeholder, className = '', options = [], children }) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option => option.toLowerCase().includes(query.toLowerCase()))

  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <div className='relative'>
        <Combobox value={value} onChange={onChange} nullable>
          <div className='flex'>
            <Combobox.Input
              id={id}
              placeholder={options[0] || placeholder}
              className='w-full rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 pe-8 mt-2 '
              displayValue={option => option}
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
              {filteredOptions.map((option, index) => (
                <Combobox.Option key={index} value={option} className='lg:hover:bg-accent-color-muted lg:hover:dark:bg-accent-color-dark-muted py-2 px-3'>
                  {option}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </label>
  )
}

SelectInput.Text = SelectInputText
