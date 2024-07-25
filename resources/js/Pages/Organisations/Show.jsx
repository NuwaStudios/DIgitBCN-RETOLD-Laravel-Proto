import Header from '@/Components/header/Header'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { GeneralDetail } from '@/Pages/Organisations/Partials/Read/GeneralDetail.jsx'
import { OrganisationsContextProvider } from '@/Context/OrganisationsContext'

export default function Show ({ auth, organisation }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Organisations'>
      <Header title='Organisations' breadcrumb={['Organisations', organisation.organisation.e41_appellation_english]} />
      <OrganisationsContextProvider>
        <GeneralDetail organisation={organisation} />
      </OrganisationsContextProvider>
    </AuthenticatedLayout>
  )
}
