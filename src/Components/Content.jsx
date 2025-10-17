import React from 'react'
import Header from './Header'
import Component from './Component'
import Enterance from './Enterance'
import {BrowserRouter , Route,Routes} from 'react-router-dom'
import Inder from './Inder'
const Content = () => {
  return (
    <div className='content w-full h-screen bg-[#eae7dc] '>
      <BrowserRouter>
      <Routes>
        <Route element={ <Enterance />} path='/'></Route>
         <Route element={  <Header></Header>} path='/game'></Route>
         <Route element={<Inder/>} path='/inder'></Route>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Content
