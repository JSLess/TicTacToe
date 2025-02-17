
export { Sheet as Style }

import { Style } from 'Misc'


const Sheet = Style /* CSS */ `

    :root {
        --background : #1c1817 ;
        --secondary : #1a2c2d ;
        --primary : #5e6d6e ;
        --accent : #bf3831 ;
        --text : #f5f9f9 ;
    }


    * ,
    *::before ,
    *::after {
        box-sizing : border-box ;
    }

    * {
        font-family : monospace ;
        font-size : 18px ;
        color : var( --text ) ;
        margin : 0 ;
        padding : 0 ;
        min-width : 0 ;
    }

    html {
        color-scheme : dark light ;
        hanging-punctuation : first last ;
    }

    body {
        background : var( --background ) ;
        min-height : 100dvh ;
        display : flex ;
        justify-content : center ;
        /* max-height : 100dvh ; */
        /* overflow : clip ; */
    }

    main {

        max-width : 1000px ;

        overflow : clip ;

        display: grid;
        grid-template-columns: 1fr ;
        gap : 1rem ;

        margin-block : 2rem ;
    }

    picture , video , img , svg {
        max-width : 100% ;
        display : block ;
    }

    h1 , h2 , h3 , h4 , h5 , h6 {
        text-wrap : balance ;
    }

    li , p {
        max-width : 60ch ;
        text-wrap : pretty ;
    }



    h1 {
        font-size : 2rem ;
    }




    .Sidebar {
        border: 2px solid var(--primary);
        border-radius: 8px;
        height : calc( 100% - 4px ) ;
        display : none ;
    }

    .Sidebar > div {
        width : 60px ;
        height : 60px ;
        padding : 20% ;
        cursor : pointer ;
    }

    .Sidebar > div > div {
        background : var( --primary ) ;
        mask-clip: padding-box;
        mask-repeat: no-repeat;
        mask-position: center;
        mask-size: contain;
        width : 100% ;
        height : 100% ;
    }

    .Sidebar > div:hover > div {
        background : white ;
    }

    .Sidebar svg {
        width :100% ;
        height : 100% ;
        fill : white ;
    }

    .Main {
        flex-direction : column ;
        align-items: center;
        display : flex ;
        padding : 0 4rem ;
        gap : 2rem ;
    }

    #Messages {

        background : var( --primary ) ;

        max-width : 100% ;
        width : 100% ;
        height : 600px ;

        border-radius : 8px ;
        border : none ;
    }

    iframe {
        border : none ;
    }




    .TestingA:active {
        background-image : url(/Action/Test?wow=1) ;
    }

    .TestingB:active {
        background-image : url(/Action/Test?wow=2) ;
    }


    #Auth {
        flex-direction : column ;
        align-items : center ;
        display : flex ;
        gap : 2rem ;
    }


    #Input {
        height : 50px ;
        width : 100% ;
    }


    #Chatting {
        width : 100% ;
        position: relative;
    }

    #Logout {
        height : 50px ;
    }

    #Register {
        height : 50px ;
    }

    #Overlay {
        background : #ffffff1a ;
        position : fixed ;
        inset : 0 ;
        display : none ;
        z-index : 1000 ;
    }


    /*

    #Chatting {
        background-image: linear-gradient(white 1px, transparent 2px), linear-gradient(90deg, white 1px, transparent 2px);
        background-size: 20px 20px;
        background-position: 0 0;

        animation-name: test;
        animation-direction : normal;
        animation-fill-mode: forwards;
        animation-duration: 10s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;

        width: 100%;
    min-height: 600vh;
    max-width: 600px;
    }

    .Main {
        perspective: 1000px;
        perspective-origin: 50% 50%;
        position: absolute;
    inset: 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    }

    #Messages {
        background : none ! important ;
    }

    @keyframes test {

        from {
            transform: rotateX(80deg) translateY(0) translateZ(260vh)
        }

        to {
            transform: rotateX(80deg) translateY(-200vh) translateZ(260vh)
        }
    } */


    #LoggedIn {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap : 1rem ;
    }


    .AccountId {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .AccountId input {
        display : none ;
    }

    .AccountId label {
        border-radius: 5px;
        background: transparent;
        border : 1px solid var( --primary ) ;
        padding: 10px;
        height: 100%;
        width: 100%;
        cursor: pointer;
        color : var( --primary ) ;
        font-weight : bold ;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .AccountId input:not(:checked) ~ label::before {
        content : '•••• •••• •••• ••••' ;
        color : var(--primary) ;
        position: absolute;
        padding: 10px;
        white-space: nowrap;
        height: fit-content;
        width: fit-content;
        left: 50%;
        top: 50%;
        translate: -50% calc( -50% + 3px);
        line-height: 1;
    }

    .AccountId input:checked ~ label {
        color: white !important;
        text-align: center;
        letter-spacing: 0.1rem;
    }


    #Reactions_Window {
        position: absolute;
        top: -1rem;
        right: 4rem;
        width: 20rem;
        height: 25rem;
        z-index : 1100 ;
        display : none ;
    }




    .Button {

        display : grid ;

        aspect-ratio : 1 ;
        width : 32px ;
    }

    .Button > * {

        grid-area : 1 / 1 ;

        height : 100% ;
        width : 100% ;
    }
`
