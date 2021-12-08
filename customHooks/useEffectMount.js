import {useEffect, useRef} from 'react'

const useEffectOnlyOnce = (callback, dependencies, condition) => {
    const calledOnce = useRef(false);
   
    useEffect(() => {
      if (calledOnce.current) {
        return;
      }
   
      if (condition(dependencies)) {
        callback(dependencies);
   
        calledOnce.current = true;
      }
    }, [callback, condition, dependencies]);
  };


/*   const App = () => {
    const [toggle, setToggle] = React.useState(true);
   
    const handleToggle = () => {
      setToggle(!toggle);
    };
   
    useEffectOnlyOnce(
      (dependencies) => {
        console.log('I run only once if toggle is false.');
      },
      [toggle],
      (dependencies) => dependencies[0] === false
    );
   
    return (
      <div>
        <button type="button" onClick={handleToggle}>
          Toggle
        </button>
   
        {toggle && <div>Hello React</div>}
      </div>
    );
  }; */

export default useEffectOnlyOnce
   