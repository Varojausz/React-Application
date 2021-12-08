import React, { useState, useEffect, useReducer, useCallback } from 'react';
import useLocalStorageState from '../customHooks/useLocalStorageState';
import InputWithLabel from '../reusableComponents/InputWithLabel/InputWithLabel'
import axios from 'axios'
import SearchForm from '../reusableComponents/SearchForm';
import List from '../reusableComponents/List'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

function Form() {

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

    <SearchForm 
    searchTerm={searchTerm}
    onSearchInput={handleSearchInput}
    onSearchSubmit={handleSearchSubmit}
    />

    <hr/>

    {stories.isError && <p>Something went wrong...</p>}

    {stories.isLoading ? (
    <p>Loading...</p>
    ) : (
    <List className='list' list={stories.data} onRemoveItem={handleRemoveStory} />
    )}
</>
  );
}

/* function App() {
    return (
      <div>
        <Form/>
      </div>
    );
  } */

export default Form;