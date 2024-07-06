
export type { UnlockedUser , LockedUser , User }
export { database , sessions , users }

import { UserRef } from 'Database'


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
} & UserStatus

type LockedUser = {
    locked : true
} & Readonly<UserStatus>


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
