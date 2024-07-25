import Header from '@/Components/header/Header'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DetailView from './DetailView'
import { BuildingsContextProvider } from '@/Context/BuildingsContext'

export default function Show ({ auth, id, building }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Buildings'>
      <Header title='Buildings' breadcrumb={['Buildings', id]} />
      <BuildingsContextProvider>
        <DetailView building={building} />
      </BuildingsContextProvider>
    </AuthenticatedLayout>
  )
}
