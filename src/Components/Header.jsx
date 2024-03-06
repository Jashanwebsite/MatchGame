import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {updateTimerAction} from "../state/action.js"
import Component from './Component.jsx';
import "./cssfiles/Header.scss"
const Header = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.reducers.Timer);
  const score = useSelector((state) => state.reducers.Score);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if(timer>0){
      dispatch(updateTimerAction(timer - 1));}
    }, 1000);
    return () => clearInterval(intervalId); // cleanup on component unmount
  }, [dispatch, timer]);
  
  useEffect(()=>{
   console.log(score)
  }
    
 ,[score] )

  return (
    <>
    <header className=' h-1/6 w-full bg-slate-600 mb-2  '>
      <ol className='h-full w-full bg-slate-600 text-xl font-semibold mb-2 capitalize flex items-center justify-evenly min-h-24 '>
      <li className="header1  text-4xl  font-bold ">FunGame</li>
        <li className="header2 "> time left {Math.floor(timer/60)}:{timer%60==0 ? "00" : timer%60}</li>
        <li className="header3" onClick={ ()=>location.reload()}>score:{score}</li>
        <li className="header3" onClick={ ()=>location.reload()}>Restart</li>

      </ol>
      
    </header>
    <Component></Component>
    </>
  )
}

export default Header
