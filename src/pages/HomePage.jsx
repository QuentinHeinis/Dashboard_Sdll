import React from 'react'
import { links } from '../data/links'
import { NavLink } from 'react-router-dom'
const HomePage = () => {
  return (
    <>
    <h1 className='text-4xl text-center my-10 font-bold text-gray-700'>Bienvenue</h1>
    {links.map((item) => (
                <div key={item.title} className='flex gap-3 mx-auto w-fit flex-wrap mb-3'>
                  {item.links.map((link)=> (
                    <NavLink to={link.link} key={link.name} className='bg-white flex flex-col mx-auto gap-3 px-4 py-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all w-[250px]'>
                      <div className='self-center'>{link.icon}</div>
                      <h3 className='text-xl font-semibold text-gray-700'>{link.name}</h3>
                      <div>
                          <p className='text-xs'>Description :</p>
                          <p className=''>{link.desc}</p>
                      </div>
                    </NavLink>
                  ))}
                </div>
              ))}
    </>

  )
}

export default HomePage