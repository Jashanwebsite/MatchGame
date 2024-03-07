import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTimerAction } from "../state/action.js";
import Component from "./Component.jsx";
import "./cssfiles/Header.scss";
const Header = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.reducers.Timer);
  const score = useSelector((state) => state.reducers.Score);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timer > 0) {
        dispatch(updateTimerAction(timer - 1));
      }
    }, 1000);
    return () => clearInterval(intervalId); // cleanup on component unmount
  }, [dispatch, timer]);

  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <>
      <header className=" h-1/6 w-full min-h-24 bg-[#8e8d8a]   ">
        <ol className="h-full w-full  bg-[#8e8d8a] text-[#f8d6a6]  font-semibold mb-2 capitalize flex items-center justify-between min-h-24 ">
          <li className="header1    w-1/4 ml-5  self-center justify-self-start  text-2xl sm:text-4xl  font-bold  text-[#def2f1]">
            FunGame
          </li>
          <li className="header2 min-h-max shadow-lg shadow-[#15152c5b] h-1/2 sm:w-1/12 w-1/4 p-1 flex flex-col items-center text-center justify-center  ">
            {" "}
            <span className=" w-full h-1/2">time left</span>{" "}
            <span className=" w-full h-1/2 ">
              {Math.floor(timer / 60)}:{timer % 60 == 0 ? "00" : timer % 60}
            </span>
          </li>
          <li
            className="header3 h-1/2 sm:w-1/12 w-1/4 p-1 flex items-center text-center mr-2 justify-center shadow-lg shadow-[#15152c5b]"
            onClick={() => location.reload()}
          >
            score:{score}
          </li>
          { window.innerWidth > 640 &&<li
            className="header3 h-1/2 w-1/12 p-1 flex items-center text-center justify-center  shadow-lg shadow-[#15152c5b] mr-5"
            onClick={() => location.reload()}
          >
            Restart
          </li>}
        </ol>
      </header>
      <Component></Component>
    </>
  );
};

export default Header;
