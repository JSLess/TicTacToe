
export { middleware as cookiesCheck }

import { CookieState } from '../../mod.ts'
import { Context } from 'Oak'


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { cookies , state } =
        context as Context<CookieState>

    state.hasCookies = !! ( await cookies.size )

    return await next()
}
