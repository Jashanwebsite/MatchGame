import React, { useEffect, useState } from "react";
import "../Components/cssfiles/Header.scss";
import { useDispatch, useSelector } from "react-redux";
import { first, second, updateScoreAction } from "../state/action.js";
import downloadImg from "../Components/nonback.png";
import pokemonaudio from "./pokemon-appear.mp3";
import congratulationaudio from "./congratulations.mp3";
import { useNavigate } from "react-router-dom";

const Component = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstval = useSelector((state) => state.reducers.first);
  const Timer = useSelector((state) => state.reducers.Timer);
  const secondval = useSelector((state) => state.reducers.second);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showPokemon, setShowPokemon] = useState(false);
  const [specialNumber, setSpecialNumber] = useState(null);
  const [array, setArray] = useState([]);
  const [array2, setArray2] = useState([]);
  const [matchedNumbers, setMatchedNumbers] = useState([]);
  const [gamePaused, setGamePaused] = useState(false);

  // Initialize arrays and special number
  useEffect(() => {
    const newArray = Array.from({ length: 6 }, (_, i) => i + 1);
    const newArray2 = Array.from({ length: 6 }, (_, i) => i + 1);

    const shuffledArray = [...newArray].sort(() => Math.random() - 0.5);
    const shuffledArray2 = [...newArray2].sort(() => Math.random() - 0.5);

    setArray(shuffledArray);
    setArray2(shuffledArray2);

    const randomSpecial = Math.floor(Math.random() * 6) + 1;
    setSpecialNumber(randomSpecial);
    console.log("Special number:", randomSpecial);
  }, []);

  // Navigate when timer reaches 0
  useEffect(() => {
    if (Timer === 0) {
      navigate("/Inder");
    }
  }, [Timer, navigate]);

  // Handle special number sequence
  useEffect(() => {
    if (showCongrats) {
      setGamePaused(true);

      try {
        const congAudio = new Audio(congratulationaudio);
        congAudio.volume = 0.6;
        congAudio.playbackRate = 1; // 1.5x speed (50% faster)
        congAudio.play().catch((e) => console.log("Pokemon audio failed:", e));
      } catch (error) {
        console.log("Error playing pokemon audio:", error);
      }
      // Congrats shows for 3 seconds, then Pokemon for 2 seconds
      const congratsTimer = setTimeout(() => {
        setShowCongrats(false);
        setShowPokemon(true);

        try {
          const pokemonAudio = new Audio(pokemonaudio);
          pokemonAudio.volume = 0.6;
          pokemonAudio.playbackRate = 1.5; // 1.5x speed (50% faster)
          pokemonAudio
            .play()
            .catch((e) => console.log("Pokemon audio failed:", e));
        } catch (error) {
          console.log("Error playing pokemon audio:", error);
        }
      }, 3000);

      const pokemonTimer = setTimeout(() => {
        setShowPokemon(false);
        setGamePaused(false);
      }, 5000); // 3000 + 2000 = 5000ms total

      return () => {
        clearTimeout(congratsTimer);
        clearTimeout(pokemonTimer);
      };
    }
  }, [showCongrats]);

  // Handle match logic
  useEffect(() => {
    if (firstval && secondval && !gamePaused) {
      if (firstval === secondval) {
        console.log("equal", "first", firstval, "second", secondval);

        // Add to matched numbers
        setMatchedNumbers((prev) => [...prev, firstval]);

        // Update score and reset selections
        dispatch(updateScoreAction(20));

        // Check if special number matched
        if (firstval === specialNumber) {
          console.log("Special number matched! Showing special div");
          setShowCongrats(true);
        }

        // Reset selections after delay
        setTimeout(() => {
          dispatch(first(null));
          dispatch(second(null));
        }, 800);
      } else {
        // Not equal - reset after delay
        setTimeout(() => {
          dispatch(first(null));
          dispatch(second(null));
        }, 400);
        console.log("not equal");
      }
    }
  }, [firstval, secondval, dispatch, specialNumber, gamePaused]);

  const firstClick = (item) => {
    if (!gamePaused && !firstval && !matchedNumbers.includes(item)) {
      dispatch(first(item));
    } else if (firstval) {
      alert("please select from right side");
    }
  };

  const secondClick = (item) => {
    if (!gamePaused && !secondval && !matchedNumbers.includes(item)) {
      dispatch(second(item));
    } else if (secondval) {
      alert("please select from left side");
    }
  };

  // Helper function to get tile classes
  const getTileClasses = (item, prefix) => {
    const baseClasses =
      "transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-[#5e3f3b] bg-[#e98074] rounded-full h-12 w-12 sm:h-16 sm:w-16 justify-center flex items-center";

    if (matchedNumbers.includes(item)) {
      return `${baseClasses} text-[#def2f1] invisible`;
    } else if (
      (prefix === "t" && firstval === item) ||
      (prefix === "r" && secondval === item)
    ) {
      return `${baseClasses} text-[#def2f1] shadow-css scale-110`;
    } else {
      return `${baseClasses} text-transparent`;
    }
  };

  return (
    <>
      <div className="w-full font-extrabold text-3xl h-12 flex uppercase justify-evenly items-center bg-red-50">
        <li
          style={{
            WebkitTextStroke: "1px",
            WebkitTextStrokeColor: "#42ec4b7e",
          }}
          className="inline text-[#cc4f4fd0]"
        >
          Left
        </li>
        <li
          style={{
            WebkitTextStroke: "1px",
            WebkitTextStrokeColor: "#cc4f4fd0",
          }}
          className="inline text-[#42ec4b]"
        >
          Right
        </li>
      </div>

      {/* Profile Image */}
      <div className="pfpcenter absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-4 border-zinc-700 rounded-full h-0 w-0 opacity-0 z-40 transition-all duration-70 ease-out flex justify-center items-center text-white text-2xl">
        <img
          src={downloadImg}
          alt="no pfp"
          className="w-full justify-center items-center flex h-full rounded-full"
        />
      </div>

      {/* Game Component */}
      <div style={{ height: "83%" }} className="flex w-full flex-row">
        {/* Left Grid */}
        <main
          className={`grid grid-cols-2 outline-double p-4 outline-[#8e8d8a] sm:grid-cols-4 lg:grid-cols-5 h-full w-1/2 gap-3 bg-red-50 mb-5 select-none ${
            gamePaused ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {array.map((item) => (
            <div
              key={item}
              onClick={() => firstClick(item)}
              className={`t${item} ${getTileClasses(item, "t")}`}
            >
              {item}
            </div>
          ))}
        </main>

        {/* Right Grid */}
        <main
          className={`grid grid-cols-2 outline-double p-4 outline-[#8e8d8a] sm:grid-cols-4 lg:grid-cols-5 h-full w-1/2 gap-3 bg-red-50 mb-5 select-none ${
            gamePaused ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          {array2.map((item) => (
            <div
              key={item}
              onClick={() => secondClick(item)}
              className={`r${item} ${getTileClasses(item, "r")}`}
            >
              {item}
            </div>
          ))}
        </main>

        {/* Congratulations Popup */}
        {showCongrats && (
          <div className="congrats-overlay">
            <div className="congrats-container">
              <div className="confetti">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="confetti-piece"></div>
                ))}
              </div>
              <h1 className="congrats-text">Congratulations!</h1>
              <div className="fireworks">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="firework"></div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pokemon Card */}
        {showPokemon && (
          <div className="pokemon-overlay">
            <div className="pokemon-container">
              <div className="pokemon-card">
                <div className="pokemon-shine"></div>
                <div className="pokemon-glow"></div>
                <img src={downloadImg} alt="Mewtwo" className="pokemon-image" />
                <div className="pokemon-info">
                  <h2 className="pokemon-name">INDERPARTAP</h2>
                  <p className="pokemon-type">IP 3 attempt</p>
                  <div className="pokemon-stats">
                    <span className="pokemon-rarity">✨ Legendary</span>
                  </div>
                </div>
                <div className="sparkles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="sparkle"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Component;
