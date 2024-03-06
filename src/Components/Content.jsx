import React from 'react'
import Header from './Header'
import Component from './Component'
import Enterance from './Enterance'
import {BrowserRouter , Route,Routes} from 'react-router-dom'
const Content = () => {
  return (
    <div className='content w-full bg-[#212121] '>
      <BrowserRouter>
      <Routes>
        <Route element={ <Enterance />} path='/'></Route>
         <Route element={  <Header></Header>} path='/game'></Route>
         {/* <Route element={} path='/game'></Route> */}
    
      {/* <Component></Component> */}

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default Content
