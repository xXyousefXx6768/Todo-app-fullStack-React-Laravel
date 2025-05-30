import React from 'react'
import TaskModal from './TaskModal'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModal, closeModal } from '../../redux/actions/ModalAction';
function CreateTask() {
   const isOpen = useSelector((state) => state.Modal.openModal);
   const dispatch = useDispatch()
   const handleOpen = () => dispatch(setOpenModal('create'));
  
  return (
    <>
    <button onClick={handleOpen} className='h-[16rem]  !py-2 !rounded-md text-lg font-medium text-gray-500 !border-dashed !border-2 !border-gray-400 hover:bg-gray-300 !hover:border-none transition duration-200 ease-in-out' >
          Add New Task
    </button>
    {isOpen === 'create' && <TaskModal />}
    
    </>
  )
}

export default CreateTask
