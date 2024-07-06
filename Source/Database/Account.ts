
export type { AccountId }
export { isAccountId , getAccountId , setAccountId , zapAccountId }
export { ByUser as AccountRef_By_UserRef }

import { database } from 'State'
import { UserId } from 'Database'


type AccountId = bigint


const ByUser = 'UserId_By_Account'


function isAccountId (
    ref : AccountId | UserId
) : ref is AccountId {
    return ( typeof ref === 'string' )
}


async function getAccountId (
    userRef : UserId
){

    const key = [ ByUser , userRef ] as const

    return await database.get<AccountId>(key)
}


async function setAccountId (
    userRef : UserId ,
    accountRef : AccountId
){

    const key = [ ByUser , userRef ] as const

    return await database.set(key,accountRef)
}


async function zapAccountId (
    userRef : AccountId
){

    const key = [ ByUser , userRef ] as const

    return await database.delete(key)
}
