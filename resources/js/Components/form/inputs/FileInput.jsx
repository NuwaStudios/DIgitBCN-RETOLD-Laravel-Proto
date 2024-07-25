import PrimaryButton from '../../PrimaryButton'

export function FileInput ({ id, name, file, onChange, onClear, className = '', children, ...props }) {
  return (
    <label htmlFor={id} className={'flex flex-col ' + className}>
      {children}
      <input {...props} onChange={onChange} id={id} name={name} type='file' className='hidden' />
      <div className='flex items-center gap-2 border border-border dark:border-border-dark rounded outline-none py-2 px-3 mt-2'>
        {
          file
            ? (
              <PrimaryButton className='w-max border border-border dark:border-border-dark !px-2 !py-1' type='button' onClick={onClear}>
                Clear
              </PrimaryButton>
              )
            : (
              <PrimaryButton className='w-max border border-border dark:border-border-dark !p-0' type='button'>
                <label htmlFor={id} className='block px-2 py-1'>
                  Browse...
                </label>
              </PrimaryButton>
              )
        }
        {
          file
            ? (<span className='w-full overflow-hidden overflow-ellipsis'>{file.name}</span>)
            : (<span>No file chosen.</span>)
        }
        {
          // (file && file.type.startsWith('image'))
          //   ? <img src={URL.createObjectURL(file)} alt={'Uploaded image ' + file.name} className='h-auto w-full mt-2' />
          //   : null
        }
      </div>
    </label>
  )
}
