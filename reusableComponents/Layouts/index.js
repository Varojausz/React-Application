import {Layout} from './styles'
import { Header, Toggle } from './Header'
import {ReactComponent as Menu} from '../../CSS/SVG/Menu_icon.svg'
import {useState} from 'react';


export const LayoutHeaderFooter2Sidebars = ({headerHeight, children}) => {

    const [toggle, setToggle] = useState(false)

    const toggleHandler = () => setToggle(!toggle)

    return (
        <Layout headerHeight={headerHeight}>
            {/* <div className="header"></div> */}
            <Header headerHeight={headerHeight}>
                <div><a href="/">Home</a></div>
                <button onClick={toggleHandler}><Menu/></button>
                <Toggle headerHeight={headerHeight} toggle={toggle} >
                    <div><a href="/form">Form</a></div>
                    <div><a href="/infiniteform">Infinite</a></div>
                    <div><a href="/">Entry 3</a></div>
                </Toggle>
            </Header>
            <div className="main">
                {/* <div className="sidebar1"></div> */}
                <div className="content">
                    {children}
                </div>
                {/* <div className="sidebar2"></div> */}
            </div>
            <div className="footer"></div>
        </Layout>
    )
}
