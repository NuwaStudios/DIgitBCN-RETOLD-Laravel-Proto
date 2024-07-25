import { useState } from 'react'
import { FaCheck, FaX } from 'react-icons/fa6'
import { toast } from 'react-toastify'

export function PendingCraftsDetail({ currentTab, crafts }) {
  const [selectedCraft, setSelectedCraft] = useState(crafts)

  const success = ({ message, title }) => toast.success(`${title} ${message}`, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })
  const error = (err) => toast.error('Craft could not be processed: ' + err, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })

  const approve = id => {
    fetch(`/api/pending/approve/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then((res, id) => {
      success({ message: 'craft approved successfully', title: selectedCraft.filter(building => building.id !== id)[0].e35_title_english })
      clear(id)
    }).catch(err => {
      error(err)
    })
  }

  const reject = id => {
    fetch(`/api/pending/reject/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }).then(id => {
      success({ message: 'craft rejected successfully', title: selectedCraft.filter(building => building.id !== id)[0].e35_title_english })
      clear(id)
    }).catch(err => {
      error(err)
    })
  }

  const clear = id => {
    const newCrafts = selectedCraft.filter(building => building.id === id)
    setSelectedCraft(newCrafts)
  }

  return (
    <>
      <div className='transition duration-600 ease-in-out h-full' hidden={currentTab !== 2}>
        <div className='border border-gray-300 dark:border-gray-600 h-full rounded shadow-md bg-accent-color-muted dark:bg-accent-color-dark p-4 overflow-y-auto'>
          {
            selectedCraft.length === 0 ?
              <p className='font-sm text-gray-500'>You have 0 pending crafts to be approved</p> :
              selectedCraft.map((craft) => (
                <div
                  className='bg-white p-2 rounded mb-2 hover:bg-gray-100 dark:bg-background-color-dark-muted dark:hover:bg-background-color-dark flex justify-between xl:w-3/4'
                  key={craft.id}
                >
                  <p>{craft.e35_title_english}</p>
                  <div className='flex gap-4'>
                    <button onClick={() => approve(craft.id)}><FaCheck className='hover:text-green-600' /></button>
                    <button onClick={() => reject(craft.id)}><FaX className='hover:text-red-600' /></button>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </>
  )
}
