import React, { useState, useEffect, useReducer, useCallback } from 'react';
import useLocalStorageState from '../customHooks/useLocalStorageState';
import InputWithLabel from '../reusableComponents/InputWithLabel/InputWithLabel'
import axios from 'axios'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

function AxiosAwait() {

  const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React')
  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`)
    
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

    const handleFetchStories = useCallback(async () => {
        if (!searchTerm) return;

        dispatchStories({type: 'STORIES_FETCH_INIT'})

        try {
          const result = await axios.get(url);

          dispatchStories({type: 'STORIES_FETCH_SUCCESS', payload: result.data.hits})
        }
        catch{
          dispatchStories({type:'STORIES_FETCH_FAILURE'})
        }
    }, [url])


  useEffect(() => {
      handleFetchStories()
  },[handleFetchStories])


  //-------------------------------------------------------------------------------------------------------

  const handleRemoveStory = (item) => {
    dispatchStories({
        type: 'REMOVE_STORY',
        payload: item
    })
  }


  const handleSearchInput = event => setSearchTerm(event.target.value)
  

  const handleSearchSubmit = () => {
      setUrl(`${API_ENDPOINT}${searchTerm}`)
  }

  //-------------------------------------------------------------------------------------------------------

  return (
<>
    <h1>My hacker stories</h1>
    <InputWithLabel
    id='search'
    isFocused 
    onInputChange={handleSearchInput} 
    value={searchTerm} 
    >
        <strong>Search: </strong>
    </InputWithLabel>

    <button
    type='button'
    disabled={!searchTerm}
    onClick={handleSearchSubmit}
    >
        Submit
    </button>

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
        <AxiosAwait/>
      </div>
    );
  } */

export default AxiosAwait;