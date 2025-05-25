import React from 'react'
import logo from '../assets/logo.webp'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/UserActions';
import IconCheck from '../icons/IconCheck'
import IconLogout from '../icons/IconLogout'
import IconFileCheck from '../icons/IconFileCheck'
import IconGrid from '../icons/IconGrid'
import IconStopWatch from '../icons/IconStopWatch'
import IconStar from '../icons/IconStar';

function SideBar() {
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
            icon:<IconStopWatch strokeColor={getStrokeColor('/pending')} />,
            link:"/pending",
            label:"Pending",
        },
        {
            icon:<IconStar strokeColor={getStrokeColor('/starred')} />,
            link:"/starred",
            label:"Starred",
        },
        
        
    ]

  return (
   
    <div className="  basis-[5rem] flex dark:bg-dark flex-col bg-[#f9f9f9]">
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
    

  )
}

export default SideBar