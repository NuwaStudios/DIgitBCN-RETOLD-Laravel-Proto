import { Form } from '@/Components/form/Form.jsx'
import { NumberInput } from '@/Components/form/inputs/NumberInput.jsx'
import { useContext, useEffect, useState } from 'react'
import { BuildingsContext } from '@/Context/BuildingsContext.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import {
  buildingAnnexOptions,
  buildingFuncionOptions, buildingNewAnnexOptions,
  buildingNewFunctionOptions,
  buildingNewNonResidentialOptions,
  buildingNewResidenceOptions,
  buildingNonResidentialOptions, buildingObtainedOptions,
  buildingResidenceOptions,
  environmentOptions,
  settlementOptions
} from '@/constants.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { TextAreaInput } from '@/Components/form/inputs/TextAreaInput.jsx'
import { Collapse } from '@/Components/Collapse.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { ITrash } from '@/icons.jsx'

export function Inhabitants () {
  const { buildingObj, setBuildingObj, notTranslocatedComponentsObjNull } = useContext(BuildingsContext)

  const handleAddComponent = e => {
    e.preventDefault()
    buildingObj.inhabitants.notTranslocatedComponents.push(notTranslocatedComponentsObjNull)
    setBuildingObj({ ...buildingObj })
  }

  return (
    <>
      <Form.Fieldset legend='Original Building: Inhabitants, Type & Role'>
        <Form.Group>
          <NumberInput
            value={buildingObj.inhabitants.building.construction_year}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.construction_year = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsDate'
            name='inhabitantsDate'
            placeholder='YYYY'
          >
            What is the building year/year of first construction of the building:
          </NumberInput>

          <TextInput
            value={buildingObj.inhabitants.building.cultural_group}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.cultural_group = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsCulturalGroup'
            name='inhabitantsCulturalGroup'
            placeholder='Cultural group'
          >
            Cultural group:
          </TextInput>

          <TextInput
            value={buildingObj.inhabitants.building.time_period}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.time_period = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsTimePeriod'
            name='inhabitantsTimePeriod'
            placeholder='Time period'
          >
            How is this time period usually called:
          </TextInput>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title="Building's owners">
            <TextInput
              value={buildingObj.inhabitants.building.owner_name}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.owner_name = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsOwnersName'
              name='inhabitantsOwnersName'
              placeholder='John Doe'
            >
              Name of the owner:
            </TextInput>

            <TextInput
              value={buildingObj.inhabitants.building.owner_occupation}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.owner_occupation = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsOwnersOccupation'
              name='inhabitantsOwnersOccupation'
              placeholder='Occupation...'
            >
              Occupation:
            </TextInput>

            <TextInput
              value={buildingObj.inhabitants.building.owner_family_history}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.owner_family_history = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsOwnersFamilyHistory'
              name='inhabitantsOwnersFamilyHistory'
              placeholder='Family history...'
            >
              Family history:
            </TextInput>

            <TextInput
              value={buildingObj.inhabitants.building.owner_society_status}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.owner_society_status = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsOwnersSocietyStatus'
              name='inhabitantsOwnersSocietyStatus'
              placeholder='Society status...'
            >
              Society status:
            </TextInput>

            <NumberInput
              value={buildingObj.inhabitants.building.owner_year_of_occupation}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.owner_year_of_occupation = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsOwnersOccupationDate'
              name='inhabitantsOwnersOccupationDate'
              placeholder='YYYY'
            >
              Year of occupation:
            </NumberInput>
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={buildingObj.inhabitants.building.surroundings}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.surroundings = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsSurroundings'
            name='inhabitantsSurroundings'
            placeholder='Surroundings...'
          >
            Provide a description of the building's surroundings at the find site (at the time that the building was used):
          </TextAreaInput>

          <TextInput
            value={buildingObj.inhabitants.building.soil_condition}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.soil_condition = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsSurroundingsGroundCondition'
            name='inhabitantsSurroundingsGroundCondition'
            placeholder='Ground condition...'
          >
            Ground/soil conditions:
          </TextInput>

          <TextInput
            value={buildingObj.inhabitants.building.vegetation}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.vegetation = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsSurroundingsVegetation'
            name='inhabitantsSurroundingsVegetation'
            placeholder='Vegetation...'
          >
            Vegetation around the building:
          </TextInput>

          <TextInput
            value={buildingObj.inhabitants.building.climate}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.climate = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsSurroundingsLocalClimate'
            name='inhabitantsSurroundingsLocalClimate'
            placeholder='Local climate...'
          >
            Local climate:
          </TextInput>

          <TextInput
            value={buildingObj.inhabitants.building.light_conditions}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.light_conditions = e.target.value
              return { ...buildingObj }
            })}
            id='inhabitantsSurroundingsLightConditions'
            name='inhabitantsSurroundingsLightConditions'
            placeholder='Light conditions...'
          >
            Light conditions during the day:
          </TextInput>
        </Form.Group>

        <Form.Group>
          <SelectInput.Text
            value={buildingObj.inhabitants.building.building_part_of}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.building_part_of = e
              return { ...buildingObj }
            })}
            options={settlementOptions}
            id='inhabitantsSettlement'
            name='inhabitantsSettlement'
          >
            Is the building part of a settlement or a rural/stand-alone building:
          </SelectInput.Text>

          {buildingObj.inhabitants.building.building_part_of === settlementOptions[0] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.original_environment}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.original_environment = e
                return { ...buildingObj }
              })}
              options={environmentOptions}
              id='inhabitantsEnvironment'
              name='inhabitantsEnvironment'
            >
              What is the original building's environment:
            </SelectInput.Text>}

          {(buildingObj.inhabitants.building.building_part_of === settlementOptions[0] && buildingObj.inhabitants.building.original_environment === environmentOptions[0]) &&
            <TextInput
              value={buildingObj.inhabitants.building.original_environment_city}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.original_environment_city = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsUrbanCityName'
              name='inhabitantsUrbanCityName'
              placeholder='City name'
            >
              What was the name of the city:
            </TextInput>}

          {(buildingObj.inhabitants.building.building_part_of === settlementOptions[0] && buildingObj.inhabitants.building.original_environment === environmentOptions[1]) &&
            <TextInput
              value={buildingObj.inhabitants.building.original_environment_village}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.original_environment_village = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsVillageName'
              name='inhabitantsVillageName'
              placeholder='Village name'
            >
              What was the name of the village:
            </TextInput>}

          {(buildingObj.inhabitants.building.building_part_of === settlementOptions[0] && buildingObj.inhabitants.building.original_environment === environmentOptions[2]) &&
            <>
              <TextInput
                value={buildingObj.inhabitants.building.original_environment_household}
                onChange={e => setBuildingObj(() => {
                  buildingObj.inhabitants.building.original_environment_household = e.target.value
                  return { ...buildingObj }
                })}
                id='inhabitantsHouseholdName'
                name='inhabitantsHouseholdName'
                placeholder='Household name'
              >
                What was the name of the household:
              </TextInput>

              <TextInput
                value={buildingObj.inhabitants.building.original_environment_household_location}
                onChange={e => setBuildingObj(() => {
                  buildingObj.inhabitants.building.original_environment_household_location = e.target.value
                  return { ...buildingObj }
                })}
                id='inhabitantsHouseholdLocation'
                name='inhabitantsHouseholdLocation'
                placeholder='Location...'
              >
                What was the location of the building within the household:
              </TextInput>

              <FileInput
                file={buildingObj.inhabitants.building.aerialPhotoWithinHouseholdOriginal}
                onChange={e => setBuildingObj(() => {
                  buildingObj.inhabitants.building.aerialPhotoWithinHouseholdOriginal = e.target.files[0]
                  return { ...buildingObj }
                })}
                onClear={() => setBuildingObj(() => {
                  buildingObj.inhabitants.building.aerialPhotoWithinHouseholdOriginal = ''
                  return { ...buildingObj }
                })}
                id='aerialPhotoWithinHouseholdOriginal'
                name='aerialPhotoWithinHouseholdOriginal'
                accept='image/png, image/jpeg'
              >
                Please upload a plan/aerial photo of the building's location within the household:
              </FileInput>
            </>}
        </Form.Group>

        <Form.Group>
          <SelectInput.Text
            value={buildingObj.inhabitants.building.original_function}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.original_function = e
              return { ...buildingObj }
            })}
            options={buildingFuncionOptions}
            id='inhabitantsBuildingFunction'
            name='inhabitantsBuildingFunction'
          >
            What was the original function of the building:
          </SelectInput.Text>

          {buildingObj.inhabitants.building.original_function === buildingFuncionOptions[0] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.original_function_residential}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.original_function_residential = e
                return { ...buildingObj }
              })}
              options={buildingResidenceOptions}
              id='inhabitantsResidentialType'
              name='inhabitantsResidentialType'
            >
              Residential type:
            </SelectInput.Text>}

          {buildingObj.inhabitants.building.original_function === buildingFuncionOptions[1] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.original_function_non_residential}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.original_function_non_residential = e
                return { ...buildingObj }
              })}
              options={buildingNonResidentialOptions}
              id='inhabitantsNonResidentialType'
              name='inhabitantsNonResidentialType'
            >
              Non-residential type:
            </SelectInput.Text>}

          {buildingObj.inhabitants.building.original_function === buildingFuncionOptions[2] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.original_function_annex}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.original_function_annex = e
                return { ...buildingObj }
              })}
              options={buildingAnnexOptions}
              id='inhabitantsAnnexType'
              name='inhabitantsAnnexType'
            >
              Annex type:
            </SelectInput.Text>}

          <SelectInput.Text
            value={buildingObj.inhabitants.building.building_use}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.building_use = e
              return { ...buildingObj }
            })}
            options={buildingNewFunctionOptions}
            id='inhabitantsNewBuildingFunction'
            name='inhabitantsNewBuildingFunction'
          >
            Has the building's function of use changed through its history:
          </SelectInput.Text>

          {buildingObj.inhabitants.building.building_use === buildingNewFunctionOptions[0] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.building_use_residential}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.building_use_residential = e
                return { ...buildingObj }
              })}
              options={buildingNewResidenceOptions}
              id='inhabitantsNewResidentialType'
              name='inhabitantsNewResidentialType'
            >
              Residential type:
            </SelectInput.Text>}

          {buildingObj.inhabitants.building.building_use === buildingNewFunctionOptions[1] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.building_use_non_residential}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.building_use_non_residential = e
                return { ...buildingObj }
              })}
              options={buildingNewNonResidentialOptions}
              id='inhabitantsNewNonResidentialType'
              name='inhabitantsNewNonResidentialType'
            >
              Non-residential type:
            </SelectInput.Text>}

          {buildingObj.inhabitants.building.building_use === buildingNewFunctionOptions[2] &&
            <SelectInput.Text
              value={buildingObj.inhabitants.building.building_use_annex}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.building_use_annex = e
                return { ...buildingObj }
              })}
              options={buildingNewAnnexOptions}
              id='inhabitantsNewAnnexType'
              name='inhabitantsNewAnnexType'
            >
              Annex type:
            </SelectInput.Text>}

          <SelectInput.Text
            value={buildingObj.inhabitants.building.acquisition_mode}
            onChange={e => setBuildingObj(() => {
              buildingObj.inhabitants.building.acquisition_mode = e
              return { ...buildingObj }
            })}
            options={buildingObtainedOptions}
            id='inhabitantsObtained'
            name='inhabitantsObtained'
          >
            How did the museum obtain the building:
          </SelectInput.Text>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title='Dismantling the building'>
            <NumberInput
              value={buildingObj.inhabitants.building.dismantling_year}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.dismantling_year = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsDismantlingYear'
              name='inhabitantsDismantlingYear'
              placeholder='YYYY'
            >
              Year of dismantling:
            </NumberInput>

            <TextAreaInput
              value={buildingObj.inhabitants.building.dismantling_description}
              onChange={e => setBuildingObj(() => {
                buildingObj.inhabitants.building.dismantling_description = e.target.value
                return { ...buildingObj }
              })}
              id='inhabitantsDismantlingDescription'
              name='inhabitantsDismantlingDescription'
              placeholder='Description...'
            >
              Description of the dismantling process:
            </TextAreaInput>
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup title={'Components which were not translocated (' + buildingObj.inhabitants.notTranslocatedComponents.length + ')'}>
            <div className='flex flex-col gap-2'>
              <Collapse length={buildingObj.inhabitants.notTranslocatedComponents.length - 1}>
                {buildingObj.inhabitants.notTranslocatedComponents.map((notTranslocatedComponent, index) => (
                  <Component key={index} index={index} notTranslocatedComponent={notTranslocatedComponent} />
                ))}
              </Collapse>
              <PrimaryButton onClick={handleAddComponent}>Add Component</PrimaryButton>
            </div>
          </Form.InputGroup>
        </Form.Group>
      </Form.Fieldset>
    </>
  )
}

