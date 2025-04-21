import React from 'react'
import { faStar,faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core'
function TaskCard() {
  const icons = [
    {icon:faStar,color:"text-gray-400"},
    {icon:faPenToSquare,color:"text-[#00A1F1]"},
    {icon:faTrash,color:"text-[#F65314]"},
  ]

  return (
    <div className='h-[16rem] !px-4 !py-3 flex flex-col gap-4 shadow-sm bg-[#f9f9f9] dark:bg-CardDark dark:!border-BordarDark dark:text-textDark rounded-lg border-2 border-white'>
      <div>
        <h4 class="font-bold text-2xl">cvvv</h4>
        <p>No description</p>
        </div>
        <div className="!mt-auto flex justify-between items-center">
         <p class="text-sm text-gray-400">10 days ago</p>
         <p class="text-sm font-bold text-green-500">low</p>
         <div>
          <div class="flex items-center gap-3 text-gray-400 text-[1.2rem]">
            {icons.map((icon, index) => (
            <button class="">
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