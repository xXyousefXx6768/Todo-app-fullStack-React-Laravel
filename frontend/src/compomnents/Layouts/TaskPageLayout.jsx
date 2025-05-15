import React from 'react'
import { useEffect } from 'react'
import Filter from '../TaskComponents/Filter'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import CreateTask from '../TaskComponents/CreateTask'
import TaskCard from '../TaskComponents/TaskCard'
import PersonalSection from '../TaskComponents/PersonalSection'
import { useDispatch,useSelector } from 'react-redux'
import { logout } from '../../redux/actions/UserActions'
import { loadUserInfo } from '../../redux/actions/UserActions'
import { clearAllCookies } from '../../redux/actions/UserActions';
function TaskPageLayout() {
 
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
   
  const tasks = useSelector((state) => state.todo.todos);

useEffect(() => {
  dispatch(loadUserInfo());
},[])


  return (
   <main className='flex-col-reverse flex custom-scrollbar sm:dark:scrollbar-dark overflow-auto h-[93%] lg:flex-row dark:bg-dark bg-[#f9f9f9]'>
    <section className=' w-full  flex flex-col !p-3 dark:bg-dark !border-2 bg-[#EDEDED] !border-white dark:!border-BordarDark !rounded-[1.5rem] 
      '>
        <div className=' !p-2 custom-scrollbar dark:scrollbar-dark overflow-auto'>
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
       
       </div>
        </div>
    </section>
     <section className='lg:w-[26rem] w-full  h-auto shrink-0 !mt-[4rem] lg:h-[calc(100%-5rem)]'>
     <PersonalSection  />
     </section>
   </main>
  )
}

export default TaskPageLayout