import { permanentRedirect } from 'next/navigation'
import { NextResponse } from 'next/server'
import Cookies from 'js-cookie'
import uid from 'uid2';
import { useEffect } from "react";

import GlobalConfig from '.././app.config.js'

// async function SaveState(state: string){
//     // await typeof window !== 'undefined';
//     if (typeof window !== 'undefined') {
//         localStorage.setItem('todoistAuth', state);
//     }
// }

// const response = NextResponse.next()

// const setState = new Promise((resolve, reject) => {
//     const state = uid(10);
//     // Set a cookie to hide the banner
//     response.cookies.set('state', state, { path: '/verifyauth' })
//     console.log("🚀 ~ setState ~ state:", state)
//     console.log(response.cookies.get('state'))
//     resolve(state)
// })

// const dealState = async() => {
//     setState
//     .then(value => {
//         // state = value
//         console.log(response.cookies.get('state'))
//         return value
//         // return NextResponse.redirect(new URL('https://todoist.com/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=data:read_write,data:delete&state=' + state))
//     })
// }

export default async function Home(){
    console.log("Reached auth")
    // SaveState(state);\
    // const state = await dealState()
    const state = uid(10);
    console.log(process.env.STATE)
    process.env.STATE = state
    console.log(process.env.STATE)
    permanentRedirect('https://todoist.com/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=data:read_write,data:delete&state=' + state)
    // const authData = localStorage.getItem('todoistAuth');

    
}