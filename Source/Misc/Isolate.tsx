
export type { Args as IsolateArgs }
export { Component as Isolate }

import { VNode , JSX } from 'preact'
import { render } from 'Render'


type Intrinsic = JSX.HTMLAttributes<HTMLIFrameElement>

type Omitted = 'children' | 'srcDoc' | 'src'

type Args =
    & Omit<Intrinsic,Omitted>
    & Content

type Content =
    | { children : VNode }
    | { html : string }


function Component (
    args : Args
){

    const html = ( 'children' in args )
        ? render(args.children) : args.html

    return <iframe srcDoc = { html } />
}
