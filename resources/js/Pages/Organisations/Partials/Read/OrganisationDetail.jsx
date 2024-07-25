import { FaVideo } from 'react-icons/fa'
import { OrganisationsContext } from '@/Context/OrganisationsContext'
import { useContext, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

export function OrganisationDetail () {
  const { organisationObj } = useContext(OrganisationsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full'>
        <div className='w-full lg:w-2/3 overflow-y-auto'>
          <div className='h-full rounded text-sm'>
            <Card>
              <div className='flex flex-col xl:flex-row gap-x-24'>
                <div className='min-w-fit'>
                  <SummaryInfo
                    title='Name (enlish)'
                    value={organisationObj.organisation.e41_appellation_english}
                  />

                  <SummaryInfo
                    title='Legal name (local)'
                    value={organisationObj.organisation.e41_appellation_local}
                  />
                </div>
                <div className='min-w-fit'>
                  <SummaryInfo
                    title='Local name'
                    value={organisationObj.organisation.e41_appellation_local}
                  />

                  <SummaryInfo
                    title='Website'
                    value={organisationObj.organisation.e41_website}
                  />
                </div>
                <div className='min-w-fit'>
                  <SummaryInfo
                    title='Address'
                    value={`${organisationObj.organisation.address.e41_street}, ${organisationObj.organisation.address.e41_city} ${organisationObj.organisation.address.e41_postcode}`}
                  />

                  <SummaryInfo
                    title='Institution'
                    value={organisationObj.organisation.e41_institution}
                  />
                </div>
              </div>

            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

function Card ({ children }) {
  return (
    <>
      <div className=' dark:border-gray-600 h-fit flex bg-gray-100  dark:bg-accent-color-dark rounded px-4 py-4 mb-4 mr-2'>
        {children}
      </div>
    </>
  )
}

function SummaryInfo ({ title, value }) {
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
