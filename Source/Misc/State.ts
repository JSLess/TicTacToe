
export type { UnlockedUser , LockedUser , User , UserInMatch , Field }
export { database , sessions , users }

import { AsyncResponse } from 'Misc/Async';
import { UserId } from 'Database'


const database = await Deno
    .openKv('./Data/Database.db')

const
    sessions = new Map<string,string> ,
    users = new Map<string,User>


type User = {
    userRef : UserId
} & UserLockable & UserFrame

type UserLockable =
    | UnlockedUser
    | LockedUser


type UnlockedUser = {
    locked : false
} & UserStatus

type LockedUser = {
    locked : true
} & Readonly<UserStatus>


type UserFrame = {
    frame ?: AsyncResponse
}

type UserStatus = {
    status : 'Lobby'
} | {
    status : 'Search'
} | UserInMatch


interface UserInMatch {
    status : 'Match'
    match : Match
}


interface Match {
    fields : Field[][]
    users : Array<UserId>
    turn : 1 | 2
}

type Field = 0 | 1 | 2
