
export { middleware as cookiesBacklink }

import { CookieState } from '../../mod.ts'
import { Context } from 'Oak'


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { response , state } =
        context as Context<CookieState>

    const { hasCookies } = state

    if( hasCookies === true ){
        response.redirect(`/`)
        return
    }

    return await next()
}
