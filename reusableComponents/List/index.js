import React, {memo, useState} from 'react';
import Item from '../Item';
import * as color from '../../CSS/Palettes'
import {ContentList, HeaderList} from './styles'
import {sortBy} from 'lodash'
import {ReactComponent as UpArrow} from '../../CSS/SVG/uparrow.svg'
import {ReactComponent as DownArrow} from '../../CSS/SVG/downarrow.svg'


const sorts = {
  none: (list) => list,
  title: (list) => sortBy(list, 'title'),
  author: (list) => sortBy(list, 'author'),
  comments: (list) => sortBy(list, 'num_comments').reverse(),
  points: (list) => sortBy(list, 'points').reverse()
}


const List = memo(({list, onRemoveItem}) => {
    
    const [sort, setSort] = useState({
      sortKey: 'none',
      isReverse: true
    })

    const sortFunction = sorts[sort.sortKey];

    list = sort.isReverse ? sortFunction(list).reverse() : sortFunction(list);



  //------------------------------------------------------------------------------------------------------------------

    const handleSorting = (sortKey) => {
      const isReverse = sortKey === sortKey && !sort.isReverse; 
      setSort({sortKey, isReverse});
    }
    console.log(sort.sortKey==='none')

    return(
      <>
      <HeaderList theme={{...color.cool2}}>
        <span><button style={{background: sort.sortKey==='title' && 'black'}} onClick={() => handleSorting('title')}> <b>Title</b></button></span>
        <span><button style={{background: sort.sortKey==='author' && 'black'}} onClick={() => handleSorting('author')}><b>Author</b></button></span>
        <span><button style={{background: sort.sortKey==='comments' && 'black'}} onClick={() => handleSorting('comments')}><b>Comments</b></button></span>
        <span><button style={{background: sort.sortKey==='points' && 'black'}} onClick={() => handleSorting('points')}><b>Points</b></button></span>
        <UpArrow height='4vh' width='4vh' style={{display: sort.sortKey!=='none' && (sort.isReverse ? 'inline' : 'none')}}/>
        <DownArrow height='4vh' width='4vh' style={{display: sort.sortKey!=='none' && (sort.isReverse ? 'none' : 'inline')}}/>
      </HeaderList>
      <ContentList theme={{...color.cool2}}>

        {list.map((item) => (
          <Item 
          key={item.objectID+item.created_at_i}
          item={item}
          onRemoveItem={onRemoveItem}
          />
        ))}
      </ContentList>
    </>
    )
  }
)


export default List