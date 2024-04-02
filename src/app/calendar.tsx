'use client'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export default function ClientCalendar(){
    return (
        <div className='flex flex-row justify-center items-center basis-full my-2 px-3 py-6'>
            <div className='justify-center'>
                <Calendar />
            </div>
        </div>
    )
}