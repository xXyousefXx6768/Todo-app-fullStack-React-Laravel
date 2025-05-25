import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from "axios";
import './App.css'
import { PieChart } from '@mui/x-charts/PieChart';
import { Route, Routes,Navigate } from 'react-router-dom';
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
   const user = useSelector((state) => state.user.user);
   const token= useSelector((state) => state.user.token);
   const isloading= useSelector((state) => state.user.loading);
   const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

   console.log(user)
   console.log(isloading+':loading')
   console.log(  'is:'+  isAuthenticated  )
   axios.defaults.withCredentials = true;
   
  return (
    <>
      <main className={`h-screen ${isDark ? 'dark' : 'light'}  dark:bg-dark bg-[#f9f9f9]  overflow-hidden min-h-screen flex`}>
        <ToastContainer />
        <SideBar />
        <section className="flex flex-col h-full w-full">
          <Topbar />
          <Routes>

          
            <Route path="/" element={
              isAuthenticated ? <Navigate to="/task" replace /> : <Navigate to="/auth" replace />
            } />

          
            <Route path="/auth/*" element={<AuthLayout />} />

            
            <Route path="/task" element={
              <ProtectedRoute>
                <TaskPageLayout />
              </ProtectedRoute>
            } />

            <Route path="/task/update/:id" element={
             <ProtectedRoute>
               <TaskPageLayout />
              </ProtectedRoute>
              } />
            
            <Route path="/completed" element={
                <ProtectedRoute>
                  <TaskPageLayout />
                </ProtectedRoute>
               } />

            <Route path="/active" element={
                 <ProtectedRoute>
                 <TaskPageLayout />
               </ProtectedRoute>
                 } />

            <Route path="/pending" element={
                 <ProtectedRoute>
                  <TaskPageLayout />
                </ProtectedRoute>
                  } />
            <Route path='/starred' element={
                 <ProtectedRoute>
                  <TaskPageLayout />
                </ProtectedRoute>
                  } />

          </Routes>
        </section>
      </main>
    </>
  )
}

export default App
