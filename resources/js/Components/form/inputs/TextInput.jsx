// Laravel::Auth
// import { forwardRef, useEffect, useRef } from 'react'

// export default forwardRef(function TextInput ({ type = 'text', className = '',  = false, ...props }, ref) {
//   const input = ref || useRef()

//   useEffect(() => {
//     if () {
//       input.current.focus()
//     }
//   }, [])

//   return (
//     <input
//       {...props}
//       type={type}
//       className={
//                 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm ' +
//                 className
//             }
//       ref={input}
//     />
//   )
// })

export function TextInput({ id, name, value, placeholder, onChange, className = '', icon, children, ...props }) {
  return (
    <label htmlFor={id} className={'relative flex flex-col ' + className}>
      {children}
      {icon && (
        <span className='absolute inset-0 top-8 left-3-5 flex items-center'>
          {icon}
        </span>
      )}
      <input value={value} onChange={onChange} id={id} name={name} type='text' placeholder={placeholder} className={'rounded border border-accent-color-muted dark:border-accent-color-dark-muted bg-background-color-muted dark:bg-accent-color-dark outline-none py-2 px-3 mt-2 ' + (icon ? 'ps-10' : '')} {...props} />
    </label>
  )
}
