'use client'

import { useEffect, useState } from 'react';

export default function Task(){
    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskDueDate, setTaskDueDate] = useState<number>(-1); //ddmmyyyy

    return(
        <div data-theme="dark">
            <div className='flex flex-row justify-start basis-full my-2 px-3 py-6 bg-primary rounded-md'>
                <div className='basis-1/12'>
                    <button className="mx-3 btn btn-circle btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 -960 960 960" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="125" d="M382-276 192-466l20-20 170 170 366-366 20 20-386 386Z" /></svg>
                    </button>
                </div>

                <div className='flex flex-row basis-5/6'>
                    <div className='basis-3/4 flex flex-col'>
                        <div className='basis-3/4'>
                            <b>Gunga ginga</b>
                        </div>
                        <div className='basis-1/4'></div>
                    </div>
                    <div className='basis-1/4'></div>
                </div>

                {/* priority set */}
                <div className='basis-1/12'>

                </div>
            </div>
        </div>
    )
}