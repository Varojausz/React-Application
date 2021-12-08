import React, {useState} from 'react';
import InputWithLabel from '../InputWithLabel/';
import {DivSearchForm} from './styles'
import * as color from '../../CSS/Palettes'
import {ReactComponent as Search} from '../../CSS/SVG/Search.svg'


const SearchForm = ({searchTerm, onSearchInput, onSearchSubmit, previous5Searches, onHandleLastSearch}) => {
    const [focused,setFocused] = useState(false);

    const handleFocusFocus = () => setFocused(true);
    const handleFocusBlur = () => setFocused(false);
    const handleDelay = () => setTimeout(handleFocusBlur,500)

    /*   const searchInput = React.useRef(null)

    if (document.activeElement === searchInput.current) {
      // do something
    }
    return <input type="text" ref={searchInput} /> */

    return (

        <DivSearchForm theme={{...color.cool2}}>
          <form  onSubmit={onSearchSubmit}>
              <InputWithLabel
              id="search"
              value={searchTerm}
              isFocused
              onInputChange={onSearchInput}
              onFocus={handleFocusFocus}
              onBlur={handleDelay}
              >
                  <strong>Search:</strong>
              </InputWithLabel>
              &nbsp;
              <button type="submit" disabled={!searchTerm}><span>Search &nbsp;</span> <Search height='18px' width= '18px'/></button>
          </form>
          <section className='history' style={{display: focused ? 'block' : 'none'}}>
          {previous5Searches.map((historyItem, index) => (
            <div key={index} onClick={() => onHandleLastSearch(historyItem)}>{historyItem}</div>
          ))}
          </section>
        </DivSearchForm>



    )
}

/* function App() {

    ...

    const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React')
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`)

    const handleSearchSubmit = (event) => {
        e.preventdefault()
        setUrl(`${API_ENDPOINT}${searchTerm}`)
    }

    ...

    return (
      <div>
        <SearchForm
        searchterm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit
        />
      </div>
    );
  } */

export default SearchForm