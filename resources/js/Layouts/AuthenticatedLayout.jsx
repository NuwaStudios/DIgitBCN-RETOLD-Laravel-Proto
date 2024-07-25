import { Sidebar } from '@/Components/sidebar/Sidebar'
import { AuthContext } from '@/Context/AuthContext'
import { Head } from '@inertiajs/react'
import { useContext, useEffect } from 'react'
import { IMuseums, ICrafts, IBuildings } from '@/icons'
import Footer from '@/Components/footer/Footer'
import { BsFileEarmarkPerson, BsHeadset, BsHouseFill, BsPeopleFill } from 'react-icons/bs'
import { FaCheck } from 'react-icons/fa6'

export default function AuthenticatedLayout ({ authUser, title, children }) {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    if (authUser) setUser(authUser)
  }, [])

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='h-screen max-h-screen flex flex-col sm:grid sm:grid-rows-1 sm:grid-cols-mainGridSm md:grid-cols-mainGridMd lg:grid-cols-mainGridLg xl:grid-cols-mainGridXl bg-background-color dark:bg-background-color-dark dark:text-accent-color'>
        <header role='banner' className='z-10 fixed w-full row-span-2 flex justify-between sm:flex-col sm:static sm:w-auto border-b sm:border-b-0 sm:border-r border-border dark:border-border-dark bg-background-color-muted dark:bg-background-color-dark-muted'>
          <Sidebar>
            <Sidebar.SidebarListItem label={user ? (user?.role_id === 1 ? 'Platform user' : user.organisation?.e41_appellation_english) : ''} />

            <Sidebar.SidebarListItem href='/dashboard' label='Dashboard' icon={<BsHouseFill />} active={route().current('dashboard')} />
            <>
              <Sidebar.SidebarListHeading>Pages</Sidebar.SidebarListHeading>
              <Sidebar.SidebarListItem label='Buildings' icon={<IBuildings />} expanded={route().current('buildings*')} active={route().current('buildings.show') || route().current('buildings.edit')}>
                <Sidebar.SidebarListItem className='ps-8' href={route('buildings')} label='My Buildings' active={route().current('buildings')} />
                <Sidebar.SidebarListItem className='ps-8' href={route('buildings.create')} label='Add new Building' active={route().current('buildings.create')} />
              </Sidebar.SidebarListItem>

              <Sidebar.SidebarListItem label='Crafts' icon={<ICrafts />} expanded={route().current('crafts*') || route().current('crafts*')} active={route().current('crafts.show') || route().current('crafts.edit')}>
                <Sidebar.SidebarListItem className='ps-8' href={route('crafts')} label='My Crafts' active={route().current('crafts')} />
                <Sidebar.SidebarListItem className='ps-8' href={route('crafts.create')} label='Add new Craft' active={route().current('crafts.create')} />
              </Sidebar.SidebarListItem>

              <Sidebar.SidebarListHeading>Management</Sidebar.SidebarListHeading>
              <Sidebar.SidebarListItem label='Crafters' icon={<BsFileEarmarkPerson />} expanded={route().current('crafters*')} active={route().current('crafters.show') || route().current('crafters.edit')}>
                <Sidebar.SidebarListItem className='ps-8' href={route('crafters')} label='Crafters' active={route().current('crafters')} />
                <Sidebar.SidebarListItem className='ps-8' href={route('crafters.create')} label='Add new Crafter' active={route().current('crafters.create')} />
              </Sidebar.SidebarListItem>
              <Sidebar.SidebarListItem label='Pending for approval' icon={<FaCheck />} active={route().current('pending')} href={route('pending')} />
            </>

            {
              user?.role_id === 1 && (
                <>
                  <Sidebar.SidebarListHeading>Administrator</Sidebar.SidebarListHeading>
                  <Sidebar.SidebarListItem label='Institutions' />
                  <Sidebar.SidebarListItem label='Organisations' icon={<IMuseums />} expanded={route().current('organisations*')} active={route().current('organisations.show') || route().current('organisations.edit')}>
                    <Sidebar.SidebarListItem className='ps-8' href={route('organisations')} label='Organisations' active={route().current('organisations')} />
                    <Sidebar.SidebarListItem className='ps-8' href={route('organisations.create')} label='Add new organisation' active={route().current('organisations.create')} />
                  </Sidebar.SidebarListItem>
                  <Sidebar.SidebarListItem label='Users' icon={<BsPeopleFill />} expanded={route().current('users*')}>
                    <Sidebar.SidebarListItem className='ps-8' href={route('users')} label='Users' active={route().current('users')} />
                    <Sidebar.SidebarListItem className='ps-8' href={route('users.create')} label='Add new User' active={route().current('users.create')} />
                  </Sidebar.SidebarListItem>
                </>
              )
            }

            <Sidebar.SidebarListHeading>Misc</Sidebar.SidebarListHeading>
            <Sidebar.SidebarListItem label='Support' icon={<BsHeadset />} />

          </Sidebar>
        </header>
        <main className='mt-20 sm:mt-0 grow p-2 overflow-y-scroll'>
          <div className='relative flex flex-col h-mainSm sm:h-main'>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
