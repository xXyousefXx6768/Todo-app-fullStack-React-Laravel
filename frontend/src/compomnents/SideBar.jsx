import React from 'react'
import logo from '../assets/logo.webp'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import { logout } from '../redux/actions/UserActions';
import IconCheck from '../icons/IconCheck'
import IconLogout from '../icons/IconLogout'
import IconFileCheck from '../icons/IconFileCheck'
import IconGrid from '../icons/IconGrid'
import IconPending from '../icons/IconPending'
import IconStopWatch from '../icons/IconStopWatch'
import IconStar from '../icons/IconStar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import {faSpinner} from '@fortawesome/free-solid-svg-icons'
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { toggleDarkMode } from "../redux/actions/DarkModeAction";

function SideBar({ isOpen, closeSidebar }) {
  const { pathname } = useLocation();
  const location=useLocation();
    const getStrokeColor = (link) => {
        return pathname === link ? "#3aafae" : "#71717a";
      };
   const authPath= location.pathname === "/auth";
   const dispatch= useDispatch();
    const NavItems=[
        {
           icon:<IconGrid strokeColor={getStrokeColor('/')}  />,
           link:"/",
           label:"All",
        },
        {
            icon:<IconFileCheck strokeColor={getStrokeColor('/completed')}  />,
            link:"/completed",
            label:"Completed",
        },
        {
            icon:<IconCheck strokeColor={getStrokeColor('/active')}  />,
            link:"/active",
            label:"Active",
        },
        {
            icon:<IconPending strokeColor={getStrokeColor('/pending')} />,
            link:"/pending",
            label:"Pending",
        },
        {
            icon:<IconStar strokeColor={getStrokeColor('/starred')} />,
            link:"/starred",
            label:"Starred",
        },
        {
            icon:<IconStopWatch strokeColor={getStrokeColor('/timer')} />,
            link:"/overdue",
            label:"overdue",
        },
        
        
    ]

     const icons = [
        { icon: faGithub, action: () => window.open("https://github.com/xXyousefXx6768", "_blank") },
        { icon: faMoon, action: () => dispatch(toggleDarkMode()) },
        { icon: faUser, action: () => alert("User icon clicked!") },
      ];
    

  return (
    <>
   {/* Sidebar-lg */}
    <div className="  lg:basis-[5rem] hidden lg:flex dark:bg-dark flex-col bg-[#f9f9f9]">
      <div className="flex items-center justify-center h-[5rem]">
        <img src={logo} width={28} height={28} alt="logo" />
      </div>

      <div className="!mt-8 flex-1 flex flex-col items-center justify-between">
        <ul className="flex flex-col gap-10">
          {NavItems.map((item, index) => (
            <li key={index} className="relative group">
              <Link to={item.link}>{item.icon}</Link>

              {/* Hover Tooltip */}
              <span className="u-triangle absolute top-[50%] translate-y-[-50%] left-8 text-xs pointer-events-none text-white bg-[#3aafae] !px-2 !py-1 !rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      
        <div className="mb-[1.5rem]">
          <button onClick={() => dispatch(logout())} className={`w-12 h-12 flex justify-center items-center border-2 ${authPath?"border-gray-400 cursor-not-allowed opacity-50":"border-[#EB4E31]"}   p-2 rounded-full`}>
           <IconLogout strokeColor={authPath ? "#A0A0A0" : "#EB4E31"}/>
          </button>
        </div> 

      </div>
    </div>
   {/* Sidebar-sm */}
   <AnimatePresence>
   {isOpen && (
  <>

    <div
      className="fixed inset-0  backdrop-blur-sm z-[9997]"
      onClick={closeSidebar} 
    />

    {/* Sliding Sidebar */}
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-[20rem] h-full lg:hidden bg-[#f9f9f9] shadow-lg p-4 flex flex-col dark:bg-dark z-[9998]"
    >
      <div className="flex justify-between items-center !mb-4">
        <img src={logo} width={28} height={28} alt="logo" />
        <button onClick={closeSidebar} className="text-xl">✖</button>
      </div>

      <ul className="flex flex-col gap-6 mt-4">
        {NavItems.map((item, index) => (
          <li key={index} className="flex items-center !mt-4 gap-4" onClick={closeSidebar}>
            <Link to={item.link}>{item.icon}</Link>
            <p className="dark:text-textDark">{item.label}</p>
          </li>
        ))}
        <li className="flex !mt-4">
          {icons.map((item, index) => (
            <a
              key={index}
              className="icon-item !m-2 h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
              onClick={item.action}
            >
              <FontAwesomeIcon icon={item.icon} />
            </a>
          ))}
        </li>
      </ul>

      <div className="!mt-auto">
        <button
          onClick={() => {
            if (!authPath) dispatch(logout());
            closeSidebar();
          }}
          className={`w-full mt-10 border-2 p-2 rounded-full text-center ${authPath ? "border-gray-400 text-gray-400 cursor-not-allowed" : "border-[#EB4E31] text-[#EB4E31]"}`}
        >
          Logout
        </button>
      </div>
    </motion.div>
    
  </>
)}
</AnimatePresence>
    </>
  )
}

export default SideBar