import { useState, useEffect, useContext } from 'react'
import { Tab } from '@headlessui/react'
import DocumentersDetail from './ShowComponents/DocumentersDetail'
import SourceMaterialsDetail from './ShowComponents/SourceMaterialDetail'
import InhabitantsDetail from './ShowComponents/InhabitantsDetail'
import ConstructionProcessDetail from './ShowComponents/ConstructionProcessDetail'
import { BuildingsContext } from '@/Context/BuildingsContext.jsx'

export default function DetailView ({ building }) {
  const [currentTab, setCurrentTab] = useState(1)
  const { setBuildingObj } = useContext(BuildingsContext)

  useEffect(() => {
    if (building) setBuildingObj(building)
  }, [])

  return (
    <>
      <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab} as='div' className='grow flex flex-col overflow-y-scroll'>
        <div className='flex dark:bg-background-color-dark rounded'>

          <CraftsTabs title='Documenters' index={1} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Source material' index={2} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Inhabitants, type & role' index={3} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Construction process' index={4} currentTab={currentTab} setCurrentTab={setCurrentTab} />

        </div>

        <div className='grow max-h-full rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll sm:py-5 sm:px-3'>
          <div className='p-5 overflow-y-scroll h-full'>

            <DocumentersDetail currentTab={currentTab} />
            <SourceMaterialsDetail currentTab={currentTab} />
            <InhabitantsDetail currentTab={currentTab} />
            <ConstructionProcessDetail currentTab={currentTab} />

          </div>
        </div>
      </Tab.Group>
    </>
  )
}

function CraftsTabs ({ title, index, currentTab, setCurrentTab }) {
  return (
    <div
      className={`hover:cursor-pointer text-sm w-56 rounded-tr-md border-r-2 border-r-gray-200 dark:border-r-gray-600 px-4 relative ${currentTab === index
        ? 'bg-background-color-muted dark:bg-background-color-dark-muted font-bold border-t-2 border-t-main-color-dark transition duration-300 ease-in-out'
        : 'bg-gray-100 dark:bg-background-color-dark-muted border-b-8 border-b-accent-color dark:border-b-gray-600'
        } p-2`}
      onClick={() => setCurrentTab(index)}
    >
      <div className='relative'>
        <span className='absolute bottom-0 left-0 w-full h-8 bg-white' style={{ zIndex: -1 }} />
        {title}
      </div>
    </div>
  )
}
