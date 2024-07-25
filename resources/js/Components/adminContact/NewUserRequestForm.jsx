import Form from 'react-bootstrap/Update'
import FormRow from 'components/FormRow'

const NewUserRequestForm = ({ form, setForm }) => {
  const handleChange = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
  }

  return (
    <>
      <FormRow
        key='organization_name'
        label='Organization name'
        required
        content={
          <Form.Control
            name='organization_name'
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
}
      />

      <FormRow
        key='requester_name'
        label='Requester&apos;s name'
        required
        content={
          <Form.Control
            name='requester_name'
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
}
      />

      <FormRow
        key='requester_surname'
        label='Requester&apos;s surname'
        required
        content={
          <Form.Control
            name='requester_surname'
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
}
      />

      <FormRow
        key='email'
        label='Email'
        required
        type='email'
        content={
          <Form.Control
            name='email'
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
}
      />

      <FormRow
        key='observation'
        label='Observations'
        content={
          <Form.Control
            name='observation'
            as='textarea'
            rows={10}
            onChange={e => handleChange(e.target.name, e.target.value)}
          />
}
      />
    </>
  )
}

export default NewUserRequestForm
