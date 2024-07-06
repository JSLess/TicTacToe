
export { middleware as cookiesPage }

import { Context } from 'Oak'
import { render } from 'Render'
import { Styles } from 'Styles'
import { Style } from 'Misc'


const Stylesheet = Style /* CSS */ `

    body {
        justify-content : center ;
        align-items : center ;
        display : flex ;

        font-family : system-ui , sans-serif , monospace ;
        font-weight : bold ;
        text-align : center ;
        text-wrap : balance ;
        font-size : 2rem ;
    }

    p {
        max-width : 50% ;
    }
`


async function middleware (
    context : Context
){

    const page = (
        <html>
            <head>
                <Styles.MinimalReset />
                <Styles.Document />
                <Stylesheet />
            </head>
            <body>
                <p>
                    Cookies are required for this page to work.
                </p>
            </body>
        </html>
    )

    context.response.body = render(page)
}
