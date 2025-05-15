import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { useDispatch, useSelector } from 'react-redux'
import { data } from 'react-router';
function PersonalSection() {
  const user = useSelector((state) => state.user.user);
  const tasks = useSelector((state) => state.todo.todos);
  const pendingTodos= useSelector((state) => state.todo.pendingTodos);
  const completedTodos= useSelector((state) => state.todo.completedTodos);
 

  const ChartData=[
   
      { id: 1, label: 'Pending', value: pendingTodos.length || 0, color: '#fb923c' },
      { id: 2, label: 'Completed', value: completedTodos.length || 0, color: '#22c55e' },
    
  ]


  
  return (
    <div>
        <div className="!m-6 flex flex-col align-center  ">
            <div className="!px-2 !py-4 
            flex 
            items-center 
            gap-3 
            sm:w-2/3
            lg:w-full
            dark:text-textDark
            bg-[#E6E6E6]/20 !
            rounded-[0.8rem] 
            hover:bg-[#E6E6E6]/50 
            transition duration-300 
            ease-in-out cursor-pointer 
            !border-2 !border-transparent 
            hover:border-2 hover:border-white">
            <div>
            </div>
            {
              user? 
              <div>
            <h1 className="flex flex-col text-xl">
            <span className=" font-medium">Hello,</span>
              <span className="font-bold"> {user.name}</span>
            </h1>
            </div>
            :
            <div className='animate-pulse'>
            <h1 className="  h-3 w-28  bg-gray-300 rounded"></h1>
            <h4 className="  h-3 w-12 !mt-2 bg-gray-300 rounded"></h4>
            </div>
            }
            </div>
            <div className="!mt-6  flex flex-col gap-8">
            <div className="grid  grid-cols-2 gap-4">
             <div className="text-gray-400 dark:text-textDark">
                <p>Total Tasks:</p>
                <p className="!pl-4 relative  flex gap-2">
                    <span className="absolute 
                    h-[70%] w-[0.2rem] left-[1px] 
                    top-1/2 translate-y-[-50%] 
                    bg-purple-500 !rounded-[5px]"/> 
                    <span className="font-medium 
                    text-4xl 
                    dark:text-textDark
                    text-[#333]"> 4</span>
                        </p>
                        </div>
                        <div className="text-gray-400 dark:text-textDark">
                            <p>In Progress:</p>
                            <p className="!pl-4 relative flex gap-2">
                                <span className="absolute 
                                h-[70%] w-[0.2rem] left-[1px] 
                                top-1/2 translate-y-[-50%] 
                                bg-[#3AAFAE] !rounded-[5px]"/>
                                <span className="font-medium 
                                text-4xl
                                dark:text-textDark 
                                text-[#333]">3</span>
                                </p>
                                </div>
                                <div className="text-gray-400 dark:text-textDark">
                                    <p>Open Tasks:</p>
                                    <p className="!pl-4 relative flex gap-2">
                                    <span className="absolute h-[70%] w-[0.2rem] 
                                    left-[1px] top-1/2 
                                    translate-y-[-50%] 
                                    bg-orange-400 !rounded-[5px]"></span>
                                    <span className="font-medium dark:text-textDark text-4xl text-[#333]">3</span>
                                    </p>
                                    </div>
                                    <div className="text-gray-400 dark:text-textDark">
                                        <p>Completed:</p>
                                        <p className="!pl-4 relative flex gap-2">
                                        <span className="absolute h-[70%] 
                                        w-[0.2rem] left-[1px] top-1/2 
                                        translate-y-[-50%] 
                                        bg-green-400 !rounded-[5px]">
                                        </span>
                                        <span className="font-medium dark:text-textDark text-4xl text-[#333]">1</span>
                                        </p>
                                        </div>
                                        </div>
                                        </div>
                                        <h3 className="!mt-8 dark:text-textDark font-medium">Activity</h3>
                                        </div>
                                        <div className='!mt-4 !mx-6'>
                                           <div className='!rounded-xl  sm:!mb-6  flex flex-col !border-2 !border-white shadow-none bg-[#EDEDED] dark:bg-CardDark'>
                                               <div className='flex flex-col space-y-1.5 !p-6 items-center !pb-0'>
                                               <h3 class="font-semibold dark:text-textDark leading-none tracking-tight">Comleted vs Pending Tasks</h3>
                                               <p class="text-sm dark:text-textDark text-muted-foreground">Task completion status.</p>
                                               </div>
                                               <div className='!p-6 !pt-0 flex flex-1 items-center !pb-0'>
                                                  <PieChart
                                                  series={[{
                                                    data:ChartData,
                                                   
                                                  }]}
                                                 
                                                  height={200}
                                                  />
                                               </div>
                                           </div>
                                        </div>
    </div>
  )
}

export default PersonalSection