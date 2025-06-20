import React from 'react'
import { useEffect, useState } from 'react'
import Filter from '../TaskComponents/Filter'
import { useNavigate, useLocation } from 'react-router-dom';
import CreateTask from '../TaskComponents/CreateTask'
import TaskCard from '../TaskComponents/TaskCard'
import PersonalSection from '../TaskComponents/PersonalSection'
import { useDispatch,useSelector } from 'react-redux'
import { loadUserInfo } from '../../redux/actions/UserActions'
function TaskPageLayout() {
 
  const dispatch= useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const tasks = useSelector((state) => state.todo.todos);
  const pendingTodos= useSelector((state) => state.todo.pendingTodos);
  const StarredTodos= useSelector((state) => state.todo.favTodos);
  const overdueTodos= useSelector((state) => state.todo.overdueTodos);
  const completedTodos= useSelector((state) => state.todo.completedTodos);

  console.log("StarredTodos:", StarredTodos);

  const [activeIndex, setActiveIndex] = useState(0);
  const priorities = ["All", "Low", "Medium", "High"];

useEffect(() => {
  dispatch(loadUserInfo());
},[])


const path = location.pathname;
let AllTasks = tasks;

if (path === '/completed') {
  AllTasks = completedTodos;
} else if (path === '/active') {
  AllTasks = pendingTodos 
} else if (path === '/pending') {
  AllTasks = pendingTodos 
}else if (path === '/starred') {
  AllTasks= StarredTodos
}else if (path === '/overdue') {
  AllTasks= overdueTodos
}


const filteredTasks =
  activeIndex === 0
    ? AllTasks
    : AllTasks.filter(
        (task) =>
          task.priority &&
          task.priority.toLowerCase() === priorities[activeIndex].toLowerCase()
      );

       


        

  return (
   <main className='flex-col-reverse flex custom-scrollbar dark:scrollbar-dark lg:overflow-hidden overflow-auto h-[93%] lg:flex-row dark:bg-dark bg-[#f9f9f9]'>
    <section className=' w-full h-auto  flex flex-col !p-3 dark:bg-dark !border-2 bg-[#EDEDED] !border-white dark:!border-BordarDark !rounded-[1.5rem] 
      '>
        <div className=' !p-2 custom-scrollbar dark:scrollbar-dark overflow-auto'>
    <div class="flex sm:flex-col lg:flex-row dark:text-textDark !mt-1 !p-4   justify-between">
        <h1 class="text-2xl font-bold">
        {path.startsWith('/task/update') || path === '/task' 
            ? 'All Tasks' 
           : path.replace('/', '') + ' Tasks'}

          </h1>
        <Filter activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </div>
       <div className='
       !pb-[2rem] 
       !p-6
       !mt-6 
       grid 
       [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]
    lg:[grid-template-columns:repeat(auto-fill,minmax(360px,1fr))]
       gap-[1.5rem]'>
        {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
       <CreateTask/>
       </div>
        </div>
    </section>
     <section className='lg:w-[26rem] w-full custom-scrollbar dark:scrollbar-dark lg:overflow-auto h-auto shrink-0 !mt-[4rem] lg:h-[calc(100%-5rem)]'>
     <PersonalSection  />
     </section>
   </main>
  )
}

export default TaskPageLayout