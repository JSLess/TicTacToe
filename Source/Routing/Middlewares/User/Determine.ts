
export { middleware as userDetermine }

import { WithSession , UserState } from '../../mod.ts'
import { sessions } from 'State'
import { Context } from 'Oak'


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const { state } = context as
        Context<WithSession & UserState>

    state.userId = sessions
        .get(state.sessionId) ?? null

    state.isFamiliar = !! state.userId
    state.isStranger = !  state.userId

    return await next()
}
