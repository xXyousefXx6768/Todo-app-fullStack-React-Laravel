import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import UpdateUserInfoModal from './UpdateUserInfoModal';
import {setOpenModal} from '../../redux/actions/ModalAction'
import { useDispatch, useSelector } from 'react-redux'
import userimg from '../../assets/user.png'
import { data } from 'react-router';
function PersonalSection() {
  const user = useSelector((state) => state.user.user);
  const isOpen = useSelector((state) => state.Modal.openModal);
  const tasks = useSelector((state) => state.todo.todos);
  const pendingTodos= useSelector((state) => state.todo.pendingTodos);
  const completedTodos= useSelector((state) => state.todo.completedTodos);
  const overdueTodos= useSelector((state) => state.todo.overdueTodos);
  const isDark = useSelector((state) => state.theme.isDarkMode);

  const dispatch = useDispatch()

  const LARAVEL_SERVER = import.meta.env.VITE_LARAVEL_BASE_URL;
  const ChartData=[
   
      { id: 1, label: 'Pending', value: pendingTodos.length || 0, color: '#fb923c' },
      { id: 2, label: 'Completed', value: completedTodos.length || 0, color: '#22c55e' },
      { id: 3, label: 'Overdue', value: overdueTodos.length || 0, color: '#ef4444' },
    
  ]


  
  const labelColor = isDark ? '#ffffff' : '#000000';

  
  return (
    <>
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
            hover:border-2 hover:border-white"
            onClick={() => dispatch(setOpenModal("updateUser"))}
            >
            <div>
            </div>
            {
              user? 
              <div className='flex'   >
              <img className='!w-12 !h-12 rounded-full' src={`${LARAVEL_SERVER}/${user.profile_img_url}`} alt="" />
            <h1 className="flex flex-col !ml-3 text-xl">
            <span className=" font-medium">Hello,</span>
              <span className="font-bold"> {user.name}</span>
            </h1>
            </div>
            :
            <div className='animate-pulse flex'>
              <div class="size-10 rounded-full bg-gray-200"></div>
              <div class="flex !ml-2 flex-col">
            <h1 className="  h-3 w-28  bg-gray-300 rounded"></h1>
            <h4 className="  h-3 w-12 !mt-2 bg-gray-300 rounded"></h4>
            </div>
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
                    text-[#333]">{tasks.length} </span>
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
                                text-[#333]">{pendingTodos.length}</span>
                                </p>
                                </div>
                                <div className="text-gray-400 dark:text-textDark">
                                    <p>Open Tasks:</p>
                                    <p className="!pl-4 relative flex gap-2">
                                    <span className="absolute h-[70%] w-[0.2rem] 
                                    left-[1px] top-1/2 
                                    translate-y-[-50%] 
                                    bg-orange-400 !rounded-[5px]"></span>
                                    <span className="font-medium dark:text-textDark text-4xl text-[#333]">{pendingTodos.length}</span>
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
                                        <span className="font-medium dark:text-textDark text-4xl text-[#333]">{completedTodos.length}</span>
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
                                               <div className='flex justify-center items-center !px-4 !pt-2'>
                                               <PieChart
                                                series={[{
                                                data: ChartData,
                                                innerRadius: 50,
                                               outerRadius: 100,
                                               margin: {bottom:5},
                                               paddingAngle: 6,
                                               cornerRadius: 5,
                                               highlightScope: { faded: 'global', highlighted: 'item' },
                                               faded: { additionalRadius: -30, color: 'gray' },
                                               valueFormatter: (v) => `${v.value}`,
                                               cx: 150,
                                               cy: 150,
                                                label: {
                                               color: labelColor,
                                               }
                                               }]}
                                                height={350}
                                                width={400}
                                             
                                             />
                                               </div>
                                           </div>
                                        </div>
    </div>
   {isOpen==='updateUser' && <UpdateUserInfoModal user={user}/>}
    </>
  )
}

export default PersonalSection