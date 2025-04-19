import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { PieChart } from '@mui/x-charts/PieChart';
import { Route, Routes } from 'react-router-dom';
import  Topbar from './compomnents/Topbar';
import SideBar from './compomnents/SideBar';
import AuthLayout from './compomnents/Layouts/AuthLayout';
import TaskPageLayout from './compomnents/Layouts/TaskPageLayout';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className='h-screen w-screen flex'>
        <SideBar />
        <section className='flex flex-col w-full'>
        <Topbar />
        <Routes>
        <Route  path="/Auth" element={<AuthLayout />} />
        <Route  path="/" element={<TaskPageLayout />} />
        </Routes>
        </section>
      </main>


    </>
  )
}

export default App
