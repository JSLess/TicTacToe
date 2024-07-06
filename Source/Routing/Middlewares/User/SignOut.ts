
export { middleware as userSignOut }

import { WithSession , UserState } from '../../mod.ts'
import { sessions, users } from 'State'
import { Context } from 'Oak'


async function middleware (
    context : Context
){

    const { response , state } = context as
        Context<WithSession & UserState>

    if( state.isFamiliar ){

        sessions.delete(state.sessionId)
        users.delete(state.userId)

        ; ( state.userId as any ) = null
    }

    response.redirect('/')
}
