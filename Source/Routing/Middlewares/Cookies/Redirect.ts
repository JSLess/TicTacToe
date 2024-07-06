
export { middleware as cookiesRedirect }

import { Parameters , Paths  } from './mod.ts'
import { CookieState } from '../../mod.ts'
import { isDocument } from '../../Misc/IsDocument.ts'
import { Context } from 'Oak'


const Status_No_Cookies = 422


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { response , request , state } =
        context as Context<CookieState>

    const { hasCookies } = state

    if( hasCookies === true )
        return await next()

    if( hasCookies === false ){

        if( isDocument(request) )
            response.redirect(Paths.Required)
        else
            response.status = Status_No_Cookies

        return
    }

    const { url } = request
    url.searchParams.set(Parameters.Check,'')
    response.redirect(url)
}
