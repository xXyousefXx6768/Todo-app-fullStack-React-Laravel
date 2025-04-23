import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PieChart } from '@mui/x-charts/PieChart';
import { Route, Routes } from 'react-router-dom';
import  Topbar from './compomnents/Topbar';
import SideBar from './compomnents/SideBar';
import Login from './compomnents/AuthComponents/Login';
import Register from './compomnents/AuthComponents/Register';
import AuthLayout from './compomnents/Layouts/AuthLayout';
import TaskPageLayout from './compomnents/Layouts/TaskPageLayout';
import ProtectedRoute from './utils/ProtectedRoute';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

function App() {

  const isDark = useSelector((state) => state.theme.isDarkMode);

  return (
    <>
      <main className={`h-screen ${isDark ? 'dark' : 'light'} overflow-hidden min-h-screen flex`}>
        <ToastContainer/>
        <SideBar />
        <section className='flex flex-col h-full w-full'>
        <Topbar />
        <Routes>
        <Route  path="/auth/*" element={<AuthLayout />} />
       
        <Route path='/' element={
          <ProtectedRoute>
          <TaskPageLayout />
          </ProtectedRoute>} 
          />
        
        </Routes>
        </section>
      </main>


    </>
  )
}

export default App
