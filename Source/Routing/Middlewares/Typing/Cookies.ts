
export type {

    Unknown as UnknownCookies ,
    Without as WithoutCookies ,
    With as WithCookies ,

    State as CookieState
}


type Unknown = State<'Unknown'>
type Without = State<false>
type With = State<true>

type States = 'Unknown' | false | true

interface State <
    HasCookies extends States = States
>{
    hasCookies : HasCookies
}
