import { useContext, useEffect, useState } from 'react'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { Form } from '@/Components/form/Form.jsx'
import { TextAreaInput } from '@/Components/form/inputs/TextAreaInput.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { Collapse } from '@/Components/Collapse.jsx'
import { ITrash, IYoutube } from '@/icons.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { CheckboxInput } from '@/Components/form/inputs/Checkbox.jsx'
import { workingAreaOptionsProductionProcess } from '@/constants.jsx'

export function ProductionProcess () {
  const { craftsObj, setCraftsObj, processPhaseObjNull } = useContext(CraftsContext)

  const handleAdd = e => {
    e.preventDefault()
    setCraftsObj(() => {
      craftsObj.productionProcess.craft.phases.push(processPhaseObjNull)
      return { ...craftsObj }
    })
  }

  return (
    <>
      <Form.Fieldset legend='Production process'>
        <Form.Group>
          <TextAreaInput
            value={craftsObj.productionProcess.craft.raw_material_description}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.raw_material_description = e.target.value
              return { ...craftsObj }
            })}
          >
            Describe the raw material and all the steps of processing until the moment of use with this craft:
          </TextAreaInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={craftsObj.productionProcess.craft.reparation_description}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.reparation_description = e.target.value
              return { ...craftsObj }
            })}
          >
            If this is a reparation of a product and not something made from scratch, explain the state it was in, why and what you will change, and why:
          </TextAreaInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={craftsObj.productionProcess.craft.process_layout}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.process_layout = e.target.value
              return { ...craftsObj }
            })}
          >
            Lay out of the process of making:
          </TextAreaInput>
        </Form.Group>

        <Form.Group>
          <SelectInput.Text
            value={craftsObj.productionProcess.craft.process_working_area}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.process_working_area = e
              return { ...craftsObj }
            })}
            options={workingAreaOptionsProductionProcess}
          >
            Working area:
          </SelectInput.Text>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup>
            <CheckboxInput
              value={craftsObj.productionProcess.craft.is_decoration}
              onChange={() => setCraftsObj(() => {
                craftsObj.productionProcess.craft.is_decoration = !craftsObj.productionProcess.craft.is_decoration
                return { ...craftsObj }
              })}
            >
              Is this a decoration:
            </CheckboxInput>
            {craftsObj.productionProcess.craft.is_decoration &&
              <TextInput
                value={craftsObj.productionProcess.craft.decoration_techniques}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.decoration_techniques = e.target.value
                  return { ...craftsObj }
                })}
                placeholder='Up to 5 keywords'
              >
                Techniques:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_decoration &&
              <TextInput
                value={craftsObj.productionProcess.craft.decoration_motifs}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.decoration_motifs = e.target.value
                  return { ...craftsObj }
                })}
                placeholder='Up to 5 keywords'
              >
                Motifs:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_decoration &&
              <TextInput
                value={craftsObj.productionProcess.craft.e42_video_url_decoration}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.e42_video_url_decoration = e.target.value
                  return { ...craftsObj }
                })}
                icon={<IYoutube />}
              >
                Video URL:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_decoration &&
              <FileInput
                file={craftsObj.productionProcess.craft.e42_image_url_decoration}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.e42_image_url_decoration = e.target.files[0]
                  return { ...craftsObj }
                })}
                onClear={() => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.e42_image_url_decoration = null
                  return { ...craftsObj }
                })}
                accept='image/*'
              >
                Upload image:
              </FileInput>}
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup>
            <CheckboxInput
              value={craftsObj.productionProcess.craft.is_diverged}
              onChange={() => setCraftsObj(() => {
                craftsObj.productionProcess.craft.is_diverged = !craftsObj.productionProcess.craft.is_diverged
                return { ...craftsObj }
              })}
            >
              Did the crafter diverge from historical/archaeological accuracy to adapt the process:
            </CheckboxInput>
            {craftsObj.productionProcess.craft.is_diverged &&
              <TextInput
                value={craftsObj.productionProcess.craft.diverged_changes}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.diverged_changes = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe the changes made:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_diverged &&
              <TextInput
                value={craftsObj.productionProcess.craft.diverged_reasons}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.diverged_reasons = e.target.value
                  return { ...craftsObj }
                })}
                placeholder='Adjust to modern use, requirements, demands, conditions, laws'
              >
                Describe the crafter's reasons for the changes:
              </TextInput>}
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup>
            <CheckboxInput
              value={craftsObj.productionProcess.craft.is_evolved}
              onChange={() => setCraftsObj(() => {
                craftsObj.productionProcess.craft.is_evolved = !craftsObj.productionProcess.craft.is_evolved
                return { ...craftsObj }
              })}
            >
              Has the crafter developed new techniques or improved the product over time:
            </CheckboxInput>
            {craftsObj.productionProcess.craft.is_evolved &&
              <TextInput
                value={craftsObj.productionProcess.craft.evolved_process}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.evolved_process = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe improvements to the craft process:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_evolved &&
              <TextInput
                value={craftsObj.productionProcess.craft.evolved_product}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.evolved_product = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe improvements to the final product:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_evolved &&
              <TextInput
                value={craftsObj.productionProcess.craft.evolved_reasons}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.evolved_reasons = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe the reasons for these improvements:
              </TextInput>}
          </Form.InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.InputGroup>
            <CheckboxInput
              value={craftsObj.productionProcess.craft.is_gaps}
              onChange={() => setCraftsObj(() => {
                craftsObj.productionProcess.craft.is_gaps = !craftsObj.productionProcess.craft.is_gaps
                return { ...craftsObj }
              })}
            >
              Has the crafter identified any research gaps in their process or methodology:
            </CheckboxInput>
            {craftsObj.productionProcess.craft.is_gaps &&
              <TextInput
                value={craftsObj.productionProcess.craft.gaps_basis}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.gaps_basis = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe what the crafter would like to learn about the archaeological/historical basis for the craft:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_gaps &&
              <TextInput
                value={craftsObj.productionProcess.craft.gaps_process}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.gaps_process = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe what the crafter would like to learn about the practical craft process:
              </TextInput>}
            {craftsObj.productionProcess.craft.is_gaps &&
              <TextInput
                value={craftsObj.productionProcess.craft.gaps_reasons}
                onChange={e => setCraftsObj(() => {
                  craftsObj.productionProcess.craft.gaps_reasons = e.target.value
                  return { ...craftsObj }
                })}
              >
                Describe the motivation:
              </TextInput>}
          </Form.InputGroup>
        </Form.Group>
      </Form.Fieldset>

      <Form.Fieldset legend='Workshop best practices' className='!text-xl sm:!text-2xl'>
        <Form.Group>
          <TextAreaInput
            value={craftsObj.productionProcess.craft.best_practices}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.best_practices = e.target.value
              return { ...craftsObj }
            })}
          >
            Describe the craftsperson's approach to a tidy workshop, hygiene and other best practices:
          </TextAreaInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={craftsObj.productionProcess.craft.best_practices_disposal_of_waste}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.best_practices_disposal_of_waste = e.target.value
              return { ...craftsObj }
            })}
          >
            Describe the craftsperson's approach workshop clean-up and disposal of waste products:
          </TextAreaInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={craftsObj.productionProcess.craft.best_practices_use_after_disposal}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.best_practices_use_after_disposal = e.target.value
              return { ...craftsObj }
            })}
          >
            Describe any by-products of the craft process that have a further use after disposal:
          </TextAreaInput>
        </Form.Group>
      </Form.Fieldset>

      <Form.Fieldset legend='Structure of the process' className='!text-xl sm:!text-2xl'>
        <Form.Group>
          <TextInput
            value={craftsObj.productionProcess.craft.working_techniques}
            onChange={e => setCraftsObj(() => {
              craftsObj.productionProcess.craft.working_techniques = e.target.value
              return { ...craftsObj }
            })}
            placeholder='Up to 5 keywords'
          >
            General working techniques:
          </TextInput>
        </Form.Group>

        <Form.GroupXl>
          <Form.InputGroup title={'Phases (' + craftsObj.productionProcess.craft.phases.length + ')'}>
            <div className='flex flex-col gap-2'>
              <Collapse length={craftsObj.productionProcess.craft.phases.length - 1}>
                {craftsObj.productionProcess.craft.phases.map((processPhase, index) => (
                  <Phase key={index} processPhase={processPhase} index={index} />))}
              </Collapse>
              <PrimaryButton onClick={handleAdd}>Add phase</PrimaryButton>
            </div>
          </Form.InputGroup>
        </Form.GroupXl>

      </Form.Fieldset>
    </>
  )
}

