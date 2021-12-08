import styled, {css} from 'styled-components'

const colors = {linear1: 'linear-gradient(to left, #b6fbff, #83a4d4)',
linear2: 'linear-gradient(to left, #83a4d4 , #b6fbff)',
cerulean: '#9BB7D4', 
quietWave: '#1B7340', 
burntCoral: '#E9897E',
frenchBlue: '#0072B5', 
marigold: '#FDAC53', 
rust: '#B55A30',
greenAsh: '#A0DAA9', 
braveGround: '#F19828', 
sorbet: '#D2386C',
amethyst: '#926AA6'
}


const palette1 = ['#543e25','#988764','#e9e8e4','#91b0be','#54595c']

const palette2 = ['#5d432c','#967c61','#cbab7f','#dcd2c9','#f6f4ee']

const palette3 = ['#00498e','#0087c1','#85cbef','#a3b8d3','#728b9f']

const palette4 = ['#24012f','#572854','#8f5e6b','#c5948c','#fffae8']

const palette5 = ['#5d3277','#a16db7','#ccb4c3','#f8f9f4','#f9edc2']

//--

const warm1 = ['#c43d16','#fd9a7e','#edc596','#fcb500','#dc6d02']

const warm2 = ['#B53302','#E97D01','#FCAC23','#FECA64','#FEDB9B']

//--

const cool1 = ['#012e67','#9cacbf','#2b6684','#032e42','#0a1417']

const cool2 = ['#111b1e','#2f4c58','#63a583','#6e93d6','#e4dbd9']

//--

const pastel1 = ['#e48826','#bb99b7','#ecc8c9','#c6a78f','#a0b3a8']

const pastel2 = ['#af3039','#c65e6a','#e7a9b1','#f1d2d4','#f8eff1']

const pastel3 = ['#a47053','#efca66','#ecdab9','#cec3c8','#909cac']





export const bgred = css`
  background-color: red;
`;

export const Div1 = styled.div`
${bgred}
`



export const Div2 = styled.div.attrs({
    className: "container"
})`
    outline: none;
    background: ${colors.linear2};
`

export const StyledContainer = styled.div`
height: 100vw;
padding: 20px;
background: #83a4d4;
background: linear-gradient(to left, #b6fbff, #83a4d4);
color: #171212;
`
export const StyledHeadlinePrimary = styled.h1`
    font-size: 48px;
    font-weight: 300;
    letter-spacing: 2px;
`
export const StyledItem = styled.li`
    display: flex;
    align-items: center;
    padding-bottom: 5px;
`

export const StyledColumn = styled.span`
    padding: 0 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    a {
        color: inherit;
    }
    width: ${(props) => props.width};
`

export const StyledButton = styled.button`
    background: transparent;
    border: 1px solid #171212;
    padding: 5px;
    cursor: pointer;
    transition: all 0.1s ease-in;
    &:hover {
        background: #171212;
        color: #ffffff;
    }
`

export const StyledButtonSmall = styled.button`
    padding: 5px;
`

export const StyledButtonLarge = styled.button`
    padding: 10px;
`
export const StyledSearchForm = styled.form`
    padding: 10px 0 20px 0;
    display: flex;
    align-items: baseline;
`
export const Styledlabel = styled.label`
    border-top: 1px solid #171212;
    border-left: 1px solid #171212;
    padding: left;
    font-size: 24px;
`
export const StyledInput = styled.input`
        border: none;
    border-bottom: 1px solid #171212;
    background-color: transparent;
    font-size: 24px;
`