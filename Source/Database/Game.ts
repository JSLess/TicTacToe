
export type { GameRef , GameId , Game }
export { getGame , setGame , zapGame }

import { database } from 'State'
import { UserRef } from 'Database'


interface GameRef {
    gameRef : GameId
}

type GameId = string


interface Game {

}


const Init = {



} satisfies Game


const
    ByUser = 'Game_By_User' ,
    ById = 'Game_By_Id'


async function getGame (
    args : GameRef | UserRef
){

    const key = ( 'userRef' in args )
        ? [ ByUser , args.userRef ]
        : [ ById , args.gameRef ]

    return await database.get<Game>(key)
}


async function setGame (
    args : GameRef | UserRef ,
    game : Game
){

    const key = ( 'userRef' in args )
        ? [ ByUser , args.userRef ]
        : [ ById , args.gameRef ]

    return await database.set(key,game)
}


async function zapGame (
    args : GameRef | UserRef
){

    const key = ( 'userRef' in args )
        ? [ ByUser , args.userRef ]
        : [ ById , args.gameRef ]

    return await database.delete(key)
}
