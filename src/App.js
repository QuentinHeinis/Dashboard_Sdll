import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {NavBar, Footer, SideBar, ThemeSettings } from './components'
import { EAN, ExportEtiq, Inventaire } from './pages'
import './App.css'

import { useStateContext } from './contexts/ContextProvider'
import LivraisonPb from './pages/DashBoard/LivraisonPb'
import LivraisonMR from './pages/DashBoard/LivraisonMR'
import HomePage from './pages/HomePage'

const App = () => {
    const { activeMenu } = useStateContext();
  return (
    <div>
        <BrowserRouter>
            <div className='flex relative font-inter'>
                {activeMenu ? (
                    <div className='w-72 fixed z-50'>
                        <SideBar/>
                    </div>
                ) : (
                    <div className='w-0'>
                        <SideBar/>
                    </div>
                )}
                <div className={
                    `dark:bg-slate-50 bg-slate-50 min-h-screen w-full ${activeMenu ?
                        'lg:ml-72' : 'flex-1'}` 
                    }>
                        <div className='sticky top-0 z-30 bg-slate-50 shadow-md shadow-[#99999910]'>
                            <NavBar />
                        </div>

                
                    <div>
                        <Routes>
                            {/* Dashboard */}
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/inventaire" element={<Inventaire/>}/>
                            <Route path="/ean" element={<EAN/>}/>
                            <Route path="/livraisonPb" element={<LivraisonPb/>}/>
                            <Route path="/livraisonMR" element={<LivraisonMR/>}/>
                            <Route path="/ExpEtiquette" element={<ExportEtiq/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default App