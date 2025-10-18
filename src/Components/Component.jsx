import React, { useEffect, useState } from "react";
import"../Components/cssfiles/Header.scss"
import { useDispatch, useSelector } from "react-redux";
import { first, second, updateScoreAction } from "../state/action.js";
import "../Components/cssfiles/Header.scss";
import "../Components/download.jpg"
import downloadImg from"../Components/Screenshot_20251018-133507 (1).png"
import { Navigate, useNavigate } from "react-router-dom";
import { updateTimerAction } from "../state/action.js";
const Component = () => {
  const dispatch = useDispatch();
  const firstval = useSelector((state) => state.reducers.first);
  const Timer = useSelector((state) => state.reducers.Timer);
  const secondval = useSelector((state) => state.reducers.second);
  const [specialNumber, setSpecialNumber] = useState(null);
  const [showYay, setshowyay] = useState(false);

  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const playSound = () => {
    const sound = new Audio("/yay.mp3"); // ✅ from public folder
    sound.volume = 0.7; // optional: adjust loudness
    sound.play();
  };
  useEffect(() => {
    const newArray = [];
    const newArray2 = [];

    for (let index = 1; index <= 2; index++) {
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

    for (let index = 1; index <= 2; index++) {
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
     const randomSpecial = Math.floor(Math.random() * newArray.length) + 1;
  setSpecialNumber(randomSpecial);
  console.log("Special number:", randomSpecial);
  }, []);

  const firstClick = (item) => {
    if (!firstval) {
      dispatch(first(item));
      document.querySelector(`.t${item}`).classList.toggle("text-transparent");
      document.querySelector(`.t${item}`).classList.toggle("shadow-css");
      document.querySelector(`.t${item}`).classList.toggle("scale-110");
      document.querySelector(`.t${item}`).classList.add("text-[#def2f1]");
    } else {
      alert("please selcet form rigth side");
    }
  };
  useEffect(() => {
    if (!isMounted) {
      return; // Avoid updating state after unmounting
    }
  });
  const secondclick = (item) => {
    if (!secondval) {
      console.log("message second click");
      dispatch(second(item));
      // document.querySelector(`.r${item}`).classList.remove("text-transparent");
      document.querySelector(`.r${item}`).classList.toggle("text-transparent");
      document.querySelector(`.r${item}`).classList.toggle("shadow-css");
      document.querySelector(`.r${item}`).classList.toggle("scale-110");
      document.querySelector(`.r${item}`).classList.toggle("text-[#def2f1]");
    } else {
      alert("please selcet form left side");
    }
  };
  const navigator = useNavigate();
  useEffect(() => {
    if (Timer === 0) {
      navigator("/Inder"); // Trigger navigation when the timer reaches 0
    }
  }, [Timer, navigator, dispatch]);
  useEffect(() => {
    if (
      array.length > 0 &&
      array.length * 2 === document.querySelectorAll(".invisible").length
    ) {
      const a = async () => {
        await document.querySelectorAll(".invisible").forEach((item) => {
          item.classList.remove("invisible");
          item.classList.add("text-transparent");
          item.classList.remove("text-[#def2f1]");
        });
        //  navigator("/");
        console.log("navigated");
      };
      a();
    }
    if (firstval && secondval) {
      if (firstval == secondval) {
        console.log("equal", "first", firstval, "second", secondval);
        dispatch(first(null));
        dispatch(second(null));
        dispatch(updateScoreAction(20));
        document.querySelector(`.t${firstval}`).classList.add("text-[#def2f1]");
        document
          .querySelector(`.r${secondval}`)
          .classList.add("text-[#def2f1]");
        setTimeout(() => {
          document.querySelector(`.t${firstval}`).classList.add("invisible");
          document.querySelector(`.r${secondval}`).classList.add("invisible");
         if (firstval === specialNumber) {
  console.log("Special number matched! Showing special div");
  const pfp = document.querySelector(".pfpcenter");
  if (pfp) {
    // pfp.classList.remove("hidden");
    pfp.classList.remove("h-0", "w-0", "opacity-0");
    pfp.classList.add("h-[300px]", "w-[300px]", "opacity-100");
    pfp.classList.add("animate-ppf");

    setshowyay(true)
    playSound();
  }
}
        }, 800);
      } else {
        setTimeout(() => {
          document
            .querySelector(`.t${firstval}`)
            .classList.remove("text-[#def2f1]");
          document
            .querySelector(`.r${secondval}`)
            .classList.remove("text-[#def2f1]");
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
          document.querySelector(`.r${secondval}`).classList.remove("scale-110");
          document.querySelector(`.t${firstval}`).classList.remove("scale-110");
        }, 400);
        console.log("not equal");
        dispatch(first(null));
        dispatch(second(null));
      }
    }
  }, [firstval, secondval, Timer, navigator, dispatch]);
  return (
    <>
      <div className="w-full font-extrabold  text-3xl h-12 flex uppercase  justify-evenly items-center bg-red-50">
        <li
          style={{
            WebkitTextStroke: "1px",
            WebkitTextStrokeColor: "#42ec4b7e",
          }}
          className="  inline  text-[#cc4f4fd0] "
        >
          Left
        </li>
        <li
          style={{
            WebkitTextStroke: "1px",
            WebkitTextStrokeColor: "#cc4f4fd0",
          }}
          className="  inline  text-[#42ec4b] "
        >
          right
        </li>
      </div>
      {/* inderpratap com p start ----------------------------------------------------------------------- */}
<div
  className="pfpcenter  absolute 
  top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
  border-4 border-zinc-700 rounded-full 
  h-0 w-0 opacity-0
   z-40
  transition-all duration-70 ease-out 
  flex justify-center items-center text-white text-2xl">
    <img src={downloadImg} alt="no pfp" className="w-full justify-center items-center flex h-full rounded-full" />
 </div>
    {showYay && (
        <p
          className=" 
           popup "
          
        >
          🎉 you found golden inderpratap🎉
        </p>
      )}

       {/*  game componet bottomm ------------------------------------------------------------------ */}
     <div style={{ height: "83%" }} className="flex  w-full flex-row">
      <main className="grid grid-cols-2 outline-double p-4  outline-[#8e8d8a] sm:grid-cols-4  lg:grid-cols-5 lg  h-full w-1/2 gap-3  bg-red-50 mb-5  select-none">
          {/* <main className="grid grid-cols-6 gap-8 h-full w-1/2 bg-green-100  ml-1"> */}
          {array.map((item) => (
            <div
              key={item}
              onClick={() => firstClick(item)} // Pass a function that calls second with the item
              className={`t${item} transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#5e3f3b]  bg-[#e98074] rotate- rounded-full h-12 w-12 sm:h-16 sm:w-16 justify-center text-transparent flex items-center`}
            >
              {item}
            </div>
          ))}
        </main>
        <main className="grid grid-cols-2 outline-double p-4  outline-[#8e8d8a] sm:grid-cols-4  lg:grid-cols-5 lg  h-full w-1/2 gap-3  bg-red-50 mb-5  select-none">
          {/* <main className="grid grid-cols-6 gap-8 h-full w-1/2 bg-green-100  ml-1"> */}
          {array2.map((item) => (
            <div
              key={item}
              onClick={() => secondclick(item)} // Pass a function that calls second with the item
              className={`r${item}  transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#5e3f3b]  bg-[#e98074] rotate- rounded-full h-12 w-12 sm:h-16 sm:w-16 justify-center text-transparent flex items-center`}
            >
              {item}
            </div>
          ))}
        </main>
      </div>

    </>
  );
};

export default Component;
