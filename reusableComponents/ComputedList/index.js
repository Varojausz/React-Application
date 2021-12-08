import React, {useState, useMemo} from 'react';
import sortBy from 'lodash.sortby';
import { v4 as uuidv4 } from 'uuid';
 
function ComputedList() {
    const [name, setName] = useState('');

    const [list, setList] = useState([
    { id: '1', name: 'Apple', count: 5 },
    { id: '2', name: 'Banana', count: 3 },
    { id: '3', name: 'Peach', count: 10 },
    ]);

    const [sort, setSort] = useState({
    property: 'name',
    isReverse: false,
    });

    function handleSortName() {
    const isReverse = sort.property === 'name' && !sort.isReverse;
    setSort({ property: 'name', isReverse });
    }

    function handleSortCount() {
    const isReverse = sort.property === 'count' && !sort.isReverse;
    setSort({ property: 'count', isReverse });
    }

    function handleChange(event) {
    setName(event.target.value);
    }

    function handleAdd() {
    const newItem = {
        id: uuidv4(),
        name: name,
        count: 0,
    };
    const newList = list.concat(newItem);
    setList(newList);
    }
 
/*     const sortedList = sort.isReverse
        ? sortBy(list, sort.property).reverse()
        : sortBy(list, sort.property); */

    const sortedList = useMemo(() => {
        console.log('Calculates computed properties ...');
        
        return sort.isReverse
            ? sortBy(list, sort.property).reverse()
            : sortBy(list, sort.property);
        }, [list, sort]);
 
  return (
    <div>
      <h1>Computed Properties in React</h1>
 
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>
 
      <button type="button" onClick={handleSortName}>
        Sort by Name
      </button>
      <button type="button" onClick={handleSortCount}>
        Sort by Count
      </button>
 
      <ul>
        {sortedList.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>:<span>{item.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
 
export default ComputedList;