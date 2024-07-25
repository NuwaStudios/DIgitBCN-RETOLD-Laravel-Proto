import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Header from '@/Components/header/Header'
import { BuildingsForm } from './Partials/Update/BuildingsForm'
import { BuildingsContextProvider } from '@/Context/BuildingsContext'

export default function Edit ({ auth, id, building }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Buildings'>
      <Header title='Buildings' breadcrumb={['Buildings', 'Create']} />
      <BuildingsContextProvider>
        <BuildingsForm id={id} building={building} />
      </BuildingsContextProvider>
    </AuthenticatedLayout>
  )
}
