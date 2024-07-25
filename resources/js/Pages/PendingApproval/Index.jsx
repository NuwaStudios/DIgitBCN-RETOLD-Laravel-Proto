import Header from '@/Components/header/Header'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { GeneralDetail } from '@/Pages/PendingApproval/GeneralDetail.jsx'

export default function Index ({ auth, buildings, crafts }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Organisations'>
      <Header title='Pending' breadcrumb={['Pending buildings and crafts']} />
      <GeneralDetail buildings={buildings} crafts={crafts} />
    </AuthenticatedLayout>
  )
}
