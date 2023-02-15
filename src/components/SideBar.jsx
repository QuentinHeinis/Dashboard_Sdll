import React from 'react'

import { Link, NavLink } from 'react-router-dom'
import {SiShopware} from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md';
import { useStateContext } from '../contexts/ContextProvider'
import { links } from '../data/links';

const SideBar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext()
  const MenuStyle = "text-gray-400 mt-8 font-semibold"
  const activeLink = "flex items-center relative z-0 gap-5 pl-4 pt-3 pb-2.5  text-main-purple font-semibold text-md m-2 bg-secondary-rose rounded-lg active"
  const normalLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md m-2 Link z-0 relative"


  const handleCloseSideBar = () => {
    if(activeMenu && screenSize <= 1024){
      setActiveMenu(false)
    }
  }
  
  return (
    <div className='pl-3  [1024px]:hidden h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 z-50 bg-white border-r'>
            {activeMenu && (
            <>
              <div className='flex justify-center items-center relative'>
                  <Link to="/" onClick={()=> {handleCloseSideBar()}} className="text-2xl flex items-center m-4 gap-2"><SiShopware className='text-xl'/> SDLL <span className='text-xs bg-[#E1E1E1] text-gray-600 px-3 rounded'>v0.1.0</span></Link>
                  <button type="button" onClick={() => setActiveMenu(!activeMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block lg:hidden absolute right-0">
                      <MdOutlineCancel />
                  </button>
              </div>
              <div className='mt-10'>
                
              </div>
              {links.map((item) => (
                <div key={item.title}>
                  <p className={MenuStyle}>{item.title}</p>
                  {item.links.map((link)=> (
                    <NavLink 
                    to={link.link} 
                    key={link.name} 
                    onClick={()=> {handleCloseSideBar()}}
                    className={({isActive})=> isActive ? activeLink : normalLink}
                    >
                      {link.icon}{link.name}
                    </NavLink>
                  ))}
                </div>
              ))}
            </>)}
    </div>
  )
}

export default SideBar