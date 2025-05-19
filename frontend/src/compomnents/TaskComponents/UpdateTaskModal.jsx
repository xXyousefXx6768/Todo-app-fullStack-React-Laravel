import React, { useRef } from 'react'
import { useForm } from "react-hook-form"
function UpdateTaskModal() {
     const modalRef = useRef(null)
      

       const handleCloseModal = (event) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            dispatch(closeModal())
          }
        }
      const onSubmit = (data) => {
          
          const payload = {
            ...data,
            status: data.status === 'true'? true : false,
            
            user_id: user.id
          }
          console.log("Form data:", payload)
          
        }
  return (
    <div>UpdateTaskModal</div>
  )
}

export default UpdateTaskModal