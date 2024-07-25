// Laravel::Auth
// export default function Checkbox ({ className = '', ...props }) {
//   return (
//     <input
//       {...props}
//       type='checkbox'
//       className={
//                 'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' +
//                 className
//             }
//     />
//   )
// }

import { Switch } from '@headlessui/react'

export function CheckboxInput({ id, name, value, onChange, className = '', children, ...props }) {
  return (
    <label
      htmlFor={id}
      className={'flex items-center gap-2 border-border dark:border-border-dark ' +
        className}
    >
      <input value={value} onChange={onChange} id={id} name={name} type='checkbox' className='hidden' {...props} />
      {children}
      <Switch
        checked={value}
        onClick={onChange}
        className={`min-w-11 max-w-11 ${value ? 'bg-main-color dark:bg-main-color-dark' : 'bg-gray-200 dark:bg-accent-color-dark '
          } relative inline-flex h-6 w-11 items-center rounded-full ms-auto`}
      >
        <span className='sr-only'>{children}</span>
        <span
          className={`${value ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </label>
  )
}

export function CheckboxGroup({ title, children }) {
  return (
    <>
      <span>{title}</span>
      <div className='flex flex-col divide-y border border-border dark:border-border-dark rounded py-2 px-3'>
        {children}
      </div>
    </>
  )
}
