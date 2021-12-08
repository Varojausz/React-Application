import React, { useState, useEffect, useReducer } from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

function Fetching() {

  const [searchTerm, setSearchTerm] = useState("")
    
  //-------------------------------------------------------------------------------------------------------

  const storiesReducer = (state, action) => {
    switch(action.type) {
        case 'STORIES_FETCH_INIT':
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'STORIES_FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'STORIES_FETCH_FAILURE':
            return {
                ...state,
                isLoading: true,
                isError: true
            }
        case 'REMOVE_STORY':
            return {
                ...state,
                data: state.data.filter((story) => action.payload.objectID !== story.objectID)
            }
        default:
            throw new Error();
    }
  }

  const [stories, dispatchStories] = useReducer(
      storiesReducer,
      {data: [], isLoading: false, isError: false}
  );

    //-------------------------------------------------------------------------------------------------------

  useEffect(() => {
    if (!searchTerm) return;

    dispatchStories({type: 'STORIES_FETCH_INIT'})

    fetch(`${API_ENDPOINT}${searchTerm}`)
    .then((response) => response.json())
    .then((result) => {
        console.log(result.hits)
        return dispatchStories({type: 'STORIES_FETCH_SUCCESS', payload: result.hits})
    })
    .catch(() => {
        console.log(`${API_ENDPOINT}${searchTerm}`)
        return  dispatchStories({type:'STORIES_FETCH_FAILURE'})
    })
      
  },[searchTerm])

  //-------------------------------------------------------------------------------------------------------

  const handleRemoveStory = (item) => {
    dispatchStories({
        type: 'REMOVE_STORY',
        payload: item
    })
  }


  const handleSearch = event => setSearchTerm(event.target.value)

  //-------------------------------------------------------------------------------------------------------

  return (
    <>
      <h1>My hacker stories</h1>
      <Search onSearch={handleSearch} value={searchTerm} />

      <hr/>

      {stories.isError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
      <p>Loading...</p>
    ) : (
      <List list={stories.data} onRemoveItem={handleRemoveStory} />
    )}
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

/* function App() {
    return (
      <div>
        <Fetching/>
      </div>
    );
  } */

export default Fetching;