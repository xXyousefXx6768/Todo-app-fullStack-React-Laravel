import React from 'react'
import Login from '../AuthComponents/Login'
import Register from '../AuthComponents/Register'
import { Route, Routes } from 'react-router-dom';

function AuthLayout() {
  return (
    <main className='flex h-full bg-[#f9f9f9]'>
        <section className='main-layout w-full flex justify-center items-center Authpage !border-2 !border-white !rounded-[1.5rem] overflow-auto'  >
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </section>
    </main>
  )
}

export default AuthLayout