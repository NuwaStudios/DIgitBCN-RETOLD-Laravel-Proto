import { BuildingsContext } from '@/Context/BuildingsContext'
import { useContext, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { ModelViewer } from '@/Pages/Buildings/ShowComponents/ModelViewer.jsx'

function DocumentersDetail({ currentTab }) {
  const { buildingObj } = useContext(BuildingsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 1}>
        <div className='flex flex-col-reverse xl:flex-row h-full'>
          <div className='text-sm w-full lg:pt-4 xl:pt-0 flex flex-col h-full'>
            <div className='w-full mr-8'>
              <Card>
                <ToggleableParagraph
                  title='Documenters'
                  content={
                    <>
                      <div className='mt-4 flex flex-col lg:flex-row lg:gap-20'>
                        <div className='w-1/3'>
                          <SummaryInfo
                            title='Building name (English)'
                            value={buildingObj.documenters.document.e35_title_english}
                          />

                          <SummaryInfo
                            title='Building name (local)'
                            value={buildingObj.documenters.document.e35_title_translated}
                          />
                        </div>

                        <div className='w-1/3'>
                          <SummaryInfo
                            title='Local language'
                            value={buildingObj.documenters.document.e56_language}
                          />

                          <SummaryInfo
                            title='Country of documentation'
                            value={buildingObj.documenters.document.e53_country}
                          />
                        </div>

                        <div className='w-1/3'>
                          <SummaryInfo
                            title='Start date'
                            value={buildingObj.documenters.document.timespan.e61_timespan_start}
                          />

                          <SummaryInfo
                            title='End date'
                            value={buildingObj.documenters.document.timespan.e61_timespan_end}
                          />
                        </div>
                      </div>
                    </>
                  }
                />
              </Card>
            </div>
            <div className='w-full grow'>
              {/* <img className='object-cover w-full lg:w-102 rounded-t' src={buildingObj.dModel} alt={buildingObj.documenters.document.e35_title_english} /> */}

              {/* image for testing purposes only */}
              {/* <img className='object-cover w-full lg:w-102 rounded-t' src='https://picsum.photos/1920/1080?random=5' alt={buildingObj.documenters.document.e35_title_english} /> */}
              <ModelViewer className='cursor-grab w-full h-full overflow-hidden' filename={buildingObj.dModel} />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
export default DocumentersDetail

function Card({ children }) {
  return (
    <>
      <div className=' dark:border-gray-600 h-fit w-full flex bg-gray-100  dark:bg-accent-color-dark rounded px-4 py-4 mb-4 mr-2'>
        {children}
      </div>
    </>
  )
}

function ToggleableParagraph({ title, content, extraContent }) {
  const [isOpen, setIsOpen] = useState(true)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='w-full relative'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className={`inline-block pr-6 ${isOpen ? 'font-bold' : ''}`}>{title}</h1>
        <div className='ml-auto absolute top-0 right-0'>
          {isOpen
            ? (
              <FaChevronUp onClick={toggleOpen} className='cursor-pointer' />
            )
            : (
              <FaChevronDown onClick={toggleOpen} className='cursor-pointer' />
            )}
        </div>
      </div>
      <div className={`mt-4 0 ${isOpen ? 'block' : 'hidden'} transition-opacity duration-300`}>
        <div>
          {content}
        </div>
        <div className='mt-2'>
          {extraContent}
        </div>
      </div>
    </div>
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
