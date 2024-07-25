import { Image } from '@/Components/Image'
import { AuthContext } from '@/Context/AuthContext'
import { Menu, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import { Fragment, useContext } from 'react'
import { IChevronDown, IChevronUp } from '@/icons'

export function UserDropdown () {
  const { user } = useContext(AuthContext)

  return (
    <Menu as='div' className='w-full relative inline-block '>
      <Menu.Button className='flex items-center justify-between gap-2 w-full p-2 rounded lg:hover:bg-accent-color-muted dark:lg:hover:bg-accent-color-dark-muted text-accent-color-dark lg:hover:text-accent-color-muted-dark dark:text-accent-color-muted dark:lg:hover:text-accent-color'>
        <div className='flex items-center gap-2'>
          <Image src='https://picsum.photos/200/200' alt='Profile picture' className='rounded-full w-10' />
          <div className='text-left hidden sm:block'>
            <span className='font-bold'>{user?.name || undefined}</span>
            <span className='block text-sm text-accent-color-dark-muted dark:text-accent-color-muted'>{user?.role.name.charAt(0).toUpperCase() + user?.role.name.slice(1)}</span>
          </div>
        </div>
        <IChevronUp className='hidden sm:block' />
        <IChevronDown className='sm:hidden' />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute rounded w-min max-h-52 z-20 border border-border dark:border-border-dark overflow-y-scroll sm:w-full sm:bottom-16 origin-top-right right-0 sm:origin-top-left bg-accent-color dark:bg-accent-color-dark focus:outline-none'>
          <UserDropdownItem route={route('profile.edit')} method='get'>Profile</UserDropdownItem>
          <UserDropdownItem route='#'>Settings</UserDropdownItem>
          <UserDropdownDivider />
          <UserDropdownItem route={route('logout')} method='post'>Logout</UserDropdownItem>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function UserDropdownItem ({ route, method, children }) {
  return (
    <Menu.Item>
      <Link href={route} method={method} className='block px-4 py-2 text-sm text-accent-color-dark lg:hover:bg-accent-color-muted dark:lg:hover:bg-accent-color-dark-muted dark:text-accent-color-muted dark:lg:hover:text-accent-color'>
        {children}
      </Link>
    </Menu.Item>
  )
}

function UserDropdownDivider () {
  return (
    <Menu.Item>
      <hr className='border-border dark:border-border-dark' />
    </Menu.Item>
  )
}
