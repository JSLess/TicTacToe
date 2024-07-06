
export type { Statistics }
export { getStatistic , setStatistic }
export { By_User as Statistics_By_UserRef }
export { Inits as StatisticsInit }

import { AccountId } from 'Database'
import { database } from 'State'


interface Statistics {

    totals : {
        losses : number
        draws : number
        wins : number
    }
}


const Inits = {

    totals : {
        losses : 0 ,
        draws : 0 ,
        wins : 0
    }

} satisfies Statistics


const By_User = 'Statistics_By_User'


async function getStatistic (
    accountRef : AccountId
){
    return await database.get<Statistics>
        ([ By_User , accountRef ])
}


async function setStatistic (
    accountRef : AccountId ,
    outcome : 'Win' | 'Loss' | 'Draw'
){

    const statistics = await getStatistic(accountRef)

    const clone = structuredClone(statistics.value)

    const updated = {
        ... clone ,
        ... Inits
    }

    const { totals } = updated

    switch ( outcome ){
    case 'Loss' : totals.losses++ ; break
    case 'Draw' : totals.draws++ ; break
    case 'Win' : totals.wins++  ; break
    }

    const key = [ By_User , accountRef]

    return database
        .atomic()
        .check(statistics)
        .set(key,updated)
        .commit()
}
