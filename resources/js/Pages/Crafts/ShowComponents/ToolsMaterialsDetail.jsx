import { useState, useContext } from 'react'
import { ListContainer } from '@/Components/listContainer/ListContainer'
import { ListItem } from '@/Components/listContainer/partials/ListItem'
import { CraftsContext } from '@/Context/CraftsContext.jsx'

function ToolsMaterialsDetail({ currentTab }) {
    const [currentTabToolsMaterials, setCurrentTabToolsMaterials] = useState(0)
    const [isElementClicked, setClickedElement] = useState(false)
    const { craftsObj } = useContext(CraftsContext)
    const [currentElement, setCurrentElement] = useState()

    const handleClick = (e) => {
        e.preventDefault();
        setClickedElement(!isElementClicked)
    }

    return (
        <>
            <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 3}>
                <div className='h-full w-full overflow-hidden'>
                    <div className='border border-gray-300 dark:border-gray-600 h-full flex rounded shadow-md'>
                        <div className='w-60'>
                            <div
                                className={`hover:bg-accent-color hover:dark:bg-background-color-dark text-sm cursor-pointer py-4 px-4 border-b border-gray-200 dark:border-gray-600 ${currentTabToolsMaterials === 0 ? 'bg-gray-100 dark:bg-background-color-dark border-l-2 border-l-main-color-dark dark:border-l-main-color-dark font-bold' : ''} `}
                                onClick={() => { setCurrentTabToolsMaterials(0); setClickedElement(false); }}>
                                <p>Tools</p>
                            </div>
                            <div
                                className={`hover:bg-accent-color hover:dark:bg-background-color-dark text-sm cursor-pointer py-4 px-4 border-b border-gray-200 dark:border-gray-600 ${currentTabToolsMaterials === 1 ? 'bg-gray-100 dark:bg-background-color-dark border-l-2 border-l-main-color-dark dark:border-l-main-color-dark font-bold' : ''} `}
                                onClick={() => { setCurrentTabToolsMaterials(1); setClickedElement(false); }}>
                                <p>Materials</p>
                            </div>
                            <div
                                className={`hover:bg-accent-color hover:dark:bg-background-color-dark text-sm cursor-pointer py-4 px-4 border-b border-gray-200 dark:border-gray-600 ${currentTabToolsMaterials === 2 ? 'bg-gray-100 dark:bg-background-color-dark border-l-2 border-l-main-color-dark dark:border-l-main-color-dark font-bold' : ''} `}
                                onClick={() => { setCurrentTabToolsMaterials(2); setClickedElement(false); }}>
                                <p>Instalations</p>
                            </div>
                        </div>

                        <div className='px-2 pt-1 pb-6 rounded-r-lg border-l border-gray-400 dark:border-gray-600 w-full'>
                            <div className='h-full py-4 px-4 rounded'>

                                {/* contingut */}
                                <Content currentTabToolsMaterials={currentTabToolsMaterials} title="Tools" index={0} onClick={handleClick} isElementClicked={isElementClicked} source={craftsObj.toolsAndMaterials.tools_obtained} currentElement={currentElement} setCurrentElement={setCurrentElement} />

                                <Content currentTabToolsMaterials={currentTabToolsMaterials} title="Materials" index={1} onClick={handleClick} isElementClicked={isElementClicked} source={craftsObj.toolsAndMaterials.installations_obtained} currentElement={currentElement} setCurrentElement={setCurrentElement} />

                                <Content currentTabToolsMaterials={currentTabToolsMaterials} title="Installations" index={2} onClick={handleClick} isElementClicked={isElementClicked} source={craftsObj.toolsAndMaterials.materials_obtained} sourceDescription1={craftsObj.toolsAndMaterials.materials_obtained_natural} sourceDescription2={craftsObj.toolsAndMaterials.materials_obtained_bought} currentElement={currentElement} setCurrentElement={setCurrentElement} />

                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

function Content({ currentTabToolsMaterials, title, index, onClick, isElementClicked, source, sourceDescription1, sourceDescription2, currentElement, setCurrentElement }) {
    const { craftsObj } = useContext(CraftsContext)

    const renderContent = () => {
        if (isElementClicked) {
            return <Detail currentElement={currentElement} />
        } else if (currentTabToolsMaterials == 0) {
            return <List type={craftsObj.toolsAndMaterials.tools} setCurrentElement={setCurrentElement} onClick={onClick} />
        } else if (currentTabToolsMaterials == 1) {
            return <List type={craftsObj.toolsAndMaterials.materials} setCurrentElement={setCurrentElement} onClick={onClick} />
        } else if (currentTabToolsMaterials == 2) {
            return <List type={craftsObj.toolsAndMaterials.installations} setCurrentElement={setCurrentElement} onClick={onClick} />
        } else if (isElementClicked) {
            return <Detail />
        }
    };

    return (
        <>
            <div className='transition duration-600 ease-in-out h-full' hidden={currentTabToolsMaterials !== index}>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-lg font-bold'>{title}</p>
                        {sourceDescription1 || sourceDescription2 ?
                            <p>{source}, {sourceDescription1} {sourceDescription2}</p> :
                            <p>{source}</p>
                        }
                    </div>
                    <div>
                        {isElementClicked && (
                            <div className='flex flex-col justify-start'>
                                <button className='bg-main-color-dark text-gray-100 px-4 py-2 rounded-sm text-sm mt-auto hover:bg-main-color' onClick={onClick}>See all tools</button>
                            </div>
                        )}
                    </div>
                </div>

                <hr className='h-px my-5 bg-gray-300 border-0 dark:bg-gray-700' />

                <div className='text-sm overflow-y-auto pb-14 w-full h-full'>
                    {renderContent()}
                </div>
            </div >
        </>
    )
}

function List({ setCurrentElement, onClick, type }) {
    return (
        <>
            {type.length === 0 ? (
                <p>This craft does not have any {type} assigned yet. Edit the craft to add them.</p>
            ) : (
                <ListContainer>
                    {type.map((element, index) => (
                        <ListItem
                            onClick={(e) => {
                                setCurrentElement(element);
                                onClick(e, { element });
                            }}
                            key={index}
                            header={element.e35_title_english}
                            image={`https://picsum.photos/1920/1080?random=${index}`}
                        ></ListItem>
                    ))}
                </ListContainer>
            )}
        </>
    );
}


function Detail({ currentElement }) {
    return (
        <>
            <div className='px-5 py-4 border border-gray-300 bg-gray-100 rounded shadow-md'>
                <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='lg:w-2/3'>
                        <h1 className='font-bold text-lg'>{currentElement.e35_title_english}</h1>
                        <p className='text-sm italic mb-3'>{currentElement.e35_title_translated}</p>

                        <hr className='h-px my-2 bg-gray-300 border-0 dark:bg-gray-700' />

                        <p className='font-bold'>Purpose</p>
                        <p className='mb-4'>{currentElement.purpose}</p>

                        <p className='font-bold'>How to use</p>
                        <p>{currentElement.usage}</p>
                    </div>
                    <div className='sm:mt-4 lg:mt-0 lg:ml-8 lg:w-1/3'>
                        <img className='object-cover rounded' src='https://picsum.photos/1920/1080?random=1' />
                        {/* <img className='object-cover rounded' src={tool.e42_image_url} alt={tool.e35_title_english} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToolsMaterialsDetail