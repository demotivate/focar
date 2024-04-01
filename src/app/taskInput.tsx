'use client'

import { Client } from "@tauri-apps/api/http";
import { useRouter } from "next/navigation";

import AddTask from './page'

// export default function TaskInput(){
//     const router = useRouter()
//     return (<form action={ClientAddTask}>
//         <input name="content" type="text" placeholder="Add a task" className="basis-full input input-bordered w-full max-w-xs" />
//     </form>)
// }