import "../Components/cssfiles/Inder.scss"
import React, { useState, useEffect } from 'react';
import downloadImg from"../Components/Screenshot_20251018-133507 (1).png"

const Inder = () => {
  const [showCongrats, setShowCongrats] = useState(true);
  const [showPokemon, setShowPokemon] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const stats = [
    { name: 'Patience', level: 85 },
    { name: 'Agility', level: 72 },
    { name: 'Strength', level: 90 },
    { name: 'Intelligence', level: 88 },
    { name: 'Charisma', level: 78 },
    { name: 'Endurance', level: 82 }
  ];

  useEffect(() => {
    // Sequence: Congrats (3s) -> Pokemon (2s) -> Profile
    const congratsTimer = setTimeout(() => {
      setShowCongrats(false);
      setShowPokemon(true);
    }, 3000);

    const pokemonTimer = setTimeout(() => {
      setShowPokemon(false);
      setShowProfile(true);
    }, 5000); // 3000 + 2000 = 5000ms total

    return () => {
      clearTimeout(congratsTimer);
      clearTimeout(pokemonTimer);
    };
  }, []);

  return (
    <div className="profile-container">
      {/* Blur Background */}
      <div className="background-blur"></div>
      
      {/* Congratulations Popup */}
      {showCongrats && (
        <div className="congrats-overlay">
          <div className="congrats-container">
            <div className="confetti">
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
              <div className="confetti-piece"></div>
            </div>
            <h1 className="congrats-text">Congratulations!</h1>
            <div className="fireworks">
              <div className="firework"></div>
              <div className="firework"></div>
              <div className="firework"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Rare Pokemon Display */}
      {showPokemon && (
        <div className="pokemon-overlay">
          <div className="pokemon-container">
            <div className="pokemon-card">
              <div className="pokemon-shine"></div>
              <div className="pokemon-glow"></div>
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" 
                alt="Mewtwo" 
                className="pokemon-image"
              />
              <div className="pokemon-info">
                <h2 className="pokemon-name">Mewtwo</h2>
                <p className="pokemon-type">Psychic</p>
                <div className="pokemon-stats">
                  <span className="pokemon-rarity">✨ Legendary</span>
                </div>
              </div>
              <div className="sparkles">
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="sparkle"></div>
                <div className="sparkle"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Profile Card - Only show after pokemon */}
      {showProfile && (
        <div className="profile-card">
          {/* Profile Picture Section */}
          <div className="profile-pic-section">
            <div className="profile-pic-container">
              <img 
                src={downloadImg} 
                alt="Profile" 
                className="profile-pic"
              />
              <div className="level-badge">
                <span className="level-text">Lv.9999</span>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="profile-info">
            <h2 className="profile-name">Inderpartap singh</h2>
            <p className="profile-title">IP</p>
            
            {/* Stats Section - Simplified */}
            <div className="stats-section">
              <h3 className="stats-title">Attributes</h3>
              <div className="stats-list">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-line">
                    <div className="stat-content">
                      <span className="stat-name">{stat.name}</span>
                      <span className="stat-value">{stat.level}%</span>
                    </div>
                    <div className="stat-divider"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inder;