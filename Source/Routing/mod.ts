
export * from './Middlewares/Typing/mod.ts'
export { router }

import { Context, Router } from 'Oak'
import { isDocument } from './Misc/IsDocument.ts'

import {
    SignInRouter ,
    SignUpRouter ,
    cookiesPage ,
    HomeRouter
} from './Page/mod.ts'

import {
    sessionEstablish ,
    sessionDetermine ,
    cookiesDetermine ,
    cookiesRedirect ,
    cookiesBacklink ,
    cookiesCleanup ,
    userDetermine ,
    cookiesCheck ,
    userSignOut ,
    Paths
} from './Middlewares/mod.ts'


const router = new Router

router.use(cookiesCheck)
router.use(cookiesDetermine)
router.use(cookiesCleanup)
router.use(sessionDetermine)
router.use(sessionEstablish)

router.get(Paths.Required,cookiesBacklink,cookiesPage)

router.use(cookiesRedirect)
router.use(userDetermine)


router.use(HomeRouter.routes())
router.use('/SignOut',userSignOut)
router.use(SignInRouter.routes())
router.use(SignUpRouter.routes())


router.all('/(.*)', async (
    context : Context
) => {

    const { response , request } =
        context as Context

    if( isDocument(request) ){
        response.redirect(`/`)
        return
    }

    response.status = 404
})
