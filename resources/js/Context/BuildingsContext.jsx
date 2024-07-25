import { useForm } from '@inertiajs/react'
import { createContext, useEffect, useState } from 'react'

export const BuildingsContext = createContext()

export function BuildingsContextProvider ({ children }) {
  const notTranslocatedComponentsObjNull = {
    name: '', // done
    material: '', // done
    manufacturing_technique: '', // done
    dimensions: '', // done
    image: '' // done
  }

  const documentationsObjNull = {
    title: '', // done
    document: '', // done
    link: '' // done
  }

  const buildingObjNull = {
    documenters: {
      document: {
        e35_title_english: '', // Name in English                     // done
        e35_title_translated: '', // Name in local language           // done
        e56_language: '', // Language                                 // done

        e53_country: '', // Country where documentation was made       // done
        timespan: { // The time of the documentation                  // done
          e61_timespan_start: '', // done
          e61_timespan_end: '' // done
        },
        organisationOwner: '',
        is_public: false
      }
    },

    sourceMaterial: {
      document: {
        organisationDocumentalist: ''
      },
      building: {
        address: {
          e41_street: '', // Street Address    // done
          e41_county: '', // County           // done
          e41_city: '', // City               // done
          e41_postcode: '', // Postal Code    // done
          e53_country: '', // Country         // done
          coordinates_lat: '', // done
          coordinates_lng: '' // done
        },

        assessor: '', // done
        assessment_year: '', // done
        source_type: '', // done
        building_url: '' // done
      }
    },

    inhabitants: {
      building: {
        construction_year: '', // done
        cultural_group: '', // done
        time_period: '', // done
        owner_name: '', // done
        owner_occupation: '', // done
        owner_family_history: '', // done
        owner_society_status: '', // done
        owner_year_of_occupation: '', // done
        building_part_of: '', // done
        original_environment: '', // done
        original_environment_city: '', // done
        original_environment_village: '', // done
        original_environment_household: '', // done
        original_environment_household_location: '', // done
        aerialPhotoWithinHouseholdOriginal: '',
        surroundings: '', // done
        soil_condition: '', // done
        vegetation: '', // done
        climate: '', // done
        light_conditions: '', // done
        original_function: '', // done
        original_function_residential: '', // done
        original_function_non_residential: '', // done
        original_function_annex: '', // done
        building_use: '', // done
        building_use_residential: '', // done
        building_use_non_residential: '', // done
        building_use_annex: '', // done
        acquisition_mode: '', // done
        dismantling_year: '', // done
        dismantling_description: '' // done
      },
      notTranslocatedComponents: [], // done
      removed_components: []
    },

    constructionProcess: {
      building: {
        museum_reason: '', // done
        is_built_on_site: false, // done
        building_museum_part_of: '', // done
        building_museum_part_of_type: '', // done
        building_museum_part_of_name: '', // done
        aerialPhotoWithinHousehold: '',
        aerialPhotoWithinMuseum: '',
        registration_number: '', // done
        realisation: '', // done
        documentations: [], // done
        builder_construction_year: '', // done
        builderOrganisation: '',
        is_diversion: false, // done
        diversion_reason: '', // done
        is_divergent: false, // done
        divergent_reason: '' // done
      }
    },

    dModel: '' // done
  }

  const { data: buildingObj, setData: setBuildingObj, post, processing, errors, progress } = useForm(buildingObjNull)

  const [organisationsList, setOrganisationsList] = useState([])

  useEffect(() => {
    fetch('/api/organisations')
      .then(response => response.json())
      .then(data => {
        setOrganisationsList(data)
      })
  }, [])

  const value = {
    buildingObj,
    setBuildingObj,
    post,
    processing,
    errors,
    progress,
    buildingObjNull,
    notTranslocatedComponentsObjNull,
    documentationsObjNull,
    organisationsList
  }

  return (
    <BuildingsContext.Provider value={value}>
      {children}
    </BuildingsContext.Provider>
  )
}