const Component = ({ index, notTranslocatedComponent }) => {
  const { buildingObj, setBuildingObj } = useContext(BuildingsContext)
  const [component, setComponent] = useState(notTranslocatedComponent)

  useEffect(() => {
    buildingObj.inhabitants.notTranslocatedComponents[index] = component
    setBuildingObj({ ...buildingObj })
  }, [component])

  const handleRemove = e => {
    e.preventDefault()
    if (component.id) buildingObj.inhabitants.removed_components.push(component.id)
    buildingObj.inhabitants.notTranslocatedComponents.splice(index, 1)
    setBuildingObj({ ...buildingObj })
  }

  return (
    <Collapse.Item
      index={index}
      button={component.name
        ? `Component ${component.name}`
        : 'New Component'}
    >
      <TextInput
        value={component.name}
        onChange={e => setComponent({ ...component, name: e.target.value })}
        id='inhabitantsNotTranslocatedName'
        name='inhabitantsNotTranslocatedName'
        placeholder='Name...'
      >
        Component name:
      </TextInput>

      <TextInput
        value={component.material}
        onChange={e => setComponent({ ...component, material: e.target.value })}
        id='inhabitantsNotTranslocatedMaterial'
        name='inhabitantsNotTranslocatedMaterial'
        placeholder='Material...'
      >
        Material:
      </TextInput>

      <TextInput
        value={component.manufacturing_technique}
        onChange={e => setComponent({ ...component, manufacturing_technique: e.target.value })}
        id='inhabitantsNotTranslocatedManufacturingTechnique'
        name='inhabitantsNotTranslocatedManufacturingTechnique'
        placeholder='Manufacturing technique...'
      >
        Manufacturing technique:
      </TextInput>

      <TextInput
        value={component.dimensions}
        onChange={e => setComponent({ ...component, dimensions: e.target.value })}
        id='inhabitantsNotTranslocatedDimensions'
        name='inhabitantsNotTranslocatedDimensions'
        placeholder='Dimensions...'
      >
        Dimensions (H,W,D):
      </TextInput>

      <FileInput
        file={component.image}
        onChange={e => setComponent({ ...component, image: e.target.files[0] })}
        onClear={() => setComponent({ ...component, image: '' })}
        id='inhabitantsNotTranslocatedImage'
        name='inhabitantsNotTranslocatedImage'
        accept='image/png, image/jpeg'
      >
        Image:
      </FileInput>

      <PrimaryButton onClick={handleRemove} className='flex items-center gap-2 justify-center' remove>
        Remove Component
        <ITrash className='mt-1' />
      </PrimaryButton>
    </Collapse.Item>
  )
}
