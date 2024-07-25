import Header from '@/Components/header/Header.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'

export default function Unauthorized ({ auth }) {
  return (
    <AuthenticatedLayout authUser={auth.user}>
      <Header title='Unauthorized' />
      <img src='https://http.cat/images/401.jpg' alt='Unauthorized' />
    </AuthenticatedLayout>
  )
}
