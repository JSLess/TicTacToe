
export type { UserRef , UserId }
export { isUserId , getUserId , zapUserId }
export { ByAccount as UserRef_By_AccountRef}

import { AccountId } from 'Database'
import { database } from 'State'


interface UserRef {
    userRef : UserId
}

type UserId = string


const ByAccount = 'UserId_By_Account'


function isUserId (
    ref : AccountId | UserId
) : ref is UserId {
    return ( typeof ref === 'bigint' )
}


async function getUserId (
    accountRef : AccountId
){

    const key = [ ByAccount , accountRef ] as const

    return await database.get<UserId>(key)
}


async function zapUserId (
    accountRef : AccountId
){

    const key = [ ByAccount , accountRef ] as const

    return await database.delete(key)
}
