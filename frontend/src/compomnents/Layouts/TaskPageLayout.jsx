import React from 'react'
import Filter from '../TaskComponents/Filter'
import CreateTask from '../TaskComponents/CreateTask'
function TaskPageLayout() {
  return (
   <main className='flex h-full bg-[#f9f9f9]'>
    <section className=' w-full flex flex-col !border-2 bg-[#EDEDED] !border-white !rounded-[1.5rem] overflow-auto'>
    <div class="flex !mt-1 !p-4 justify-between">
        <h1 class="text-2xl font-bold">All Tasks</h1>
        <Filter />
    </div>
       <div className='
       !pb-[2rem] 
       !mt-6 
       grid 
       grid-cols-[repeat(auto-fill,minmax(300px,1fr))] 
       gap-[1.5rem]'>
       <CreateTask />
       </div>
    </section>
   </main>
  )
}

export default TaskPageLayout