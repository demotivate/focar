'use client'

import { useSearchParams, permanentRedirect } from 'next/navigation'
import { NextResponse } from 'next/server'
// import Cookies from 'js-cookie'
import { useEffect } from 'react'

// import GlobalConfig from '.././app.config.js'

// const getState = new Promise((resolve, reject) => {
//     let response = NextResponse.next()
//     const originalState = response.cookies.get('state');
//     console.log("🚀 ~ Home ~ originalState:", originalState);
//     if(originalState == undefined){
//         reject('Error in retrieving original state')
//     }
//     else{
//         resolve(originalState.value)
//     }
// })

export default function Home(){
    const searchParams = useSearchParams();
    const authRedirect = {
        code: searchParams.get('code'),
        state: searchParams.get('state')
    };
    console.log("🚀 ~ Home ~ authRedirect.state:", authRedirect.state)
    console.log("🚀 ~ Home ~ authRedirect.code:", authRedirect.code)
    const originalState = process.env.STATE
    console.log(originalState);
    if(originalState == authRedirect.state){
        permanentRedirect('/?trusted=true')
    } else {
        permanentRedirect('/?trusted=false')
    }
}