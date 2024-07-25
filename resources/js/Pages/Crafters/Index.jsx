import { useState } from 'react'
import Header from '@/Components/header/Header.jsx'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'

export default function Index({ auth, crafters }) {
  const [selectedCrafter, setSelectedCrafter] = useState(null)

  const handleListItemClick = (crafter) => {
    setSelectedCrafter(crafter)
  }

  const handleBackButtonClick = () => {
    setSelectedCrafter(null)
  }

  return (
    <AuthenticatedLayout authUser={auth.user} title='Crafters'>
      <Header title='Crafters' breadcrumb={['Crafters']} />
      <div className='grow p-4 rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll text-sm'>
        {selectedCrafter ? (
          <div className='flex flex-col gap-4'>
            <button
              className='bg-main-color-dark text-gray-100 px-4 py-2 rounded-sm text-sm mt-auto hover:bg-main-color w-fit'
              onClick={handleBackButtonClick}>
              Back
            </button>
            <div className='bg-gray-100 dark:bg-accent-color-dark rounded w-full p-4'>
              <div className='text-sm flex flex-col lg:flex-row'>
                <div className='w-1/2'>
                  <SummaryInfo
                    title='Name'
                    value={`${selectedCrafter.person.e41_appellation_firstname} '${selectedCrafter.person.e41_appellation_middlename}' ${selectedCrafter.person.e41_appellation_lastname}`}
                  />

                  <SummaryInfo
                    title='Ocupation'
                    value={selectedCrafter.person.e41_appellation_occupation}
                  />

                  <SummaryInfo
                    title='Website'
                    value={selectedCrafter.person.e42_website}
                  />

                  <SummaryInfo
                    title='Date of birth'
                    value={selectedCrafter.person.e61_date_of_birth}
                  />

                  <SummaryInfo
                    title='Role'
                    value={selectedCrafter.person.e41_appellation_contribution_role}
                  />


                  <SummaryInfo
                    title='Role'
                    value={selectedCrafter.person.e41_appellation_contribution_role}
                  />

                  <SummaryInfo
                    title='Has practiced this craft'
                    value={`From ${selectedCrafter.person.timespan.e61_timespan_start} to ${selectedCrafter.person.timespan.e61_timespan_end}`}
                  />

                  <SummaryInfo
                    title='Is practicing this craft the main occupation of the crafter?'
                    value={selectedCrafter.person.craft_isMainActivity ? 'Yes' : 'No'}
                  />

                  <SummaryInfo
                    title='Does the crafter practice any other crafts?'
                    value={selectedCrafter.person.craft_isMultiArtisan ? 'Yes' : 'No'}
                  />

                  <SummaryInfo
                    title="Crafter's motivation for learning this specific art"
                    value={selectedCrafter.person.p17_motivation}
                  />

                </div>

                <div className='w-1/2'>
                  <SummaryInfo
                    title='Does the crafter have regular contact with colleagues? '
                    value={selectedCrafter.person.has_contacts ? `Yes, contact with ${selectedCrafter.person.has_contacts.contact_network_size} colleagues` : 'No'}
                  />

                  <SummaryInfo
                    title='Habitual working area'
                    value={selectedCrafter.person.preferred_workspace}
                  />
                  <SummaryInfo
                    title='From whom did the craftsperson learn their craft'
                    value={selectedCrafter.person.learned_from}
                  />

                  {selectedCrafter.person.learned_from === 'From one or more persons (informal)' && (
                    <SummaryInfo
                      title='Context of learning'
                      value={selectedCrafter.person.learned_person_context}
                    />
                  )}

                  {selectedCrafter.person.learned_from === 'Apprenticeship (semi formal)' && (
                    <SummaryInfo
                      title='Was the apprenticeship related to the craft?'
                      value={selectedCrafter.person.is_learned_apprenticeship_related ? 'Yes' : 'No'}
                    />
                  )}

                  {selectedCrafter.person.is_learned_apprenticeship_related && (
                    <SummaryInfo
                      title='Main subject (of the apprenticeship related to the craft)'
                      value={selectedCrafter.person.learned_apprenticeship_related_subject}
                    />
                  )}

                  {selectedCrafter.person.learned_from === 'Formal Course (with a diploma)' && (
                    <SummaryInfo
                      title='Was the academic course related to the craft?'
                      value={crafter.person.is_learned_course_related ? 'Yes' : 'No'}
                    />
                  )}

                  {selectedCrafter.person.is_learned_course_related && (
                    <SummaryInfo
                      title='Authority'
                      value={selectedCrafter.person.learned_course_authority}
                    />
                  )}

                  {selectedCrafter.person.is_learned_course_related && (
                    <SummaryInfo
                      title='Main subject:'
                      value={selectedCrafter.person.learned_course_subject}
                    />
                  )}

                  <SummaryInfo
                    title='Does the craftsperson model the craft documented here on historical or archaeological sources?'
                    value={selectedCrafter ? `Yes, ${selectedCrafter.person.historical_sources_reference}` : 'No'}
                  />

                  <SummaryInfo
                    title='Does the craftsperson teach the craft?'
                    value={selectedCrafter.person.is_teach_craft ? `Yes, ${selectedCrafter.person.teach_craft_where}` : 'No'}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ListContainer>
            {crafters.length > 0 ? (
              crafters.map((crafter, index) => (
                <ListItem
                  key={index}
                  header={`${crafter.person.e41_appellation_firstname} '${crafter.person.e41_appellation_middlename}' ${crafter.person.e41_appellation_lastname}`}
                  onClick={() => handleListItemClick(crafter)}
                />
              ))
            ) : (
              <p className='p-4 font-sm text-gray-500'>You haven't created any crafters yet.</p>
            )}
          </ListContainer>
        )}
      </div>
    </AuthenticatedLayout>
  )
}

function SummaryInfo({ title, value }) {
  return (
    <div className='flex flex-col mb-2'>
      <span className='text-text-muted mr-4'>
        {title} &nbsp;
      </span>
      <span className='font-semibold'>
        {value}
      </span>
    </div>
  )
}