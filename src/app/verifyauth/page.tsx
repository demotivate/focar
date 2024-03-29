'use client'

import { useSearchParams, permanentRedirect } from 'next/navigation'

export default function Home(){
    const searchParams = useSearchParams();
    const authRedirect = {
        code: searchParams.get('code'),
        state: searchParams.get('state')
    };
    const originalState = process.env.STATE
    if(originalState == authRedirect.state){
        process.env.CODE = String(authRedirect.code)
        permanentRedirect('/token')
    } else {
        permanentRedirect('/?trusted=false')
    }
}