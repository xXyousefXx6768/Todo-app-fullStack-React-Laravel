import React from 'react'
import { faStar,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {removeTodo} from "../../redux/actions/TodoAction"
import { useDispatch } from 'react-redux'
import { icon } from '@fortawesome/fontawesome-svg-core'
function TaskCard({task}) {

    const dispatch = useDispatch();

    const handleDelete = () => {
      dispatch(removeTodo(task.id));
    };

  const icons = [
    {icon:faStar,color:"text-gray-400",onclick:null},
    {icon:faPenToSquare,color:"text-[#00A1F1]",onclick:null},
    {icon:faTrash,color:"text-[#F65314]",onclick:handleDelete},
  ]
   console.log(task);
  return (
    <div className='h-[16rem] !px-4 !py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] dark:bg-CardDark dark:!border-BordarDark dark:text-textDark rounded-lg border-2 border-white'>
      <div>
        <h4 class="font-bold text-2xl">{task.title?task.title:"No title"}</h4>
        <p>{task.description?task.description:"No description"}</p>
        </div>
        <div className="!mt-auto flex justify-between items-center">
         <p className="text-sm text-gray-400">
  {task.created_at
    ? new Date(task.created_at).toLocaleDateString('en-GB')
    : 'No date'}
</p>
         <p class="text-sm font-bold text-green-500">{task.priority?task.priority:"No priority"}</p>
         <div>
          <div class="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            {icons.map((icon, index) => (
            <button key={index} onClick={icon.onclick} >
              <FontAwesomeIcon icon={icon.icon} className={icon.color} />
              </button>
              
              ))}
                    </div>
                    </div>
                    </div>
      </div>

  )
}

export default TaskCard