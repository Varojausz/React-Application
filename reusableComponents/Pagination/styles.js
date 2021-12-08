import styled from 'styled-components'


export const StyledPages = styled.div`

display: flex;
align-content: center;
justify-content: center;
margin-bottom: 1rem;

    span {
        margin: 0 1rem;
        background: ${(props) => props.theme.color4};
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        padding: 0.1rem;
    }
    strong {
        color: ${(props) => props.theme.color2};
    }

`