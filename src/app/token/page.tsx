'use server'

import { permanentRedirect } from "next/navigation";

async function CompleteAuthorization(){
    const code = process.env.CODE
    try {
      const res = await fetch('https://todoist.com/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + code,
        {
            method: 'POST',
        })
      console.log('https://todoist.com/oauth/access_token?client_id=' + process.env.CLIENT_ID + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + code);
      const data = await res.json();
      process.env.TOKEN = data.access_token
      process.env.STATE = 'unauthorized'
      process.env.CODE = 'unauthorized'
    }
    catch (err){
      console.log("ERROR: " + err);
    }
}

// app/form/page.js
// export async function POST(req : any) {
//     const data = await req.json(); // Parse JSON request body

//     // Do something with the received data (e.g., save to database)
//     console.log('Received data:', data);

//     // Return a response
//     return new Response(JSON.stringify({ message: 'Data received!' }), {
//         status: 201, // Created
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
// }


export default async function Home(){
    await CompleteAuthorization();
    permanentRedirect('/')
}