// import AdminContactForm from '@/Components/adminContact/AdminContactForm'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function AdminContact() {
  return (
    <AuthenticatedLayout>
      <AdminContactForm />
    </AuthenticatedLayout>
  )
}
