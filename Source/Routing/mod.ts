
export * from './Middlewares/Typing/mod.ts'
export { router }

import { Context, Router, STATUS_TEXT } from 'Oak'
import { isDocument } from './Misc/IsDocument.ts'

import {
    SignInRouter ,
    SignUpRouter ,
    cookiesPage ,
    HomeRouter
} from './Page/mod.ts'

import {
    sessionEstablish ,
    sessionDetermine ,
    cookiesDetermine ,
    cookiesRedirect ,
    cookiesBacklink ,
    cookiesCleanup ,
    userDetermine ,
    cookiesCheck ,
    userSignOut ,
    Paths
} from './Middlewares/mod.ts'
import { FieldLink } from 'UI/Parts';
import { render } from 'Preact/Render';
import { User, users } from 'State';
import { UserState } from './Middlewares/Typing/mod.ts';
import { Style } from 'Misc';


const router = new Router

router.use(cookiesCheck)
router.use(cookiesDetermine)
router.use(cookiesCleanup)
router.use(sessionDetermine)
router.use(sessionEstablish)

router.get(Paths.Required,cookiesBacklink,cookiesPage)

router.use(cookiesRedirect)
router.use(userDetermine)


router.use(HomeRouter.routes())
router.use('/SignOut',userSignOut)
router.use(SignInRouter.routes())
router.use(SignUpRouter.routes())

router.use('/Frame/Field',( context ) => {

    const { response , request , state } =
        context as unknown as Context<UserState>

    if( state.isStranger ){
        response.status = 400
        response.body = `User is stranger`
        return
    }

    const user = users.get(state.userId)!

    if( user.status !== 'Match' ){
        response.status = 400
        response.body = `User isn't in match`
        return
    }


    const parameters = request.url.searchParams

    const y_ = parameters.get('Y')

    if( ! y_ ){
        response.status = 400
        response.body = `No Y value given`
        return
    }

    const y = Number(y_)

    if( y < 0 || y > 2 ){
        response.status = 400
        response.body = `Invalid Y value`
        return
    }


    const x_ = parameters.get('X')

    if( ! x_ ){
        response.status = 400
        response.body = `No X value given`
        return
    }

    const x = Number(x_)

    if( x < 0 || x > 2 ){
        response.status = 400
        response.body = `Invalid X value`
        return
    }


    if( ! user.locked ){

        ( user.locked as any ) = true

        const playerIndex = user.match.users.indexOf(user.userRef) + 1

        console.debug('Turn',user.match.turn,playerIndex)

        if( user.match.turn === playerIndex ){

            const field = user.match.fields[ y ][ x ]

            console.debug('Field',field)

            if( field === 0 ){

                user.match.fields[ y ][ x ] = playerIndex
                user.match.turn = ( playerIndex === 2 ) ? 1 : 2

                for ( const player of user.match.users ){

                    const user = users.get(player)

                    console.debug('User',user,player,users)

                    user?.frame?.write(
                        Style /* CSS */ `

                            :root {
                                --Field-${ y }-${ x } : ${ playerIndex } ;
                            }

                        `()
                    )
                }
            }
        }

        ( user.locked as any ) = false
    }

    response.body = `<!DOCTYPE html>` + render(FieldLink({ y , x }))
})


router.all('/(.*)', async (
    context : Context
) => {

    const { response , request } =
        context as Context

    if( isDocument(request) ){
        response.redirect(`/`)
        return
    }

    response.status = 404
})
