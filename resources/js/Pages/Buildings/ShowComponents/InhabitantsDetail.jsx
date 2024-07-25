import { useState, useContext } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { BuildingsContext } from '@/Context/BuildingsContext'

function InhabitantsDetail({ currentTab }) {
    const [isElementClicked, setClickedElement] = useState(false)
    const { buildingObj } = useContext(BuildingsContext)

    const handleClick = (e) => {
        e.preventDefault();
        setClickedElement(!isElementClicked)
    }

    return (
        <>
            <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 3}>
                <div className='w-full overflow-y-auto'>
                    <div className='h-full rounded text-sm'>
                        <Card>
                            <ToggleableParagraph
                                title="About the building"
                                extraContent={
                                    <>
                                        <div className='flex flex-col lg:flex-row lg:gap-20'>
                                            <div>
                                                <Info title='Building year' value={buildingObj.inhabitants.building.construction_year} />

                                                <Info title='Cultural group' value={buildingObj.inhabitants.building.cultural_group} />

                                                <Info title='How is this time period usually called' value={buildingObj.inhabitants.building.time_period} />

                                                <Info title='Ground/soil conditions' value={buildingObj.inhabitants.building.soil_condition} />

                                                <Info title='Vegetation around the building' value={buildingObj.inhabitants.building.vegetation} />

                                                <Info title='Local climate' value={buildingObj.inhabitants.building.climate} />

                                                <Info title='Light conditions during the day' value={buildingObj.inhabitants.building.light_conditions} />

                                                <Info title='Is the building part of a settlement or a rural/stand-alone building' value={buildingObj.inhabitants.building.building_part_of ? "Yes" : "No"} />

                                                {/* info opcional que depende de inhabitants.building.building_part_of */}
                                                {buildingObj.inhabitants.building.building_part_of === "Settlement" && (
                                                    <Info title="What is the original building's environment" value={buildingObj.inhabitants.building.original_environment} />
                                                )}

                                                {/* info opcional que depende de inhabitants.building.original_environment */}
                                                {buildingObj.inhabitants.building.original_environment === "Urban" && (
                                                    <Info title="What was the name of the city" value={buildingObj.inhabitants.building.original_environment_city} />
                                                )}
                                            </div>

                                            <div>

                                                {buildingObj.inhabitants.building.original_environment === "Village" && (
                                                    <Info title="What was the name of the village" value={buildingObj.inhabitants.building.original_environment_village} />
                                                )}

                                                {buildingObj.inhabitants.building.original_environment === "Household/homestead" && (
                                                    <Info title="What was the name of the household" value={buildingObj.inhabitants.building.original_environment_household} />
                                                )}

                                                {buildingObj.inhabitants.building.original_environment === "Household/homestead" && (
                                                    <Info title="What was the location of the building within the household" value={buildingObj.inhabitants.building.original_environment_household_location} />
                                                )}

                                                {buildingObj.inhabitants.building.original_environment === "Household/homestead" && (
                                                    <Info title="Plan/aerial photo of the building's location within the household:" value={buildingObj.inhabitants.building.original_environment_household_file} />
                                                )}


                                                <Info title='Original function of the building' value={buildingObj.inhabitants.building.original_function} />

                                                {/* info opcional que depende de inhabitants.building.original_function */}
                                                {buildingObj.inhabitants.building.original_function === "Residential" && (
                                                    <Info title='Residential type' value={buildingObj.inhabitants.building.original_function_residential} />
                                                )}

                                                {buildingObj.inhabitants.building.original_function === "Non-residential" && (
                                                    <Info title='Non-residential type' value={buildingObj.inhabitants.building.original_function_non_residential} />
                                                )}

                                                {buildingObj.inhabitants.building.original_function === "An annex" && (
                                                    <Info title='Annex type' value={buildingObj.inhabitants.building.original_function_annex} />
                                                )}

                                                <Info title="Has the building's function of use changed through its history:" value={buildingObj.inhabitants.building.building_use} />

                                                {buildingObj.inhabitants.building.building_use === "Yes, the building changed to residential" && (
                                                    <Info title='Residential type:
                                                        ' value={buildingObj.inhabitants.building.building_use_residential} />
                                                )}

                                                {buildingObj.inhabitants.building.building_use === "Yes, the building changed to residential" && (
                                                    <Info title='Residential type' value={buildingObj.inhabitants.building.building_use_residential} />
                                                )}

                                                {buildingObj.inhabitants.building.building_use === "Yes, the building changed to non-residential" && (
                                                    <Info title='Non-residential type' value={buildingObj.inhabitants.building.building_use_non_residential} />
                                                )}

                                                {buildingObj.inhabitants.building.building_use === "Yes, the building changed to an annex" && (
                                                    <Info title='Annex type:' value={buildingObj.inhabitants.building.building_use_annex} />
                                                )}

                                                <Info title='How did the museum obtain the building' value={buildingObj.inhabitants.building.acquisition_mode} />
                                            </div>
                                        </div>
                                    </>
                                }
                            />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Building's owners"
                                extraContent={
                                    <>
                                        <div className='flex flex-col lg:flex-row lg:gap-20'>
                                            <Info title='Name of the owner' value={buildingObj.inhabitants.building.owner_name} />

                                            <Info title='Occupation' value={buildingObj.inhabitants.building.owner_occupation} />

                                            <Info title='Family history' value={buildingObj.inhabitants.building.owner_family_history} />

                                            <Info title='Society status' value={buildingObj.inhabitants.building.owner_society_status} />

                                            <Info title='Year of occupation' value={buildingObj.inhabitants.building.owner_year_of_occupation} />

                                        </div>
                                    </>
                                }
                            />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Provide a description of the building's surroundings at the find site (at the time that the building was used)
                                    "
                                value={buildingObj.inhabitants.building.surroundings} />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Dismantling the building"
                                extraContent={
                                    <>
                                        <div className='flex flex-col lg:flex-row lg:gap-20'>
                                            <Info title='Year of dismantling' value={buildingObj.inhabitants.building.dismantling_year} />

                                            <Info title='Description of the dismantling process' value={buildingObj.inhabitants.building.dismantling_description} />
                                        </div>
                                    </>
                                }
                            />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Components which were not translocated"
                                extraContent={
                                    <>
                                        <div className='flex flex-col gap-4'>
                                            {buildingObj.inhabitants.notTranslocatedComponents.map((component) => (
                                                <ToggleableParagraph
                                                    title={buildingObj.notTranslocatedComponentsObjNull}
                                                    isInnerToogle={true}
                                                    defaultOpen={true}
                                                    extraContent={
                                                        <>
                                                            <div className='flex flex-col lg:flex-row justify-between px-4 pb-3'>
                                                                <div className='lg:w-2/3'>
                                                                    <Info title='Name' value={component.name} />

                                                                    <Info title='Material' value={component.material} />

                                                                    <Info title='Manufacturing technique' value={component.manufacturing_technique} />

                                                                    <Info title='Dimensions' value={component.dimensions} />
                                                                </div>
                                                                <div className='sm:mt-4 lg:mt-0 lg:ml-8 lg:w-1/3'>
                                                                    <img className='object-cover rounded' src='https://picsum.photos/1920/1080?random=1' />
                                                                    {/* <img className='object-cover rounded' src={component.image} alt={component.name} /> */}
                                                                </div>

                                                            </div>
                                                        </>
                                                    }
                                                />)
                                            )}
                                        </div>
                                    </>
                                }
                            />
                        </Card>
                    </div>
                </div>
            </div >
        </>
    )
}

export default InhabitantsDetail

function Card({ children }) {
    return (
        <>
            <div className=' dark:border-gray-600 h-fit flex bg-gray-100  dark:bg-accent-color-dark rounded px-4 py-4 mb-4 mr-2'>
                {children}
            </div>
        </>
    )
}

function ToggleableParagraph({ title, content, extraContent, isInnerToogle, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`w-full relative ${isInnerToogle ? 'bg-white rounded p-4' : ''}`}>
            <div className="flex flex-row items-center justify-between">
                <h1 className={`inline-block pr-6 ${isOpen ? 'font-bold' : ''}`}>{title}</h1>
                <div className="ml-auto absolute top-0 right-0">
                    {isOpen ? (
                        <FaChevronUp onClick={toggleOpen} className={`cursor-pointer ${isInnerToogle ? 'mr-2 mt-2' : ''}`} />
                    ) : (
                        <FaChevronDown onClick={toggleOpen} className={`cursor-pointer ${isInnerToogle ? 'mr-2 mt-2' : ''}`} />
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
    );
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