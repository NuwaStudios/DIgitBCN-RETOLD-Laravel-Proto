export function DateTimeInput ({ id, name, value, onChange, className = '', children, ...props }) {
  return (
    <label htmlFor={id} className={'relative flex flex-col ' + className}>
      {children}
      <input value={value} onChange={onChange} id={id} name={name} type='datetime-local' className='rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-accent-color dark:bg-accent-color-dark outline-none py-2 px-3 mt-2 ' {...props} />
    </label>
  )
}
