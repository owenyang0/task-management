import React from 'react'
import { SortableComposition as Sortable } from './../../lib/Sort'

const ListItem = (props) => {
  const { draggingType, ...others } = props
  return (
    <li {...others}>{ props.children }</li>
  )
}

ListItem.displayName = 'sortable-list'

const SortableListItem = Sortable(ListItem)
export default SortableListItem
