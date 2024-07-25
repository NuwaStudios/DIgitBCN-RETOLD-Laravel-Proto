import { useState, useContext } from 'react'
import { FaPhone, FaEnvelope, FaGlobe, FaLocationDot, FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { CraftsContext } from '@/Context/CraftsContext.jsx'

function CraftersDocumentersDetail({ currentTab }) {
  const { craftsObj } = useContext(CraftsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 2}>
        <div className='flex flex-col-reverse gap-8 xl:flex-row xl:gap-12 lg:h-full'>
          <div className=' w-full overflow-hidden'>
            <div className='border border-gray-300 dark:border-gray-600 h-full flex rounded shadow-md'>
              <div className='lg:h-full px-4 pt-3 pb-6 rounded-r-lg dark:border-gray-600 w-full bg-background-color dark:bg-background-color-dark' style={{ overflowY: 'auto' }}>

                {craftsObj.crafters.length > 0
                  ? (
                    craftsObj.crafters.map((crafter, index) => (
                      <ToggleableParagraph
                        key={index}
                        crafter={crafter}
                        firstName={crafter.person.e41_appellation_firstname}
                        middleName={crafter.person.e41_appellation_middlename}
                        lastName={crafter.person.e41_appellation_lastname}
                        role={crafter.person.e41_appellation_contribution_role}
                        phone={crafter.person.address.e42_phone}
                        email={crafter.person.address.e42_email}
                        website={crafter.person.e42_website}
                        city={crafter.person.address.e41_city}
                        country={crafter.person.address.country}
                      />
                    ))
                  )
                  : (
                    <p className='p-2 font-sm text-gray-500'>You haven't added any crafters for this craft yet. Edit the craft to add them, then they will appear here.</p>
                  )}

              </div>
            </div>
          </div>

          <div className='w-full lg:w-2/5'>
            <div className='px-5 py-4 bg-accent-color dark:bg-accent-color-dark dark:border-gray-600 rounded'>
              <div>
                <h1 className='font-bold text-lg'>{craftsObj.documenters.organisationOwner?.e41_appellation_english}</h1>
                <p className='text-sm italic mb-3'>{craftsObj.documenters.organisationOwner?.e41_appellation_local}</p>

                <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700' />

                <p className='text-sm'>{craftsObj.documenters.organisationOwner?.e41_appellation_legal_local}</p>

                <p className='text-sm'>{craftsObj.documenters.organisationOwner?.address?.e41_street} </p>

                <p className='text-sm' />

                <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700' />

                <div className='text-sm'>
                  <h1 className='font-semibold'>Responsible for this documentation</h1>
                  {/* TODO: <p>{craftsObj.documenters.person.e41_appellation_firstname} {craftsObj.documenters.person.e41_appellation_middlename} {craftsObj.documenters.person.e41_appellation_lastname}, {craftsObj.documenters.person.e41_appellation_contribution_role}</p> */}

                  <p>{craftsObj.documenters.organisationOwner?.address?.country}</p>

                  <p>
                    Documented {craftsObj.documenters.p17_motivation && craftsObj.documenters.p17_motivation.charAt(0).toLowerCase() + craftsObj.documenters.p17_motivation.slice(1)}
                  </p>

                  <p>Documented from {craftsObj.documenters.e61_timespan_start} to {craftsObj.documenters.e61_timespan_end}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default CraftersDocumentersDetail

function ToggleableParagraph({ crafter, firstName, middleName, lastName, role, phone, email, website, city, country }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative h-fit py-4 px-4 rounded bg-white dark:bg-background-color-dark-muted shadow-md mb-4'>
      <div className='flex justify-between items-start'>
        <div>
          <p className='text-lg'><span className='font-bold'>{firstName} {middleName} {lastName} </span>, <span>{role}</span> </p>

          <div className='mt-2 text-sm items-center hidden sm:hidden md:hidden lg:flex xl:flex'>
            <FaPhone className='text-accent-color-muted-darker' />
            <p className='pl-3 text-text-dark-muted'>{phone}</p>
            <span className='text-accent-color-muted px-4'>&nbsp;|&nbsp;</span>

            <FaEnvelope className='text-accent-color-muted-darker' />
            <p className='pl-3 text-text-dark-muted'>{email}</p>
            <span className='text-accent-color-muted px-4'>&nbsp;|&nbsp;</span>

            <FaGlobe className='text-accent-color-muted-darker' />
            <p className='pl-3 text-text-dark-muted'>{website}</p>
            <span className='text-accent-color-muted px-4'>&nbsp;|&nbsp;</span>

            <FaLocationDot className='text-accent-color-muted-darker' />
            <p className='pl-3 text-text-dark-muted'>{city}, {country}</p>
          </div>
        </div>

        <div className='w-4 h-4 flex items-center justify-center'>
          {isOpen
            ? (
              <FaChevronUp className='cursor-pointer' onClick={toggleOpen} size={15} />
            )
            : (
              <FaChevronDown className='cursor-pointer' onClick={toggleOpen} size={15} />
            )}
        </div>
      </div>

      {isOpen && (
        <div className='mt-2'>
          <hr className='h-px my-5 bg-gray-300 border-0 dark:bg-gray-700' />

          <div className='mt-2 text-sm items-center lg:hidden xl:hidden'>
            <div className='flex items-center mb-1'>
              <FaPhone className='text-accent-color-muted-darker' />
              <p className='pl-3 text-'>{phone}</p>
            </div>

            <div className='flex items-center mb-1'>
              <FaEnvelope className='text-accent-color-muted-darker' />
              <p className='pl-3'>{email}</p>
            </div>

            <div className='flex items-center mb-1'>
              <FaGlobe className='text-accent-color-muted-darker' />
              <p className='pl-3'>{website}</p>
            </div>

            <div className='flex items-center'>
              <FaLocationDot className='text-accent-color-muted-darker' />
              <p className='pl-3'>{city}, {country}</p>
            </div>
          </div>

          <hr className='h-px my-5 bg-gray-300 border-0 dark:bg-gray-700  sm:flex md:flex lg:hidden xl:hidden' />

          <div className='text-sm flex flex-col lg:flex-row'>
            <div className='w-1/2'>
              <CrafterInfo
                title='Role'
                value={crafter.person.e41_appellation_contribution_role}
              />

              <CrafterInfo
                title='Has practiced this craft'
                value={`From ${crafter.person.timespan.e61_timespan_start} to ${crafter.person.timespan.e61_timespan_end}`}
              />

              <CrafterInfo
                title='Is practicing this craft the main occupation of the crafter?'
                value={crafter.person.craft_isMainActivity ? 'Yes' : 'No'}
              />

              <CrafterInfo
                title='Does the crafter practice any other crafts?'
                value={crafter.person.craft_isMultiArtisan ? 'Yes' : 'No'}
              />

              <CrafterInfo
                title="Crafter's motivation for learning this specific art"
                value={crafter.person.p17_motivation}
              />

              <CrafterInfo
                title='Does the crafter have regular contact with colleagues? '
                value={crafter.person.has_contacts ? `Yes, contact with ${crafter.person.has_contacts.contact_network_size} colleagues` : 'No'}
              />

              <CrafterInfo
                title='Habitual working area'
                value={crafter.person.preferred_workspace}
              />
            </div>

            <div className='w-1/2'>
              <CrafterInfo
                title='From whom did the craftsperson learn their craft'
                value={crafter.person.learned_from}
              />

              {crafter.person.learned_from === 'From one or more persons (informal)' && (
                <CrafterInfo
                  title='Context of learning'
                  value={crafter.person.learned_person_context}
                />
              )}

              {crafter.person.learned_from === 'Apprenticeship (semi formal)' && (
                <CrafterInfo
                  title='Was the apprenticeship related to the craft?'
                  value={crafter.person.is_learned_apprenticeship_related ? 'Yes' : 'No'}
                />
              )}

              {crafter.person.is_learned_apprenticeship_related && (
                <CrafterInfo
                  title='Main subject (of the apprenticeship related to the craft)'
                  value={crafter.person.learned_apprenticeship_related_subject}
                />
              )}

              {crafter.person.learned_from === 'Formal Course (with a diploma)' && (
                <CrafterInfo
                  title='Was the academic course related to the craft?'
                  value={crafter.person.is_learned_course_related ? 'Yes' : 'No'}
                />
              )}

              {crafter.person.is_learned_course_related && (
                <CrafterInfo
                  title='Authority'
                  value={crafter.person.learned_course_authority}
                />
              )}

              {crafter.person.is_learned_course_related && (
                <CrafterInfo
                  title='Main subject:'
                  value={crafter.person.learned_course_subject}
                />
              )}

              <CrafterInfo
                title='Does the craftsperson model the craft documented here on historical or archaeological sources?'
                value={crafter.person.is_historical_sources ? `Yes, ${crafter.person.historical_sources_reference}` : 'No'}
              />

              <CrafterInfo
                title='Does the craftsperson teach the craft?'
                value={crafter.person.is_teach_craft ? `Yes, ${crafter.person.teach_craft_where}` : 'No'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CrafterInfo({ title, value }) {
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
