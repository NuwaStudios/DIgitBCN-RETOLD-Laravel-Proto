import { useState, useContext, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import { UsersDetail } from '@/Pages/Organisations/Partials/Read/UsersDetail.jsx'
import { OrganisationDetail } from '@/Pages/Organisations/Partials/Read/OrganisationDetail.jsx'
import { OrganisationsContext } from '@/Context/OrganisationsContext'

export function GeneralDetail ({ organisation }) {
  const [currentTab, setCurrentTab] = useState(0)
  const { setOrganisationObj } = useContext(OrganisationsContext)

  useEffect(() => {
    if (organisation) {
      setOrganisationObj(organisation)
    }
  }, [])

  // Remider: Usar Tabs para no renderizar los componentes al cargar la vista y dar tiempo al objeto para cargar

  return (
    <>
      <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab} as='div' className='grow flex flex-col overflow-y-scroll'>
        <Tab.List>
          <div className='flex dark:bg-background-color-dark rounded'>
            <Tab><OrganisationTab title='Organisation' index={0} currentTab={currentTab} setCurrentTab={setCurrentTab} /></Tab>
            <Tab><OrganisationTab title='Users' index={1} currentTab={currentTab} setCurrentTab={setCurrentTab} /></Tab>
          </div>
        </Tab.List>

        <Tab.Panels>
          <div className='grow max-h-full rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll sm:py-5 sm:px-3'>
            <div className='overflow-y-scroll h-full'>

              <Tab.Panel><OrganisationDetail currentTab={currentTab} /></Tab.Panel>
              <Tab.Panel><UsersDetail currentTab={currentTab} /></Tab.Panel>

            </div>
          </div>
        </Tab.Panels>
      </Tab.Group>
    </>
  )
}
function OrganisationTab ({ title, index, currentTab }) {
  return (
    <div
      className={`hover:cursor-pointer text-sm w-56 rounded-tr-md border-r-2 border-r-gray-200 dark:border-r-gray-600 px-4 relative ${currentTab === index
        ? 'bg-background-color-muted dark:bg-background-color-dark-muted font-bold border-t-2 border-t-main-color-dark transition duration-300 ease-in-out'
        : 'bg-gray-100 dark:bg-background-color-dark-muted border-b-8 border-b-accent-color dark:border-b-gray-600'
        } p-2`}
    >
      <div className='relative'>
        <span className='absolute bottom-0 left-0 w-full h-8 bg-white' style={{ zIndex: -1 }} />
        {title}
      </div>
    </div>
  )
}
