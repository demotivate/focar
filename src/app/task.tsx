'use client'

import { useEffect, useState } from 'react';

export default function Task(){
    const [taskName, setTaskName] = useState<string>('');
    const [taskDescription, setTaskDescription] = useState<string>('');
    const [taskDueDate, setTaskDueDate] = useState<number>(-1); //ddmmyyyy

    return(
        <div className="bg-black py-5 px-96">
        </div>
    )
}