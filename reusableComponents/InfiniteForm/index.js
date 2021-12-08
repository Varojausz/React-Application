import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import useLocalStorageState from '../../customHooks/useLocalStorageState';
import axios from 'axios'
import SearchForm from '../SearchForm';
import List from '../List'
import {SpinnerDiv} from '../Animations'
import {infiniteReducer}  from '../../reducers/infiniteReducer'


const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';

const getSumComments = (stories) => {
  console.log('C');
  console.log('a ver',stories.data);

  return stories.data.reduce(
    (result, value) => result + value.num_comments,
    0
  )
}

function InfiniteForm() {

  const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React');
  const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);
    
  //-------------------------------------------------------------------------------------------------------


  const [stories, dispatchStories] = useReducer(
      infiniteReducer,
      {data: [], page: 0, numberOfPages:0, isLoading: false, isError: false}
  );

    //-------------------------------------------------------------------------------------------------------

    const handleFetchStories = useCallback(async () => {
        if (!searchTerm) return;

        dispatchStories({type: 'STORIES_FETCH_INIT'})

        try {
          const lastUrl = urls[urls.length - 1]
          const result = await axios.get(lastUrl);
          console.log(result)

          dispatchStories({type: 'STORIES_FETCH_SUCCESS', payload: {list: result.data.hits, page: result.data.page, numberOfPages: result.data.nbPages}});
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
    }, []);


  const handleSearchInput = event => setSearchTerm(event.target.value);
  
  const handleSearch = (searchTerm, page) => {
    const url = getUrl(searchTerm, page);
    setUrls(urls.concat(url));
    console.log('Ejecutando handleSearch')
  }

  const handleSearchSubmit = (event) => {
      handleSearch(searchTerm, 0);
      console.log('Ejecutando handleSearchSubmit')

      event.preventDefault();
  }

  //-------------------------------------------------------------------------------------------------------------------
  function getUrl(searchTerm, page){
    return `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`
  } ;

  const extractSearchTerm = (url) => url.substring(url.lastIndexOf('?')+1,url.lastIndexOf('&'))
  .replace(PARAM_SEARCH,'');

  const getLastSearches = (urls) => urls.reduce((result, url, index) => {
    const searchTerm = extractSearchTerm(url);
    console.log('Ejecutando getLastSearches')

    console.log('index: ',index)
    if(index === 0) return result.concat(searchTerm);

/*     if(result.includes(searchTerm)) {
      console.log('Retorno sin concatenar en getLastSearches')
      return result
    } else {
      console.log('Concatenando en getLastSearches')
      return result.concat(searchTerm)
    } */

    const previousSearchTerm = result[result.length-1];
    if(searchTerm === previousSearchTerm) {
      return result
    } else {
      return result.concat(searchTerm);
    }

  },[]).slice(-6).slice(0,-1);

  const previous5Searches = getLastSearches(urls);

  //-------------------------------------------------------------------------------------------------------------------

  const handleLastSearch = (historyItem) => {
    console.log('urls',urls,'historyItem',historyItem)
    setSearchTerm(historyItem);

    handleSearch(historyItem, 0);
  }

  const handleMore = () => {
    const lastUrl = urls[urls.length-1];
    const searchTerm = extractSearchTerm(lastUrl);

    handleSearch(searchTerm, stories.page + 1);
    console.log('Ejecutando handleMore')
  }


/*   const bodyHeight = document.querySelector('body').offsetHeight;
  const scrollPaginating = () => {
      if (document.querySelector('body').offsetHeight < (window.pageYOffset + window.outerHeight + 100)) {
       return null
      } 
      console.log('Ejecutando scrollPaginating')
      console.log(document.querySelector('body').offsetHeight < (window.pageYOffset + window.outerHeight + 100))
  }  */
  

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

    <List list={stories.data} onRemoveItem={handleRemoveStory} />

    {stories.isError && <p>Something went wrong, check your conexion to internet</p>}

    {stories.isLoading ? <SpinnerDiv/> : <>
    
    <div style={{display: 'flex', justifyContent: 'center', marginBottom: '1rem'}}>
      <button type="button" onClick={handleMore}>More</button>
    </div>

    </>}
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

export default InfiniteForm;