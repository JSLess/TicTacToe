
export { middleware as sessionEstablish }

import { SessionState } from '../../mod.ts'
import { setCookie } from 'HTTP';
import { Context } from 'Oak'


const Duration_12_Hours = 1000 * 60 * 60 * 2


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { response , state } =
        context as Context<SessionState>

    if( ! state.sessionId )
        setCookie(response.headers,{
            sameSite : 'Lax' ,
            httpOnly : true ,
            expires : new Date( Date.now() + Duration_12_Hours ) ,
            secure : false ,
            value : crypto.randomUUID() ,
            name : 'Session' ,
            path : '/'
        })

    return await next()
}
