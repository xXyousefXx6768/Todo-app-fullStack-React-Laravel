import React,{ useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModal, closeModal } from '../../redux/actions/ModalAction';
function TaskModal() {
    const modalRef = useRef(null);
    const isOpen = useSelector((state) => state.Modal.openModal);

     const dispatch = useDispatch()
     const handleCloseModal = (event) => {
        // If clicked outside modal box, close it
        if (modalRef.current && !modalRef.current.contains(event.target)) {
          dispatch(closeModal());
        }
      };
  return (
    <div  onClick={handleCloseModal} className='z-50 Modal absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#1f1b1b6b] ' >
     <section  ref={modalRef} onClick={(e) => e.stopPropagation()} className='bg-white dark:bg-dark w-1/2 !rounded-lg'  >
      <form className='flex dark:text-textDark flex-col gap-4 !p-8' >
        <div className='flex  flex-col gap-1' >
        <label for="title">Title</label>
        <input class="bg-[#F9F9F9] dark:bg-[#E6E6E6]/20 !p-1 !rounded-md !border !border-[#0d0b0b83] " id="title" placeholder="Task Title" type="text" name="title"></input>
        </div>
        <div class="flex flex-col gap-1">
            <label for="description">
            Description</label>
            <textarea class="bg-[#F9F9F9] dark:bg-[#E6E6E6]/20 !p-1 !rounded-md !border !border-[#0d0b0b83] resize-none" name="description" placeholder="Task Description" rows="4">
                </textarea>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="priority">Select Priority</label>
                    <select class="bg-[#F9F9F9] dark:bg-BordarDark !p-1 !rounded-md !border !border-[#0d0b0b83] !cursor-pointer" name="priority">
                        <option className='dark:text-[#E6E6E6]/20 dark:bg-[#E6E6E6]/20 ' value="low">Low</option>
                        <option className='dark:text-[#E6E6E6]/20 dark:bg-[#E6E6E6]/20 ' value="medium">Medium</option>
                        <option className='dark:text-[#E6E6E6]/20 dark:bg-[#E6E6E6]/20' value="high">High</option>
                </select>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="dueDate">Due Date</label>
                <input class="bg-[#F9F9F9] !p-1 !rounded-md dark:bg-[#E6E6E6]/20 !border-[#0d0b0b83] !border" type="date" name="dueDate"/>
                </div>
                <div class="flex flex-col gap-1">
                    <label for="completed">Task Completed</label>
                    <div class="flex items-center justify-between dark:bg-BordarDark bg-[#F9F9F9] !border-[#0d0b0b83] !p-2 !rounded-md !border">
                        <label for="completed">Completed</label>
                        <div className=''>
                    <select class="bg-[#F9F9F9]  dark:bg-BordarDark !rounded-md !border-[#0d0b0b83] !border cursor-pointer" name="completed">
                <option value="false">No</option>
                <option value="true">Yes</option>
                </select>
                </div>
                </div>
                </div>
                <div class="!mt-2"><button type="submit" class="text-white !py-2 !rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out bg-green-400">Create Task</button></div>
                </form>
     </section>
      
        </div>
  )
}

export default TaskModal
