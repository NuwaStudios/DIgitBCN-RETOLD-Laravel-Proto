export function TextAreaInput ({ id, name, value, placeholder, onChange, className = '', children, ...props }) {
  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <textarea {...props} placeholder={placeholder} value={value} onChange={onChange} id={id} name={name} className='rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 mt-2' />
    </label>
  )
}
