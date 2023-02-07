import React, { useEffect } from 'react'
import { MenuAlt2Icon, BellIcon, CogIcon } from "@heroicons/react/outline";

import { useStateContext } from '../contexts/ContextProvider'

const NavButton = ({customFunc, icon, color, dotColor}) => (<button type='button' onClick={customFunc} style={{color}} className="relative text-xl rounded-full p-3 hover:bg-slate-50" >
  <span style={{background: dotColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"/>
    {icon}
</button>)
const NavBar = () => {
  const { activeMenu , setActiveMenu, handleClick, isClicked,  setIsClicked, screenSize, setScreenSize} = useStateContext()
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])
  useEffect(() => {
    if(screenSize <= 1024){
      setActiveMenu(false)
    }else{
      setActiveMenu(true)
    }
  }, [screenSize])

  return (
    <div className='flex justify-between p-2  relative bg-white max-w-full'>
      <NavButton customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="black" icon={<MenuAlt2Icon className='h-6'/>}/>
    </div>
  )
}

export default NavBar