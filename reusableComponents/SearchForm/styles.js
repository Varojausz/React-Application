import styled from 'styled-components'
const paddingForm = '1.2rem'
const borderForm = '0.2rem'
const heightInput = '1rem'

export const DivSearchForm = styled.div.attrs({
    /* className: "container" */
})`

@media screen and (max-width: 800px) {

}

width: 100%;
box-sizing: border-box;
position: relative;

    form {
            outline: none;
            background-color: ${(props) => props.theme.color4}; 
            padding: ${paddingForm};
            color: ${(props) => props.theme.color5};
            border: ${borderForm} solid ${(props) => props.theme.color1};
            border-radius: 0.3rem;
            width: 100%;
            box-sizing: inherit;
        }

    input {
        background-color: white;
        color: ${(props) => props.theme.color2};
        border-color: ${(props) => props.theme.color3};
        border-radius: 0.2rem;
        width: clamp(6rem, 15%, 10rem);
        height: ${heightInput};
    }
    button {
        background-color: ${(props) => props.theme.color3};
        color: ${(props) => props.theme.color5};
        border-color: ${(props) => props.theme.color2};
        border-radius: 0.2rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;

        transition: all 0.1s ease-in,
        transform 0.1s 0.1s;

          
        /* transition-property: all, transform;
        transition-duration: 0.1s, 0.1s;
        transition-delay: 0s 0.1s; */

  
        &:hover {
            background: ${(props) => props.theme.color2};
            color: #ffffff;
            transform: translateX(0.2rem)
        }

        
    }

    .history {
        position: absolute;
        background: white;
        border-right: 1px solid grey;
        z-index: 9999;

        width: 15vw;
        left: calc(${paddingForm} + 3.9rem);
        top: calc(${paddingForm} + ${borderForm} + ${heightInput} + 0.5rem);
            div {
                border-bottom: 1px solid grey;
                &:hover {
                    background: ${(props) => props.theme.color3}
                }
            }
    }
    label {
        color: ${(props) => props.theme.color1};
        border-color: ${(props) => props.theme.color4};
        border-radius: 0.2rem;
    }
`
