export function ListContainerVariation({ children }) {
  return (
    <div className='w-full'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 gap-2 p-2'>
        {children}
      </div>
    </div>
  )
}

