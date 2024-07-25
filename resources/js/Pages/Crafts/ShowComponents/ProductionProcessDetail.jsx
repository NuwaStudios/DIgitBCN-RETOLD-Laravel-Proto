import { useState, useContext } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { CraftsContext } from '@/Context/CraftsContext.jsx'

function ProductionProcessDetail ({ currentTab }) {
  const [currentTabToolsMaterials, setCurrentTabToolsMaterials] = useState(0)
  const { craftsObj } = useContext(CraftsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 4}>
        <div className='h-full w-full overflow-hidden'>
          <div className='dark:bg-background-color-dark-muted border border-gray-300 dark:border-gray-600 h-full flex rounded shadow-md bg-white'>
            <div className='w-60'>
              <div
                className={`hover:bg-accent-color hover:dark:bg-background-color-dark text-sm cursor-pointer py-4 px-4 border-b border-gray-200 ${currentTabToolsMaterials === 0 ? 'bg-gray-100 dark:bg-background-color-dark border-l-2 border-l-main-color-dark font-bold' : ''} `}
                onClick={() => setCurrentTabToolsMaterials(0)}
              >
                <p>Process</p>
              </div>
              <div
                className={`hover:bg-accent-color hover:dark:bg-background-color-dark text-sm cursor-pointer py-4 px-4 border-b border-gray-200 ${currentTabToolsMaterials === 1 ? 'bg-gray-100 dark:bg-background-color-dark border-l-2 border-l-main-color-dark font-bold' : ''} `}
                onClick={() => setCurrentTabToolsMaterials(1)}
              >
                <p>Workshop best practices</p>
              </div>
              <div
                className={`hover:bg-accent-color hover:dark:bg-background-color-dark text-sm cursor-pointer py-4 px-4 border-b border-gray-200 ${currentTabToolsMaterials === 2 ? 'bg-gray-100 dark:bg-background-color-dark border-l-2 border-l-main-color-dark font-bold' : ''} `}
                onClick={() => setCurrentTabToolsMaterials(2)}
              >
                <p>Structure of the process</p>
              </div>
            </div>

            <div className='px-2 pt-1 pb-6 rounded-r-lg border-l border-gray-400 w-full'>
              <div className='h-full py-4 px-4 rounded'>

                <ProductionProcessContent currentTabToolsMaterials={currentTabToolsMaterials} title='Process' index={0} craftsObj={craftsObj} />

                <ProductionProcessContent currentTabToolsMaterials={currentTabToolsMaterials} title='Workshop best practices' index={1} craftsObj={craftsObj} />

                <ProductionProcessContent currentTabToolsMaterials={currentTabToolsMaterials} title='Structure of the process' index={2} craftsObj={craftsObj} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductionProcessDetail

function ProductionProcessContent ({ currentTabToolsMaterials, title, index, craftsObj }) {
  const renderContent = () => {
    if (currentTabToolsMaterials == 0) {
      return <Process craftsObj={craftsObj} />
    } else if (currentTabToolsMaterials == 1) {
      return <BestPractices craftsObj={craftsObj} />
    } else if (currentTabToolsMaterials == 2) {
      return <Structure craftsObj={craftsObj} />
    }
  }

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTabToolsMaterials !== index}>
        <p className='text-lg font-bold'>{title}</p>

        <hr className='h-px my-5 bg-gray-300 border-0 dark:bg-gray-700' />

        <div className='text-sm overflow-y-auto pb-14 w-full h-full'>
          {renderContent()}
        </div>
      </div>
    </>
  )
}

