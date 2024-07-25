import { useState } from 'react'
import { ISpinner } from '@/icons.jsx'

export function Image ({ className = '', src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (src) {
    return (
      <>
        {!isLoaded && (
          <span className={` ${className} bg-gray-200 dark:bg-gray-950/50 dark:bg-gradient-to-bl from-gray-900/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded shadow-gray-500/20 dark:shadow-none animate-pulse flex items-center justify-center`}>
            <ISpinner />
          </span>
        )}
        <img
          {...props}
          src={src}
          alt={alt}
          className={`${className} ${isLoaded ? 'block' : 'hidden'}`}
          onLoad={() => setIsLoaded(true)}
          loading='lazy'
        />
      </>
    )
  } else {
    return (
      <span
        className={` ${className} bg-gray-200 dark:bg-gray-950/50 dark:bg-gradient-to-bl from-gray-900/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded shadow-gray-500/20 dark:shadow-none flex items-center justify-center`}
      />
    )
  }
}
