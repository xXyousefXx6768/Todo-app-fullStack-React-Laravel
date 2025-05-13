import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from '../../redux/actions/TodoAction'
import { closeModal } from '../../redux/actions/ModalAction'

function TaskModal() {
  const modalRef = useRef(null)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const handleCloseModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(closeModal())
    }
  }

  const onSubmit = (data) => {
    // Convert status to boolean
    const payload = {
      ...data,
      status: data.status === 'true'? true : false,
      
      user_id: user.id
    }
    console.log("Form data:", payload)
    dispatch(addTodo(payload))
  }

  return (
    <div onClick={handleCloseModal} className='z-50 Modal overflow-hidden absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-[#1f1b1b6b]'>
      <section ref={modalRef} onClick={(e) => e.stopPropagation()} className='bg-white dark:bg-dark w-1/2 !rounded-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex dark:text-textDark flex-col gap-4 !p-8'>
          {/* Title */}
          <div className='flex flex-col gap-1'>
            <label htmlFor="title">Title</label>
            <input
              className="bg-[#F9F9F9] dark:bg-[#E6E6E6]/20 !p-1 !rounded-md !border !border-[#0d0b0b83]"
              id="title"
              placeholder="Task Title"
              type="text"
              {...register("title", { required: true, minLength: 4 })}
            />
            {errors.title?.type === "required" && <p className="text-red-500">Title is required</p>}
            {errors.title?.type === "minLength" && <p className="text-red-500">Title must be at least 4 characters</p>}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description</label>
            <textarea
              className="bg-[#F9F9F9] dark:bg-[#E6E6E6]/20 !p-1 !rounded-md !border !border-[#0d0b0b83] resize-none"
              placeholder="Task Description"
              rows="4"
              {...register("description", { required: true, minLength: 4 })}
            />
            {errors.description?.type === "required" && <p className="text-red-500">Description is required</p>}
            {errors.description?.type === "minLength" && <p className="text-red-500">Description must be at least 4 characters</p>}
          </div>

          {/* Completed_at (Due Date) */}
          <div className="flex flex-col gap-1">
            <label htmlFor="completed_at">Due Date</label>
            <input
              className="bg-[#F9F9F9] !p-1 !rounded-md dark:bg-[#E6E6E6]/20 !border-[#0d0b0b83] !border"
              type="date"
              {...register("completed_at", { required: true })}
            />
            {errors.completed_at && <p className="text-red-500">Due Date is required</p>}
          </div>

          {/* periorty*/}

          <div className="flex flex-col gap-1">
          <label htmlFor="priority">Select Priority</label>
          <select
            className="bg-[#F9F9F9] dark:bg-BordarDark !p-2 !rounded-md !border !border-[#0d0b0b83] cursor-pointer"
            name="priority" 
            {...register("priority", { required: true })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label htmlFor="status">Task Completed</label>
            <div className="flex items-center justify-between dark:bg-BordarDark bg-[#F9F9F9] !border-[#0d0b0b83] !p-2 !rounded-md !border">
              <label htmlFor="status">Completed</label>
              <select
                className="bg-[#F9F9F9] dark:bg-BordarDark !rounded-md !border-[#0d0b0b83] !border cursor-pointer"
                {...register("status", { required: true })}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          {/* Submit */}
          <div className="!mt-2">
            <button type="submit" className="text-white !py-2 !rounded-md w-full hover:bg-blue-500 transition duration-200 ease-in-out bg-green-400">
              Create Task
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default TaskModal
