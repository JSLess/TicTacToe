
export { middleware as cookiesDetermine }

import { Parameters , Paths } from './mod.ts'
import { CookieState } from '../../mod.ts'
import { Context } from 'Oak'


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { request , state } =
        context as Context<CookieState>

    if( state.hasCookies !== true ){

        const { searchParams , pathname } = request.url

        if( searchParams.get(Parameters.Check) !== null ){
            state.hasCookies = false
        } else
        if( pathname === Paths.Required ){
            state.hasCookies = false
        } else {
            state.hasCookies = 'Unknown'
        }
    }

    return await next()
}
