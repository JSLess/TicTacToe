
export { router as SignUpRouter }

import { WithSession , UserState , WithUser } from '../mod.ts'
import { attemptSignUp , Style } from 'Misc'
import { Context , Router } from 'Oak'
import { getAccountId } from 'Database'
import { render } from 'Render'
import { Styles } from 'Styles'


const router = new Router

router.get('/SignUp',async (
    context : Context ,
    next : () => Promise<any>
) => {

    const { response , state } = context as
        Context<WithSession & UserState>

    if( state.isFamiliar ){
        response.redirect(`/`)
        return
    }

    const userRef = await
        attemptSignUp(state.sessionId)

    if( userRef )
        ( state.userId as any ) = userRef

    return await next()

},page)


const Stylesheet = Style /* CSS */ `

    :root {
        --background : #1c1817 ;
        --secondary : #1a2c2d ;
        --primary : #5e6d6e ;
        --accent : #bf3831 ;
        --text : #f5f9f9 ;
        --positive : green ;
    }


    * {
        font-family : monospace ;
        font-size : 18px ;
        color : var( --text ) ;
        box-sizing: border-box;
    }

    html {
        color : red ;
    }

    html {
        overflow : clip ;
    }

    body {
        margin : 0 ;
    }


    form {
        position : relative ;
        display : flex ;
        justify-content: center;
    }


    form > input {
        border : none ;
        inset : 0 ;
        padding : 10px ;
        padding-top : 16px ;
        background : transparent ;
        outline : none ;
        color : var( --text ) ;
        font-size : 1em ;
        transition : 0.24s ;
        letter-spacing: 1px;
        text-align: center;
        border : 1px solid var( --primary ) ;
        border-radius : 5px ;
    }



    input[ type = submit ]{
        outline: none;
        background: transparent;
        padding: 10px;
        cursor: pointer;
        transition : 0.25s ;
        color : var( --primary ) ;
        font-weight : bold ;
    }


    input[ type = submit ]:hover {
        border-color : var( --primary ) ;
        background : var(--primary) ;
        color : white ;
    }

    form {
        flex-direction : column ;
        display : flex ;
        align-items : stretch ;
        gap : 0.5rem ;
    }

    input {
        width : 100% ;
        height : 100% ;
    }

`


async function page (
    context : Context<WithUser>
){

    const userRef = context.state.userId

    const accountRef = await getAccountId(userRef)

    const page = (
        <html>

            <head>
                <Styles.MinimalReset />
                <Styles.Document />
                <Stylesheet />
            </head>

            <body>
                AccountRef : { accountRef.value }
            </body>

            <meta
                http-equiv = 'refresh'
                content = '0'
            />

        </html>
    )

    context.response.body = render(page)
}
