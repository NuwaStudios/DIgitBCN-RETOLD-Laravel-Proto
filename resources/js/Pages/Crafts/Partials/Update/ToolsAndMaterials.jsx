import { Collapse } from '@/Components/Collapse.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { Form } from '@/Components/form/Form.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { TextAreaInput } from '@/Components/form/inputs/TextAreaInput.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { installationsObtainedOptions, materialsObtainedOptions, toolsObtainedOptions } from '@/constants.jsx'
import { ITrash } from '@/icons.jsx'
import { useContext, useEffect, useState } from 'react'

export function ToolsAndMaterials () {
  const { craftsObj, setCraftsObj, toolObjNull, materialObjNull, installationObjNull } = useContext(CraftsContext)

  const handleAddTool = e => {
    e.preventDefault()
    craftsObj.toolsAndMaterials.tools.push(toolObjNull)
    setCraftsObj({ ...craftsObj })
  }

  const handleInstallationTool = e => {
    e.preventDefault()
    craftsObj.toolsAndMaterials.installations.push(installationObjNull)
    setCraftsObj({ ...craftsObj })
  }

  const handleAddMaterial = e => {
    e.preventDefault()
    craftsObj.toolsAndMaterials.materials.push(materialObjNull)
    setCraftsObj({ ...craftsObj })
  }

  return (
    <Form.Fieldset legend='Tools and Materials'>
      <Form.Group>
        <SelectInput.Text
          value={craftsObj.toolsAndMaterials.tools_obtained}
          onChange={e => setCraftsObj(() => {
            craftsObj.toolsAndMaterials.tools_obtained = e
            return { ...craftsObj }
          })} options={toolsObtainedOptions}
        >
          How were the tools obtained:
        </SelectInput.Text>
      </Form.Group>

      <Form.Group>
        <SelectInput.Text
          value={craftsObj.toolsAndMaterials.installations_obtained}
          onChange={e => setCraftsObj(() => {
            craftsObj.toolsAndMaterials.installations_obtained = e
            return { ...craftsObj }
          })}
          options={installationsObtainedOptions}
        >
          How were the installations obtained:
        </SelectInput.Text>
      </Form.Group>

      <Form.Group>
        <SelectInput.Text
          value={craftsObj.toolsAndMaterials.materials_obtained}
          onChange={e => setCraftsObj(() => {
            craftsObj.toolsAndMaterials.materials_obtained = e
            return { ...craftsObj }
          })}
          options={materialsObtainedOptions}
        >
          How were the materials obtained:
        </SelectInput.Text>

        {craftsObj.toolsAndMaterials.materials_obtained === materialsObtainedOptions[0] &&
          <TextInput
            value={craftsObj.toolsAndMaterials.materials_obtained_natural}
            onChange={e => setCraftsObj(() => {
              craftsObj.toolsAndMaterials.materials_obtained_natural = e.target.value
              return { ...craftsObj }
            })}
          >
            Describe the collection location and method:
          </TextInput>}

        {craftsObj.toolsAndMaterials.materials_obtained === materialsObtainedOptions[1] &&
          <TextInput
            value={craftsObj.toolsAndMaterials.materials_obtained_bought}
            onChange={e => setCraftsObj(() => {
              craftsObj.toolsAndMaterials.materials_obtained_bought = e.target.value
              return { ...craftsObj }
            })}
          >
            Describe where and how the materials were acquired:
          </TextInput>}
      </Form.Group>

      <Form.GroupXl>
        <Form.Fieldset legend={`The tools (${craftsObj.toolsAndMaterials.tools.length})`} className='!text-xl sm:!text-2xl'>
          <Form.GroupXl>
            <Collapse length={craftsObj.toolsAndMaterials.tools.length - 1}>
              {craftsObj.toolsAndMaterials.tools.map((tool, index) => (
                <Tool key={index} index={index} tool={tool} />))}
            </Collapse>
            <PrimaryButton onClick={handleAddTool} className='mt-2'>Add tool</PrimaryButton>
          </Form.GroupXl>
        </Form.Fieldset>
      </Form.GroupXl>

      <Form.GroupXl>
        <Form.Fieldset legend={`The installations (${craftsObj.toolsAndMaterials.installations.length})`} className='!text-xl sm:!text-2xl'>
          <Form.GroupXl>
            <Collapse length={craftsObj.toolsAndMaterials.installations.length - 1}>
              {craftsObj.toolsAndMaterials.installations.map((installation, index) => (
                <Installation key={index} index={index} installation={installation} />))}
            </Collapse>
            <PrimaryButton onClick={handleInstallationTool} className='mt-2'>Add installation</PrimaryButton>
          </Form.GroupXl>
        </Form.Fieldset>
      </Form.GroupXl>

      <Form.GroupXl>
        <Form.Fieldset legend={`The materials (${craftsObj.toolsAndMaterials.materials.length})`} className='!text-xl sm:!text-2xl'>
          <Form.GroupXl>
            <div className='flex flex-col gap-2'>
              <Collapse length={craftsObj.toolsAndMaterials.materials.length - 1}>
                {craftsObj.toolsAndMaterials.materials.map((material, index) => (
                  <Material key={index} index={index} material={material} />))}
              </Collapse>
              <PrimaryButton onClick={handleAddMaterial}>Add material</PrimaryButton>
            </div>
          </Form.GroupXl>
        </Form.Fieldset>
      </Form.GroupXl>

    </Form.Fieldset>
  )
}

