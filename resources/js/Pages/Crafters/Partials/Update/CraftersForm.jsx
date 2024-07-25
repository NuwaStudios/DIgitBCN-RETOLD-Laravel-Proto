import { Form } from '@/Components/form/Form.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { DateInput } from '@/Components/form/inputs/DateInput.jsx'
import { NumberInput } from '@/Components/form/inputs/NumberInput.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import {
  countries,
  learningOptions,
  motivationOptions,
  rolesOptions,
  teachingOptions,
  workingAreaOptionsCrafters
} from '@/constants.jsx'
import { CheckboxInput } from '@/Components/form/inputs/Checkbox.jsx'
import { useContext, useEffect } from 'react'
import { BottomNavigation } from '@/Components/form/BottomNavigation.jsx'
import { CrafterContext } from '@/Context/CraftersContext.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function CraftersForm({ crafter }) {
  const { crafterObj, setCrafterObj, post, processing, errors, progress, crafterObjNull } = useContext(CrafterContext)

  useEffect(() => {
    if (crafter) setCrafterObj(crafter)
  }, [])

  const success = () => toast.success('Crafter saved successfully', {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })
  const error = () => toast.error('Crafter could not be saved: ' + errors, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })

  const publish = () => {
    post(route('crafters.store'), {
      replace: false,
      onSuccess: () => success(),
      onError: () => error()
    })
  }

  return (
    <>
      <ToastContainer />
      <div className='grow flex flex-col gap-2 overflow-y-scroll'>
        <div
          className='grow max-h-full rounded bg-background-color-muted dark:bg-background-color-dark-muted overflow-y-scroll'
        >
          <Form className='p-5 overflow-y-scroll h-full'>
            <Form.Fieldset legend='Information about the crafter' className='!text-xl sm:!text-2xl'>
              <Form.Group>
                <TextInput
                  value={crafterObj.person.e41_appellation_firstname}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e41_appellation_firstname = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='John'
                >
                  First name:
                </TextInput>
                <TextInput
                  value={crafterObj.person.e41_appellation_middlename}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e41_appellation_middlename = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='William'
                >
                  Middle name:
                </TextInput>
                <TextInput
                  value={crafterObj.person.e41_appellation_lastname}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e41_appellation_lastname = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='Doe'
                >
                  Last name:
                </TextInput>
                <DateInput
                  value={crafterObj.person.e61_date_of_birth}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e61_date_of_birth = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='1975'
                >
                  Date of birth:
                </DateInput>
                <TextInput
                  value={crafterObj.person.address.e42_email}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.address.e42_email = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='john_doe@mail.com'
                >
                  Email:
                </TextInput>
                <NumberInput
                  value={crafterObj.person.address.e42_phone}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.address.e42_phone = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='654321987'
                >
                  Phone:
                </NumberInput>
              </Form.Group>

              <Form.Group>
                <TextInput
                  value={crafterObj.person.address.e41_street}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.address.e41_street = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='Main St. Apt 123'
                >
                  Street address:
                </TextInput>
                <TextInput
                  value={crafterObj.person.address.e41_city}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.address.e41_city = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='New York'
                >
                  City:
                </TextInput>
                <NumberInput
                  value={crafterObj.person.address.e41_postcode}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.address.e41_postcode = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='12345'
                >
                  Postal code:
                </NumberInput>
                <SelectInput
                  value={crafterObj.person.address.e53_country}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.address.e53_country = e
                    return { ...crafterObj }
                  })}
                  options={countries}
                >
                  Country:
                </SelectInput>
                <SelectInput
                  value={crafterObj.person.e53_nationality}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e53_nationality = e
                    return { ...crafterObj }
                  })}
                  options={countries}
                >
                  Nationality:
                </SelectInput>
                <TextInput
                  value={crafterObj.person.e42_website}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e42_website = e.target.value
                    return { ...crafterObj }
                  })}
                  placeholder='https://www.website.com'
                >
                  Website:
                </TextInput>
              </Form.Group>

              <Form.Group>
                <Form.InputGroup title='Crafter has been practicing this craft'>
                  <DateInput
                    value={crafterObj.person.timespan.e61_timespan_start}
                    onChange={e => setCrafterObj(() => {
                      crafterObj.person.timespan.e61_timespan_start = e.target.value
                      return { ...crafterObj }
                    })}
                    placeholder='YYYY-mm-dd'
                  >
                    From:
                  </DateInput>

                  <DateInput
                    value={crafterObj.person.timespan.e61_timespan_end}
                    onChange={e => setCrafterObj(() => {
                      crafterObj.person.timespan.e61_timespan_end = e.target.value
                      return { ...crafterObj }
                    })}
                    placeholder='YYYY-mm-dd'
                  >
                    To:
                  </DateInput>
                </Form.InputGroup>
              </Form.Group>

              <Form.Group>
                <SelectInput.Text
                  value={crafterObj.person.e41_appellation_contribution_role}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.e41_appellation_contribution_role = e
                    return { ...crafterObj }
                  })}
                  options={rolesOptions}
                >
                  Crafter's role in the documentation process:
                </SelectInput.Text>

                <Form.InputGroup>
                  <CheckboxInput
                    value={crafterObj.person.craft_isMainActivity}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.craft_isMainActivity = !crafterObj.person.craft_isMainActivity
                      return { ...crafterObj }
                    })}
                  >
                    Is practicing this craft the main occupation of the crafter?
                  </CheckboxInput>
                </Form.InputGroup>

                <Form.InputGroup>
                  <CheckboxInput
                    value={crafterObj.person.craft_isMultiArtisan}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.craft_isMultiArtisan = !crafterObj.person.craft_isMultiArtisan
                      return { ...crafterObj }
                    })}
                  >
                    Does the crafter practice any other crafts?
                  </CheckboxInput>
                </Form.InputGroup>

                <SelectInput.Text
                  value={crafterObj.person.p17_motivation}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.p17_motivation = e
                    return { ...crafterObj }
                  })}
                  options={motivationOptions}
                >
                  Crafter's motivation for learning this specific art:
                </SelectInput.Text>

                <Form.InputGroup>
                  <CheckboxInput
                    value={crafterObj.person.has_contacts}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.has_contacts = !crafterObj.person.has_contacts
                      return { ...crafterObj }
                    })}
                  >
                    Does the crafter have regular contact with colleagues?
                  </CheckboxInput>
                  {crafterObj.person.has_contacts &&
                    <NumberInput
                      value={crafterObj.person.contact_network_size}
                      onChange={e => setCrafterObj(() => {
                        crafterObj.person.contact_network_size = e.target.value
                        return { ...crafterObj }
                      })}
                      placeholder='3'
                    >
                      Number of colleagues:
                    </NumberInput>}
                </Form.InputGroup>

                <SelectInput.Text
                  value={crafterObj.person.preferred_workspace}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.preferred_workspace = e
                    return { ...crafterObj }
                  })}
                  options={workingAreaOptionsCrafters}
                >
                  Which describes the craftsperson's habitual working area best:
                </SelectInput.Text>
              </Form.Group>
            </Form.Fieldset>

            <Form.Fieldset legend='How did them learn the craft' className='!text-xl sm:!text-2xl'>
              <Form.Group>
                <SelectInput.Text
                  value={crafterObj.person.learned_from}
                  onChange={e => setCrafterObj(() => {
                    crafterObj.person.learned_from = e
                    return { ...crafterObj }
                  })}
                  options={learningOptions}
                >
                  From whom did the craftsperson learn their craft:
                </SelectInput.Text>
                {crafterObj.person.learned_from === learningOptions[0] &&
                  <TextInput
                    value={crafterObj.person.learned_person_context}
                    onChange={e => setCrafterObj(() => {
                      crafterObj.person.learned_person_context = e.target.value
                      return { ...crafterObj }
                    })}
                    placeholder='Family'
                  >
                    Context:
                  </TextInput>}

                {crafterObj.person.learned_from === learningOptions[1] &&
                  <CheckboxInput
                    className='py-1'
                    value={crafterObj.person.is_learned_apprenticeship_related}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.is_learned_apprenticeship_related = !crafterObj.person.is_learned_apprenticeship_related
                      return { ...crafterObj }
                    })}
                  >
                    Was the apprenticeship related to the craft?
                  </CheckboxInput>}

                {(crafterObj.person.learned_from === learningOptions[1] && crafterObj.person.is_learned_apprenticeship_related) &&
                  <TextInput
                    value={crafterObj.person.learned_apprenticeship_related_subject}
                    onChange={e => setCrafterObj(() => {
                      crafterObj.person.learned_apprenticeship_related_subject = e.target.value
                      return { ...crafterObj }
                    })}
                    placeholder='Please name the main subject'
                  >
                    Main subject:
                  </TextInput>}

                {crafterObj.person.learned_from === learningOptions[2] &&
                  <CheckboxInput
                    className='py-1'
                    value={crafterObj.person.is_learned_course_related}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.is_learned_course_related = !crafterObj.person.is_learned_course_related
                      return { ...crafterObj }
                    })}
                  >
                    Was the academic course related to the craft?
                  </CheckboxInput>}

                {(crafterObj.person.learned_from === learningOptions[2] && crafterObj.person.is_learned_course_related) && (
                  <>
                    <TextInput
                      value={crafterObj.person.learned_course_authority}
                      onChange={e => setCrafterObj(() => {
                        crafterObj.person.learned_course_authority = e.target.value
                        return { ...crafterObj }
                      })}
                      placeholder='Please name the authority'
                    >
                      Authority:
                    </TextInput>
                    <TextInput
                      value={crafterObj.person.learned_course_subject}
                      onChange={e => setCrafterObj(() => {
                        crafterObj.person.learned_course_subject = e.target.value
                        return { ...crafterObj }
                      })}
                      placeholder='Please name the main subject'
                    >
                      Main subject:
                    </TextInput>
                  </>
                )}
              </Form.Group>

              <Form.Group>
                <Form.InputGroup>
                  <CheckboxInput
                    value={crafterObj.person.is_historical_sources}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.is_historical_sources = !crafterObj.person.is_historical_sources
                      return { ...crafterObj }
                    })}
                  >
                    Does the craftsperson model the craft documented here on historical or archaeological sources?
                  </CheckboxInput>
                  {crafterObj.person.is_historical_sources &&
                    <TextInput
                      value={crafterObj.person.historical_sources_reference}
                      onChange={e => setCrafterObj(() => {
                        crafterObj.person.historical_sources_reference = e.target.value
                        return { ...crafterObj }
                      })}
                      placeholder='Please name the organisation'
                    >
                      Reference:
                    </TextInput>}
                </Form.InputGroup>

                <Form.InputGroup>
                  <CheckboxInput
                    value={crafterObj.person.is_teach_craft}
                    onChange={() => setCrafterObj(() => {
                      crafterObj.person.is_teach_craft = !crafterObj.person.is_teach_craft
                      return { ...crafterObj }
                    })}
                  >
                    Does the craftsperson teach the craft?
                  </CheckboxInput>
                  {crafterObj.person.is_teach_craft &&
                    <SelectInput.Text
                      value={crafterObj.person.teach_craft_where}
                      onChange={e => setCrafterObj(() => {
                        crafterObj.person.teach_craft_where = e
                        return { ...crafterObj }
                      })}
                      options={teachingOptions}
                    >
                      Where:
                    </SelectInput.Text>}
                </Form.InputGroup>
              </Form.Group>
            </Form.Fieldset>
          </Form>
        </div>
        <BottomNavigation publish={publish} entity='crafters' object={crafterObj} setObject={setCrafterObj} objectNull={crafterObjNull} processing={processing} progress={progress} />
      </div>
    </>
  )
}
