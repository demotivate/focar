// ...
"use server"

import Link from "next/link";

import { TodoistApi } from '@doist/todoist-api-typescript'

import Task from './task'
import RefreshPage from "./refreshPage";
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { revalidatePath } from "next/cache";
import { RefreshCache } from "./refresh-cache";

//TODO: license acknowledgement

// Definition of task
// id: string; order: number; content: string; description: string; projectId: string; isCompleted: boolean; labels: string[]; priority: number; commentCount: number; createdAt: string; url: string; creatorId: string;
interface TaskData {
  id: string,
  assignerId: string,
  assigneeId: string,
  projectId: string,
  sectionId: string,
  parentId: string,
  order: number,
  content: string,
  description: string,
  isCompleted: boolean,
  labels: string[],
  priority: number,
  commentCount: number,
  creatorId: string,
  createdAt: string,
  due: {
      date: string,
      string: string, //string version of date
      lang: string,
      isRecurring: boolean,
  },
  url: string,
  duration: any
}

interface ClientTaskData{
  id: string,
  order: number,
  content: string,
  description: string,
  projectId: string,
  isCompleted: boolean,
  labels: string[],
  priority: number,
  commentCount: number,
  createdAt: string,
  url: string,
  creatorId: string;
}

// Create and store api interface with todoist
const api = new TodoistApi(String(process.env.TOKEN))

// Returns array of objects that define each task
async function getTasks() : Promise<any> {
  return await api.getTasks()
  .then((res) => {
    return res
  })
  .catch((error) => {
    console.log("Error!: " + error)
    return []
  })
}

async function refreshTasks() {
  const tasks = await getTasks();
  // console.log(await tasks)
  taskRow = []
  return await tasks.forEach((task: TaskData) => {
    taskRow.push(<Task {...task} key={task.id}></Task>)
    // revalidatePath('/')
  })
}

let wasTaskAdded = false;
async function AddTask(formData: FormData) {
  'use server'

  const taskInfo = {
    content: formData.get('content'),
  }

  // const router = useRouter();

  return api.addTask({
      content: taskInfo.content,
  })
    .then((res) => {
      const task : ClientTaskData = res
      console.log(task)
      // refreshTasks()
      //   .then(() => {
      //     console.log("then reached")
      //     // router.refresh();
      //     revalidatePath('/')
      //   });
      // taskRow.push(<Task {...task} key={task.id}></Task>)
      wasTaskAdded = true;
    })
    .catch((error) => console.log(error))
}

let taskRow : any[] = [];

export default async function Home() {
  const tasks = await getTasks();
  await refreshTasks();
  // console.log(await tasks)

  async function checkIfTaskAdded() {
    'use server';
    // const currTasks = await getTasks();
    // const didChange = taskRow.length != await currTasks.length

    if(wasTaskAdded){
      revalidatePath("/")
    }

    console.log("wasTaskAdded?", wasTaskAdded)
    wasTaskAdded = false;
  }

  return (
    <div data-theme="dark">
      <div className="flex flex-col">
        <div id='navbar' className="basis-1/12 navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Tasks</a></li>
                <li><a>My Day</a></li>
                <li><a>My Week</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            {/* {process.env.TOKEN == 'unauthorized' ? (
              <Link
              href='/auth'
              className="btn btn-ghost text-xl">authenticate</Link>
            ) :
            <Link
            href='/auth'
            className="btn btn-ghost text-xl">logout</Link>} */}
            <Link
            href='/auth'
            className="btn btn-ghost text-xl">authenticate</Link>
          </div>
          <div className="navbar-end">
            <Link href='/'>refresh</Link>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>
            </button>
            <button className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
            </button>
          </div>
        </div>

        <div id='body' className='basis-5/6 flex flex-col px-12 justify-center bg-base-100'>
          {/* {
            await tasks.forEach((task: TaskData) => {
              taskRow.push(<Task {...task} key={task.id}></Task>)
            })
          } */}
          <div>{...taskRow}</div>
        </div>

        <RefreshCache check={checkIfTaskAdded}/>
        <div id='entry' className='basis-1/12 flex flex-row px-12 justify-center bg-base-100'>
          <form action={AddTask}>
            <input name="content" type="text" placeholder="Add a task" className="basis-full input input-bordered w-full max-w-xs" />
          </form>
          {/* <form action={checkIfTaskAdded}>
            <button type="submit">Check if changed</button>
          </form> */}
        </div>
      </div>
    </div>
  )
}