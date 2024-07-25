import { useForm } from '@inertiajs/react'
import { createContext, useEffect, useState } from 'react'

export const CraftsContext = createContext()

export function CraftsContextProvider ({ children }) {
  const toolObjNull = {
    e35_title_english: '', // name of the tool in english
    e35_title_translated: '', // name of the tool in local language
    e42_image_url: '', // Upload an image of each tool
    purpose: '', // Function of the tool: Describe the intended purpose of the tool
    usage: '' // Describe briefly how to use the tool
  }

  const installationObjNull = {
    e35_title_english: '', // name of the installation in english
    e35_title_translated: '', // name of the installation in local language
    e42_image_url: '', // Upload an image of each installation
    purpose: '', // Function of the installation: Describe the intended purpose of the installation
    usage: '' // Describe briefly how to use the installation
  }

  const materialObjNull = {
    e35_title_english: '', // name of the material in local language.
    e35_title_translated: '', // name of the material in english.
    e42_image_url: '', // Upload an image of each material.
    description: '' // Describe briefly how to use the material
  }

  const processPhaseObjNull = {
    techniques: '', // Techniques used in this phase. Plus short description how and why.
    time: '', // Time taken for this phase.
    materials: '', // Materials used for this phase. Plus short description how.
    tools: '', // Tools used for this phase. Plus short description how.
    e42_image_url: '', // Upload image
    e42_video_url: '' // Upload video
  }

  const craftsObjNull = {
    summary: {
      document: {
        e35_title: '', // Title of the Document TODO
        e35_title_english: '', // Name of the craft in English
        e35_title_translated: '', // Name of the craft in local language
        e56_language: '' // Local Language
      },

      craft: {
        e55_craft_type_nature: '', // Type of craft
        e55_craft_type_category: '', // Category of craft
        e62_short_description: '', // Short description of the craft
        e53_historical: '', // What is the historical geography of the craft?
        e53_contemporary: '', // What is the modern geography of the craft?
        e42_image_url: '', // Add a cover Image Document
        e42_video_url: '', // Add a Video Document

        timespan: { // What is the historical/archaeological time period of the craft?
          e61_timePrimitive_start: '',
          e61_timePrimitive_end: ''
        }
      }
    },

    crafters: [],

    documenters: {
      document: {
        timespan: { // The time of the documentation
          e61_timespan_start: '',
          e61_timespan_end: ''
        },
        e53_country: '', // Country where documentation was made

        p17_motivation: '', // Occasion for the documentation, context, reason
        organisationOwner: '',
        organisationDocumentalist: ''
      }
    },

    toolsAndMaterials: {
      tools: [],
      tools_obtained: '', // How were the tools obtained?
      tools_removed: [],

      installations: [],
      installations_obtained: '', // How were the installations obtained?
      installations_removed: [],

      materials: [],
      materials_removed: [],
      materials_obtained: '', // How were the materials obtained?
      materials_obtained_natural: '',
      materials_obtained_bought: ''
    },

    productionProcess: {
      craft: {
        raw_material_description: '', // Describe the raw material and all the steps of processing until the moment of use with this craft
        reparation_description: '', // If this is a reparation of a product and not something made from scratch, explain the state it was in, why and what you will change, and why
        process_layout: '', // Lay out of the process of making.
        process_working_area: '', // Which of these options best describes your work area?
        is_decoration: false, // Is this a decoration
        decoration_techniques: '',
        decoration_motifs: '',
        e42_image_url_decoration: '',
        e42_video_url_decoration: '',

        is_diverged: false, // Did the crafter diverge from historical/archaeological accuracy to adapt the process?
        diverged_changes: '', // If yes, describe the changes to tools used, materials used, processes used
        diverged_reasons: '', // If yes, describe the crafter's reasons for the changes (for example, adjust to modern use, requirements, demands, conditions, laws)

        is_evolved: false, // Has the crafter developed new techniques or improved the product over time?
        evolved_process: '', // If yes, describe improvements to the craft process
        evolved_product: '', // If yes, describe improvements to the final product
        evolved_reasons: '', // If yes, describe the reasons why behind these improvements

        is_gaps: false, // Has the crafter identified any research gaps in their process or methodology?
        gaps_basis: '', // If yes, describe what the crafter would like to learn about the archaeological/historical basis for the craft
        gaps_process: '', // If yes, describe what the crafter would like to learn about the practical craft process
        gaps_reasons: '', // If yes, explain the motivation

        best_practices: '', // Workshop best practices. How does the crafts person handle the following
        best_practices_disposal_of_waste: '', // Describe the craftsperson's approach to a tidy workshop, hygiene and other best practices
        best_practices_use_after_disposal: '',

        working_techniques: '', // General working techniques (a short free text, or better: add 5 keywords)

        phases: [], // Individual phases, add as many as required
        phases_removed: []
      }
    },

    finishedProduct: {
      craft: {
        e35_title_english: '', // Name of the finished product in English
        e35_title_translated: '', // Name of the finished product in local language
        finished_product_description: '', // Describe the finished product
        e42_image_url: '', // Upload an image of the finished product

        is_finished_product_practical_use: false, // Is the finished product used for practical purposes?
        finished_product_practical_use_description: '', // If yes, describe the practical use

        is_finished_product_decorative_use: false, // Is the finished product used for decorative purposes?
        finished_product_decorative_use_description: '', // If yes, describe the decorative use

        is_finished_product_experimental_use: false, // Is the finished product used for experimental purposes?
        finished_product_experimental_use_description: '', // If yes, describe the experimental use

        is_finished_product_educational_use: false, // Is the finished product used for educational purposes?
        finished_product_educational_use_description: '', // If yes, describe the educational use

        finished_product_durability: '', // Durability of the finished product
        finished_product_distributed: '', // How is the finished product distributed?
        finished_product_reachability: '' // How is the finished product reachable?
      }
    }
  }

  const { data: craftsObj, setData: setCraftsObj, post, processing, errors } = useForm(craftsObjNull)

  const [craftersList, setCraftersList] = useState([])

  useEffect(() => {
    fetch('/api/crafters')
      .then(response => response.json())
      .then(data => {
        setCraftersList(data)
      })
  }, [])

  const [organisationsList, setOrganisationsList] = useState([])

  useEffect(() => {
    fetch('/api/organisations')
      .then(response => response.json())
      .then(data => {
        setOrganisationsList(data)
      })
  }, [])

  const value = {
    craftsObj,
    setCraftsObj,
    post,
    processing,
    errors,
    craftsObjNull,
    toolObjNull,
    installationObjNull,
    materialObjNull,
    processPhaseObjNull,
    craftersList,
    organisationsList
  }

  return (
    <CraftsContext.Provider value={value}>
      {children}
    </CraftsContext.Provider>
  )
}
