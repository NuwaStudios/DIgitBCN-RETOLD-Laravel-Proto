import { Form } from '@/Components/form/Form.jsx'
import { CheckboxGroup, CheckboxInput } from '@/Components/form/inputs/Checkbox.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { TextAreaInput } from '@/Components/form/inputs/TextAreaInput.jsx'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { distributedOptions, durabilityOptions, reachabilityOptions } from '@/constants.jsx'
import { useContext } from 'react'

export function FinishedProduct () {
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)

  return (
    <Form.Fieldset legend='Finished product'>
      <Form.Group>
        <TextInput
          value={craftsObj.finishedProduct.craft.e35_title_english}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.e35_title_english = e.target.value
            return { ...craftsObj }
          })}
          placeholder='English name here...'
        >
          Product name (English):
        </TextInput>
        <TextInput
          value={craftsObj.finishedProduct.craft.e35_title_translated}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.e35_title_translated = e.target.value
            return { ...craftsObj }
          })} id='e35_title_translated_finished_product' name='e35_title_translated_finished_product' placeholder='Local name here...'
        >
          Product name (Local):
        </TextInput>
      </Form.Group>

      <Form.Group>
        <TextAreaInput
          value={craftsObj.finishedProduct.craft.finished_product_description}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.finished_product_description = e.target.value
            return { ...craftsObj }
          })}
        >
          Product description:
        </TextAreaInput>
        <FileInput
          file={craftsObj.finishedProduct.craft.e42_image_url}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.e42_image_url = e.target.files[0]
            return { ...craftsObj }
          })}
          onClear={() => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.e42_image_url = null
            return { ...craftsObj }
          })}
          accept='image/*'
        >
          Product image:
        </FileInput>
      </Form.Group>

      <Form.Group>
        <CheckboxGroup title="What are the outcome or product's purposes:">
          <CheckboxInput
            className='pb-3 pt-1'
            value={craftsObj.finishedProduct.craft.is_finished_product_practical_use}
            onChange={() => setCraftsObj(() => {
              craftsObj.finishedProduct.craft.is_finished_product_practical_use = !craftsObj.finishedProduct.craft.is_finished_product_practical_use
              return { ...craftsObj }
            })}
          >
            Practical use
          </CheckboxInput>
          {craftsObj.finishedProduct.craft.is_finished_product_practical_use &&
            <TextInput
              className='py-2 !border-t-0'
              value={craftsObj.finishedProduct.craft.finished_product_practical_use_description}
              onChange={e => setCraftsObj(() => {
                craftsObj.finishedProduct.craft.finished_product_practical_use_description = e.target.value
                return { ...craftsObj }
              })}
            >
              Describe how the product is used:
            </TextInput>}

          <CheckboxInput
            className='py-3'
            value={craftsObj.finishedProduct.craft.is_finished_product_decorative_use}
            onChange={() => setCraftsObj(() => {
              craftsObj.finishedProduct.craft.is_finished_product_decorative_use = !craftsObj.finishedProduct.craft.is_finished_product_decorative_use
              return { ...craftsObj }
            })}
          >
            Decorative use
          </CheckboxInput>
          {craftsObj.finishedProduct.craft.is_finished_product_decorative_use &&
            <TextInput
              className='py-2 !border-t-0'
              value={craftsObj.finishedProduct.craft.finished_product_decorative_use_description}
              onChange={e => setCraftsObj(() => {
                craftsObj.finishedProduct.craft.finished_product_decorative_use_description = e.target.value
                return { ...craftsObj }
              })}
            >
              Describe who typically uses the product:
            </TextInput>}

          <CheckboxInput
            className='py-3'
            value={craftsObj.finishedProduct.craft.is_finished_product_experimental_use}
            onChange={() => setCraftsObj(() => {
              craftsObj.finishedProduct.craft.is_finished_product_experimental_use = !craftsObj.finishedProduct.craft.is_finished_product_experimental_use
              return { ...craftsObj }
            })}
          >
            Experimental purposes
          </CheckboxInput>
          {craftsObj.finishedProduct.craft.is_finished_product_experimental_use &&
            <TextInput
              className='py-2 !border-t-0'
              value={craftsObj.finishedProduct.craft.finished_product_experimental_use_description}
              onChange={e => setCraftsObj(() => {
                craftsObj.finishedProduct.craft.finished_product_experimental_use_description = e.target.value
                return { ...craftsObj }
              })}
            >
              In which context is the product typically used:
            </TextInput>}

          <CheckboxInput
            className='pt-3 pb-1'
            value={craftsObj.finishedProduct.craft.is_finished_product_educational_use}
            onChange={() => setCraftsObj(() => {
              craftsObj.finishedProduct.craft.is_finished_product_educational_use = !craftsObj.finishedProduct.craft.is_finished_product_educational_use
              return { ...craftsObj }
            })}
          >
            Educational purposes
          </CheckboxInput>
          {craftsObj.finishedProduct.craft.is_finished_product_educational_use &&
            <TextInput
              className='py-2 !border-t-0'
              value={craftsObj.finishedProduct.craft.finished_product_educational_use_description}
              onChange={e => setCraftsObj(() => {
                craftsObj.finishedProduct.craft.finished_product_educational_use_description = e.target.value
                return { ...craftsObj }
              })}
              placeholder='Name of research project'
            >
              Add additional context:
            </TextInput>}
        </CheckboxGroup>
      </Form.Group>

      <Form.Group>
        <SelectInput.Text
          value={craftsObj.finishedProduct.craft.finished_product_durability}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.finished_product_durability = e
            return { ...craftsObj }
          })}
          options={durabilityOptions}
        >
          Durability:
        </SelectInput.Text>
        <SelectInput.Text
          value={craftsObj.finishedProduct.craft.finished_product_distributed}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.finished_product_distributed = e
            return { ...craftsObj }
          })}
          options={distributedOptions}
        >
          Distributed:
        </SelectInput.Text>
        <SelectInput.Text
          value={craftsObj.finishedProduct.craft.finished_product_reachability}
          onChange={e => setCraftsObj(() => {
            craftsObj.finishedProduct.craft.finished_product_reachability = e
            return { ...craftsObj }
          })}
          options={reachabilityOptions}
        >
          Reachability:
        </SelectInput.Text>
      </Form.Group>

    </Form.Fieldset>
  )
}
