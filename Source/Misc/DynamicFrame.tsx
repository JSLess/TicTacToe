
export type { Props as FrameProps }
export { Component as DynamicFrame }

import { ComponentChildren, Fragment } from 'preact'
import { AsyncResponse } from 'Misc/Async'
import { WithSession } from '../Routing/Middlewares/Typing/mod.ts'
import { Context, Response } from 'Oak'
import { render } from 'Render'


interface Props {
    children : ComponentChildren
    response : Response
}


function Component (
    props : Props
){

    const { response , children } = props

    const wrapper = Fragment({ children })!

    const html = render(wrapper)


    const { headers } = response
    headers.set('Content-Type','text/html;charset=utf-8')
    headers.set('Connection','keep-alive')
    headers.set('Keep-Alive',`timeout=${ 60 * 60 }`)


    const frame = new AsyncResponse
    response.body = frame.readable
    frame.write(html)

    return frame
}
