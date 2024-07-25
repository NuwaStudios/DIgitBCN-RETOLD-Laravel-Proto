import Header from '@/Components/header/Header'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { useState, useEffect, useContext } from 'react'
import { Tab } from '@headlessui/react'
import SummaryDetail from './ShowComponents/SummaryDetail'
import CraftersDocumentersDetail from './ShowComponents/CraftersDocumentersDetail'
import ToolsMaterialsDetail from './ShowComponents/ToolsMaterialsDetail'
import ProductionProcessDetail from './ShowComponents/ProductionProcessDetail'
import FinalProductDetail from './ShowComponents/FinalProductDetail'
import { CraftsContext } from '@/Context/CraftsContext.jsx'

export default function DetailView ({ craft }) {
  const [currentTab, setCurrentTab] = useState(1)
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)

  useEffect(() => {
    if (craft) setCraftsObj(craft)
  }, [])

  return (
    <>
      <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab} as='div' className='grow flex flex-col overflow-y-scroll'>
        <div className='flex dark:bg-background-color-dark rounded'>

          <CraftsTabs title='Summary' index={1} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Crafters and documenters' index={2} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Tools and materials' index={3} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Production process' index={4} currentTab={currentTab} setCurrentTab={setCurrentTab} />

          <CraftsTabs title='Final product' index={5} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>

        <div className='grow max-h-full rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll sm:py-5 sm:px-3'>
          <div className='p-5 overflow-y-scroll h-full'>

            <SummaryDetail currentTab={currentTab} />
            <CraftersDocumentersDetail currentTab={currentTab} />
            <ToolsMaterialsDetail currentTab={currentTab} />
            <ProductionProcessDetail currentTab={currentTab} />
            <FinalProductDetail currentTab={currentTab} />

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
