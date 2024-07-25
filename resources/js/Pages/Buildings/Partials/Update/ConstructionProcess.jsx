import { Form } from '@/Components/form/Form.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { BuildingsContext } from '@/Context/BuildingsContext.jsx'
import { useContext, useEffect, useState } from 'react'
import {
  buildingEnvironmentOptions,
  buildingHouseholdOptions,
  buildingRealisationOptions,
  reasonToPresentOptions
} from '@/constants.jsx'
import { CheckboxInput } from '@/Components/form/inputs/Checkbox.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { Collapse } from '@/Components/Collapse.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { ITrash } from '@/icons.jsx'
import { Tooltip } from '@/Components/Tooltip.jsx'
import { TextAreaInput } from '@/Components/form/inputs/TextAreaInput.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { NumberInput } from '@/Components/form/inputs/NumberInput.jsx'
import { SelectOrganisation } from '@/Pages/Organisations/Partials/SelectOrganisation.jsx'

export function ConstructionProcess () {
  const { buildingObj, setBuildingObj, documentationsObjNull, organisationsList } = useContext(BuildingsContext)

  const handleAddDocumentation = e => {
    e.preventDefault()
    buildingObj.constructionProcess.building.documentations.push(documentationsObjNull)
    setBuildingObj({ ...buildingObj })
  }

  return (
    <>
      <Form.Fieldset legend='The Building in the Museum: Documentation of the Construction Process'>
        <Form.Group>
          <SelectInput.Text
            value={buildingObj.constructionProcess.building.museum_reason}
            onChange={e => setBuildingObj(() => {
              buildingObj.constructionProcess.building.museum_reason = e
              return { ...buildingObj }
            })}
            options={reasonToPresentOptions}
            id='constructionProcessReason'
            name='constructionProcessReason'
          >
            The reason to present this building in the museum is:
          </SelectInput.Text>

          <Form.InputGroup>
            <CheckboxInput
              value={buildingObj.constructionProcess.building.is_built_on_site}
              onChange={() => setBuildingObj(() => {
                buildingObj.constructionProcess.building.is_built_on_site = !buildingObj.constructionProcess.building.is_built_on_site
                return { ...buildingObj }
              })}
              id='constructionProcessBuiltOnSite'
              name='constructionProcessBuiltOnSite'
            >
              The building was built on site
            </CheckboxInput>
          </Form.InputGroup>

          <SelectInput.Text
            value={buildingObj.constructionProcess.building.building_museum_part_of}
            onChange={e => setBuildingObj(() => {
              buildingObj.constructionProcess.building.building_museum_part_of = e
              return { ...buildingObj }
            })}
            options={buildingEnvironmentOptions}
            id='constructionProcessEnvironment'
            name='constructionProcessEnvironment'
          >
            Is the building in the museum a stand-alone, or part of a household:
          </SelectInput.Text>

          {buildingObj.constructionProcess.building.building_museum_part_of === buildingEnvironmentOptions[1] && (
            <SelectInput.Text
              value={buildingObj.constructionProcess.building.building_museum_part_of_type}
              onChange={e => setBuildingObj(() => {
                buildingObj.constructionProcess.building.building_museum_part_of_type = e
                return { ...buildingObj }
              })}
              options={buildingHouseholdOptions}
              id='constructionProcessHousehold'
              name='constructionProcessHousehold'
            >
              Is that household a depiction of the original household of the source building, or is it put together from various backgrounds:
            </SelectInput.Text>
          )}

          {buildingObj.constructionProcess.building.building_museum_part_of === buildingEnvironmentOptions[1] && (
            <TextInput
              value={buildingObj.constructionProcess.building.building_museum_part_of_name}
              onChange={e => setBuildingObj(() => {
                buildingObj.constructionProcess.building.building_museum_part_of_name = e.target.value
                return { ...buildingObj }
              })}
              id='constructionProcessHouseholdName'
              name='constructionProcessHouseholdName'
              placeholder='Household name'
            >
              What is the name given to the household by the museum:
            </TextInput>
          )}

          {buildingObj.constructionProcess.building.building_museum_part_of === buildingEnvironmentOptions[1] && (
            <FileInput
              file={buildingObj.constructionProcess.building.aerialPhotoWithinHousehold}
              onChange={e => setBuildingObj(() => {
                buildingObj.constructionProcess.building.aerialPhotoWithinHousehold = e.target.files[0]
                return { ...buildingObj }
              })}
              id='aerialPhotoWithinHousehold'
              name='aerialPhotoWithinHousehold'
              accept='image/png, image/jpeg'
            >
              Please upload a plan or aerial photo of the building's current location within the household:
            </FileInput>)}
        </Form.Group>

        <Form.InputGroup title='Provide the location in the museum'>
          <NumberInput
            value={buildingObj.constructionProcess.building.registration_number}
            onChange={e => setBuildingObj(() => {
              buildingObj.constructionProcess.building.registration_number = e.target.value
              return { ...buildingObj }
            })}
            id='constructionProcessMuseumId'
            name='constructionProcessMuseumId'
            placeholder='1234'
          >
            Registration number/ name/ inventory number of the building:
          </NumberInput>

          <FileInput
            file={buildingObj.constructionProcess.building.aerialPhotoWithinMuseum}
            onChange={e => setBuildingObj(() => {
              buildingObj.constructionProcess.building.aerialPhotoWithinMuseum = e.target.files[0]
              return { ...buildingObj }
            })}
            onClear={() => setBuildingObj(() => {
              buildingObj.constructionProcess.building.aerialPhotoWithinMuseum = null
              return { ...buildingObj }
            })}
            id='aerialPhotoWithinMuseum'
            name='aerialPhotoWithinMuseum'
            accept='image/png, image/jpeg'
          >
            Please upload a plan or aerial photo of the building's location within the museum:
          </FileInput>
        </Form.InputGroup>

        <Form.Group>
          <SelectInput.Text
            value={buildingObj.constructionProcess.building.realisation}
            onChange={e => setBuildingObj(() => {
              buildingObj.constructionProcess.building.realisation = e
              return { ...buildingObj }
            })}
            options={buildingRealisationOptions}
            id='constructionProcessRealisation'
            name='constructionProcessRealisation'
          >
            Method of realisation - Is the building:
          </SelectInput.Text>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title={'If any processes or objects in the construction process have been documented as experiment or technical reports, please upload relevant documents or add links (' + buildingObj.constructionProcess.building.documentations.length + ')'}>
            <div className='flex flex-col gap-2'>
              <Collapse length={buildingObj.constructionProcess.building.documentations.length - 1}>
                {buildingObj.constructionProcess.building.documentations.map((documentation, index) => (
                  <Document key={index} index={index} documentation={documentation} />
                ))}
              </Collapse>
              <PrimaryButton onClick={handleAddDocumentation}>Add Documentation</PrimaryButton>
            </div>
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup>
            <CheckboxInput
              value={buildingObj.constructionProcess.building.is_diversion}
              onChange={() => setBuildingObj(() => {
                buildingObj.constructionProcess.building.is_diversion = !buildingObj.constructionProcess.building.is_diversion
                return { ...buildingObj }
              })}
              id='constructionProcessDiversionModifier'
              name='constructionProcessDiversionModifier'
            >
              Is there a significant diversion in the construction from the original:
              <Tooltip>
                For example, were there any planning regulations or Health and Safety issues that needed to be taken into account for the rebuilt or reconstruction that cause deviations from the historical or archaeological sources, like the addition of an extra door?
              </Tooltip>
            </CheckboxInput>
          </Form.InputGroup>

          {buildingObj.constructionProcess.building.is_diversion && (
            <TextAreaInput
              value={buildingObj.constructionProcess.building.diversion_reason}
              onChange={e => setBuildingObj(() => {
                buildingObj.constructionProcess.building.diversion_reason = e.target.value
                return { ...buildingObj }
              })}
              id='constructionProcessDiversionReason'
              name='constructionProcessDiversionReason'
              placeholder='Reason...'
            >
              Provide reasons for the changes:
            </TextAreaInput>)}
        </Form.Group>

        <Form.Group>
          <Form.InputGroup>
            <CheckboxInput
              value={buildingObj.constructionProcess.building.is_divergent}
              onChange={() => setBuildingObj(() => {
                buildingObj.constructionProcess.building.is_divergent = !buildingObj.constructionProcess.building.is_divergent
                return { ...buildingObj }
              })}
              id='constructionProcessHistoricalDiversionModifier'
              name='constructionProcessHistoricalDiversionModifier'
            >
              Are materials, techniques or tools divergent from historical/archaeological accuracy:
            </CheckboxInput>
          </Form.InputGroup>

          {buildingObj.constructionProcess.building.is_divergent && (
            <TextAreaInput
              value={buildingObj.constructionProcess.building.divergent_reason}
              onChange={e => setBuildingObj(() => {
                buildingObj.constructionProcess.building.divergent_reason = e.target.value
                return { ...buildingObj }
              })}
              id='constructionProcessHistoricalDiversionReason'
              name='constructionProcessHistoricalDiversionReason'
              placeholder='Reason...'
            >
              Provide reasons for the changes:
            </TextAreaInput>)}
        </Form.Group>
      </Form.Fieldset>

      <Form.Fieldset legend='Builders organisation'>
        <Form.Group>
          <NumberInput
            value={buildingObj.constructionProcess.building.builder_construction_year}
            onChange={e => setBuildingObj(() => {
              buildingObj.constructionProcess.building.builder_construction_year = e.target.value
              return { ...buildingObj }
            })}
            id='constructionProcessBuildersYearOfConstruction'
            name='constructionProcessBuildersYearOfConstruction'
            placeholder='Year of construction'
          >
            Year of construction:
          </NumberInput>

          <SelectOrganisation
            value={buildingObj.constructionProcess.building.builderOrganisation}
            onChange={e => {
              buildingObj.constructionProcess.building.builderOrganisation = e
              setBuildingObj({ ...buildingObj })
            }}
            options={organisationsList.filter(organisation => organisation.id !== buildingObj.constructionProcess.building.builderOrganisation?.id)}
            placeholder='Select an organisation'
          >
            Organisation:
          </SelectOrganisation>
        </Form.Group>

        <Form.GroupXl>
          <ListContainer>
            {buildingObj.constructionProcess.building.builderOrganisation &&
              <ListItem header={buildingObj.constructionProcess.building.builderOrganisation.e41_appellation_english} />}
          </ListContainer>
        </Form.GroupXl>
      </Form.Fieldset>
    </>
  )
}

