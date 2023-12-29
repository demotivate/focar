// ...
import Greet from './greet'
import Task from './task'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-orange-400">
      <Task></Task>
    </main>
  )
}