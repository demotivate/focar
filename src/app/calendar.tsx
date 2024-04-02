'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import dateFormat from "dateformat";

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

interface DueDateFilter {
    dueDate: string,
    task: TaskData
}

export default function ClientCalendar(tasks : TaskData[]){
    // console.log(tasks)
    const dueDateFilter_tasks : DueDateFilter[] = [];
    for(const i in tasks){
        const task = tasks[i]
        dueDateFilter_tasks.push({
            dueDate: task.due.date,
            task: task
        });
    }
    console.log("From calendar.tsx, dueDates is:", dueDateFilter_tasks)
    return (
        <div className='flex flex-row justify-center items-center basis-full my-2 px-3 py-6'>
            <div className='justify-center'>
                <Calendar tileContent={({ activeStartDate, date, view }) => view === 'month' && dueDateFilter_tasks.find(task => task.dueDate === dateFormat(date, "yyyy-mm-dd")) != undefined ? <p>{dueDateFilter_tasks.find(task => task.dueDate === dateFormat(date, "yyyy-mm-dd"))?.task.content}</p> : null} />
            </div>
        </div>
    )
}