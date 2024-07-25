import { useContext } from 'react'
import { TextInput } from '@/Components/form/inputs/TextInput.jsx'
import { NumberInput } from '@/Components/form/inputs/NumberInput.jsx'
import { SelectInput } from '@/Components/form/inputs/SelectInput.jsx'
import { FileInput } from '@/Components/form/inputs/FileInput.jsx'
import { TextAreaInput } from '@/Components/form/inputs/TextAreaInput.jsx'
import { CraftsContext } from '@/Context/CraftsContext.jsx'
import { IYoutube } from '@/icons.jsx'
import { countries, craftCategories, craftTypes, languages } from '@/constants.jsx'
import { Form } from '@/Components/form/Form.jsx'

export function Summary () {
  const { craftsObj, setCraftsObj } = useContext(CraftsContext)

  return (
    <Form.Fieldset legend='Summary'>

      <Form.Group>
        <TextInput
          value={craftsObj.summary.document.e35_title_english}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.document.e35_title_english = e.target.value
            return { ...craftsObj }
          })}
          placeholder='English name'
        >
          Name of craft (English):
        </TextInput>
        <TextInput
          value={craftsObj.summary.document.e35_title_translated}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.document.e35_title_translated = e.target.value
            return { ...craftsObj }
          })}
          placeholder='Local name'
        >
          Name of craft (local language):
        </TextInput>
        <SelectInput
          value={craftsObj.summary.document.e56_language}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.document.e56_language = e
            return { ...craftsObj }
          })}
          options={languages}
        >
          Local language:
        </SelectInput>
      </Form.Group>

      <Form.Group>
        <TextAreaInput
          value={craftsObj.summary.craft.e62_short_description}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e62_short_description = e.target.value
            return { ...craftsObj }
          })}
          placeholder='Write a short and simple description of the craft...'
        >
          Short description of the craft:
        </TextAreaInput>
        <SelectInput.Text
          value={craftsObj.summary.craft.e55_craft_type_nature}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e55_craft_type_nature = e
            return { ...craftsObj }
          })}
          options={craftTypes}
        >
          Type of craft:
        </SelectInput.Text>
        <SelectInput.Text
          value={craftsObj.summary.craft.e55_craft_type_category}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e55_craft_type_category = e
            return { ...craftsObj }
          })}
          options={craftCategories}
        >
          Craft category:
        </SelectInput.Text>
      </Form.Group>

      <Form.Group>
        <TextInput
          value={craftsObj.summary.craft.e53_historical}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e53_historical = e.target.value
            return { ...craftsObj }
          })}
          placeholder='Pangea'
        >
          What is the historical geography of the craft:
        </TextInput>

        <SelectInput
          value={craftsObj.summary.craft.e53_contemporary}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e53_contemporary = e
            return { ...craftsObj }
          })}
          options={countries}
        >
          Modern geography of the craft:
        </SelectInput>
      </Form.Group>

      <Form.Group>
        <Form.InputGroup title='What is the historical/archaeological time period of the craft'>
          <NumberInput
            value={craftsObj.summary.craft.timespan.e61_timePrimitive_start}
            onChange={e => setCraftsObj(() => {
              craftsObj.summary.craft.timespan.e61_timePrimitive_start = e.target.value
              return { ...craftsObj }
            })}
            placeholder='YYYY'
          >
            Start:
          </NumberInput>
          <NumberInput
            value={craftsObj.summary.craft.timespan.e61_timePrimitive_end}
            onChange={e => setCraftsObj(() => {
              craftsObj.summary.craft.timespan.e61_timePrimitive_end = e.target.value
              return { ...craftsObj }
            })}
            placeholder='YYYY'
          >
            End:
          </NumberInput>
        </Form.InputGroup>
      </Form.Group>

      <Form.Group>
        <FileInput
          file={craftsObj.summary.craft.e42_image_url}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e42_image_url = e.target.files[0]
            return { ...craftsObj }
          })}
          onClear={() => setCraftsObj(() => {
            craftsObj.summary.craft.e42_image_url = null
            return { ...craftsObj }
          })}
          accept='image/*'
        >
          Cover image:
        </FileInput>
      </Form.Group>

      <Form.GroupLg>
        <TextInput
          value={craftsObj.summary.craft.e42_video_url}
          onChange={e => setCraftsObj(() => {
            craftsObj.summary.craft.e42_video_url = e.target.value
            return { ...craftsObj }
          })}
          icon={<IYoutube />}
        >
          Video documentation:
        </TextInput>
      </Form.GroupLg>
    </Form.Fieldset>
  )
}
