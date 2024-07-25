import { useState, useContext } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { BuildingsContext } from '@/Context/BuildingsContext'

function SourceMaterialsDetail({ currentTab }) {
  const { buildingObj } = useContext(BuildingsContext)

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 2}>
        <div className='w-full overflow-y-auto'>
          <div className='h-full rounded text-sm'>
            <Card>
              <ToggleableParagraph
                title='What is the place of origin'
                extraContent={
                  <>
                    <div className='flex flex-col lg:flex-row lg:gap-20'>

                      <Info title='Coordinates latitude' value={buildingObj.sourceMaterial.building.address.coordinates_lat} />

                      <Info title='Coordinates longitude' value={buildingObj.sourceMaterial.building.address.coordinates_lng} />

                      <Info title='Address' value={`${buildingObj.sourceMaterial.building.address.e41_street}, ${buildingObj.sourceMaterial.building.address.e41_county}, ${buildingObj.sourceMaterial.building.address.e41_city}, ${buildingObj.sourceMaterial.building.address.e41_postcode}, ${buildingObj.sourceMaterial.building.address.e53_country}`} />

                      {/* <Info title='County' value='County' />

                                                <Info title='City' value='City' />

                                                <Info title='Country' value='Country' /> */}
                    </div>
                  </>
                }
              />
            </Card>

            <Card>
              <ToggleableParagraph
                title='When was the building assessed'
                extraContent={
                  <>
                    <div className='flex flex-col lg:flex-row lg:gap-20'>
                      <Info title='Name of assessor:' value={buildingObj.sourceMaterial.building.assessor} />

                      <Info title='Year of assessment:' value={buildingObj.sourceMaterial.building.assessment_year} />
                    </div>
                  </>

                }
              />
            </Card>

            <Card>
              <ToggleableParagraph
                title='What sources do you base this building on'
                extraContent={
                  <>
                    <div className='flex flex-col lg:flex-row lg:gap-20'>
                      <Info
                        title='URL'
                        value={buildingObj.sourceMaterial.building.source_type}
                      />

                      <Info
                        title='Type'
                        value={buildingObj.sourceMaterial.building.building_url}
                      />
                    </div>
                  </>
                }
              />
            </Card>

            <Card>
              <ToggleableParagraph
                title='Who is the in situ organisation'
                extraContent={
                  <>
                    <div className='flex flex-col lg:flex-row lg:gap-20'>
                      <Info title='Name' value='Name' />

                      <Info title='Address' value='Address Address Address' />

                      <Info title='Website' value='Website' />

                      <Info title='Team members' value='member 1, role 1' />
                    </div>

                  </>

                }
              />
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
export default SourceMaterialsDetail

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

function Info({ title, value }) {
  return (
    <div className='flex flex-col mb-2'>
      <span className='text-text-muted mr-4'>
        {title} &nbsp;
      </span>
      <span>
        {value}
      </span>
    </div>
  )
}
