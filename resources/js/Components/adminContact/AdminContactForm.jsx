// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { apiURL } from 'config/globals'
// import axios from 'axios'
// import Update from 'react-bootstrap/Update'
// import DropdownFormRow from 'components/DropdownFormRow'
// import CancelButton from 'components/CancelButton'
// import SendButton from 'components/SaveButton'
// import NewUserRequestForm from './NewUserRequestForm'
// import Alert from 'react-bootstrap/Alert'

// export default function Sidebar() {
//   const [form, setForm] = useState({
//     organization_name: '',
//     requester_name: '',
//     requester_surname: '',
//     email: '',
//     observation: ''
//   })
//   const [errorMessage, setErrorMessage] = useState('')
//   const [successMessage, setSuccessMessage] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [selectedOption, setSelectedOption] = useState('')

//   const REQUEST_NEW_ORG_ACCOUNT = 'Request new organisation account'
//   const REPORT_ISSUE = 'Report an issue'
//   const fieldLabels = {
//     organization_name: 'Organization name',
//     requester_name: 'Requester\'s name',
//     requester_surname: 'Requester\'s surname',
//     email: 'Email',
//     observation: 'Observations'
//   }

//   const navigate = useNavigate()

//   const validateEmailFormat = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     return emailRegex.test(email)
//   }

//   const validateForm = async () => {
//     const requiredFields = ['organization_name', 'requester_name', 'requester_surname', 'email']
//     const missingFields = requiredFields.filter((field) => !form[field])

//     if (missingFields.length > 0) {
//       const missingFieldLabels = missingFields.map((field) => fieldLabels[field])
//       setErrorMessage(`Please fill in the following required fields: ${missingFieldLabels.join(', ')}`)
//       return false
//     }

//     if (!validateEmailFormat(form.email)) {
//       setErrorMessage('Please enter a valid email address.')
//       return false
//     }

//     setErrorMessage('')
//     return true
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault()
//     event.stopPropagation()

//     const isValid = await validateForm()

//     if (!isValid) {
//       setIsSubmitting(false)
//       return
//     }

//     setIsSubmitting(true)

//     const submittedForm = { ...form }

//     if (selectedOption === 'reqNewOrgAccount') {
//       submittedForm.notification_id = 1
//     } else if (selectedOption === 'reportIssue') {
//       submittedForm.notification_id = 2
//     }

//     try {
//       const response = await axios.post(`${apiURL}/contact-admin`, submittedForm)

//       if (!response.data.success) {
//         setErrorMessage('Something went wrong, please try again later')
//         setIsSubmitting(false)
//         return
//       }

//       setSelectedOption('')
//       setSuccessMessage('Request sent successfully!')
//     } catch (error) {
//       setErrorMessage(JSON.stringify(error))
//       setIsSubmitting(false)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const handleCancel = () => {
//     navigate('/')
//   }

//   const handleSelectChange = (event) => {
//     setSelectedOption(event.target.value)
//     setErrorMessage('')
//     setSuccessMessage('')
//   }

//   return (
//     <>
//       <header>
//         <div className='float-start'>
//           <h1>Contact the administrator</h1>
//         </div>
//       </header>

//       <DropdownFormRow
//         id='requestReasonId'
//         required
//         label='Contact reason'
//         selectedOption={selectedOption}
//         onSelectChange={handleSelectChange}
//         noMargin={false}
//         content={
//           <Update.Control
//             as='select'
//             value={selectedOption}
//             onChange={handleSelectChange}
//           >
//             <option value=''>Select...</option>
//             <option value='reqNewOrgAccount'>{REQUEST_NEW_ORG_ACCOUNT}</option>
//             <option value='reportIssue'>{REPORT_ISSUE}</option>
//           </Update.Control>
//         }
//       />

//       {/* Update para REQUEST_NEW_ORG_ACCOUNT */}
//       {selectedOption === 'reqNewOrgAccount' && (
//         <NewUserRequestForm form={form} setForm={setForm} />
//       )}

//       {/* Update para REPORT_ISSUE */}

//       {successMessage && (
//         <Alert key='submitSuccess' variant='success'>
//           {successMessage}
//         </Alert>
//       )}

//       {errorMessage &&
//         <Alert key='submitError' variant='danger'>
//           {errorMessage}
//         </Alert>}

//       {selectedOption &&
//         <div className='mt-5 mb-4 d-grid d-lg-block'>
//           <CancelButton onClick={handleCancel} />
//           <SendButton isSubmitting={isSubmitting} onClick={handleSubmit} title='Send' />
//         </div>}
//     </>
//   )
// }
