
export { Sheet as Logout }

import { Style } from 'Misc'


const Sheet = Style /* CSS */ `

    :root {
        --background : #1c1817 ;
        --secondary : #1a2c2d ;
        --primary : #5e6d6e ;
        --accent : #bf3831 ;
        --text : #f5f9f9 ;
    }


    * {
        font-family : monospace ;
        font-size : 18px ;
        color : var( --text ) ;
    }

    html {
        overflow : hidden ;
    }

    body {
        justify-content : center ;
        align-items : center ;
        display : flex ;
    }

    form {
        margin : 0 ;
    }

    input[ type = submit ]{
        outline: none;
        border: none;
        border-radius: 5px;
        background: transparent;
        border : 1px solid var( --primary ) ;
        padding: 10px;
        height: 100vh;
        width: 100vw;
        cursor: pointer;
        transition : 0.25s ;
        color : var( --primary ) ;
        font-weight : bold ;
    }

    input[ type = submit ]:focus-within {
        border-color : var( --accent ) ;
        color : var( --accent ) ;
    }

    input[ type = submit ]:hover {
        border-color : var( --primary ) ;
        background : var(--primary) ;
        color : white ;
    }
`
