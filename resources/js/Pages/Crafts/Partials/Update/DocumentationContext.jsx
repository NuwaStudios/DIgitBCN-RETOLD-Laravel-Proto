import { useContext } from 'react'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { Form } from '@/Components/form/Form.jsx'
import { countries, documentationOccasionOptions } from '@/constants.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { DateInput } from '@/Components/form/inputs/DateInput.jsx'
import { SelectOrganisation } from '@/Pages/Organisations/Partials/SelectOrganisation.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { AuthContext } from '@/Context/AuthContext.jsx'

export function DocumentationContext () {
  const { user } = useContext(AuthContext)
  const { craftsObj, setCraftsObj, organisationsList } = useContext(CraftsContext)

  console.log(craftsObj.documenters.document.organisationOwner)

  return (
    <>
      <Form.Fieldset legend='The documenters'>
        <Form.Group>
          <SelectInput
            value={craftsObj.documenters.document.e53_country}
            onChange={e => setCraftsObj(() => {
              craftsObj.documenters.document.e53_country = e
              return { ...craftsObj }
            })}
            options={countries}
          >
            Country where documentation was made:
          </SelectInput>

          <SelectInput.Text
            value={craftsObj.documenters.document.p17_motivation}
            onChange={e => setCraftsObj(() => {
              craftsObj.documenters.document.p17_motivation = e
              return { ...craftsObj }
            })}
            options={documentationOccasionOptions}
          >
            Occasion for the documentation:
          </SelectInput.Text>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title='Date and time of documentation:'>
            <DateInput
              value={craftsObj.documenters.document.timespan.e61_timespan_start}
              onChange={e => setCraftsObj(() => {
                craftsObj.documenters.document.timespan.e61_timespan_start = e.target.value
                return { ...craftsObj }
              })}
            >
              Start:
            </DateInput>
            <DateInput
              value={craftsObj.documenters.document.timespan.e61_timespan_end}
              onChange={e => setCraftsObj(() => {
                craftsObj.documenters.document.timespan.e61_timespan_end = e.target.value
                return { ...craftsObj }
              })}
            >
              End:
            </DateInput>
          </Form.InputGroup>
        </Form.Group>
      </Form.Fieldset>

      {
        user?.role.name === 'admin'
          ? (
            <Form.Fieldset legend='Organisations'>
              <Form.InputGroup className='flex flex-col gap-2 col-span-1 xl:col-span-2'>
                <Form.Group>
                  <SelectOrganisation
                    value={craftsObj.documenters.document.organisationOwner}
                    onChange={e => {
                      craftsObj.documenters.document.organisationOwner = e
                      setCraftsObj({ ...craftsObj })
                    }}
                    options={organisationsList.filter(organisation => organisation.id !== craftsObj.documenters.document.organisationOwner?.id)}
                    placeholder='Select an organisation'
                  >
                    Organisation managing the documentation:
                  </SelectOrganisation>
                </Form.Group>

                <Form.GroupXl>
                  <ListContainer>
                    {craftsObj.documenters.document.organisationOwner &&
                      <ListItem header={craftsObj.documenters.document.organisationOwner.e41_appellation_english} />}
                  </ListContainer>
                </Form.GroupXl>
              </Form.InputGroup>

              <Form.InputGroup className='flex flex-col gap-2 col-span-1 xl:col-span-2'>
                <Form.Group>
                  <SelectOrganisation
                    value={craftsObj.documenters.document.organisationDocumentalist}
                    onChange={e => {
                      craftsObj.documenters.document.organisationDocumentalist = e
                      setCraftsObj({ ...craftsObj })
                    }}
                    options={organisationsList.filter(organisation => organisation.id !== craftsObj.documenters.document.organisationDocumentalist?.id)}
                    placeholder='Select an organisation'
                  >
                    Organisation responsible for the documentation:
                  </SelectOrganisation>
                </Form.Group>

                <Form.GroupXl>
                  <ListContainer>
                    {craftsObj.documenters.document.organisationDocumentalist &&
                      <ListItem header={craftsObj.documenters.document.organisationDocumentalist.e41_appellation_english} />}
                  </ListContainer>
                </Form.GroupXl>
              </Form.InputGroup>
            </Form.Fieldset>
            )
          : (
            <p>Organisation is automatically set to {user?.organisation.e41_appellation_english}</p>
            )
      }
    </>
  )
}
