import { useContext, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
// import { CraftsContext } from '@/Context/CraftsContext.jsx'

function ModelDetail ({ currentTab }) {
  // const { craftsObj } = useContext(CraftsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 5}>
        {/* <div className='flex flex-col-reverse xl:flex-row'>
                    <div className='w-full max-h-full mt-7 md:mt-0 mr-10 border border-gray-300 rounded px-10 py-8 overflow-y-auto'>
                        <div className='flex justify-between'>
                            <div>
                                <h1 className='font-bold text-lg'>{craftsObj.finishedProduct.craft.e35_title_english}</h1>
                                <h1 className='italic text-grey-600'>
                                    {craftsObj.finishedProduct.craft.e35_title_translated}
                                </h1>
                            </div>
                        </div>

                        <hr className='h-px my-5 bg-gray-300 border-0 dark:bg-gray-700' />

                        <div className='text-sm'>
                            <div className='pt-4 xl:pt-0 flex flex-col lg:flex-row'>
                                <div className='w-full lg:w-2/3 mr-8'>
                                    <Card>
                                        <ToggleableParagraph
                                            title="Description"
                                            content={craftsObj.finishedProduct.craft.finished_product_description}
                                        />
                                    </Card>

                                    <Card>
                                        <ToggleableParagraph
                                            title="Outcome or product's purposes"
                                            content={
                                                <>
                                                    <div className='mt-4 flex flex-col lg:flex-row lg:gap-20'>
                                                        <div className='w-1/2'>
                                                            <SummaryInfo
                                                                title="Practical use"
                                                                value={craftsObj.finishedProduct.craft.is_finished_product_practical_use ? "Yes" : "No"} />

                                                            {craftsObj.finishedProduct.craft.is_finished_product_practical_use && (
                                                                <SummaryInfo
                                                                    title="Describe how the product is used"
                                                                    value={craftsObj.finishedProduct.craft.is_finished_product_decorative_use}
                                                                />
                                                            )}

                                                            <SummaryInfo
                                                                title="Decorative use"
                                                                value={craftsObj.finishedProduct.craft.is_finished_product_decorative_use ? "Yes" : "No"} />

                                                            {craftsObj.finishedProduct.craft.is_finished_product_decorative_use && (
                                                                <SummaryInfo
                                                                    title="Describe who typically uses the product"
                                                                    value={craftsObj.finishedProduct.craft.finished_product_decorative_use_description}
                                                                />
                                                            )}

                                                            <SummaryInfo
                                                                title="Experimental purposes"
                                                                value={craftsObj.finishedProduct.craft.is_finished_product_experimental_use ? "Yes" : "No"} />

                                                            {craftsObj.finishedProduct.craft.is_finished_product_experimental_use && (
                                                                <SummaryInfo
                                                                    title="In which context is the product typically used"
                                                                    value={craftsObj.finishedProduct.craft.finished_product_experimental_use_description}
                                                                />
                                                            )}
                                                        </div>

                                                        <div className='w-1/3'>
                                                            <SummaryInfo
                                                                title="Educational purposes"
                                                                value={craftsObj.finishedProduct.craft.is_finished_product_educational_use ? "Yes" : "No"} />

                                                            {craftsObj.finishedProduct.craft.is_finished_product_educational_use && (
                                                                <SummaryInfo
                                                                    title="Additional context for educational use"
                                                                    value={craftsObj.finishedProduct.craft.finished_product_educational_use_description}
                                                                />
                                                            )}

                                                            <SummaryInfo
                                                                title="Durability"
                                                                value={craftsObj.finishedProduct.craft.finished_product_durability} />

                                                            <SummaryInfo
                                                                title="Distributed"
                                                                value={craftsObj.finishedProduct.craft.finished_product_distributed} />

                                                            <SummaryInfo
                                                                title="Reachability"
                                                                value={craftsObj.finishedProduct.craft.finished_product_reachability} />
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
 */}

      </div>
    </>
  )
}

export default ModelDetail

function Card ({ children }) {
  return (
    <>
      <div className=' dark:border-gray-600 h-fit flex bg-gray-100  dark:bg-accent-color-dark rounded px-4 py-4 mb-4 mr-2'>
        {children}
      </div>
    </>
  )
}

function ToggleableParagraph ({ title, content, extraContent }) {
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
