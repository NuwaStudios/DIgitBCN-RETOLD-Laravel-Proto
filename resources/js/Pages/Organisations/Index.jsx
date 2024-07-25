import Header from '@/Components/header/Header'
import { ListContainer } from '@/Components/listContainer/ListContainer'
import { ListItem } from '@/Components/listContainer/partials/ListItem'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

export default function Index({ auth, organisations }) {
  return (
    <AuthenticatedLayout authUser={auth.user} title='Dashboard'>
      <Header title='Museums' breadcrumb={['Organisations']} />
      <div className='grow p-2 rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'>
        <ListContainer>
          {organisations.length > 0 ? (
            organisations.map((organisation) => (
              <ListItem
                key={organisation.id}
                header={organisation.e41_appellation_english}
                href={route('organisations.show', organisation.id)}
                editable
                viewable
              />
            ))
          ) : (
            <p className='p-4 font-sm text-gray-500'>You haven't created any organisations yet</p>
          )}
        </ListContainer>
      </div>
    </AuthenticatedLayout>
  )
}
