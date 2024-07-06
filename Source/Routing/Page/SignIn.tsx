
export { router as SignInRouter }

import { UserState, WithSession } from '../mod.ts'
import { Context , Router } from 'Oak'
import { Style , signIn } from 'Misc'
import { getUserId } from '../../Database/User.ts'
import { render } from 'Render'
import { Styles } from 'Styles'


const router = new Router

router.get('/SignIn',async (
    context : Context<UserState> ,
    next : () => Promise<any>
) => {

    const { response , state } = context

    if( state.isFamiliar ){
        response.redirect(`/`)
        return
    }

    return await next()

},page)


router.post('/API/SignIn',async (
    context : Context
) => {

    const { response , request , state } =
        context as Context<WithSession>

    const form = await request.body.formData()

    const accountId = form.get('Account')

    if( ! accountId ){
        response.redirect('/SignIn')
        return
    }

    const string = accountId.toString()

    if( ! /^\d+$/.test(string) ){
        response.redirect('/SignIn')
        return
    }

    const accountRef = BigInt(string)

    const userRef = await getUserId(accountRef)

    if( ! userRef.value ){
        response.redirect('/SignIn')
        return
    }

    signIn(state.sessionId,userRef.value)

    response.redirect('/')
})


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
        display : flex ;
        align-items : center ;
        justify-content : center ;
    }

    div {
        flex-direction : column ;
        display : flex ;
        gap : 2rem ;
    }

    form {

        flex-direction : column ;
        justify-content: center;
        align-items : center ;
        display : flex ;
        gap : 0.5rem ;

        position : relative ;
        margin-top : 0.3em ;
        min-width : 18rem ;
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

    form > input[ type = password ]:is( :valid , :focus-within ){
        letter-spacing : 0 ;
    }

    input[ type = password ]:not(:placeholder-shown):invalid ~ label ,
    input[ type = password ]:not(:placeholder-shown):invalid {
        border-color : var( --accent ) ;
    }

    input[ type = password ]:valid ~ label ,
    input[ type = password ]:valid {
        border-color : var( --positive ) ;
    }

    form > label {
        position : absolute ;
        pointer-events : none ;
        color : var( --text ) ;
        font-size : 0.6em ;
        letter-spacing : 0.2em ;
        text-transform : uppercase ;
        font-weight : bold ;
        background : #212728 ;
        inset: auto calc(50% - 8ch) ;
        transform: none;
        top: calc( 1px - 0.6em );
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid gray;
        border-width : 0 1px ;
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

    input[ type = submit ]:focus-within {
        border-color : var( --accent ) ;
        color : var( --accent ) ;
    }

    input[ type = submit ]:hover {
        border-color : var( --primary ) ;
        background : var(--primary) ;
        color : white ;
    }

    input[ type = password ]:invalid ~ input[ type = submit ] {
        pointer-events : none ;
        user-select : default ;
        opacity : 0.5 ;
    }

    input {
        width : 100% ;
    }

    a {
        border : none ;
        inset : 0 ;
        padding : 10px ;
        background : transparent ;
        outline : none ;
        font-size : 1em ;
        transition : 0.24s ;
        letter-spacing: 1px;
        text-align: center;
        border : 1px solid var( --primary ) ;
        border-radius : 5px ;
        cursor: pointer;
        color : var( --primary ) ;
        font-weight : bold ;
        text-decoration : none ;
    }

    a:hover {
        border-color : var( --primary ) ;
        background : var(--primary) ;
        color : white ;
    }

    a:focus-within {
        border-color : var( --accent ) ;
        color : var( --accent ) ;
    }
`


async function page (
    context : Context<UserState>
){

    const page = (
        <html>

            <head>
                <Styles.MinimalReset />
                <Styles.Document />
                <Stylesheet />
            </head>

            <body>
                <div>

                    <form
                        autocomplete = 'on'
                        target = '_parent'
                        action = '/API/SignIn'
                        method = 'post'
                        id = 'Login'
                    >

                        <input
                            autocomplete = 'current-password'
                            placeholder = '0000 0000 0000 0000'
                            inputmode = 'numeric'
                            minlength = { 16 }
                            maxlength = { 16 }
                            required = { true }
                            pattern = '\d{16}'
                            type = 'password'
                            name = 'Account'
                            size = { 19 }
                        />

                        <label> Account Id </label>

                        <input
                            value = 'Login'
                            type = 'submit'
                        />

                    </form>

                    <a href = '/SignUp' > Register </a>

                </div>
            </body>
        </html>
    )

    context.response.body = render(page)
}