const Phase = ({ index, processPhase }) => {
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)
  const [phase, setPhase] = useState(processPhase)

  useEffect(() => {
    setPhase(craftsObj.productionProcess.craft.phases[index])
  }, craftsObj.productionProcess.craft.phases[index])

  useEffect(() => {
    craftsObj.productionProcess.craft.phases[index] = phase
    setCraftsObj({ ...craftsObj })
  }, [phase])

  const handleRemove = e => {
    e.preventDefault()
    if (phase.id) craftsObj.productionProcess.craft.phases_removed.push(phase.id)
    craftsObj.productionProcess.craft.phases.splice(index, 1)
    setCraftsObj({ ...craftsObj })
  }

  return (
    <Collapse.Item index={index} button={'Phase ' + (index + 1)}>
      <Form.Fieldset>
        <Form.Group>
          <TextInput
            value={phase.techniques}
            onChange={e => setPhase(() => {
              phase.techniques = e.target.value
              return { ...phase }
            })}
          >
            Techniques:
          </TextInput>
          <TextInput
            value={phase.time}
            onChange={e => setPhase(() => {
              phase.time = e.target.value
              return { ...phase }
            })}
          >
            Time:
          </TextInput>
        </Form.Group>

        <Form.Group>
          <TextInput
            value={phase.materials}
            onChange={e => setPhase(() => {
              phase.materials = e.target.value
              return { ...phase }
            })}
          >
            Materials:
          </TextInput>
          <TextInput
            value={phase.tools}
            onChange={e => setPhase(() => {
              phase.tools = e.target.value
              return { ...phase }
            })}
          >
            Tools:
          </TextInput>
        </Form.Group>

        <Form.GroupLg>
          <TextInput
            value={phase.e42_video_url}
            onChange={e => setPhase(() => {
              phase.e42_video_url = e.target.value
              return { ...phase }
            })}
            icon={<IYoutube />}
          >
            Video URL:
          </TextInput>

          <FileInput
            file={phase.e42_image_url} onChange={e => setPhase(() => {
              phase.e42_image_url = e.target.files[0]
              return { ...phase }
            })}
            onClear={() => setPhase(() => {
              phase.e42_image_url = null
              return { ...phase }
            })}
            accept='image/*'
          >
            Upload image:
          </FileInput>
        </Form.GroupLg>

      </Form.Fieldset>

      <PrimaryButton onClick={handleRemove} className='flex items-center gap-2 justify-center' remove>
        Remove phase
        <ITrash className='mt-1' />
      </PrimaryButton>
    </Collapse.Item>
  )
}
