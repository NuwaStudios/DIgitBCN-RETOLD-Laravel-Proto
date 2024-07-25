import { useForm } from '@inertiajs/react'
import { createContext } from 'react'

export const CrafterContext = createContext()

export function CrafterContextProvider ({ children }) {
  const crafterObjNull = {
    person: {
      e41_appellation_firstname: '', // First Name (GDPR!)
      e41_appellation_middlename: '', // Middle Name (GDPR!)
      e41_appellation_lastname: '', // Last Name (GDPR!)
      e61_date_of_birth: '', // Date of Birth

      address: {
        e42_email: '', // Prof. Email
        e42_phone: '', // Prof. Phone
        e41_street: '', // Street Address (GDPR!)
        e41_city: '', // City (GDPR!)
        e41_postcode: '', // Postal Code (GDPR!)
        e53_country: '' // Country (GDPR!)
      },

      e53_nationality: '', // Crafter’s nationality? (GDPR)
      e42_website: '', // Website

      timespan: { // Amount of experience of the crafter:
        e61_timespan_start: '',
        e61_timespan_end: ''
      },

      e41_appellation_contribution_role: '', // Crafter’s role today (i.e. in the documented activity):

      craft_isMainActivity: false, // Is practicing this specific craft the main occupation of the crafter?
      craft_MainActivity: '', // TODO: If practicing this specific craft is not the main occupation of this crafter, what is?
      craft_isMultiArtisan: false, // Is this the crafter's only craft (question about specialism)?
      e41_appellation_occupation: '', // TODO: craft_isMainActivity

      p17_motivation: '', // Why did the crafter learn this specific craft?
      has_contacts: false, // Does the crafter have regular contact with colleagues?
      contact_network_size: '', // How many peers does the crafter know?
      preferred_workspace: '', // Which describes the craftsperson's habitual working area best?

      learned_from: '', // How did you learn the craft (general)?
      learned_person_context: '', // If the craft was learnt from one or more persons, provide context
      is_learned_apprenticeship_related: false, // If the craft was learnt through an apprenticeship, was the apprenticeship related to the craft?
      learned_apprenticeship_related_subject: '', //  Which apprenticeship?
      is_learned_course_related: false, // If the craft was learnt through an academic course, was the academic course related to the craft?
      learned_course_authority: '', // If yes, name the awarding authority or university...
      learned_course_subject: '', // ...as well as the main subject.

      is_historical_sources: false, // Does the craftsperson model the craft documented here on historical or archaeological sources?
      historical_sources_reference: '', // If yes, lease reference the main source and additional sources (like literature, paintings or other).

      is_teach_craft: false, // Do they also teach the craft?
      teach_craft_where: '' // If yes, where:
    }
  }

  const { data: crafterObj, setData: setCrafterObj, post, processing, errors, progress } = useForm(crafterObjNull)

  const value = {
    crafterObj,
    setCrafterObj,
    post,
    processing,
    errors,
    progress,
    crafterObjNull
  }

  return (
    <CrafterContext.Provider value={value}>
      {children}
    </CrafterContext.Provider>
  )
}
