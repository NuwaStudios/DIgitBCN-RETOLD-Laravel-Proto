import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { IArrowLeft, IArrowRight } from '@/icons.jsx'
import { Tab } from '@headlessui/react'
import { useContext, useEffect, useState } from 'react'
import { Summary } from './Summary.jsx'
import { Crafters } from './Crafters.jsx'
import { DocumentationContext } from './DocumentationContext.jsx'
import { ToolsAndMaterials } from './ToolsAndMaterials.jsx'
import { ProductionProcess } from './ProductionProcess.jsx'
import { FinishedProduct } from './FinishedProduct.jsx'
import { Form } from '@/Components/form/Form.jsx'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { BottomNavigation } from '@/Components/form/BottomNavigation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function CraftsForm ({ id, craft }) {
  const { craftsObj, setCraftsObj, craftsObjNull, post, processing, progress, errors } = useContext(CraftsContext)
  const [currentTab, setCurrentTab] = useState(0)

  const handleTab = newTab => {
    document.getElementById(`craft-create-tab-${newTab + 1}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
    setCurrentTab(newTab)
  }

  useEffect(() => {
    if (craft) {
      setCraftsObj(craft)
    }
  }, [])

  const success = () => toast.success('Craft saved successfully', {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })
  const error = () => toast.error('Craft could not be saved: ' + errors, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })

  const doCall = () => {
    if (id) {
      post(route('crafts.update', id), {
        onSuccess: () => success(),
        onError: () => error()
      })
    } else {
      post(route('crafts.store'), {
        onSuccess: () => success(),
        onError: () => error()
      })
    }
  }

  const publish = async () => {
    craftsObj.summary.document.is_public = true
    setCraftsObj(craftsObj)
    doCall()
  }

  const save = () => {
    craftsObj.summary.document.is_public = false
    setCraftsObj(craftsObj)
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
            <CraftsFormTab id='craft-create-tab-1' number='1' currentTab={currentTab}>Summary</CraftsFormTab>
            <CraftsFormTab id='craft-create-tab-2' number='2' currentTab={currentTab}>Crafters</CraftsFormTab>
            <CraftsFormTab id='craft-create-tab-3' number='3' currentTab={currentTab}>Documenters</CraftsFormTab>
            <CraftsFormTab id='craft-create-tab-4' number='4' currentTab={currentTab}>Tools and Materials</CraftsFormTab>
            <CraftsFormTab id='craft-create-tab-5' number='5' currentTab={currentTab}>Production Process</CraftsFormTab>
            <CraftsFormTab id='craft-create-tab-6' number='6' currentTab={currentTab}>Finished Product</CraftsFormTab>
          </Tab.List>
          <div className='flex justify-between me-5'>
            <PrimaryButton className='ms-auto text-lg' onClick={() => handleTab(currentTab + 1)} disabled={!(currentTab < 5)}>
              <IArrowRight />
            </PrimaryButton>
          </div>
        </div>
        <Tab.Panels className='grow max-h-full rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'>
          <Form className='p-5 overflow-y-scroll h-full'>
            <Tab.Panel className='flex flex-col gap-2'><Summary /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><Crafters /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><DocumentationContext /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><ToolsAndMaterials /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><ProductionProcess /></Tab.Panel>
            <Tab.Panel className='flex flex-col gap-2'><FinishedProduct /></Tab.Panel>
          </Form>
        </Tab.Panels>
        <BottomNavigation publish={publish} save={save} entity='crafts' object={craftsObj} setObject={setCraftsObj} objectNull={craftsObjNull} processing={processing} progress={progress} history={!craft} />
      </Tab.Group>
    </>
  )
}

function CraftsFormTab ({ id, number, currentTab, children }) {
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
