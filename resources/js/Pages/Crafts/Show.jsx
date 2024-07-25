import Header from '@/Components/header/Header'
import { CraftsContextProvider } from '@/Context/CraftsContext.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DetailView from './DetailView'

export default function Show ({ auth, craft }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Crafts'>
      <Header title='Crafts' breadcrumb={['Crafts', 'My crafts']} />
      <CraftsContextProvider>
        <DetailView craft={craft} />
      </CraftsContextProvider>
    </AuthenticatedLayout>
  )
}
