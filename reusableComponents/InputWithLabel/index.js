import React, {useState, useRef} from 'react';
import { useEffect } from 'react/cjs/react.development';

const InputWithLabel = ({id, type = 'text', value, isFocused, onInputChange, onFocus, onBlur, children}) => {
  const inputRef = useRef();
  
/*   useEffect(() => {
    isFocused && inputRef.current && inputRef.current.focus()
  }) */


  //Imperative way:
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus()
    } 
  },[isFocused])
  
  return (
    <>
    <label role="label" htmlFor={id}>{children}</label>
    &nbsp;
    <input
    id={id}
    ref={inputRef} 
    type={type}
    value={value}
    onFocus={onFocus}
    onBlur={onBlur}
    /* autoFocus={isFocused}  //Declarative way */ 
    onChange={onInputChange}
    />
  </>
  )
}





/* function App() {

    ...

    const [searchTerm, setSearchTerm] = useLocalStorageState('search', 'React')
    const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`)

    const handleSearchInput = event => setSearchTerm(event.target.value)

    ...


    return (
      <div>
        <InputWithLabel
        id="search"
        label="Search"
        type="text"
        value={searchTerm}
        onInputChange={handleSearchInput}
        > ... </InputWithLabel/>
      </div>
    );
} */

export default InputWithLabel
