
export type { UnlockedUser , LockedUser , User }
export { database , sessions , users }

import { UserRef } from 'Database'
import { AsyncResponse } from 'Misc/Async';


const database = await Deno
    .openKv('./Data/Database.db')

const
    sessions = new Map<string,string> ,
    users = new Map<string,User>


type User =
    | UnlockedUser
    | LockedUser


type UnlockedUser = {
    locked : false
} & UserFrame & UserStatus

type LockedUser = {
    locked : true
} & UserFrame & Readonly<UserStatus>


type UserFrame = {
    frame ?: AsyncResponse
}

type UserStatus = {
    status : 'Lobby'
} | {
    status : 'Search'
} | {
    status : 'Match'
    match : Match
}


interface Match {
    fields : Field[][]
    users : [ UserRef , UserRef ]
    turn : 1 | 2
}

type Field = 0 | 1 | 2
