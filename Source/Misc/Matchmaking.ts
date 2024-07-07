
export { leaveMatchmaking , enterMatchmaking }

import { UserId } from 'Database'
import { delay } from 'Async'
import { Field, User, UserInMatch, users } from 'State';



const searching = new Set<User>


function enterMatchmaking (
    user : User
){
    searching.add(user)
}

function leaveMatchmaking (
    user : User
){
    searching.delete(user)
}



setTimeout( async () => {

    while ( true ){

        if( searching.size > 1 ){

            console.debug(`Attempting matchmaking`)

            const array = searching.values()

            let players = new Array<User>

            while ( true ){

                const value = array.next()

                if( value.done )
                    break

                const user = value.value

                if( ! searching.has(user) )
                    continue

                user.locked = true

                players.push(user)

                if( players.length === 2 ){
                    createMatch(players)
                    players = []
                }
            }

            if( players.length === 2 )
                createMatch(players)
            else
            if( players.length === 1 )
                players[ 0 ].locked = false
        }

        await delay(3000)
    }
})


function createMatch (
    players : Array<User>
){

    console.debug('Creating match',players)

    const [ playerA , playerB ] = players

    const match = {
        fields : new Array(3).fill(null).map(() => new Array(3).fill(0)) as Field[][] ,
        users : [ playerA.userRef , playerB.userRef ] ,
        turn : 1 as const
    }

    console.debug('Match',match)

    for ( const player of players ){

        const matching = ( player as UserInMatch )

        matching.status = 'Match'
        matching.match = match

        searching.delete(player)
        player.frame?.refresh()
        player.locked = false
    }
}
