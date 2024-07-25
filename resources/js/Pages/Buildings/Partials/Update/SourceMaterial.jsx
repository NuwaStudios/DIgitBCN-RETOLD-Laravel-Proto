import { Fragment, useContext } from 'react'
import { BuildingsContext } from '@/Context/BuildingsContext'
import { Form } from '@/Components/form/Form'
import { TextInput } from '@/Components/form/inputs/TextInput'
import { SelectInput } from '@/Components/form/inputs/SelectInput'
import { countries, sourceTypesOptions } from '@/constants'
import { NumberInput } from '@/Components/form/inputs/NumberInput.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { SelectOrganisation } from '@/Pages/Organisations/Partials/SelectOrganisation.jsx'

export function SourceMaterial () {
  const { buildingObj, setBuildingObj, organisationsList } = useContext(BuildingsContext)

  return (
    <>
      <Form.Fieldset legend='Original Building:  Source Material'>
        <Form.Group>
          <Form.InputGroup
            title='What is the place of origin'
            tooltip='In the following, we differentiate between the source material and the object. The source material is the original building or building remains, the object is the building in the museum.'
          >
            <TextInput
              value={buildingObj.sourceMaterial.building.address.coordinates_lat}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.coordinates_lat = e.target.value
                return { ...buildingObj }
              })}
            >
              Coordinates LAT:
            </TextInput>
            <TextInput
              value={buildingObj.sourceMaterial.building.address.coordinates_lng}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.coordinates_lng = e.target.value
                return { ...buildingObj }
              })}
            >
              Coordinates LNG:
            </TextInput>

            <TextInput
              value={buildingObj.sourceMaterial.building.address.e41_street}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.e41_street = e.target.value
                return { ...buildingObj }
              })}
              id='locationAddress'
              name='locationAddress'
              placeholder='Street 21'
            >
              Street address:
            </TextInput>

            <TextInput
              value={buildingObj.sourceMaterial.building.address.e41_county}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.e41_county = e.target.value
                return { ...buildingObj }
              })}
              id='locationCounty'
              name='locationCounty'
              placeholder='Catalonia'
            >
              County:
            </TextInput>

            <TextInput
              value={buildingObj.sourceMaterial.building.address.e41_city}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.e41_city = e.target.value
                return { ...buildingObj }
              })}
              id='locationCity'
              name='locationCity'
              placeholder='Barcelona'
            >
              City:
            </TextInput>

            <SelectInput
              value={buildingObj.sourceMaterial.building.address.e53_country}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.e53_country = e
                return { ...buildingObj }
              })}
              options={countries}
              id='locationCountry'
              name='locationCountry'
              placeholder='Spain'
            >
              Country:
            </SelectInput>

            <NumberInput
              value={buildingObj.sourceMaterial.building.address.e41_postcode}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.address.e41_postcode = e.target.value
                return { ...buildingObj }
              })}
              id='locationPostcode'
              name='locationPostcode'
              placeholder='08001'
            >
              Postal code:
            </NumberInput>
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title='When was the building assessed'>
            <TextInput
              value={buildingObj.sourceMaterial.building.assessor}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.assessor = e.target.value
                return { ...buildingObj }
              })}
              id='buildingAssessmentAssessor'
              name='buildingAssessmentAssessor'
              placeholder='John Doe'
            >
              Name of assessor:
            </TextInput>

            <NumberInput
              value={buildingObj.sourceMaterial.building.assessment_year}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.assessment_year = e.target.value
                return { ...buildingObj }
              })}
              id='buildingAssessmentDate'
              name='buildingAssessmentDate'
              placeholder='YYYY'
            >
              Year of assessment:
            </NumberInput>
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title='What sources do you base this building on'>
            <TextInput
              value={buildingObj.sourceMaterial.building.building_url}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.building_url = e.target.value
                return { ...buildingObj }
              })}
              id='sourceUrl'
              name='sourceUrl'
              placeholder='https://example.com'
            >
              URL:
            </TextInput>

            <SelectInput.Text
              value={buildingObj.sourceMaterial.building.source_type}
              onChange={e => setBuildingObj(() => {
                buildingObj.sourceMaterial.building.source_type = e
                return { ...buildingObj }
              })}
              options={sourceTypesOptions}
              id='sourceType'
              name='sourceType'
              placeholder='Excavation report'
            >
              Type:
            </SelectInput.Text>
          </Form.InputGroup>
        </Form.Group>
      </Form.Fieldset>

      <Form.Fieldset legend='In situ organisation'>
        <Form.Group>
          <SelectOrganisation
            value={buildingObj.sourceMaterial.document.organisationDocumentalist}
            onChange={e => {
              buildingObj.sourceMaterial.document.organisationDocumentalist = e
              setBuildingObj({ ...buildingObj })
            }}
            options={organisationsList.filter(organisation => organisation.id !== buildingObj.sourceMaterial.document.organisationDocumentalist?.id)}
            placeholder='Select an organisation'
          >
            Organisation:
          </SelectOrganisation>
        </Form.Group>

        <Form.GroupXl>
          <ListContainer>
            {buildingObj.sourceMaterial.document.organisationDocumentalist &&
              <ListItem header={buildingObj.sourceMaterial.document.organisationDocumentalist.e41_appellation_english} />}
          </ListContainer>
        </Form.GroupXl>
      </Form.Fieldset>
    </>
  )
}
