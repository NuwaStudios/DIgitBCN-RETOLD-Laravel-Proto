import { Form } from '@/Components/form/Form.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { BottomNavigation } from '@/Components/form/BottomNavigation.jsx'
import { toast, ToastContainer } from 'react-toastify'
import { useContext, useEffect } from 'react'
import { OrganisationsContext } from '@/Context/OrganisationsContext.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { countries } from '@/constants.jsx'
import { NumberInput } from '@/Components/form/inputs/NumberInput.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import 'react-toastify/dist/ReactToastify.css'

const institutions = [
  { id: '1', name: 'Organisation 1' },
  { id: '2', name: 'Organisation 2' },
  { id: '3', name: 'Organisation 3' }
]

export function OrganisationsForm ({ id, organisation }) {
  const { organisationObj, organisationObjNull, setOrganisationObj, post, put, processing, errors, progress } = useContext(OrganisationsContext)

  useEffect(() => {
    if (organisation) setOrganisationObj(organisation)
  }, [])

  const success = () => toast.success('Organisation saved successfully', {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })
  const error = () => toast.error('Organisation could not be saved: ' + errors, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })

  const publish = () => {
    if (id) {
      put(route('organisations.update', id), {
        onSuccess: () => success(),
        onError: () => error()
      })
    } else {
      post(route('organisations.store'), {
        onSuccess: () => success(),
        onError: () => error()
      })
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='grow flex flex-col gap-2 overflow-y-scroll'>
        <div
          className='grow max-h-full flex flex-col gap-2 rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'
        >
          <Form className='p-5 overflow-y-scroll h-full'>
            <Form.Fieldset legend='Information about the organisation'>
              <Form.GroupLg>
                <TextInput
                  value={organisationObj.organisation.e41_appellation_english}
                  onChange={e => {
                    organisationObj.organisation.e41_appellation_english = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Name (English)'
                >
                  Name (English):
                </TextInput>
                <TextInput
                  value={organisationObj.organisation.e41_appellation_local}
                  onChange={e => {
                    organisationObj.organisation.e41_appellation_local = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Name (local)'
                >
                  Name (local):
                </TextInput>
                <TextInput
                  value={organisationObj.organisation.e41_appellation_legal_local}
                  onChange={e => {
                    organisationObj.organisation.e41_appellation_legal_local = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Legal Name (local)'
                >
                  Legal Name (local):
                </TextInput>
                <TextInput
                  value={organisationObj.organisation.e42_website}
                  onChange={e => {
                    organisationObj.organisation.e42_website = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Website'
                >
                  Website:
                </TextInput>
              </Form.GroupLg>
              <Form.GroupLg>
                <TextInput
                  value={organisationObj.organisation.address.e41_street}
                  onChange={e => {
                    organisationObj.organisation.address.e41_street = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Address'
                >
                  Address:
                </TextInput>
                <TextInput
                  value={organisationObj.organisation.address.e41_city}
                  onChange={e => {
                    organisationObj.organisation.address.e41_city = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Barcelona'
                >
                  City:
                </TextInput>
                <NumberInput
                  value={organisationObj.organisation.address.e41_postcode}
                  onChange={e => {
                    organisationObj.organisation.address.e41_postcode = e.target.value
                    setOrganisationObj({ ...organisationObj })
                  }}
                  placeholder='Postal Code'
                >
                  Postal Code:
                </NumberInput>
                <SelectInput
                  value={organisationObj.organisation.address.e53_country}
                  onChange={e => {
                    organisationObj.organisation.address.e53_country = e
                    setOrganisationObj({ ...organisationObj })
                  }}
                  options={countries}
                >
                  Country:
                </SelectInput>
              </Form.GroupLg>
            </Form.Fieldset>
            <Form.Fieldset legend='Institution managing the organisation'>
              <Form.Group>
                <SelectInput
                  value={organisationObj.organisation.institution}
                  onChange={e => setOrganisationObj(() => {
                    organisationObj.organisation.institution = e
                    return { ...organisationObj }
                  })}
                  options={institutions}
                  id='organisationOwner'
                  name='organisationOwner'
                >
                  Organisation:
                </SelectInput>
              </Form.Group>

              <Form.GroupXl>
                <ListContainer>
                  {organisationObj.organisation.institution &&
                    <ListItem header='Organisation name' />}
                </ListContainer>
              </Form.GroupXl>
            </Form.Fieldset>
          </Form>
        </div>
        <BottomNavigation entity='organisations' object={organisationObj} setObject={setOrganisationObj} objectNull={organisationObjNull} publish={publish} processing={processing} progress={progress} />
      </div>
    </>
  )
}
