import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Header from '@/Components/header/Header'
import { Admin } from '@/Pages/Dashboard/Partials/Admin.jsx'
import { Manager } from '@/Pages/Dashboard/Partials/Manager.jsx'
import { Documenter } from '@/Pages/Dashboard/Partials/Documenter.jsx'

export default function Index({ auth }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Dashboard'>
      <Header title='Dashboard' breadcrumb={['Dashboard']} />
      <div className='grow p-2 rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'>
        <div className='my-4 mx-4'>
          <p className='text-lg font-bold'>Welcome, <span className='text-main-color-muted'>Musemumsdorf Düppel</span>!</p>

          <div className='mt-6'>
            {auth.user.role_id === 1 && (
              <Admin />
            )}
            {auth.user.role_id === 2 && (
              <Manager />
            )}
            {auth.user.role_id === 3 && (
              <Documenter />
            )}
          </div>
        </div>

      </div>
    </AuthenticatedLayout>
  )
}
