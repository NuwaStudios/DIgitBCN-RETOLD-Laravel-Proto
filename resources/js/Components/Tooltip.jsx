import { Menu, Transition } from '@headlessui/react'
import { IQuestion } from '@/icons.jsx'
import { Fragment } from 'react'

/**
 * Tooltip component
 * @param orientation: string ['right', 'left']
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export function Tooltip ({ orientation = 'left', className = '', children }) {
  let arrowCSS, containerCSS
  if (orientation === 'right') {
    arrowCSS = '-left-1 lg:left-auto lg:ms-auto lg:-right-1'
    containerCSS = 'left-7 lg:left-auto lg:right-7'
  } else {
    arrowCSS = 'ms-auto -right-1 lg:ms-0 lg:-left-1'
    containerCSS = 'right-7 lg:right-auto lg:left-7'
  }

  return (
    <Menu as='div' className={'relative w-min ' + className}>
      <Menu.Button className='w-min'><IQuestion /></Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className={'absolute z-50 bg-background-color dark:bg-background-color-dark px-2 py-1 rounded -top-1 ' + containerCSS}>
          <span className={'absolute block w-0 h-0 border-8 rotate-45 border-background-color dark:border-background-color-dark z-[-1] top-2 ' + arrowCSS} />
          <Menu.Item as='p' className='w-max max-w-60'>
            {children}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
