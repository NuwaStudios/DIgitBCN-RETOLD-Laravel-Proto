import ApplicationLogo from '@/Components/ApplicationLogo'
import { Link } from '@inertiajs/react'

export default function Guest ({ children }) {
  return (
    <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-background-color dark:bg-background-color-dark dark:text-white'>
      <div>
        <Link href='/'>
          <ApplicationLogo className='h-20 fill-current text-gray-500' />
        </Link>
      </div>

      <div className='w-full sm:max-w-md mt-6 px-6 py-4 bg-background-color-muted dark:bg-background-color-dark-muted shadow-md overflow-hidden sm:rounded-lg'>
        {children}
      </div>
    </div>
  )
}
