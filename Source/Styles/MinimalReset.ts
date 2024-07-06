
export { Sheet as MinimalReset }

import { Style } from 'Misc'


const Sheet = Style /* CSS */ `

    * {
        min-height : 0 ;
        min-width : 0 ;
        outline : none ;
        padding : 0 ;
        border : none ;
        margin : 0 ;
        font : inherit ;
    }

    body {
        min-height : 100dvh ;
    }
`
