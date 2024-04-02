'use client'

import { useEffect, useState } from 'react';
import { useTimer } from 'react-timer-hook'
import { TodoistApi, isSuccess } from '@doist/todoist-api-typescript'
import dateFormat from "dateformat";

interface TaskData {
    del: Function,
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
    labels: Array<any>,
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
    duration: any,
}

const api = new TodoistApi(String(process.env.TOKEN))
let prevTime = 300;

function MyTimer(expiryTimestamp:any, autoStart:boolean) {
    const {
      totalSeconds,
      seconds,
      minutes,
      hours,
      days,
      isRunning,
      start,
      pause,
      resume,
      restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  
  
    return (
      <div>
        <div style={{fontSize: '36px'}}>
            <span>{minutes}</span>:<span>{seconds}</span>
        </div>
        {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
        <button onClick={start} className='mr-1'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="M132-266.5v-428h22v428h-22Zm493-11L609.5-292 786-469.5H260v-22h525L610.5-669l14.5-14.5L828.5-480 625-277.5Z" /></svg>
        </button>
        <button onClick={pause} className='mx-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="M548-252v-456h160v456H548Zm-296 0v-456h161v456H252Zm318-22h116v-412H570v412Zm-296 0h117v-412H274v412Zm0-412v412-412Zm296 0v412-412Z" /></svg>
        </button>
        <button onClick={resume} className='mx-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="M304-312v-336h22v336h-22Zm132 0 277-168-277-168v336Zm22-44.5v-248L663.5-480 458-356.5Zm0-123.5Z" /></svg>
        </button>
        <button onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            const currentTimer = (prevTime === 300) ? 1500 : 300
            time.setSeconds(time.getSeconds() + currentTimer);
            prevTime = currentTimer;
            restart(time)
        }} className='ml-1'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="80" d="M381-278 192-467l16.5-15.5L381-309l371.5-372.5L768-665 381-278Z" /></svg> 
        </button>
      </div>
    );
  }

export default function Task( {del, id, assignerId, assigneeId, projectId, sectionId, parentId, order, content, description, isCompleted, labels, priority, commentCount, creatorId, createdAt, due, url, duration } : TaskData){
    const DeleteTask = () => del(id)
    const dueDate = new Date(due.date)
    dueDate.setDate(dueDate.getDate()+1)
    const time = new Date();
    time.setSeconds(time.getSeconds() + 1500);

    return(
        <div data-theme="dark">
            <div className='flex flex-row justify-start basis-full my-2 px-3 py-6 bg-primary rounded-md'>
                <div className='basis-1/12'>
                    {/* <form action={del}
                    }}> */}
                        <button onClick={DeleteTask} className="mx-3 btn btn-circle btn-outline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="125" d="M382-276 192-466l20-20 170 170 366-366 20 20-386 386Z" /></svg>
                        </button>
                    {/* </form> */}
                </div>

                <div className='flex flex-row basis-5/6'>
                    <div className='basis-3/4 flex flex-col'>
                        <div className='basis-3/4'>
                            <b>{content}</b>
                        </div>
                        <div className='basis-1/4'>
                            <p>Due: {dateFormat(dueDate, "dddd, mmmm dS, yyyy")}</p>
                        </div>
                    </div>
                    <div className='basis-1/4'><MyTimer expiryTimestamp={time} autoStart={false}/></div>
                </div>

                {/* priority set */}
                <div className='basis-1/12'>

                </div>
            </div>
        </div>
    )
}