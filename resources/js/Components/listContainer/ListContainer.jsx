export function ListContainer ({ children }) {
  return (
    <div className='w-full'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2'>
        {children}
        {/* <ListItem header='Test header 1' body='Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nisi modi officia sed, aperiam molestiae repellat odit illo sint? Ipsam sint porro laudantium blanditiis architecto reprehenderit, eveniet ratione labore, illo cum eligendi! Veritatis ex reprehenderit eligendi praesentium dolor numquam optio dolore omnis, consectetur quis eum pariatur harum, eveniet animi nulla.' image='https://picsum.photos/1920/1080?random=1'>
          <button className='bg-slate-50 dark:bg-accent-color-dark lg:hover:bg-accent-color-muted dark:lg:hover:bg-accent-color-dark-muted transition-all ease-in-out duration-100 rounded-full p-2'>
            <svg xmlns='http://www.w3.org/2000/svg' className='w-4' fill='currentColor' viewBox='0 0 16 16'>
              <path d='M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z' />
              <path d='m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z' />
            </svg>
          </button>
        </ListItem> */}
      </div>
    </div>
  )
}
