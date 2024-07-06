
export type {

    Without as WithoutUser ,
    With as WithUser ,

    State as UserState
}


type State =
    | Without
    | With

interface With {
    isFamiliar : true
    isStranger : false
    userId : string
}

interface Without {
    isFamiliar : false
    isStranger : true
    userId : null
}
