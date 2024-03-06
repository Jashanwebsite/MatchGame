import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { resetscore, updateTimerAction } from "../state/action";

const Enterance = () => {
  const timer = useSelector(state => state.reducers.Timer)
  const score = useSelector(state => state.reducers.Score)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const timeupdate =()=>{
   async function  a (){

     await dispatch(updateTimerAction(300))
     dispatch(resetscore(0))
      navigate("/game")
    };a();
  }
  return (
    <div onClick={timeupdate} className="absolute backdrop-grayscale bg-[#8bb1ab] backdrop-blur  enterance h-screen w-full z-50 flex flex-col items-center justify-center ">
      <h1 className="capitalize font-bold text-4xl  h-1/6">{ timer === 0? "retry":"FunGame"}</h1>
      <h1 className="capitalize font-bold text-xl mb-7   h-15">{"score"}:{score}</h1>
      <div
        
        // onClick={play}
        class="border-[rgb(7,7,7)] backdrop:blur rounded-xl bg-[rgba(36,36,34,0.25)] hover:border-[#938bd4] transition-all shadow-button  hover:scale-110  hover:box-shadow-button group  -skew-x-[30deg] transform border"
      >
        <li
          style={{ listStyle: "none" }}
          class="m-4  skew-x-[30deg] transform bg-transparent px-9 text-center first-letter:uppercase"
        >
          <b class=" capitalize block text-lg group-hover:text-[#212121]">
            Play
          </b>
        </li>
      </div>
    </div>
  );
};
// <!-- HTML !-->
// <button class="button-33" role="button">Button 33</button>

/* CSS */
// .button-33 {
//   background-color: #c2fbd7;
//   border-radius: 100px;
//   box-shadow: rgba(44, 187, 99, .2) 0 -25px 18px -14px inset,rgba(44, 187, 99, .15) 0 1px 2px,rgba(44, 187, 99, .15) 0 2px 4px,rgba(44, 187, 99, .15) 0 4px 8px,rgba(44, 187, 99, .15) 0 8px 16px,rgba(44, 187, 99, .15) 0 16px 32px;
//   color: green;
//   cursor: pointer;
//   display: inline-block;
//   font-family: CerebriSans-Regular,-apple-system,system-ui,Roboto,sans-serif;
//   padding: 7px 20px;
//   text-align: center;
//   text-decoration: none;
//   transition: all 250ms;
//   border: 0;
//   font-size: 16px;
//   user-select: none;
//   -webkit-user-select: none;
//   touch-action: manipulation;
// }

// .button-33:hover {
//   box-shadow: rgba(44,187,99,.35) 0 -25px 18px -14px inset,rgba(44,187,99,.25) 0 1px 2px,rgba(44,187,99,.25) 0 2px 4px,rgba(44,187,99,.25) 0 4px 8px,rgba(44,187,99,.25) 0 8px 16px,rgba(44,187,99,.25) 0 16px 32px;
//   transform: scale(1.05) rotate(-1deg);
// }

export default Enterance;
