
export type {

    Without as WithoutSession ,
    With as WithSession ,

    State as SessionState
}


type Without = State<null>
type With = State<string>

type States = null | string

interface State <
    SessionId extends States = States
>{
    sessionId : SessionId
}
