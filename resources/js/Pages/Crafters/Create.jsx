import Header from '@/Components/header/Header'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CraftersForm } from '@/Pages/Crafters/Partials/Update/CraftersForm.jsx'
import { CrafterContextProvider } from '@/Context/CraftersContext.jsx'

export default function Edit ({ auth, crafter }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Crafters'>
      <Header title='Crafters' breadcrumb={['Crafters', 'Create']} />
      <CrafterContextProvider>
        <CraftersForm crafter={crafter} />
      </CrafterContextProvider>
    </AuthenticatedLayout>
  )
}
