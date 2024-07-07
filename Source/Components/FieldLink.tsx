
export type { Args as FieldLinkArgs }
export { Component as FieldLink }


interface Args {
    y : number
    x : number
}


function Component (
    { y , x } : Args
){

    const href = `/Frame/Field?Y=${ y }&X=${ x }`

    return (
        <a
            draggable = { false }
            href = { href }

            style = { `
                background : #FF000044 ;
                position : absolute ;
                inset : 0 ;
            ` }
        />
    )
}
