import React, { useState } from 'react';

function InlineHandler() {
  const initialStories = [
    {
      title: 'React',
      url: 'https://react.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov , Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1
    }
  ]
  
  const [searchTerm, setSearchTerm] = useState("")
  const [stories, setStories] = useState(initialStories)

  const handleRemoveStory = (item) => {
    const newStories = stories.filter((story) => 
    item.objectID !== story.objectID
    )
    setStories(newStories)
  }


  const handleSearch = event => setSearchTerm(event.target.value)


  return (
    <>
      <h1>My hacker stories</h1>
      <Search onSearch={handleSearch} value={searchTerm} />
      <hr/>
      <List list={stories} onRemoveItem={handleRemoveStory} />
    </>
  );
}

const Search = ({value, onSearch}) => {
  return (
    <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" onChange={onSearch} value={value}/>
  </div>
  )
}

const List = ({list, onRemoveItem}) => (
  <ul>
    {list.map((item) => (
      <Item 
      key={item.objectID}
      item={item}
      onRemoveItem={onRemoveItem}
      />
    ))}
  </ul>
)

const Item = ({item, onRemoveItem}) => {
/*   const handleRemoveItem = () => {
    onRemoveItem(item)
  } */

  return (
    <li>
    <span className="info">
      <a href={item.url}> {item.title} </a>
    </span>
    <span className="info">Author(s): {item.author} </span>
    <span className="info">Comments: {item.num_comments} </span>
    <span className="info">Points: {item.points}</span>
    <span>
      <button /* onClick={handleRemoveItem} */ /* onClick={onRemoveItem.bind(null, item)} */ onClick={() => onRemoveItem(item)}>Dismiss</button>
    </span>
  </li>
  )
}

export default InlineHandler;