const Tool = ({ index, tool: crafttool }) => {
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)
  const [tool, setTool] = useState(crafttool)

  useEffect(() => {
    setTool(craftsObj.toolsAndMaterials.tools[index])
  }, craftsObj.toolsAndMaterials.tools[index])

  useEffect(() => {
    craftsObj.toolsAndMaterials.tools[index] = tool
    setCraftsObj({ ...craftsObj })
  }, [tool])

  const handleRemove = e => {
    e.preventDefault()
    if (tool.id) craftsObj.toolsAndMaterials.tools_removed.push(tool.id)
    craftsObj.toolsAndMaterials.tools.splice(index, 1)
    setCraftsObj({ ...craftsObj })
  }

  return (
    <Collapse.Item
      index={index}
      button={tool.e35_title_english
        ? `Tool ${tool.e35_title_english}`
        : 'New Tool'}
    >
      <Form.Fieldset>
        <Form.Group>
          <TextInput
            value={tool.e35_title_english}
            onChange={e => setTool(() => {
              tool.e35_title_english = e.target.value
              return { ...tool }
            })}
            placeholder='Axe'
          >
            Name of tool (English):
          </TextInput>
          <TextInput
            value={tool.e35_title_translated}
            onChange={e => setTool(() => {
              tool.e35_title_translated = e.target.value
              return { ...tool }
            })}
            placeholder='Hacha'
          >
            Name of tool (Local):
          </TextInput>
          <FileInput
            file={tool.e42_image_url}
            onChange={e => setTool(() => {
              tool.e42_image_url = e.target.files[0]
              return { ...tool }
            })}
            onClear={() => setTool(() => {
              tool.e42_image_url = null
              return { ...tool }
            })}
            accept='image/*'
          >
            Tool image:
          </FileInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={tool.purpose}
            onChange={e => setTool(() => {
              tool.purpose = e.target.value
              return { ...tool }
            })}
            placeholder='Describe the intended purpose of the tool...'
          >
            Function of the tool:
          </TextAreaInput>
          <TextAreaInput
            value={tool.usage}
            onChange={e => setTool(() => {
              tool.usage = e.target.value
              return { ...tool }
            })}
            placeholder='Describe briefly how to use the tool...'
          >
            How to use the tool:
          </TextAreaInput>
        </Form.Group>
      </Form.Fieldset>

      <PrimaryButton onClick={handleRemove} className='flex items-center gap-2 justify-center' remove>
        Remove tool
        <ITrash className='mt-1' />
      </PrimaryButton>
    </Collapse.Item>
  )
}

