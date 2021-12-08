import React, { useState, useEffect, useReducer } from 'react';

function ImpossibleStates() {
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

  //-------------------------------------------------------------------------------------------------------

  const [searchTerm, setSearchTerm] = useState("")

  //-------------------------------------------------------------------------------------------------------

  const getAsyncStories = () =>  
        new Promise((resolve, reject) => setTimeout(reject, 2000))
    
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
                isLoading: false,
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


    const searchedStories = stories.data.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()))
    //-------------------------------------------------------------------------------------------------------

  useEffect(() => {
    dispatchStories({type: 'STORIES_FETCH_INIT'})

    getAsyncStories()
    .then((result) => {
        dispatchStories({
            type: 'STORIES_FETCH_SUCCESS',
            payload: result.data.stories
        })
    })
    .catch(() => dispatchStories({type:'STORIES_FETCH_FAILURE'}))
      
  },[])

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
      <List list={searchedStories} onRemoveItem={handleRemoveStory} />
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
        <ImpossibleStates/>
      </div>
    );
  } */

export default ImpossibleStates;