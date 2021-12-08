import styled from 'styled-components'

export const Layout = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    flex-grow: 1;
    height: 100%;

        .header {
            background: green;
            padding: 1rem;
        }

        .main {
            display: flex;
            flex-direction: row;
            flex-grow: 1;
            margin-top: ${(props) => props.headerHeight || '1.3rem'};

            .sidebar1 {
                background: brown;
                padding: 1rem;
            }
            .content {
                flex-grow: 1;
                /* width: calc(100% - 4rem); */
            }
            .sidebar2 {
                background: yellow;
                padding: 1rem;
            }
        }

        .footer {
            background: orange;
            padding: 1rem;
        }

`



