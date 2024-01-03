// ...
import Greet from './greet'
import * as Sidebar from './sidebar'
import { MiniButton } from './button'

//TODO: credits tab
{/* <a className='text-xs' href="https://www.flaticon.com/free-icons/calendar" title="calendar icons">Calendar icons created by Freepik - Flaticon</a>
<a className='text-xs' href="https://www.flaticon.com/free-icons/correct" title="correct icons">Correct icons created by Freepik - Flaticon</a> */}

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen justify-between bg-dPrimary font-sans text-dText">

      <div id='Sidebar' className='flex flex-col basis-1/6 bg-dSecondary'>
        <Sidebar.SidebarTab section="All Tasks"></Sidebar.SidebarTab>
        <Sidebar.SidebarTab section="My Day"></Sidebar.SidebarTab>
        <Sidebar.SidebarTab section="My Week"></Sidebar.SidebarTab>
      </div>

      <div id='Body' className='flex flex-col basis-5/6'>
        <div id='View Switch Menu' className='flex flex-row-reverse basis-1 grow-0'>
          <MiniButton image="calendar.svg" alt='Calendar View'></MiniButton>
          <MiniButton image="check_circle.svg" alt='Calendar View'></MiniButton>
        </div>
        <div id='Todos' className='flex flex-col basis-3/4'></div>
        <div id='Todo Input' className='basis-1/6'></div>
      </div>
    </main>
  )
}