import React, { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import useLocalStorageState from '../../customHooks/useLocalStorageState';
import axios from 'axios'
import SearchForm from '../SearchForm';
import List from '../List'
import {SpinnerDiv} from '../Animations'
import {storiesReducer}  from '../../reducers/formReducer'
import Pages from '../Pagination'


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

function PaginatedForm() {

  const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React');
  const [urls, setUrls] = useState([getUrl(searchTerm, 0)]);
    
  //-------------------------------------------------------------------------------------------------------


  const [stories, dispatchStories] = useReducer(
      storiesReducer,
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
  }

  const handleSearchSubmit = (event) => {
      handleSearch(searchTerm, 0);

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
    setSearchTerm(historyItem);

    handleSearch(historyItem, 0);
  }

  const handleMore = () => {
    const lastUrl = urls[urls.length-1];
    const searchTerm = extractSearchTerm(lastUrl);

    handleSearch(searchTerm, stories.page + 1);
  }
  const handleMinus = () => {
    const lastUrl = urls[urls.length-1];
    const searchTerm = extractSearchTerm(lastUrl);

    handleSearch(searchTerm, stories.page - 1);
  }
  const handleFirst = () => {
    const lastUrl = urls[urls.length-1];
    const searchTerm = extractSearchTerm(lastUrl);

    handleSearch(searchTerm, 0);
  }
  const handleLast = () => {
    const lastUrl = urls[urls.length-1];
    const searchTerm = extractSearchTerm(lastUrl);

    handleSearch(searchTerm, stories.numberOfPages-1);
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

    {stories.isLoading ? <SpinnerDiv/> : <>
    <List list={stories.data} onRemoveItem={handleRemoveStory} />

    <Pages page={stories.page}
    numberOfPages={stories.numberOfPages} 
    onHandleMinus={handleMinus} 
    onHandleMore={handleMore}
    onHandleFirst={handleFirst}
    onHandleLast={handleLast}
    />
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

export default PaginatedForm;