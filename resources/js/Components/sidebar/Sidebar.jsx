import { Fragment, useState } from 'react'
import ApplicationLogo from '../ApplicationLogo'
import { UserDropdown } from './partials/UserDropdown'
import { ICross, IBurger, IChevronDown, IChevronRigth } from '@/icons'
import { Link, router } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
export function Sidebar ({ children }) {
  const [sidebarExpand, setSidebarExpand] = useState(false)

  return (
    <>
      <h1 role='heading' className='py-2 px-3 h-header'>
        <Link href='/dashboard' role='link' aria-label='Retold'>
          <ApplicationLogo className='w-40' alt='Retold logo' />
        </Link>
      </h1>
      <nav role='navigation' aria-label='Primary' className='hidden grow sm:block overflow-y-scroll'>
        {children}
      </nav>
      <div className='flex items-center gap-2'>
        <UserDropdown />
        <button className='p-2 sm:hidden' onClick={() => setSidebarExpand(!sidebarExpand)}>
          {sidebarExpand
            ? (<ICross />)
            : (<IBurger />)}
        </button>
      </div>
      {sidebarExpand && (
        <dialog open className='top-header h-dialog w-full bg-background-color-muted dark:bg-background-color-dark-muted z-10'>
          <nav role='navigation' aria-label='Primary' className='h-dialog overflow-y-scroll border-t border-border dark:border-border-dark'>
            <SidebarList>
              {children}
            </SidebarList>
          </nav>
        </dialog>
      )}
    </>
  )
}

const SidebarList = ({ children }) => {
  return (
    <ul role='list' className='w-full'>
      {children}
    </ul>
  )
}

const SidebarListItem = ({ active, href, label, icon, expanded = false, className = '', children }) => {
  const [childrenExpanded, setChildrenExpanded] = useState(expanded)

  const handleLink = e => {
    e.preventDefault()
    if (children) setChildrenExpanded(!childrenExpanded)
    else router.visit(href)
  }

  return (
    <li
      role='listitem'
      className={
        'overflow-hidden ' +
        (active
          ? 'border-s-4 border-main-color dark:border-main-color-dark'
          : 'border-s-4 border-transparent')
      }
    >
      <Link href={href} role='link' className={'py-4 px-3 rounded lg:hover:bg-accent-color-muted dark:lg:hover:bg-accent-color-dark-muted text-accent-color-dark lg:hover:text-accent-color-muted-dark dark:text-accent-color-muted dark:lg:hover:text-accent-color flex items-center gap-2 ' + className} aria-label='Documentation' onClick={e => handleLink(e)}>
        {icon}
        {label}
        {children
          ? (
              childrenExpanded
                ? (<IChevronDown className='ms-auto' />)
                : (<IChevronRigth className='ms-auto' />)
            )
          : null}
      </Link>
      <Transition
        as={Fragment}
        show={childrenExpanded}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 scale-95'
        enterTo='opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-95'
      >
        <div className='flex'>
          <SidebarList>
            {children}
          </SidebarList>
        </div>
      </Transition>
    </li>
  )
}

const SidebarListHeading = ({ children }) => {
  return (
    <li role='listitem' className='flex items-center gap-2 py-2 pe-3 text-xs font-bold text-text-muted dark:text-text-dark-muted uppercase tracking-wider'>
      <span className='block w-5 border-b border-accent-color-muted dark:border-accent-color-dark-muted me-3' />
      {children}
    </li>
  )
}

Sidebar.SidebarList = SidebarList
Sidebar.SidebarListItem = SidebarListItem
Sidebar.SidebarListHeading = SidebarListHeading

export default Sidebar
