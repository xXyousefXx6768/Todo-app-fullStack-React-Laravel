import React from 'react'
import { useEffect } from 'react'
import Filter from '../TaskComponents/Filter'
import CreateTask from '../TaskComponents/CreateTask'
import TaskCard from '../TaskComponents/TaskCard'
import PersonalSection from '../TaskComponents/PersonalSection'
import { useDispatch,useSelector } from 'react-redux'
import { loadUserInfo } from '../../redux/actions/UserActions'
function TaskPageLayout() {

  const dispatch= useDispatch()
  const user = useSelector((state) => state.user.user);
  const tasks = useSelector((state) => state.todo.todos);

useEffect(() => {
  dispatch(loadUserInfo());
},[])


  return (
   <main className='flex h-[93%] dark:bg-dark bg-[#f9f9f9]'>
    <section className=' w-full  flex flex-col !p-3 dark:bg-dark !border-2 bg-[#EDEDED] !border-white dark:!border-BordarDark !rounded-[1.5rem] 
      '>
        <div className=' !p-2 custom-scrollbar  dark:scrollbar-dark overflow-auto'>
    <div class="flex dark:text-textDark !mt-1 !p-4 justify-between">
        <h1 class="text-2xl font-bold">All Tasks</h1>
        <Filter />
    </div>
       <div className='
       !pb-[2rem] 
       !p-6
       !mt-6 
       grid 
       grid-cols-[repeat(auto-fill,minmax(360px,1fr))] 
       gap-[1.5rem]'>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
       <CreateTask />
       </div>
        </div>
    </section>
     <section className='w-[26rem] !mt-[1rem] h-[calc(100%-5rem)]'>
     <PersonalSection  />
     </section>
   </main>
  )
}

export default TaskPageLayout