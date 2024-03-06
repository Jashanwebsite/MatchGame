import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { first, second, updateScoreAction } from "../state/action.js";
import "../Components/cssfiles/Header.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { updateTimerAction } from "../state/action.js";
const Component = () => {
  const dispatch = useDispatch();
  const firstval = useSelector((state) => state.reducers.first);
  const Timer = useSelector((state) => state.reducers.Timer);
  const secondval = useSelector((state) => state.reducers.second);
  // useEffect(() => {
  //   console.log(reducer);
  // }, [firstval, secondval, reducer]);
  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]);
 const [isMounted, setIsMounted] = useState(true);
  useEffect(() => {
    const newArray = [];
    const newArray2 = [];

    for (let index = 1; index <= 16; index++) {
      newArray.push(index);
    }
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
      }
      setArray(array);
    }
    shuffleArray(newArray);

    for (let index = 1; index <= 16; index++) {
      newArray2.push(index);
    }
    function shuffleArray2(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
      }
      setArray2(array);
    }
    shuffleArray2(newArray2);
  }, []);

  const firstClick = (item) => {
    if (!firstval) {
      dispatch(first(item));
      document.querySelector(`.t${item}`).classList.toggle("text-transparent");
      document.querySelector(`.t${item}`).classList.toggle("shadow-css");
    } else {
      alert("please selcet form second one");
    }
  };
  useEffect(() => {
    if (!isMounted) {
      return; // Avoid updating state after unmounting
    }})
  const secondclick = (item) => {
    if (!secondval) {
      console.log("message second click");
      dispatch(second(item));
      // document.querySelector(`.r${item}`).classList.remove("text-transparent");
      document.querySelector(`.r${item}`).classList.toggle("text-transparent");
      document.querySelector(`.r${item}`).classList.toggle("shadow-css");
    } else {
      alert("please selcet form first one");
    }
  };
  const navigator = useNavigate();
  useEffect(() => {
    if (Timer === 0) {

      navigator("/"); // Trigger navigation when the timer reaches 0
    }
  }, [Timer, navigator, dispatch]);
  useEffect(() => {
    if ( array.length > 0 && array.length * 2 === document.querySelectorAll(".invisible").length) {
      const a= async()=>{

       await document.querySelectorAll(".invisible").forEach((item)=>{
          item.classList.remove('invisible')
          item.classList.add("text-transparent")
        })
        navigator("/")
      console.log("navigated")

      }
      a();
    }
    if (firstval && secondval) {
      if (firstval == secondval) {
        console.log("equal", "first", firstval, "second", secondval);
        dispatch(first(null));
        dispatch(second(null));
        dispatch(updateScoreAction(20))
        setTimeout(() => {
          document.querySelector(`.t${firstval}`).classList.add("invisible");
          document.querySelector(`.r${secondval}`).classList.add("invisible");
        }, 800);
      } else {
        setTimeout(() => {
          document
            .querySelector(`.t${firstval}`)
            .classList.add("text-transparent");
          document
            .querySelector(`.r${secondval}`)
            .classList.add("text-transparent");
          document
            .querySelector(`.t${firstval}`)
            .classList.remove("shadow-css");
          document
            .querySelector(`.r${secondval}`)
            .classList.remove("shadow-css");
        }, 400);
        console.log("not equal");
        dispatch(first(null));
        dispatch(second(null));
      }
    }
  }, [firstval, secondval,Timer, navigator, dispatch]);
  return (
    <>
      <main className="grid grid-cols-6  gap-4 bg-slate-50 mb-5  select-none">
        {array.map((item) => (
          <div
            key={item}
            onClick={() => firstClick(item)}
            className={`t${item} bg-slate-500 text-transparent rounded-full h-16 w-16 justify-center flex items-center`}
          >
            {item}
          </div>
        ))}
      </main>
      <div className="grid grid-cols-6 gap-8 bg-slate-100 ">
        {array2.map((item) => (
          <div
            key={item}
            onClick={() => secondclick(item)} // Pass a function that calls second with the item
            className={`r${item} bg-slate-500 rounded-full h-16 w-16 justify-center text-transparent flex items-center`}
          >
            {item}
          </div>
        ))}
      </div>
    </>
  );
};

export default Component;
