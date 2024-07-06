
export { guard as onlyFamiliar }

import { UserState } from '../../mod.ts'
import { Context } from 'Oak'


const Status_No_Access = 403


async function guard (
    context : Context ,
    next : () => Promise<any>
){

    const { response , state } = context as
        Context<UserState>

    if( state.userId )
        return await next()

    response.status = Status_No_Access
}
