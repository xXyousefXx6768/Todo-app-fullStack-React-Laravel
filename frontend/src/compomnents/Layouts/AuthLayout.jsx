import React from 'react'
import Login from '../AuthComponents/Login'
import Register from '../AuthComponents/Register'
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AuthLayout() {
  const isDark = useSelector((state) => state.theme.isDarkMode);
  return (
    <main className='flex h-full dark:bg-dark overflow-auto custom-scrollbar  dark:scrollbar-dark bg-[#f9f9f9]'>
        <section className={`main-layout w-full  flex justify-center items-center 
          ${isDark ? 'Authpage-Dark' : 'Authpage'} 
          !border-2 !border-white dark:!border-BordarDark min-h-fit  !rounded-[1.5rem] overflow-auto `}  >
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            </Routes>
        </section>
    </main>
  )
}

export default AuthLayout