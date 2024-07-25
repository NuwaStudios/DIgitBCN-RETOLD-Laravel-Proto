import { Transition } from '@headlessui/react'
import { Fragment } from 'react'

export const Dialog = ({ children, open = false, className = '' }) => {
  return (
    <>
      <Transition
        show={open}
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='absolute w-full h-full top-0 left-0 z-10'>
          <dialog open className={'flex flex-col rounded w-[90%] h-[90%] p-2 mt-12 bg-background-color-muted dark:bg-background-color-dark-muted dark:text-white z-20 ' + className}>
            {children}
          </dialog>
          <span className='absolute bg-black opacity-50 top-0 left-0 w-full h-full pointer-events-none z-10 transition-all duration-200' />
        </div>
      </Transition>
    </>
  )
}

const Header = ({ className = '', children }) => {
  return (
    <div className={'px-3 pt-3 ' + className}>
      {children}
    </div>
  )
}

const Body = ({ className = '', children }) => {
  return (
    <div className={'grow px-3 py-3 overflow-scroll ' + className}>
      {children}
    </div>
  )
}

const Footer = ({ className = '', children }) => {
  return (
    <div className={'px-3 py-3 ' + className}>
      {children}
    </div>
  )
}

Dialog.Header = Header
Dialog.Body = Body
Dialog.Footer = Footer
