
export { Sheet as Reset }

import { Style } from 'Misc'


const Sheet = Style /* CSS */ `

    * , ::before , ::after {
        box-sizing : border-box ;
    }

    * {
        min-height : 0 ;
        min-width : 0 ;
        outline : none ;
        padding : 0 ;
        border : none ;
        margin : 0 ;
        font : inherit ;
    }

    html {
        hanging-punctuation : first last ;
        color-scheme : dark light ;
    }

    body {
        font-family : system-ui ;
        min-height : 100dvh ;
    }

    /*
        No use-case for video / svg yet / ever
        since they are blocked by default.
    */

    picture , video , img , svg {
        max-width : 100% ;
        display : block ;
    }

    img {

        background-position : center ;
        background-repeat : no-repeat ;
        background-size : cover ;

        vertical-align : middle ;
        max-width : 100% ;
        height : auto ;

        shape-margin : 1rem ;
        font-style : italic ;
    }

    h1 , h2 , h3 , h4 , h5 , h6 {
        text-wrap : balance ;
    }

    p , li {
        text-wrap : pretty ;
    }
`
