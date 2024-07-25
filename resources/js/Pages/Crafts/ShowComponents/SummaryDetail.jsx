import { FaVideo } from 'react-icons/fa'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { useContext, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'

function SummaryDetail({ currentTab }) {
  const { craftsObj } = useContext(CraftsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 1}>
        <div className='flex xl:flex-row h-full'>
          <div className='w-full mt-7 md:mt-0 mr-10 border border-gray-300 rounded px-10 py-8 overflow-y-auto'>
            <div className='flex justify-between'>
              <div>
                <h1 className='font-bold text-lg'>{craftsObj.summary.document.e35_title_english}</h1>
                <h1 className='italic text-grey-600'>
                  {craftsObj.summary.document.e35_title_translated}
                </h1>
              </div>

              <a href={craftsObj.summary.craft.e42_video_url} target='_blank' vclassName='self-start mt-2' rel='noreferrer'>
                <button className='self-start bg-main-color-dark text-gray-100 px-4 py-2 rounded-sm text-sm mt-2 hover:bg-main-color'>
                  <span className='hidden sm:inline'>Video documentation</span>
                  <span className='sm:hidden'><FaVideo /></span>
                </button>
              </a>
            </div>

            <hr className='h-px my-5 bg-gray-300 border-0 dark:bg-gray-700' />

            <div className='text-sm'>
              <div className='pt-4 xl:pt-0 flex flex-col lg:flex-row'>
                <div className='w-full lg:w-2/3 mr-8'>
                  <Card>
                    <ToggleableParagraph
                      title='Description'
                      content={craftsObj.summary.craft.e62_short_description}
                    />
                  </Card>

                  <Card>
                    <ToggleableParagraph
                      title='Summary'
                      content={
                        <>
                          <div className='mt-4 flex flex-col lg:flex-row lg:gap-20'>
                            <div className='w-full lg:w-1/3'>
                              <SummaryInfo
                                title='Craft name (English)'
                                value={craftsObj.summary.document.e35_title_english}
                              />

                              <SummaryInfo
                                title='Craft name (local language)'
                                value={craftsObj.summary.document.e35_title_translated}
                              />

                              <SummaryInfo
                                title='Local language'
                                value={craftsObj.summary.document.e56_language}
                              />
                            </div>

                            <div className='w-full lg:w-1/3'>
                              <SummaryInfo
                                title='Type'
                                value={craftsObj.summary.craft.e55_craft_type_nature}
                              />

                              <SummaryInfo
                                title='Category'
                                value={craftsObj.summary.craft.e55_craft_type_category}
                              />

                              <SummaryInfo
                                title='Historical geography'
                                value={craftsObj.summary.craft.e53_historical}
                              />
                            </div>

                            <div className='w-full lg:w-1/3'>
                              <SummaryInfo
                                title='Modern geography'
                                value={craftsObj.summary.craft.e53_contemporary}
                              />

                              <SummaryInfo
                                title='Time period (start)'
                                value={craftsObj.summary.craft.timespan.e61_timePrimitive_start}
                              />

                              <SummaryInfo
                                title='Time period (end)'
                                value={craftsObj.summary.craft.timespan.e61_timePrimitive_end}
                              />
                            </div>
                          </div>
                        </>
                      }
                    />
                  </Card>
                </div>

                <div className='w-full lg:w-1/3'>
                  <img className='object-cover w-full lg:w-102 rounded-t' src={craftsObj.summary.cover_image} alt='carpet_weaving' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SummaryDetail

function Card({ children }) {
  return (
    <>
      <div className=' dark:border-gray-600 h-fit flex bg-gray-100  dark:bg-accent-color-dark rounded px-4 py-4 mb-4 mr-2'>
        {children}
      </div>
    </>
  )
}

function ToggleableParagraph({ title, content, extraContent }) {
  const [isOpen, setIsOpen] = useState(false)

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
