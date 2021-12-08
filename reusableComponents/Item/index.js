const Item = ({item, onRemoveItem}) => {
    /*   const handleRemoveItem = () => {
        onRemoveItem(item)
      } */
    
      return (
        <li>
        <span>
        <a href={item.url}><i>Title: </i> {item.title} </a>
        </span>
        <span><i>Author: </i> {item.author} </span>
        <span><i>Comments: </i> {item.num_comments} </span>
        <span><i>Points: </i> {item.points}</span>
        <button /* onClick={handleRemoveItem} */ /* onClick={onRemoveItem.bind(null, item)} */ onClick={() => onRemoveItem(item)}>Dismiss</button>

      </li>
      )
    }


export default Item