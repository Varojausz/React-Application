import styled from 'styled-components'

export const Spinner = styled.div`

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg)
        }
    }
    background-color: blue;
    position: absolute;
    width: 0.5rem;
    height: 1.5rem;
    top: 2rem;
    animation: spin 0.5s linear infinite;
    left: ${(props) => props.spin || 15}vw;

`