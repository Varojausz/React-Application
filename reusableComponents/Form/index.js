import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import useLocalStorageState from '../../customHooks/useLocalStorageState';
import axios from 'axios'
import SearchForm from '../SearchForm';
import List from '../List'
import {SpinnerDiv} from '../Animations'
import {formReducer}  from '../../reducers/formReducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query='

const getSumComments = (stories) => {
  console.log('C');
  console.log('a ver',stories.data);

  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  )
}

function Form() {

  const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React')
  const [urls, setUrls] = useState([`${API_ENDPOINT}${searchTerm}`])
    
  //-------------------------------------------------------------------------------------------------------


  const [stories, dispatchStories] = useReducer(
      formReducer,
      {data: [], isLoading: false, isError: false}
  );

    //-------------------------------------------------------------------------------------------------------

    const handleFetchStories = useCallback(async () => {
        if (!searchTerm) return;

        dispatchStories({type: 'STORIES_FETCH_INIT'})

        try {
          const result = await axios.get(urls[urls.length-1]);

          dispatchStories({type: 'STORIES_FETCH_SUCCESS', payload: result.data.hits})
        }
        catch{
          dispatchStories({type:'STORIES_FETCH_FAILURE'})
        }
    }, [urls])


  useEffect(() => {
      handleFetchStories()
  },[handleFetchStories])


  //-------------------------------------------------------------------------------------------------------

  const handleRemoveStory = useCallback(
    (item) => {
      dispatchStories({
          type: 'REMOVE_STORY',
          payload: item
      })
    }, [])


  const handleSearchInput = event => setSearchTerm(event.target.value)
  

  const handleSearchSubmit = (event) => {
      const lastUrl = `${API_ENDPOINT}${searchTerm}`

      if(urls.includes(lastUrl)){
      } else {
        setUrls(urls.concat(lastUrl))
      }
      event.preventDefault();
  }

  //-------------------------------------------------------------------------------------------------------------------

  const extractSearchTerm = url => url.replace(API_ENDPOINT,'');

  const getLastSearches = (urls) => urls.reduce((result, url, index) => {
    const searchTerm = extractSearchTerm(url);

    if(index === 0) return result.concat(searchTerm);

    if(result.includes(searchTerm)) {
      return result
    } else {
      return result.concat(searchTerm)
    }

/*     const previousSearchTerm = result[result.length-1];
    if(searchTerm === previousSearchTerm) {
      return result
    } else {
      return result.concat(searchTerm);
    } */

  },[]).slice(-6).slice(0,-1);

  const previous5Searches = getLastSearches(urls);

  //-------------------------------------------------------------------------------------------------------------------

  const handleLastSearch = (historyItem) => {
    console.log('urls',urls,'historyItem',historyItem)
    setSearchTerm(historyItem)

    const historyUrl = `${API_ENDPOINT}${historyItem}`;
    setUrls(urls.concat(historyUrl));
  }

  const sumComments = useMemo(() => getSumComments(stories),[stories]); //USAR USEMEMO SÓLO PARA COMPUTACIONES CARAS

  //-------------------------------------------------------------------------------------------------------

  return (
<>
    <h1 style={{fontSize: 'clamp(1.5rem, 3.6vw, 3rem)'}}>My hacker stories with {sumComments} comments</h1>

    <SearchForm 
    searchTerm={searchTerm}
    onSearchInput={handleSearchInput}
    onSearchSubmit={handleSearchSubmit}
    previous5Searches={previous5Searches}
    onHandleLastSearch={handleLastSearch}
    />

    {/* <hr/> */}

    {stories.isError && <p>Something went wrong, check your conexion to internet</p>}

    {stories.isLoading ? <SpinnerDiv/> : <List list={stories.data} onRemoveItem={handleRemoveStory} />}
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