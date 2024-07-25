import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { FaEye, FaPlus, FaUsers } from 'react-icons/fa6'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'

export function Admin() {
  return (
    <ListContainer>
      <ListItem key={12} href={route('buildings')} header='All buildings' icon={FaPlus} items='3' image='https://picsum.photos/1920/1080?random=21' />

      <ListItem key={12} href={route('crafts')} header='All crafts' icon={FaPlus} items='10' image='https://picsum.photos/1920/1080?random=23' />

      <ListItem key={12} href={route('crafters')} header='All crafters' icon={FaUsers} image='https://picsum.photos/1920/1080?random=24' />

      <ListItem key={12} href='#' header='My institutions' icon={FaUsers} image='https://picsum.photos/1920/1080?random=25' />

      <ListItem key={12} href={route('organisations')} header='My organisations' icon={FaUsers} image='https://picsum.photos/1920/1080?random=26' />

      <ListItem key={12} href='#' header='All partners' icon={FaEye} image='https://picsum.photos/1920/1080?random=27' />

      <ListItem key={12} href={route('users')} header='My users' icon={FaUsers} image='https://picsum.photos/1920/1080?random=27' />

      <ListItem key={12} href={route('pending')} header='Pending for approval' icon={FaUsers} image='https://picsum.photos/1920/1080?random=28' />
    </ListContainer>
  )
}
