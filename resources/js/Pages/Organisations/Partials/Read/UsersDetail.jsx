import { useState, useContext, useEffect, Fragment } from 'react'
import { OrganisationsContext } from '@/Context/OrganisationsContext.jsx'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'
import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { Combobox, Transition } from '@headlessui/react'
import { IArrowUpDown, ISpinner, ITrash } from '@/icons.jsx'
import PrimaryButton from '@/Components/PrimaryButton.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function UsersDetail () {
  const { organisationObj, setOrganisationObj, usersList, put, processing, errors } = useContext(OrganisationsContext)
  const [userDetail, setUserDetail] = useState(null)
  const [edited, setEdited] = useState(false)

  const [listedUsers, setListedUsers] = useState(usersList || [])
  const [selectedUsers, setSelectedUsers] = useState(organisationObj.organisation.users || [])

  useEffect(() => {
    setListedUsers(usersList.filter(user => !selectedUsers.some(selectedUser => selectedUser.id === user.id)))
  }, [usersList])

  const handleAddUser = (userToAdd) => {
    if (userToAdd) {
      setSelectedUsers([...selectedUsers, userToAdd])
      setListedUsers(listedUsers.filter(crafter => crafter.id !== userToAdd.id))
      setEdited(true)
    }
  }

  const handleRemoveUser = (userToRemove) => {
    if (userToRemove) {
      setSelectedUsers(selectedUsers.filter(user => user.id !== userToRemove.id))
      setListedUsers([...listedUsers, userToRemove])
      setEdited(true)
    }
  }

  const success = () => {
    toast.success('Organisation saved successfully', {
      className: '!bg-accent-color dark:!bg-accent-color-dark'
    })
    setEdited(false)
  }
  const error = () => toast.error('Organisation could not be saved: ' + errors, {
    className: '!bg-accent-color dark:!bg-accent-color-dark'
  })

  const updateChanges = () => {
    put(route('organisations.update', organisationObj.organisation.id), {
      onSuccess: () => success(),
      onError: () => error()
    })
  }

  useEffect(() => {
    organisationObj.organisation.users = [...selectedUsers]
    setOrganisationObj(() => ({ ...organisationObj }))
  }, [selectedUsers])

  const handleListItemClick = (index) => {
    setUserDetail(organisationObj.organisation.users[index])
  }

  const handleBackButtonClick = () => {
    setUserDetail(null)
  }

  return (
    <>
      <ToastContainer />
      <div className='transition duration-600 ease-in-out h-full'>
        {userDetail
          ? (
            <div className='flex flex-col gap-4 text-sm'>
              <button
                onClick={handleBackButtonClick}
                className='bg-main-color-dark text-gray-100 px-4 py-2 rounded-sm text-sm mt-auto hover:bg-main-color w-fit'
              >
                Back
              </button>

              <div className='bg-gray-100 dark:bg-accent-color-dark rounded w-full lg:w-2/3 p-4'>
                <SummaryInfo
                  title='Name'
                  value={userDetail.name}
                />

                <SummaryInfo
                  title='Email'
                  value={userDetail.email}
                />

                <SummaryInfo
                  title='Role'
                  value={userDetail.role}
                />

              </div>

            </div>
            )
          : (
            <div className='flex flex-col gap-2'>
              <SelectUser
                value={null}
                onChange={handleAddUser}
                options={listedUsers}
                placeholder='Select a user to add'
              />
              <ListContainer>
                {organisationObj.organisation.users?.length > 0
                  ? (
                      organisationObj.organisation.users.map((user, index) => (
                        <ListItem
                          header={user.name}
                          key={index}
                          onClick={() => handleListItemClick(index)}
                        >
                          <PrimaryButton
                            onClick={e => {
                              e.preventDefault()
                              handleRemoveUser(user)
                            }}
                            remove
                          >
                            <ITrash />
                          </PrimaryButton>
                        </ListItem>
                      ))
                    )
                  : (
                    <p className='p-4 font-sm text-gray-500'>No users have been associated with this organisation yet.</p>
                    )}
              </ListContainer>
              <PrimaryButton
                className='ms-auto max-w-min flex gap-2 items-center'
                onClick={updateChanges}
                disabled={processing || !edited}
              >
                {processing && <ISpinner />}
                Save
              </PrimaryButton>
            </div>
            )}
      </div>
    </>
  )
}

function SummaryInfo ({ title, value }) {
  return (
    <div className='flex flex-col mb-2'>
      <span className='text-text-muted mr-4'>
        {title} &nbsp;
      </span>
      <span className='font-semibold'>
        {value}
      </span>
    </div>
  )
}

export function SelectUser ({ id, value, onChange, placeholder, className = '', options, children }) {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter(option => (`${option.name}`).toLowerCase().includes(query.toLowerCase()))

  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <div className='relative'>
        <Combobox value={options?.find(option => option.id === value)} onChange={onChange} nullable>
          <div className='flex'>
            <Combobox.Input
              id={id}
              placeholder={placeholder || ((options && options[0].name) ? options[0].name : '')}
              className='w-full rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 pe-8 mt-2 '
              displayValue={option => option?.name}
              onChange={e => setQuery(e.target.value)}
            />
            <Combobox.Button className='absolute inset-y-0 right-0 top-2 flex items-center pr-2'>
              <IArrowUpDown />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Combobox.Options className='absolute max-h-40 w-full overflow-y-scroll z-10 rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none mt-2'>
              {filteredOptions?.map((option, index) => (
                <Combobox.Option key={index} value={option} className='lg:hover:bg-accent-color-muted lg:hover:dark:bg-accent-color-dark-muted py-2 px-3'>
                  {`${option.name}`}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </label>
  )
}
