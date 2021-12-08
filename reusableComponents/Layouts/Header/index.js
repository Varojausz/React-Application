import {Navbar, StyledToggle} from './styles'
import * as color from '../../../CSS/Palettes'

export const Toggle = ({headerHeight, toggle, children}) => {
    return (
        <StyledToggle headerHeight={headerHeight} toggle={toggle}>{children}</StyledToggle>
    )
}

export const Header = ({headerHeight, children}) => {

    return (
        <Navbar headerHeight={headerHeight} theme={{...color.cool2}}>
            {children}
        </Navbar>
    )
}

