import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { router } from '@inertiajs/react'
import { ISpinner, IPublish, ITrash, ISave } from '@/icons.jsx'
import { useEffect, useState } from 'react'

export function BottomNavigation ({ publish, save, entity = '', object, setObject, objectNull, processing, progress, history = true }) {
  const [processingPublish, setProcessingPublish] = useState(false)
  const [processingSave, setProcessingSave] = useState(false)

  /**
   * Set processing state to true and call publish function
   */
  const doPublish = () => {
    setProcessingPublish(true)
    publish()
  }

  /**
   * Set processing state to true and call save function
   */
  const doSave = () => {
    setProcessingSave(true)
    save()
  }

  /**
   * Set processing state to false when processing is done
   */
  useEffect(() => {
    if (!processing) {
      setProcessingPublish(processing)
      setProcessingSave(processing)
    }
  }, [processing])

  /**
   * Load previous form object from local storage if it exists
   */
  useEffect(() => {
    if (history) {
      const data = window.localStorage.getItem(entity)
      if (data) setObject(JSON.parse(data))
    }
  }, [])

  /**
   * Save form object to local storage on change
   */
  useEffect(() => {
    if (history) window.localStorage.setItem(entity, JSON.stringify(object))
  }, [object])

  /**
   * Clear form and local storage form object
   */
  const clear = () => {
    if (history) window.localStorage.removeItem(entity)
    setObject(objectNull)
  }

  /**
   * Clear form and local storage form object and navigate to entity index page
   */
  const cancel = () => {
    clear()
    router.visit(`/${entity}`)
  }

  return (
    <div className='flex gap-2 bg-background-color-muted dark:bg-background-color-dark-muted p-2 rounded'>
      <PrimaryButton onClick={cancel} remove disabled={processingPublish || processingSave}>
        Cancel
      </PrimaryButton>

      <PrimaryButton onClick={clear} className='ms-auto flex gap-2 items-center' remove disabled={processingPublish || processingSave}>
        <ITrash />
        Clear
      </PrimaryButton>

      {
        save && (
          <PrimaryButton onClick={doSave} className='flex gap-2 items-center' disabled={processingPublish || processingSave}>
            {
          processingSave
            ? (
              <>
                <ISpinner />
                Saving...
              </>
              )
            : (
              <>
                <ISave />
                Save
              </>
              )
        }
          </PrimaryButton>
        )
      }

      {
        publish && (
          <PrimaryButton onClick={doPublish} className='flex gap-2 items-center' disabled={processingPublish || processingSave}>
            {
          processingPublish
            ? (
              <>
                <ISpinner />
                Processing...
              </>
              )
            : (
              <>
                <IPublish />
                Publish
              </>
              )
        }
          </PrimaryButton>
        )
      }
    </div>
  )
}
