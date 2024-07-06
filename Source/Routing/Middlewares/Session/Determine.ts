
export { middleware as sessionDetermine }

import { SessionState } from '../../mod.ts'
import { Cookies } from './mod.ts'
import { Context } from 'Oak'


const Pattern_Session_Id = /^[-0-9A-F]{36}$/i


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { cookies , state } =
        context as Context<SessionState>

    state.sessionId = null

    const sessionId = await cookies.get(Cookies.Id)

    if( sessionId && Pattern_Session_Id.test(sessionId) )
        state.sessionId = sessionId

    return await next()
}
