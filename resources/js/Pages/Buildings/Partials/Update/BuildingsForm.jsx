import { useContext, useEffect, useState } from 'react'
import { BuildingsContext } from '@/Context/BuildingsContext'
import { Form } from '@/Components/form/Form'
import PrimaryButton from '@/Components/PrimaryButton'
import { IArrowLeft, IArrowRight } from '@/icons'
import { Tab } from '@headlessui/react'
import { BottomNavigation } from '@/Components/form/BottomNavigation'
import { Documenters } from '@/Pages/Buildings/Partials/Update/Documenters.jsx'
import { SourceMaterial } from '@/Pages/Buildings/Partials/Update/SourceMaterial.jsx'
import { Inhabitants } from '@/Pages/Buildings/Partials/Update/Inhabitants.jsx'
import { ConstructionProcess } from '@/Pages/Buildings/Partials/Update/ConstructionProcess.jsx'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function BuildingsForm ({ id, building }) {
  const { buildingObj, setBuildingObj, buildingObjNull, post, processing, errors } = useContext(BuildingsContext)
  const [currentTab, setCurrentTab] = useState(0)

  const handleTab = newTab => {
    document.getElementById(`building-create-tab-${newTab + 1}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
    setCurrentTab(newTab)
  }

  useEffect(() => {
    if (building) setBuildingObj(building)
  }, [])

  const success = () => toast.success('Building saved successfully', {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })
  const error = () => toast.error('Building could not be saved: ' + errors, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })

  const doCall = () => {
    if (id) {
      post(route('buildings.update', id), {
        onSuccess: () => success(),
        onError: () => error()
      })
    } else {
      post(route('buildings.store'), {
        onSuccess: () => success(),
        onError: () => error()
      })
    }
  }

  const publish = async () => {
    buildingObj.documenters.document.is_public = true
    setBuildingObj(buildingObj)
    doCall()
  }

  const save = () => {
    buildingObj.documenters.document.is_public = false
    setBuildingObj(buildingObj)
    doCall()
  }

  return (
    <>
      <ToastContainer />
      <Tab.Group selectedIndex={currentTab} onChange={setCurrentTab} as='div' className='grow flex flex-col gap-2 overflow-y-scroll'>
        <div className='flex gap-2 bg-background-color-muted dark:bg-background-color-dark-muted py-5 rounded'>
          <div className='flex justify-between ms-5'>
            <PrimaryButton className='me-auto' onClick={() => handleTab(currentTab - 1)} disabled={!(currentTab > 0)}>
              <IArrowLeft />
            </PrimaryButton>
          </div>
          <Tab.List className='flex items-center grow lg:justify-between overflow-x-scroll snap-x snap-mandatory'>
            <BuildingsFormTab id='building-create-tab-1' number='1' currentTab={currentTab}>Documenters</BuildingsFormTab>
            <BuildingsFormTab id='building-create-tab-2' number='2' currentTab={currentTab}>Source Material</BuildingsFormTab>
            <BuildingsFormTab id='building-create-tab-3' number='3' currentTab={currentTab}>Inhabitants, Type & Role</BuildingsFormTab>
            <BuildingsFormTab id='building-create-tab-4' number='4' currentTab={currentTab}>Construction Process</BuildingsFormTab>
          </Tab.List>
          <div className='flex justify-between me-5'>
            <PrimaryButton className='ms-auto text-lg' onClick={() => handleTab(currentTab + 1)} disabled={!(currentTab < 4)}>
              <IArrowRight />
            </PrimaryButton>
          </div>
        </div>
        <Tab.Panels className='grow max-h-full rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'>
          <Form className='p-5 overflow-y-scroll h-full'>
            <Tab.Panel className='flex flex-col gap-2'><Documenters /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><SourceMaterial /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><Inhabitants /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><ConstructionProcess /></Tab.Panel>
          </Form>
        </Tab.Panels>
        <BottomNavigation entity='buildings' object={buildingObj} setObject={setBuildingObj} objectNull={buildingObjNull} publish={publish} save={save} processing={processing} history={!building} />
      </Tab.Group>
    </>
  )
}

const BuildingsFormTab = ({ id, number, currentTab, children }) => {
  return (
    <Tab id={id} className='flex flex-col items-center outline-none snap-always snap-center px-16 lg:px-3 first:ms-48 last:me-48 lg:first:ms-20 lg:last:me-20'>
      <div className={
        'flex items-center rounded-full mb-auto' +
        (currentTab < number ? ' bg-accent-color-dark-muted dark:bg-accent-color-muted' : ' bg-accent-color-dark dark:bg-accent-color') +
        (currentTab === number - 1 ? ' bg-main-color dark:bg-main-color-dark text-white' : ' text-white dark:text-black')
      }
      >
        <span className='px-2 mb-px rounded-full'>{number}</span>
      </div>
      {children}
    </Tab>
  )
}
