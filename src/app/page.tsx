// ...
"use client"
import { useSearchParams, useRouter, permanentRedirect } from 'next/navigation'
import Link from "next/link";


import { invoke } from '@tauri-apps/api/tauri'
import { appWindow, WebviewWindow } from '@tauri-apps/api/window'

import Task from './task'
import ApiButton from './apiButton'
import { Component, useCallback, useState, useEffect } from 'react';
import { redirect } from 'next/dist/server/api-utils';
import uid from 'uid2';

//TODO: license acknowledgement

//TODO: save data (especially auth state)
let isAuthorized : boolean = false;

async function CheckState(state: string){
  // await typeof window !== 'undefined';
  if (typeof window !== 'undefined') {
    if(state != localStorage.getItem('todoistAuth')){
      console.log(localStorage.getItem('todoistAuth'));
      console.log("States do not match! Authorization aborted.")
    } else {
      console.log("States match")
    }
  }
}

export default function Home() {
  const searchParams = useSearchParams();
  const authRedirect = {
    code: searchParams.get('code'),
    state: searchParams.get('state')
  };
  console.log("🚀 ~ Home ~ authRedirect.state:", authRedirect.state)
  console.log("🚀 ~ Home ~ authRedirect.code:", authRedirect.code)

  // TODO: this bullshit
  // localStorage.setItem('todoistAuth', JSON.stringify(authData));
  // const authData = JSON.parse(localStorage.getItem('todoistAuth'));


  return (
    <div data-theme="dark">
      <div id='navbar' className="navbar bg-base-100">
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
          <Link
          // href={
          //   'https://todoist.com/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=data:read_write,data:delete&state=' + uid(10)
          // }
          // href=""
          // onClick={
          //   () => {
          //     console.log("click")
          //     permanentRedirect('https://todoist.com/oauth/authorize?client_id=' + process.env.CLIENT_ID + '&scope=data:read_write,data:delete&state=' + uid(10))
          //   }
          // }
          href='/auth'
          className="btn btn-ghost text-xl">authenticate</Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </button>
        </div>
      </div>

      <div id='body' className='flex flex-col px-12 justify-center bg-base-100'>
        <Task></Task>
        <Task></Task>
      </div>

      <div id='entry' className='bg-base-100'>

      </div>
    </div>
  )
}