import { IChevronDown, IChevronUp } from '@/icons'
import { Disclosure, Transition } from '@headlessui/react'
import { Fragment, createContext, useContext, useState } from 'react'

const CollapseContext = createContext()

export function Collapse ({ length, children }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <CollapseContext.Provider value={{ openIndex, setOpenIndex, length }}>
      {children}
    </CollapseContext.Provider>
  )
}

const Item = ({ button, index, className = '', children }) => {
  const { openIndex, setOpenIndex, length } = useContext(CollapseContext)

  const handleClick = () => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Disclosure defaultOpen>
        <Disclosure.Button onClick={handleClick} className={'flex justify-between w-full rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 ' + className}>
          {button}
          {openIndex === index
            ? <IChevronUp className='mt-1' />
            : <IChevronDown className='mt-1' />}
        </Disclosure.Button>
        <Transition
          as={Fragment}
          show={openIndex === index}
          enter='transition ease-out duration-400'
          enterFrom='transform -translate-y-5 opacity-0'
          enterTo='transform translate-y-0 opacity-100'
          leave='transition ease-in duration-100'
          leaveFrom='transform translate-y-0 opacity-100'
          leaveTo='transform -translate-y-5 opacity-0'
        >
          <Disclosure.Panel className={'flex flex-col gap-2 ' + className}>
            {children}
          </Disclosure.Panel>
        </Transition>
      </Disclosure>
      {
        index < length &&
          <span className='my-4 -mx-3 border border-border dark:border-border-dark' />
      }
    </>
  )
}

Collapse.Item = Item
