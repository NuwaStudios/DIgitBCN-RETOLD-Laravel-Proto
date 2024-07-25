import Header from '@/Components/header/Header.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import { OrganisationsContextProvider } from '@/Context/OrganisationsContext.jsx'
import { OrganisationsForm } from '@/Pages/Organisations/Partials/OrganisationsForm.jsx'

export default function Edit ({ auth, id, organisation }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Organisation'>
      <Header title='Organization' breadcrumb={['Organization', 'Edit']} />
      <OrganisationsContextProvider>
        <OrganisationsForm id={id} organisation={organisation} />
      </OrganisationsContextProvider>
    </AuthenticatedLayout>
  )
}
