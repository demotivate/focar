import { permanentRedirect } from 'next/navigation'
import uid from 'uid2';

export default async function Home(){
    console.log("Reached auth")
    const state = uid(10);
    process.env.STATE = state
    permanentRedirect('https://todoist.com/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=data:read_write,data:delete&state=' + state)
}