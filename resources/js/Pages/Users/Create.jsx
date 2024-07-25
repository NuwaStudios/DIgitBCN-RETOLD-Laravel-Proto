import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import CreateOrganisation from '../Organisations/Create.jsx'

export default function Create() {
  return (
    <AuthenticatedLayout>
      <CreateOrganisation />
    </AuthenticatedLayout>
  )
}
