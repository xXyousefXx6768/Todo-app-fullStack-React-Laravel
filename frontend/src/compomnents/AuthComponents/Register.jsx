import React from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { redirect } from 'react-router'
import { RegisterUser } from '../../redux/actions/UserActions'
function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()

  const onSubmit = (data) =>{ 
    console.log("Form data:", data);
    
    dispatch(RegisterUser(data))
    
  }
  
  return (
    <div className='!p-4'>
        <div className='bg-white dark:bg-dark dark:text-amber-100 !p-8'>
               <form onSubmit={handleSubmit(onSubmit)} >
               <h1 class="
               !mb-2 
               text-center 
               text-[1.35rem] 
               font-medium">
                Register for an Account
                </h1>
                <p className="
                !mb-8 
                !px-[2rem] 
                text-center 
                text-[#999] 
                text-[14px]">
                Create an account. Already have an account? 
                <Link to="/" 
                className="font-bold 
                text-[#2ECC71] 
                hover:text-[#7263F3] 
                transition-all 
                duration-300">
                 Login here
                    </Link>
                    </p>
                    <div class="flex flex-col">
                    <label for="name" class="mb-1 text-[#999]">
                    Full Name
                     </label>
                     <input id="name" 
                     class="!px-4 !py-3 !border-[2px] 
                     !rounded-md !border-[#e9e6cc]
                      dark:outline-blue-950 
                     outline-[#2ECC71] 
                     dark:text-blue-50 text-gray-800" 
                     placeholder="John Doe" 
                     type="text"  
                     name="name"
                     {...register("name", { required: true, minLength: 4 })}
                     /></div>
                     {errors.name && errors.name.type === "required" && (
                       <p className="text-red-500 !mt-1">Name is required</p>
                     )}
                     {errors.name && errors.name.type === "minLength" && (
                       <p className="text-red-500 !mt-1">Name must be at least 4 characters</p>
                     )}
                    <div className="
                    !mt-[1rem] 
                    flex 
                    flex-col">
                    <label for="email" className="!mb-1 text-[#999]">
                        Email
                        </label>
                    <input id="email" 
                    className="
                    !border-[#e9e6cc]
                    !px-4 
                    !py-3 
                    !border-[2px] 
                    !rounded-md 
                    dark:outline-blue-950 
                    outline-[#2ECC71] 
                    dark:text-blue-50
                    text-gray-800" 
                    placeholder="johndoe@gmail.com" 
                    type="text" 
                    name="email"
                    {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                    />
                    </div>
                    {errors.email && errors.email.type === "required" && (
                      <p className="text-red-500 !mt-1">Email is required</p>
                    )}
                    {errors.email && errors.email.type === "pattern" && (
                      <p className="text-red-500 !mt-1">Invalid email format</p>
                    )}
                    <div className=" !mt-[1rem] flex flex-col">
                        <label for="password" className="!mb-1 text-[#999]">Password</label>
                    <input id="password" 
                    className="!px-4 !py-3 
                    !border-[2px] !rounded-md 
                    border-[#e9e6cc] 
                    dark:outline-blue-950 
                    outline-[#2ECC71] dark:text-blue-50 
                    text-gray-800" placeholder="***************" 
                    type="password"  name="password"
                    {...register("password", { required: true, minLength: 8 })}/>

                    {errors.password && errors.password.type === "required" && (
                      <p className="text-red-500 !mt-1">Password is required</p>
                    )}
                    {errors.password && errors.password.type === "minLength" && (
                      <p className="text-red-500 !mt-1">Password must be at least 8 characters</p>
                    )}
                     
                    <div className="flex">
                    <button type="submit"  
                    className="!mt-[1.5rem] flex-1 !px-4 !py-3 
                    font-bold bg-[#2ECC71] text-white !rounded-md 
                    hover:bg-[#1abc9c]  transition-colors">Register Now</button>
                    </div>
                   </div>
               </form>
            </div>
    </div>
  )
}

export default Register