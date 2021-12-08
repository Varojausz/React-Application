import styled from 'styled-components'

const breakpoint1 = '700px'
const breakpoint2 = '993px'

export const HeaderList = styled.div`
    background-color: ${(props) => props.theme.color2}; 
    padding: 1.2rem;
    color: ${(props) => props.theme.color5};
    border-right: 0.2rem solid ${(props) => props.theme.color1};
    border-top: 0.2rem solid ${(props) => props.theme.color1};
    border-left: 0.2rem solid ${(props) => props.theme.color1};
    display: flex;
    

/*     span {
        border-radius: 0.2rem;
        margin-right: 0.5rem;
        text-align: center;

    } */

    span {
        display: inline-block;
        background-color: white;
        border-color: ${(props) => props.theme.color4};
        margin-right: 0.5rem;

        &:nth-child(1){width: 40%;}
        &:nth-child(2){width: 25%;}
        &:nth-child(3){width: 15%;}
        &:nth-child(4){width: 10%;}

        button {
            width: 100%;
            background-color: ${(props) =>  props.theme.color4};
            height: 100%;
            border-radius: 0px;
            color: ${(props) => props.theme.color5};
            position: relative;

        }
    }

    @media screen and (max-width: ${breakpoint1}) {
        display: flex;
        flex-wrap: wrap;
        span {
            &:nth-child(1){width: 15%;}
            &:nth-child(2){width: 15%;}
            &:nth-child(3){width: 15%;}
            &:nth-child(4){width: 15%;}
        }
    }

`

export const ContentList = styled.ul.attrs({
    /* className: "container" */
})`
@media screen and (max-width: 800px) {

}

padding: 0;
list-style-type: none;
margin-top: 0px;

    li {
        outline: none;
        background-color: ${(props) => props.theme.color3}; 
        padding: 1.2rem;
        color: ${(props) => props.theme.color5};
        border: 0.2rem solid ${(props) => props.theme.color1};
        /* border-radius: 0.3rem; */
        /* margin-bottom: 1rem; */
        flex-wrap: wrap;
        display: flex;


            span {
                button {
                    width: 100%;
                    background-color: ${(props) => props.theme.color4};
                    height: 100%;
                }
            }

    }

    span {
        background-color: white;
        color: ${(props) => props.theme.color2};
        border-color: ${(props) => props.theme.color4};
        border-radius: 0.2rem;
        margin-right: 0.5rem;
        text-align: center;

        &:nth-child(1){width: 40%;}
        &:nth-child(2){width: 25%;}
        &:nth-child(3){width: 15%;}
        &:nth-child(4){width: 10%;}

    }
    button {


        background-color: ${(props) => props.theme.color1};
        color: ${(props) => props.theme.color5};
        border-color: ${(props) => props.theme.color2};
        border-radius: 0.2rem;
        cursor: pointer;

        transition: all 0.1s ease-in,
        transform 0.1s 0.1s;

          
        /* transition-property: all, transform;
        transition-duration: 0.1s, 0.1s;
        transition-delay: 0s 0.1s; */
  
        &:hover {
            background: #171212;
            color: #ffffff;
            transform: translateX(0.2rem)
        }

    }
    
    a {
        color: blue;
        border-color: ${(props) => props.theme.color4};
        border-radius: 0.2rem;


        /* Truncate */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
        
        max-width: 80%;
    }
    i {
        display: none;
    }

    @media screen and (max-width: ${breakpoint1}) {
            li {
                flex-wrap: nowrap;
                display: grid;
                grid-template-columns: inherit inherit;
                grid-template-rows: inherit inherit;
                grid-auto-rows: inherit;
            }

            span {
            margin-bottom: 0.5rem;

            &:nth-child(1){
                width: 90%;
            }
            &:nth-child(2){
                width: 90%;
            }
            &:nth-child(3){
                width: 90%;
            }
            &:nth-child(4){
                width: 90%;
            }
            
            }


            i {
                display: inline;
            }
        }

        @media screen and (max-width: ${breakpoint2}) {
            button {
            display: block;
            margin-top: 1rem;
            width: fit-content;
            }
        }

`