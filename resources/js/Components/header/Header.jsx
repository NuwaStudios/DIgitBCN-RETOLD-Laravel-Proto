import React from 'react'

export default function Header ({ title, breadcrumb }) {
  return (
    <div className='mb-4 ml-2'>
      <h2 className='font-bold text-2xl'>
        {title}
      </h2>
      <div className='text-sm'>
        {breadcrumb?.map((item, index) => (
          <span key={index}>
            {index > 0 && <span> / </span>}
            <span className='text-main-color-dark dark:text-main-color-dark'>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