const Installation = ({ index, installation: craftinstallation }) => {
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)
  const [installation, setInstallation] = useState(craftinstallation)

  useEffect(() => {
    setInstallation(craftsObj.toolsAndMaterials.installations[index])
  }, craftsObj.toolsAndMaterials.installations[index])

  useEffect(() => {
    craftsObj.toolsAndMaterials.installations[index] = installation
    setCraftsObj({ ...craftsObj })
  }, [installation])

  const handleRemove = e => {
    e.preventDefault()
    if (installation.id) craftsObj.toolsAndMaterials.installations_removed.push(installation.id)
    craftsObj.toolsAndMaterials.installations.splice(index, 1)
    setCraftsObj({ ...craftsObj })
  }

  return (
    <Collapse.Item
      index={index}
      button={installation.e35_title_english
        ? `Installation ${installation.e35_title_english}`
        : 'New Installation'}
    >
      <Form.Fieldset>
        <Form.Group>
          <TextInput
            value={installation.e35_title_english}
            onChange={e => setInstallation(() => {
              installation.e35_title_english = e.target.value
              return { ...installation }
            })}
            placeholder='Workbench'
          >
            Name of installation (English):
          </TextInput>
          <TextInput
            value={installation.e35_title_translated}
            onChange={e => setInstallation(() => {
              installation.e35_title_translated = e.target.value
              return { ...installation }
            })}
            placeholder='Banco de trabajo'
          >
            Name of installation (Local):
          </TextInput>
          <FileInput
            file={installation.e42_image_url}
            onChange={e => setInstallation(() => {
              installation.e42_image_url = e.target.files[0]
              return { ...installation }
            })}
            onClear={() => setInstallation(() => {
              installation.e42_image_url = null
              return { ...installation }
            })}
            accept='image/*'
          >
            Installation image:
          </FileInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={installation.purpose}
            onChange={e => setInstallation(() => {
              installation.purpose = e.target.value
              return { ...installation }
            })}
            placeholder='Describe the intended purpose of the installation...'
          >
            Function of the installation:
          </TextAreaInput>
          <TextAreaInput
            value={installation.usage}
            onChange={e => setInstallation(() => {
              installation.usage = e.target.value
              return { ...installation }
            })}
            placeholder='Describe briefly how to use the installation...'
          >
            How to use the installation:
          </TextAreaInput>
        </Form.Group>
      </Form.Fieldset>

      <PrimaryButton onClick={handleRemove} className='flex items-center gap-2 justify-center' remove>
        Remove installation
        <ITrash className='mt-1' />
      </PrimaryButton>
    </Collapse.Item>
  )
}

const Material = ({ index, material: craftmaterial }) => {
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)
  const [material, setMaterial] = useState(craftmaterial)

  useEffect(() => {
    setMaterial(craftsObj.toolsAndMaterials.materials[index])
  }, craftsObj.toolsAndMaterials.materials[index])

  useEffect(() => {
    craftsObj.toolsAndMaterials.materials[index] = material
    setCraftsObj({ ...craftsObj })
  }, [material])

  const handleRemove = e => {
    e.preventDefault()
    if (material.id) craftsObj.toolsAndMaterials.materials_removed.push(material.id)
    craftsObj.toolsAndMaterials.materials.splice(index, 1)
    setCraftsObj({ ...craftsObj })
  }

  return (
    <Collapse.Item
      index={index}
      button={material.e35_title_english
        ? `Material ${material.e35_title_english}`
        : 'New Material'}
    >
      <Form.Fieldset>
        <Form.Group>
          <TextInput
            value={material.e35_title_english}
            onChange={e => setMaterial(() => {
              material.e35_title_english = e.target.value
              return { ...material }
            })}
            placeholder='Wood'
          >
            Name of material (English):
          </TextInput>
          <TextInput
            value={material.e35_title_translated}
            onChange={e => setMaterial(() => {
              material.e35_title_translated = e.target.value
              return { ...material }
            })}
            placeholder='Madera'
          >
            Name of material (Local):
          </TextInput>
          <FileInput
            file={material.e42_image_url}
            onChange={e => setMaterial(() => {
              material.e42_image_url = e.target.files[0]
              return { ...material }
            })}
            onClear={() => setMaterial(() => {
              material.e42_image_url = null
              return { ...material }
            })}
            accept='image/*'
          >
            Material image:
          </FileInput>
        </Form.Group>

        <Form.Group>
          <TextAreaInput
            value={material.description}
            onChange={e => setMaterial(() => {
              material.description = e.target.value
              return { ...material }
            })}
            placeholder='Describe briefly how to use the material...'
          >
            How to use the material:
          </TextAreaInput>
        </Form.Group>
      </Form.Fieldset>

      <PrimaryButton onClick={handleRemove} className='flex items-center gap-2 justify-center' remove>
        Remove material
        <ITrash className='mt-1' />
      </PrimaryButton>
    </Collapse.Item>
  )
}
