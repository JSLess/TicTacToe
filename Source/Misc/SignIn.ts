
export { signIn }

import { sessions , users } from 'State'


function signIn (
    sessionRef : string ,
    userRef : string
){
    sessions.set(sessionRef,userRef)
    users.set(userRef,{})
}
