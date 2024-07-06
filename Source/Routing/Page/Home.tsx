
export { router as HomeRouter }

import { Context , Router } from 'Oak'
import { UserState, WithUser } from '../mod.ts'
import { render } from 'Render'
import { Styles } from 'Styles'
import { Style } from 'Misc'
import { users } from 'State';


const router = new Router

router.get('/',async (
    context : Context<UserState> ,
    next : () => Promise<any>
) => {

    const { response , state } = context

    if( state.isStranger ){
        response.redirect(`/SignIn`)
        return
    }

    return await next()

},page)



const Stylesheet = Style /* CSS */ `


`


async function page (
    context : Context<WithUser>
){

    const user = users.get(context.state.userId)

    const page = (
        <html>

            <head>
                <Styles.MinimalReset />
                <Styles.Document />
                <Stylesheet />
            </head>

            <body>
                { ( user?.match ) ? <>

                    Match

                </> : <>

                    Searching ...

                </> }
            </body>
        </html>
    )

    context.response.body = render(page)
}
