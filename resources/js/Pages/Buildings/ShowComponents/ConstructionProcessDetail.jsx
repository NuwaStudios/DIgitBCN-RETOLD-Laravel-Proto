import { useState, useContext } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import { BuildingsContext } from '@/Context/BuildingsContext'

function ConstructionProcessDetail({ currentTab }) {
    const { buildingObj } = useContext(BuildingsContext)
    const building = buildingObj.constructionProcess.building

    return (
        <>
            <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 4}>
                <div className='w-full overflow-y-auto'>
                    <div className='h-full rounded text-sm'>
                        <Card>
                            <ToggleableParagraph
                                title="Documentation of the Construction Process"
                                extraContent={
                                    <>
                                        <div className='flex flex-col lg:flex-row lg:gap-20'>
                                            <div>
                                                <Info title='The reason to present this building in the museum is:' value={building.museum_reason} />

                                                <Info title='The building was built on site' value={building.is_built_on_site ? 'Yes' : 'No'} />

                                                <Info title='Is the building in the museum a stand-alone, or part of a household:' value={building.building_museum_part_of} />

                                                {building.building_museum_part_of === "Part of a household" && (
                                                    <Info title="Is that household a depiction of the original household of the source building, or is it put together from various backgrounds" value={building.building_museum_part_of_type} />
                                                )}

                                                {building.building_museum_part_of === "Part of a household" && (
                                                    <Info title="What is the name given to the household by the museum" value={building.building_museum_part_of_name} />
                                                )}

                                                {building.building_museum_part_of === "Part of a household" && (
                                                    <Info title="Plan or aerial photo of the building's current location within the household" value={building.building_museum_part_of_file} />
                                                )}
                                            </div>

                                            <div>
                                                <Info title='Method of realisation - Is the building:' value={building.realisation} />

                                                <Info title='Is there a significant diversion in the construction from the original:' value={buildingObj.documenters.document.is_diversion ? 'Yes' : 'No'} />


                                                <Info title='Are materials, techniques or tools divergent from historical/archaeological accuracy:' value={buildingObj.documenters.document.is_divergent ? 'Yes' : 'No'} />
                                            </div> *
                                        </div>
                                    </>
                                }
                            />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Location in the museum"
                                extraContent={
                                    <>
                                        <div className='flex flex-col lg:flex-row lg:gap-20'>
                                            <Info title='Registration number/ name/ inventory number of the building:' value={building.registration_number} />

                                            <Info title="Plan or aerial photo of the building's location within the museum" value={<>
                                                <img className='object-cover rounded' src='https://picsum.photos/1920/1080?random=1' />
                                                {/* <img className='object-cover rounded' src={building.museum_location_plan} /> */}
                                            </>} />

                                        </div>
                                    </>
                                }
                            />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Documentation"
                                extraContent={
                                    <>
                                        {building.documentations.map((document, index) => (
                                            <ToggleableParagraph
                                                title={document.notTranslocatedComponentsObjNull}
                                                isInnerToogle={true}
                                                extraContent={
                                                    <>
                                                        <Info title='Name' value={document.title} />

                                                        <Info title='Material' value={document.document} />

                                                        <Info title='Manufacturing technique' value={document.link} />
                                                    </>
                                                }
                                            />)
                                        )}
                                    </>
                                }
                            />
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Is there a significant diversion in the construction from the original"
                                value={building.is_diversion ? 'Yes' : 'No'}
                            >
                                {building.is_diversion ? (
                                    <>
                                        <Info
                                            title="Provide reasons for the changes"
                                            value={building.diversion_reason}
                                        />
                                    </>
                                ) : null}
                            </ToggleableParagraph>
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Are materials, techniques or tools divergent from historical/archaeological accuracy:"
                                value={building.is_divergent ? 'Yes' : 'No'}
                            >
                                {building.is_diversion ? (
                                    <>
                                        <Info
                                            title="Provide reasons for the changes"
                                            value={building.divergent_reason}
                                        />
                                    </>
                                ) : null}
                            </ToggleableParagraph>
                        </Card>

                        <Card>
                            <ToggleableParagraph
                                title="Documentation of the Construction Process"
                                extraContent={
                                    <>
                                        <Info
                                            title="Year of construction:"
                                            value={building.builder_construction_year}
                                        />
                                        <Info
                                            title="Organisation"
                                            value={building.diversion_reason}
                                        />
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
export default ConstructionProcessDetail

function Card({ children }) {
    return (
        <>
            <div className=' dark:border-gray-600 h-fit flex bg-gray-100  dark:bg-accent-color-dark rounded px-4 py-4 mb-4 mr-2'>
                {children}
            </div>
        </>
    )
}

function ToggleableParagraph({ title, content, extraContent, isInnerToogle }) {
    const [isOpen, setIsOpen] = useState(false);

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