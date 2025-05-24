import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../redux/actions/DarkModeAction";

function TopBar() {
  const isDark = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.pathname);
  const content = location.pathname === "/auth" ? "Please Login or Register to view your tasks" : "You have 0 active tasks";

  const icons = [
    { icon: faGithub, action: () => window.open("https://github.com", "_blank") },
    { icon: faMoon, action: () => dispatch(toggleDarkMode()) },
    { icon: faUser, action: () => alert("User icon clicked!") },
  ];

  return (
    <div  className='flex !p-3 dark:bg-dark  w-full bg-[#f9f9f9] justify-between '>
      <div className="content-1 dark:text-textDark">
        <h3 className="font-medium">
          <span role="img" aria-label="wave">👋</span>
          Welcome, to Taskfyer
        </h3>
        <p>{content}</p>
      </div>
      <div className="content-2 justify-between h-[50px] flex items-center gap-[4.4rem]">
       
        <div className="icon-box w-44 flex justify-evenly">
          {icons.map((item, index) => (
            <a
              key={index}
              className="icon-item h-[40px] w-[40px] text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6]"
              onClick={item.action}
            >
              <FontAwesomeIcon icon={item.icon} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