const Document = ({ index, documentation }) => {
  const { buildingObj, setBuildingObj } = useContext(BuildingsContext)
  const [document, setDocument] = useState(documentation)

  useEffect(() => {
    buildingObj.constructionProcess.building.documentations[index] = document
    setBuildingObj({ ...buildingObj })
  }, [document])

  const handleRemove = e => {
    e.preventDefault()
    buildingObj.constructionProcess.building.documentations.splice(index, 1)
    setBuildingObj({ ...buildingObj })
  }

  return (
    <Collapse.Item
      index={index}
      button={document.title
        ? `Documentation ${document.title}`
        : 'New Documentation'}
    >
      <TextInput
        value={document.title}
        onChange={e => setDocument({ ...document, title: e.target.value })}
        id='documentationTitle'
        name='documentationTitle'
        placeholder='Title...'
      >
        Title:
      </TextInput>

      <FileInput
        file={document.image}
        onChange={e => setDocument({ ...document, image: e.target.files[0] })}
        onClear={() => setDocument({ ...document, image: null })}
        id='documentationImage'
        name='documentationImage'
        placeholder='Image...'
      >
        Upload a document:
      </FileInput>

      <TextInput
        value={document.link}
        onChange={e => setDocument({ ...document, link: e.target.value })}
        id='documentationLink'
        name='documentationLink'
        placeholder='Link...'
      >
        Link:
      </TextInput>

      <PrimaryButton onClick={handleRemove} className='flex items-center gap-2 justify-center' remove>
        Remove Documentation
        <ITrash className='mt-1' />
      </PrimaryButton>
    </Collapse.Item>
  )
}
