import {StyledPages} from './styles'
import * as color from '../../CSS/Palettes'
import {ReactComponent as FirstPage} from '../../CSS/SVG/firstpage.svg'
import {ReactComponent as LastPage} from '../../CSS/SVG/lastpage.svg'
import {ReactComponent as NextPage} from '../../CSS/SVG/nextpage.svg'
import {ReactComponent as BeforePage} from '../../CSS/SVG/beforepage.svg'

const Pages = ({onHandleMinus, onHandleMore, onHandleFirst, onHandleLast, numberOfPages, page}) => (
    <StyledPages theme={{...color.cool2}}>
        {page > 1 && <span onClick={onHandleFirst}><FirstPage/></span>}
        {page > 0 && <span onClick={onHandleMinus}><BeforePage/></span>}
        <strong>{page}</strong>
        {page < numberOfPages-1 && <span onClick={onHandleMore}><NextPage/></span>}
        {page < numberOfPages-2 && <span onClick={onHandleLast}><LastPage/></span>}
    </StyledPages>
)

export default Pages