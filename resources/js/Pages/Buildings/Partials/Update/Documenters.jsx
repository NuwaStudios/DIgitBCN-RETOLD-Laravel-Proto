import { Fragment, useContext } from 'react'
import { BuildingsContext } from '@/Context/BuildingsContext'
import { Form } from '@/Components/form/Form'
import { SelectInput } from '@/Components/form/inputs/SelectInput'
import { DateInput } from '@/Components/form/inputs/DateInput.jsx'
import { countries, languages } from '@/constants.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { SelectOrganisation } from '@/Pages/Organisations/Partials/SelectOrganisation.jsx'
import { AuthContext } from '@/Context/AuthContext.jsx'

export function Documenters () {
  const { user } = useContext(AuthContext)
  const { buildingObj, setBuildingObj, organisationsList } = useContext(BuildingsContext)

  return (
    <>
      <Form.Fieldset legend='The documenters'>
        <Form.Group>
          <TextInput
            value={buildingObj.documenters.document.e35_title_english}
            onChange={e => setBuildingObj(() => {
              buildingObj.documenters.document.e35_title_english = e.target.value
              return { ...buildingObj }
            })}
            placeholder='English name'
          >
            Name of building (English):
          </TextInput>
          <TextInput
            value={buildingObj.documenters.document.e35_title_translated}
            onChange={e => setBuildingObj(() => {
              buildingObj.documenters.document.e35_title_translated = e.target.value
              return { ...buildingObj }
            })}
            placeholder='Local name'
          >
            Name of building (local language):
          </TextInput>
          <SelectInput
            value={buildingObj.documenters.document.e56_language}
            onChange={e => setBuildingObj(() => {
              buildingObj.documenters.document.e56_language = e
              return { ...buildingObj }
            })}
            options={languages}
          >
            Local language:
          </SelectInput>
          <SelectInput
            value={buildingObj.documenters.document.e53_country}
            onChange={e => setBuildingObj(() => {
              buildingObj.documenters.document.e53_country = e
              return { ...buildingObj }
            })}
            options={countries}
            id='countryOfDocumentation'
            name='countryOfDocumentation'
            placeholder='Spain'
          >
            Country of documentation:
          </SelectInput>
        </Form.Group>

        <Form.Group>
          <DateInput
            value={buildingObj.documenters.document.timespan.e61_timespan_start}
            onChange={e => setBuildingObj(() => {
              buildingObj.documenters.document.timespan.e61_timespan_start = e.target.value
              return { ...buildingObj }
            })}
            id='documentationTimePeriodStart'
            name='documentationTimePeriodStart'
            placeholder='Start date...'
          >
            Start date:
          </DateInput>
          <DateInput
            value={buildingObj.documenters.document.timespan.e61_timespan_end}
            onChange={e => setBuildingObj(() => {
              buildingObj.documenters.document.timespan.e61_timespan_end = e.target.value
              return { ...buildingObj }
            })}
            id='documentationTimePeriodEnd'
            name='documentationTimePeriodEnd'
            placeholder='End date...'
          >
            End date:
          </DateInput>
        </Form.Group>

        <Form.Group>
          <FileInput
            file={buildingObj.dModel}
            onChange={e => setBuildingObj(() => {
              buildingObj.dModel = e.target.files[0]
              return { ...buildingObj }
            })}
            onClear={() => setBuildingObj(() => {
              buildingObj.dModel = null
              return { ...buildingObj }
            })}
            id='dModel'
            name='dModel'
          >
            Please upload a 3D model:
          </FileInput>
        </Form.Group>
      </Form.Fieldset>

      {
        user?.role.name === 'admin'
          ? (
            <Form.Fieldset legend='Organisation managing the documentation'>
              <Form.Group>
                <SelectOrganisation
                  value={buildingObj.documenters.document.organisationOwner}
                  onChange={e => {
                    buildingObj.documenters.document.organisationOwner = e
                    setBuildingObj({ ...buildingObj })
                  }}
                  options={organisationsList.filter(organisation => organisation.id !== buildingObj.documenters.document.organisationOwner?.id)}
                  placeholder='Select an organisation'
                >
                  Organisation:
                </SelectOrganisation>
              </Form.Group>

              <Form.GroupXl>
                <ListContainer>
                  {buildingObj.documenters.document.organisationOwner &&
                    <ListItem header={buildingObj.documenters.document.organisationOwner.e41_appellation_english} />}
                </ListContainer>
              </Form.GroupXl>
            </Form.Fieldset>
            )
          : (
            <p>Organisation is automatically set to {user?.organisation.e41_appellation_english}</p>
            )
      }
    </>
  )
}
