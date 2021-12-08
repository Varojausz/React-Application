import React, {useRef, useLayoutEffect, useCallback} from 'react'
import styled from 'styled-components'

const StyledRange = styled.div`
position: relative;
border-radius: 3px;
background: #dddddd;
width: 50vw;
margin-left: auto;
top: 50vh;
margin-right: auto;
height: 15px;
`
const StyledThumb = styled.div`
width: 10px;
height: 25px;
border-radius: 3px;
position: relative;
top: -5px;
opacity: 0.5;
background: #823eb7;
cursor: pointer;
`

const RangeHeader = styled.div`
display: flex;
justify-content: space-between;
`

const StyledRangeProgress = styled.div`
border-radius: 3px;
position: absolute;
height: 100%;
opacity: 0.5;
background: #823eb7;
`


const getPercentage = (current, min, max) => (current - min) / (max - min) * 100;
const getValue = (percentage, min, max) => ((max - min) / 100) * percentage + min;
const getLeft = percentage =>`calc(${percentage}% - 5px)`;
const getWidth = percentage => `${percentage}%`;

const Range = ({
  initial,
  min = 0, 
  max, 
  onChange,
  formatFn = number => number.toFixed(0)
}) => {
  const initialPercentage = getPercentage(initial, min, max);
  
  const rangeRef = useRef();
  const thumbRef = useRef();
  const currentRef = useRef();
  const rangeProgressRef = React.useRef();

  const diff = useRef();

  const handleMouseMove = event => {
    // El valor de rangeRef.current.getBoundingClientRect().left es constante y se corresponde con su extremo izquierdo
    let newX = event.clientX - diff.current - rangeRef.current.getBoundingClientRect().left; 

    // rangeRef.current.offsetWidth es constante y se corresponde con la anchura del Range, con el thumb ocurre análogamente
    const end = rangeRef.current.offsetWidth - thumbRef.current.offsetWidth
    const start = 0;

    // Tanto end como start son diferencias máximas y mínimas de posición entre el extremo izquierdo del Range y el extremo izquierdo del thumb
    // Dicho eso, newX es simplemente un valor intermedio entre esos 2 valores
    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, start, end);

    console.log(newPercentage, thumbRef.current.style.left)

    const newValue = getValue(newPercentage, min, max);

    handleUpdate(newValue, newPercentage);

    onChange(newValue);
  
  };
  const handleUpdate = useCallback(
    (newValue, newPercentage) => {
      thumbRef.current.style.left = getLeft(newPercentage);
      currentRef.current.textContent = formatFn(newValue);
      rangeProgressRef.current.style.width = getWidth(newPercentage);
    },[formatFn]
  )
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };
  const handleMouseDown = event => {
    diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left 
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    /* console.log('thumb: ', thumbRef.current.getBoundingClientRect().left, 'Range: ', rangeRef.current.getBoundingClientRect().left, 'end: ', rangeRef.current.offsetWidth) */
  };
  useLayoutEffect(() => {
    handleUpdate(initial, initialPercentage)
  }, [initial, initialPercentage, handleUpdate]);

  return(
    <>
    <RangeHeader>
      <div>{formatFn(min)}</div>
      <div>
        <strong ref={currentRef}>{formatFn(min)}</strong>
        &nbsp;/&nbsp;
        {formatFn(max)}
      </div>
    </RangeHeader>
      <StyledRange ref={rangeRef}>
        <StyledRangeProgress 
          style={{width: getWidth(initialPercentage)}}
          ref={rangeProgressRef}
        />
        <StyledThumb 
        ref={thumbRef} 
        onMouseDown={handleMouseDown} 
        style={{left: getLeft(initialPercentage)}}
        />
      </StyledRange>
    </>
  )
}

/* function App() {
    return (
      <div>
        <Range 
        initial={10} 
        max={25}
        min={5} 
        onChange={value => console.log(value)}
        formatFn={number => number.toFixed(2)}
        />
      </div>
    );
  } */

  export default Range