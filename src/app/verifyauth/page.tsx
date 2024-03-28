'use client'

import { useSearchParams, permanentRedirect } from 'next/navigation'

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
        process.env.CODE = String(authRedirect.code)
        permanentRedirect('/token')
    } else {
        permanentRedirect('/?trusted=false')
    }
}