import React, {useRef} from 'react'
import styled from 'styled-components'

const StyledSlider = styled.div`
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

const SliderHeader = styled.div`
display: flex;
justify-content: flex-end;
`


const getPercentage = (current, max) => (current / max)  * 100;
const getValue = (percentage, max) => max / 100 * percentage;
const getLeft = percentage =>`calc(${percentage}% - 5px)`;

const Slider = ({
  initial,
  max, 
  onChange,
  formatFn = number => number.toFixed(0)
}) => {
  const initialPercentage = getPercentage(initial, max);
  
  const sliderRef = useRef();
  const thumbRef = useRef();
  const currentRef = useRef();

  const diff = useRef();

  const handleMouseMove = event => {
    // El valor de sliderRef.current.getBoundingClientRect().left es constante y se corresponde con su extremo izquierdo
    let newX = event.clientX - diff.current - sliderRef.current.getBoundingClientRect().left; 

    // sliderRef.current.offsetWidth es constante y se corresponde con la anchura del slider, con el thumb ocurre análogamente
    const end = sliderRef.current.offsetWidth - thumbRef.current.offsetWidth
    const start = 0;

    // Tanto end como start son diferencias máximas y mínimas de posición entre el extremo izquierdo del slider y el extremo izquierdo del thumb
    // Dicho eso, newX es simplemente un valor intermedio entre esos 2 valores
    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    const newPercentage = getPercentage(newX, end);
    const newValue = getValue(newPercentage, max);

    thumbRef.current.style.left = getLeft(newPercentage);
    console.log(newPercentage, thumbRef.current.style.left)


    currentRef.current.textContent = formatFn(newValue);

    onChange(newValue);
  
  };
  const handleMouseUp = () => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };
  const handleMouseDown = event => {
    diff.current = event.clientX - thumbRef.current.getBoundingClientRect().left 
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    /* console.log('thumb: ', thumbRef.current.getBoundingClientRect().left, 'slider: ', sliderRef.current.getBoundingClientRect().left, 'end: ', sliderRef.current.offsetWidth) */
  };

  return(
    <>
    <SliderHeader>
        <strong ref={currentRef}>{formatFn(initial)}</strong>
        &nbsp;/&nbsp;
        {formatFn(max)}
    </SliderHeader>
      <StyledSlider ref={sliderRef}>
        <StyledThumb 
        ref={thumbRef} 
        onMouseDown={handleMouseDown} 
        style={{left: getLeft(initialPercentage)}}
        />
      </StyledSlider>
    </>
  )
}

/* function App() {
    return (
      <div>
        <Slider 
        initial={10} 
        max={25}
        onChange={value => console.log(value)}
        formatFn={number => number.toFixed(2)}
        />
      </div>
    );
  } */

  export default Slider