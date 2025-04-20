import React from 'react'
import TaskModal from './TaskModal'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModal, closeModal } from '../../redux/actions/ModalAction';
function CreateTask() {
   const isOpen = useSelector((state) => state.Modal.openModal);
   const dispatch = useDispatch()
   const handleOpen = () => dispatch(setOpenModal(true));
   const handleClose = () => dispatch(setOpenModal(false));
  return (
    <>
    <button onClick={handleOpen} className='h-[16rem] !ml-4 w-[30rem] !py-2 !rounded-md text-lg font-medium text-gray-500 !border-dashed !border-2 !border-gray-400 hover:bg-gray-300 !hover:border-none transition duration-200 ease-in-out' >
          Add New Task
    </button>
     {isOpen  && (
     <TaskModal />
    )}
    
    </>
  )
}

export default CreateTask
