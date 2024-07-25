import { ListItem } from '@/Components/listContainer/partials/ListItem.jsx'
import { FaEye, FaPlus, FaUsers } from 'react-icons/fa6'
import { ListContainer } from '@/Components/listContainer/ListContainer.jsx'

export function Manager() {
  return (
    <ListContainer>
      <ListItem key={12} href={route('buildings')} header='My buildings' icon={FaPlus} items='3' image='https://picsum.photos/1920/1080?random=21' />

      <ListItem key={12} href={route('crafts')} header='My crafts' icon={FaPlus} items='10' image='https://picsum.photos/1920/1080?random=23' />

      <ListItem key={12} href={route('organisations')} header='My museum' icon={FaUsers} image='https://picsum.photos/1920/1080?random=24' />
    </ListContainer>
  )
}
