import React, { useState, useEffect, useRef } from 'react'
import { Image } from '@/Components/Image'
import { Link, router } from '@inertiajs/react'
import { FaPen, FaEye, FaEllipsisV } from 'react-icons/fa'

export function ListItem({ href, header, body, image, items, icon: Icon, editable = false, viewable = false, children, onClick }) {
  const redirect = e => {
    e.preventDefault()
    if (href) router.visit(href)
  }

  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef()

  const handleClick = () => {
    setShowMenu(prevShowMenu => !prevShowMenu)
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <div className='min-h-28 grid grid-cols-listItem grid-rows-1 items-center rounded bg-accent-color dark:bg-accent-color-dark lg:hover:cursor-pointer hover:bg-accent-color-muted-darker dark:hover:bg-accent-color-dark-muted' tabIndex='0'>
      <div className='relative w-full aspect-video object-cover rounded'>
        <Image className={`h-full object-cover rounded lg:${editable ? 'hover:filter hover:grayscale' : ''}`} src={image} alt={`${header} picture`} />
        <div className={`absolute inset-0 ${editable ? 'bg-black opacity-0 hover:opacity-75 transition-opacity duration-200 rounded flex gap-4 items-center justify-center' : ''}`}>
          {editable && <Link href={href + '/edit'}><FaPen className='text-white text-lg hover:text-main-color-dark-muted' /></Link>}
          {viewable && <Link href={href}><FaEye className='text-white text-lg hover:text-main-color-dark-muted ml-2' /></Link>}
        </div>
        <div className='lg:hidden absolute inset-0 bg-gradient-to-b from-black/75 to-transparent pt-2 pb-2'>
          <div ref={menuRef}>
            {(editable && viewable) && (
              <>
                <FaEllipsisV className='text-2xl xs:text-3xl sm:text-2xl p-1 pt-2 absolute right-0 top-0 text-white' onClick={handleClick} />
                {showMenu && (
                  <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className='py-1' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                      <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>Edit</a>
                      <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>View</a>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div onClick={onClick} className='grow w-full flex flex-col gap-0 p-3 cursor-pointer'>
        <div className='grow-0 flex items-center justify-between'>
          <div className='flex items-center'>
            <h3 className='text-lg font-bold line-clamp-1' role='heading' title={header}>{header}</h3>
            <span className='flex items-center bg-accent-color-muted dark:bg-text-dark-muted px-1 rounded ml-2 text-sm'>{items}</span>
          </div>
          {Icon && (
            <span className='px-3 py-1 rounded bg-main-color-muted dark:bg-main-color-dark hover:bg-main-color-dark dark:hover:bg-main-color-muted '>
              <Icon />
            </span>
          )}
        </div>

        <Link className='grow' href={href}>
          <span className='font-thin line-clamp-2 lg:line-clamp-3'>{body}</span>
        </Link>

        <div className='grow-0 pt-2 flex gap-2 mt-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}
