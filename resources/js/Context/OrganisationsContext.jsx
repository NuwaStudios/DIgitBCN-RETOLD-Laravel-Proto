import { createContext, useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react'

export const OrganisationsContext = createContext()

export function OrganisationsContextProvider ({ children }) {
  const organisationObjNull = {
    organisation: {
      e41_appellation_english: '', // done
      e41_appellation_local: '', // done
      e41_appellation_legal_local: '', // done
      e42_website: '', // done
      institution: '', // done

      address: {
        e41_street: '', // Street Address (GDPR!)
        e41_city: '', // City (GDPR!)
        e41_postcode: '', // Postal Code (GDPR!)
        e53_country: '' // Country (GDPR!)
      }
    }
  }

  const { data: organisationObj, setData: setOrganisationObj, post, put, processing, errors, progress } = useForm(organisationObjNull)

  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsersList(data)
      })
  }, [])

  const value = {
    organisationObj,
    organisationObjNull,
    setOrganisationObj,
    post,
    put,
    processing,
    errors,
    progress,
    usersList
  }

  return (
    <OrganisationsContext.Provider value={value}>
      {children}
    </OrganisationsContext.Provider>
  )
}
