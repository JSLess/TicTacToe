
export { middleware as cookiesCleanup }

import { Parameters } from './mod.ts'
import { Context } from 'Oak'


async function middleware (
    context : Context ,
    next : () => Promise<any>
){

    const search = context
        .request.url.searchParams

    search.delete(Parameters.Check)

    return await next()
}
