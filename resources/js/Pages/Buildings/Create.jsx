import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Header from '@/Components/header/Header'
import { BuildingsContextProvider } from '@/Context/BuildingsContext'
import { BuildingsForm } from '@/Pages/Buildings/Partials/Update/BuildingsForm'

export default function CreateBuilding ({ auth }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Buildings'>
      <Header title='Buildings' breadcrumb={['Buildings', 'Create']} />
      <BuildingsContextProvider>
        <BuildingsForm />
      </BuildingsContextProvider>
    </AuthenticatedLayout>
  )
}
