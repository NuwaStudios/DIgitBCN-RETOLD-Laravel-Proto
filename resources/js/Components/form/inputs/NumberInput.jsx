export function NumberInput ({ id, name, value, placeholder, onChange, className = '', children, ...props }) {
  const handleChange = e => {
    if (e.target.value < 0) {
      e.target.value = 0
    }
    e.target.value = e.target.value.replace(/[A-Za-z\s]/g, '')
    onChange(e)
  }

  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <input {...props} value={value} onChange={e => handleChange(e)} id={id} name={name} type='text' placeholder={placeholder} className='rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 mt-2' />
    </label>
  )
}