function Process ({ craftsObj }) {
  return (
    <>
      <div className='flex flex-col lg:flex-row '>
        <div className='w-full mr-4'>
          <Card>
            <ToggleableParagraph
              title='Describe the raw material and all the steps of processing until the moment of use with this craft'
              content={craftsObj.productionProcess.craft.raw_material_description}
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='If this is a reparation of a product and not something made from scratch, explain the state it was in, why and what you will change, and why'
              content={craftsObj.productionProcess.craft.reparation_description}
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='Lay out of the process of making'
              content={craftsObj.productionProcess.craft.process_layout}
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='Working area'
              content={craftsObj.productionProcess.craft.process_working_area}
            />
          </Card>
        </div>

        <div className='w-full'>
          <Card>
            <ToggleableParagraph
              title='Is this a decoration?'
              content={craftsObj.productionProcess.craft.is_decoration ? 'Yes' : 'No'}
              extraContent={
                                craftsObj.productionProcess.craft.is_decoration && (
                                  <>
                                    <hr className='mb-3' />
                                    <p className='font-bold'>Techniques</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.decoration_techniques}</p>

                                    <p className='font-bold'>Motifs</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.decoration_motifs}</p>

                                    <p className='font-bold'>Video URL</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.e42_video_url_decoration}</p>

                                    <p className='font-bold'>Image</p>
                                    <p>{craftsObj.productionProcess.craft.e42_image_url_decoration}</p>
                                  </>
                                )
                            }
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='Did the crafter diverge from historical/archaeological accuracy to adapt the process?'
              content={craftsObj.productionProcess.craft.is_diverged ? 'Yes' : 'No'}
              extraContent={
                                craftsObj.productionProcess.craft.is_diverged && (
                                  <>
                                    <hr className='mb-3' />
                                    <p className='font-bold'>Describe the changes made</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.diverged_changes}</p>

                                    <p className='font-bold'>Describe the crafter's reasons for the changes:</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.diverged_reasons}</p>
                                  </>
                                )
                            }
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='Has the crafter developed new techniques or improved the product over time?'
              content={craftsObj.productionProcess.craft.is_evolved ? 'Yes' : 'No'}
              extraContent={
                                craftsObj.productionProcess.craft.is_evolved && (
                                  <>
                                    <hr className='mb-3' />

                                    <p className='font-bold'>Describe improvements to the craft process</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.evolved_process}</p>

                                    <p className='font-bold'>Describe improvements to the final product</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.evolved_product}</p>

                                    <p className='font-bold'>Describe the reasons for these improvements</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.evolved_reasons}</p>
                                  </>
                                )
                            }
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='Has the crafter identified any research gaps in their process or methodology?'
              content={craftsObj.productionProcess.craft.is_gaps ? 'Yes' : 'No'}
              extraContent={
                                craftsObj.productionProcess.craft.is_gaps && (
                                  <>
                                    <hr className='mb-3' />

                                    <p className='font-bold'>Describe what the crafter would like to learn about the archaeological/historical basis for the craft</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.gaps_basis}</p>

                                    <p className='font-bold'>Describe what the crafter would like to learn about the practical craft process</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.gaps_process}</p>

                                    <p className='font-bold'>Describe the motivation</p>
                                    <p className='mb-3'>{craftsObj.productionProcess.craft.gaps_reasons}</p>
                                  </>
                                )
                            }
            />
          </Card>
        </div>
      </div>
    </>
  )
}

function BestPractices ({ craftsObj }) {
  return (
    <>
      <div className='flex flex-col lg:flex-row '>
        <div className='w-full'>
          <Card>
            <ToggleableParagraph
              title="Describe the craftsperson's approach to a tidy workshop, hygiene and other best practices"
              content={craftsObj.productionProcess.craft.best_practices}
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title="Describe the craftsperson's approach workshop clean-up and disposal of waste products"
              content={craftsObj.productionProcess.craft.best_practices_disposal_of_waste}
            />
          </Card>

          <Card>
            <ToggleableParagraph
              title='Describe any by-products of the craft process that have a further use after disposal:'
              content={craftsObj.productionProcess.craft.best_practices_use_after_disposal}
            />
          </Card>
        </div>
      </div>
    </>
  )
}

function Structure ({ craftsObj }) {
  return (
    <>
      <div className='flex flex-col lg:flex-row '>
        <div className='w-full'>
          <Card>
            <ToggleableParagraph
              title='General working techniques'
              content={craftsObj.productionProcess.craft.working_techniques}
            />
          </Card>
          {craftsObj.productionProcess.craft.phases.map((phase, index) => (
            <Card>
              <ToggleableParagraph
                title={`Phase ${index + 1}`}
                content={
                  <>
                    <div className='flex'>
                      <div className='w-1/2'>
                        <p className='font-bold'>Techniques</p>
                        <p className='mb-3'>{phase.techniques}</p>

                        <p className='font-bold'>Time</p>
                        <p className='mb-3'>{phase.time}</p>

                        <p className='font-bold'>Materials</p>
                        <p className='mb-3'>{phase.materials}</p>

                        <p className='font-bold'>Tools</p>
                        <p className='mb-3'>{phase.tools}</p>

                        <p className='font-bold'>Video URL</p>
                        <p className='mb-3'>{phase.e42_video_url}</p>
                      </div>
                      <div className='w-1/2'>
                        <p>{phase.e42_image_url}</p>
                      </div>
                    </div>
                  </>
                                }
              />
            </Card>
          ))}

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
