import UsersList from '@/Components/users/UsersList'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Header from '@/Components/header/Header.jsx'

export default function Users ({ auth }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Users'>
      {/* <Header title='Users' breadcrumb={['Users']} /> TODO */}
      <UsersList />
    </AuthenticatedLayout>
  )
}
