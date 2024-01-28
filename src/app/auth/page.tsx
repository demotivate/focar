

import { permanentRedirect } from 'next/navigation'
import uid from 'uid2';
import { useEffect } from "react";

async function SaveState(state: string){
    // await typeof window !== 'undefined';
    if (typeof window !== 'undefined') {
        localStorage.setItem('todoistAuth', state);
    }
}

export default async function Home(){
    console.log("Reached auth")

    const state = uid(10);
    SaveState(state);

    // const authData = localStorage.getItem('todoistAuth');

    permanentRedirect('https://todoist.com/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=data:read_write,data:delete&state=' + state)
}