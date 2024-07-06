
export { router as HomeRouter }

import { UserState, WithUser } from '../mod.ts'
import { Context , Router } from 'Oak'
import { render } from 'Render'
import { Styles } from 'Styles'
import { users } from 'State'
import { Style, enterMatchmaking, leaveMatchmaking } from 'Misc'
import { DynamicFrame } from '../../Misc/DynamicFrame.tsx';
import { Match } from 'UI/Parts';


const router = new Router

router.get('/',async (
    context : Context<UserState> ,
    next : () => Promise<any>
) => {

    const { response , request , state } = context

    if( state.isStranger ){
        response.redirect(`/SignIn`)
        return
    }

    const user = users.get(state.userId)!

    if( ! user.locked ){

        if( request.url.searchParams.has('Search') ){

            if( user.status === 'Lobby' ){
                enterMatchmaking(user)
                ; ( user.status as any ) = 'Search'
            }

            response.redirect('/')
            return
        }

        if( request.url.searchParams.has('Lobby') ){

            if( user.status === 'Search' ){
                leaveMatchmaking(user)
                ; ( user.status as any ) = 'Lobby'
            }

            response.redirect('/')
            return
        }
    }

    return await next()

},page)



const Stylesheet = Style /* CSS */ `

    body {
        justify-content : center ;
        align-items : center ;
        display : flex ;
    }
`


async function page (
    context : Context<WithUser>
){

    const user = users.get(context.state.userId)!

    const { status } = user

    const page = (
        <html>

            <head>
                <Styles.MinimalReset />
                <Styles.Document />
                <Stylesheet />
            </head>

            <body>

                { ( status === 'Lobby' ) ? <>

                    Lobby

                    <a href = '/?Search' >
                        Search
                    </a>

                </> :
                ( status === 'Search' ) ? <>

                    Searching ...

                    <a href = '/?Lobby' >
                        Cancel
                    </a>

                </> : <>

                    <Match user = { user } />

                </> }

            </body>
        </html>
    )

    user.frame = DynamicFrame({
        response : context.response ,
        node : page
    })
}
