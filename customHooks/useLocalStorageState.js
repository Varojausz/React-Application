import { useState, useEffect} from 'react';
import useEffectUpdate from './useEffectUpdate';

const useLocalStorageState = (key, initialState) => {
    const [value, setValue] = useState(
        localStorage.getItem(key) || initialState
    )

    useEffectUpdate((key,value) => {
        localStorage.setItem(key, value)
    },[key,value])


    return [value, setValue]
};


/* if (!isMounted.current) {
    isMounted.current = true;
} else {
    localStorage.setItem(key, value)
} */

/* useEffectUpdate(() => {
    localStorage.setItem(key, value)
}, [value, key]) */

/* 
    const [search, setSearch] = useLocalStorageState('search', 'React')
*/

export default useLocalStorageState;