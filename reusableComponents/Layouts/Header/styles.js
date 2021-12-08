import styled from 'styled-components'


const breakpoint1 = '700px'

export const Navbar = styled.nav`
    display: flex;
    position: fixed;
    background-color: ${(props) => props.theme.color4};
    width: 100%;
    box-sizing: border-box;
    height: ${(props) => props.headerHeight || '4vh'};



        div {
            border-right: 0.2rem solid ${(props) => props.theme.color1};
            height: fit-content;
            box-sizing: border-box;
            height: 100%;
            display: flex;
            align-items: center;
        }

        a {
        text-decoration: none;
        color: ${(props) => props.theme.color5};
        background-color: ${(props) => props.theme.color4};
        padding: 0 1rem;
        flex-grow: 1;
        box-sizing: border-box;
        height: 100%;
        line-height: ${(props) => props.headerHeight || '4vh'};
        
        /* height: ${(props) => props.headerHeight}; */

            &:hover {
            background-color: ${(props) => props.theme.color2}
            }
        }

        button {
            cursor: pointer;
            display: none;
            
        }

    @media screen and (max-width: ${breakpoint1}) {
        button {
            display: flex;
            height: ${(props) => props.headerHeight || '4vh'};
        }

        justify-content: space-between;
    }


`

export const StyledToggle = styled.section.attrs(
    
)`
    position: relative;
    display: flex;
    

    @media screen and (max-width: ${breakpoint1}) {
        position: absolute;
        display: ${(props) => props.toggle ? 'flex' : 'none'};
        flex-direction: column;
        top: ${(props) => props.headerHeight || '4vh'};
        right: 0vw;

        div {
            border-right: 0px;
        }
    }
    
`