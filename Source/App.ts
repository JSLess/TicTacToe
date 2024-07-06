
import { Application } from 'Oak'
import { router } from './Routing/mod.ts'


const app = new Application({
    logErrors : false
})


app.use(router.routes())
app.use(router.allowedMethods())


app.addEventListener('error',( event ) => {

    event.stopImmediatePropagation()
    event.preventDefault()

    console.error(event)

    if( event.message === `connection closed before message completed` )
        return

    if( event.error instanceof Error ){

        if( event.error.message === `connection closed before message completed` )
            return
    }

    console.error(event)
})


await app.listen({
    port : 9000
})

