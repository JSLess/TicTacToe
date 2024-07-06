
export type { Args as SignUpArgs }
export { signUp }

import { Statistics_By_UserRef , StatisticsInit  } from './Statistic.ts'
import { AccountRef_By_UserRef , AccountId } from './Account.ts'
import { UserRef_By_AccountRef , UserId } from './User.ts'
import { database } from 'State'


interface Args {
    accountRef : AccountId
    userRef : UserId
}


async function signUp (
    { accountRef , userRef } : Args
){

    const
        statisticsKey = [ Statistics_By_UserRef , userRef ] as const ,
        accountKey = [ AccountRef_By_UserRef , accountRef ] as const ,
        userKey = [ UserRef_By_AccountRef , userRef ] as const

    return await database
        .atomic()
        .check({ key : accountKey , versionstamp : null })
        .set(statisticsKey,StatisticsInit)
        .set(accountKey,userRef)
        .set(userKey,accountRef)
        .commit()
}
