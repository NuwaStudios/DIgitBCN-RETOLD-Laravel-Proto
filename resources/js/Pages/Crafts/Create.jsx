import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Header from '@/Components/header/Header'
import { CraftsForm } from '@/Pages/Crafts/Partials/Update/CraftsForm.jsx'
import { CraftsContextProvider } from '@/Context/CraftsContext.jsx'

export default function CreateCraft ({ auth }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Crafts'>
      <Header title='Crafts' breadcrumb={['Crafts', 'Create']} />
      <CraftsContextProvider>
        <CraftsForm />
      </CraftsContextProvider>
    </AuthenticatedLayout>
  )
}
