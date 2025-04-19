import React from 'react'

function Register() {
  return (
    <div>
        <div className='bg-white !p-8'>
               <form >
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
                <a href="/register" 
                className="font-bold 
                text-[#2ECC71] 
                hover:text-[#7263F3] 
                transition-all 
                duration-300">
                 Login here
                    </a>
                    </p>
                    <div class="flex flex-col">
                    <label for="name" class="mb-1 text-[#999]">
                    Full Name
                     </label>
                     <input id="name" 
                     class="!px-4 !py-3 !border-[2px] !rounded-md !border-[#e9e6cc] outline-[#2ECC71] text-gray-800" 
                     placeholder="John Doe" 
                     type="text" 
                     value="" 
                     name="name"/></div>
                    <div className="
                    !mt-[1rem] 
                    flex 
                    flex-col">
                    <label for="email" className="!mb-1 text-[#999]">
                        Email
                        </label>
                    <input id="email" 
                    className="
                    border-[#e9e6cc]
                    !px-4 
                    !py-3 
                    !border-[2px] 
                    rounded-md 
                    outline-[#2ECC71] 
                    text-gray-800" 
                    placeholder="johndoe@gmail.com" 
                    type="text" 
                    value="" 
                    name="email"/>
                    </div>
                    <div className=" !mt-[1rem] flex flex-col">
                        <label for="password" className="!mb-1 text-[#999]">Password</label>
                    <input id="password" 
                    className="!px-4 !py-3 !border-[2px] !rounded-md border-[#e9e6cc] outline-[#2ECC71] text-gray-800" placeholder="***************" type="password" value="" name="password"/>
                    <div className="flex">
                    <button type="submit" disabled="" 
                    className="!mt-[1.5rem] flex-1 !px-4 !py-3 font-bold bg-[#2ECC71] text-white !rounded-md hover:bg-[#1abc9c]  transition-colors">Login Now</button></div>
                   </div>
               </form>
            </div>
    </div>
  )
}

export default Register