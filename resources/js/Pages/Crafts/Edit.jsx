import Header from '@/Components/header/Header'
import { CraftsContextProvider } from '@/Context/CraftsContext.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CraftsForm } from '@/Pages/Crafts/Partials/Update/CraftsForm.jsx'

export default function Edit ({ auth, id, craft }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Crafts'>
      <Header title='Crafts' breadcrumb={['Crafts', 'Edit']} />
      <CraftsContextProvider>
        <CraftsForm id={id} craft={craft} />
      </CraftsContextProvider>
    </AuthenticatedLayout>
  )
}
