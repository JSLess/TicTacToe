
export { attemptSignUp }

import { randomBigInt } from './Random.ts'
import { signUp } from 'Database'
import { signIn } from 'Misc'
import { delay } from 'Async'
import { ulid } from 'ULID'


const Duration_SignUp = 1000


async function attemptSignUp (
    sessionRef : string
){

    const before = Date.now()

    const userRef = ulid()

    let accountRef : bigint ,
        attempts = 0 ,
        ok = false

    while ( true ){

        attempts++

        accountRef = randomBigInt(16)

        const result = await signUp({
            accountRef ,
            userRef
        })

        ok = result.ok

        if( ok )
            break

        if( attempts > 10 )
            break
    }

    const after = Date.now()

    const remaining = Duration_SignUp - ( after - before )

    await delay(remaining)

    if( ok )
        signIn(sessionRef,userRef)

    const result = ( ok )
        ? userRef : null

    return Promise.resolve(result)
}
