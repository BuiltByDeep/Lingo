import { useEffect, useState } from 'react';

export default function HalloweenBackground() {
  const [bats, setBats] = useState([]);
  const [floatingGhosts, setFloatingGhosts] = useState([]);
  const [candles, setCandles] = useState([]);

  useEffect(() => {
    // Create initial bats
    const initialBats = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 50,
      delay: Math.random() * 5
    }));
    setBats(initialBats);

    // Create floating ghosts - one on left, two on right
    const initialGhosts = [
      { id: 0, x: 8, y: 20, delay: 0, duration: 10 }, // Left side
      { id: 1, x: 72, y: 30, delay: 3, duration: 9 }, // Right side
      { id: 2, x: 82, y: 45, delay: 6, duration: 11 }  // Right side
    ];
    setFloatingGhosts(initialGhosts);

    setCandles([]); // No candles
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }}>
      {/* Haunted Forest Background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(ellipse at 50% 20%, #1a0a2e 0%, #0a0a0a 50%, #000000 100%)'
      }} />

      {/* Full Moon */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #FFF8DC 0%, #F0E68C 50%, #DAA520 100%)',
        boxShadow: '0 0 60px 20px rgba(255, 248, 220, 0.4)',
        animation: 'moonGlow 4s ease-in-out infinite'
      }} />

      {/* Purple Fog - Simple version */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '40%',
        background: 'linear-gradient(to top, rgba(157, 78, 221, 0.5) 0%, rgba(157, 78, 221, 0.2) 50%, transparent 100%)',
        animation: 'fogRise 8s ease-in-out infinite'
      }} />

      {/* Tree Silhouettes - More trees spread across */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`tree-${i}`}
          style={{
            position: 'absolute',
            bottom: 0,
            left: `${i * 8.5}%`,
            width: '80px',
            height: `${150 + Math.random() * 100}px`,
            background: '#000',
            clipPath: 'polygon(50% 0%, 30% 30%, 35% 30%, 20% 60%, 25% 60%, 0% 100%, 100% 100%, 75% 60%, 80% 60%, 65% 30%, 70% 30%)',
            opacity: 0.8,
            zIndex: 1
          }}
        />
      ))}

      {/* Flying Bats with realistic animation */}
      {bats.map((bat) => (
        <div
          key={bat.id}
          style={{
            position: 'absolute',
            left: `${bat.x}%`,
            top: `${bat.y}%`,
            animation: `batFly 15s linear infinite`,
            animationDelay: `${bat.delay}s`,
            opacity: 0.8,
            transform: 'scale(0.8)'
          }}
        >
          <svg width="50" height="40" viewBox="0 0 50 40" style={{ animation: 'flapWings 0.3s ease-in-out infinite', filter: 'drop-shadow(0 0 3px rgba(157, 78, 221, 0.5))' }}>
            {/* Bat body */}
            <ellipse cx="25" cy="20" rx="4" ry="5" fill="#4a4a4a" stroke="#9D4EDD" strokeWidth="0.5" />
            {/* Bat head */}
            <circle cx="25" cy="16" r="3" fill="#4a4a4a" stroke="#9D4EDD" strokeWidth="0.5" />
            {/* Bat ears */}
            <path d="M22 14 L21 11 L23 14 Z" fill="#4a4a4a" stroke="#9D4EDD" strokeWidth="0.5" />
            <path d="M28 14 L29 11 L27 14 Z" fill="#4a4a4a" stroke="#9D4EDD" strokeWidth="0.5" />
            {/* Left wing */}
            <path 
              d="M21 20 Q12 14, 5 16 Q9 22, 15 24 Q18 21, 21 20 Z" 
              fill="#4a4a4a" 
              stroke="#9D4EDD" 
              strokeWidth="0.5"
              opacity="0.9"
            />
            {/* Right wing */}
            <path 
              d="M29 20 Q38 14, 45 16 Q41 22, 35 24 Q32 21, 29 20 Z" 
              fill="#4a4a4a" 
              stroke="#9D4EDD" 
              strokeWidth="0.5"
              opacity="0.9"
            />
          </svg>
        </div>
      ))}

      {/* Floating Ghosts - Slowly floating on the right side */}
      {floatingGhosts.map((ghost) => (
        <div
          key={`ghost-${ghost.id}`}
          style={{
            position: 'absolute',
            left: `${ghost.x}%`,
            top: `${ghost.y}%`,
            width: '80px',
            height: '100px',
            opacity: 0.4,
            animation: `ghostFloatSlow ${ghost.duration}s ease-in-out infinite`,
            animationDelay: `${ghost.delay}s`,
            filter: 'drop-shadow(0 0 10px rgba(200, 200, 255, 0.6))'
          }}
        >
          <svg width="80" height="100" viewBox="0 0 80 100">
            <path
              d="M40 10 Q20 10, 15 30 Q10 50, 15 70 L15 90 Q20 85, 25 90 Q30 85, 35 90 Q40 85, 45 90 Q50 85, 55 90 Q60 85, 65 90 L65 70 Q70 50, 65 30 Q60 10, 40 10 Z"
              fill="rgba(220, 220, 255, 0.7)"
              filter="blur(1px)"
            />
            <circle cx="30" cy="35" r="4" fill="rgba(50, 50, 100, 0.8)" />
            <circle cx="50" cy="35" r="4" fill="rgba(50, 50, 100, 0.8)" />
            <ellipse cx="40" cy="50" rx="8" ry="6" fill="rgba(50, 50, 100, 0.6)" />
          </svg>
        </div>
      ))}



      {/* Layered Fog/Mist */}
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: 0,
        width: '200%',
        height: '30%',
        background: 'linear-gradient(to top, rgba(157, 78, 221, 0.3) 0%, transparent 100%)',
        animation: 'mistDrift 60s linear infinite',
        opacity: 0.7
      }} />
      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '-50%',
        width: '200%',
        height: '25%',
        background: 'linear-gradient(to top, rgba(100, 100, 150, 0.25) 0%, transparent 100%)',
        animation: 'mistDrift 80s linear infinite reverse',
        opacity: 0.6
      }} />

      {/* Cobwebs in corners - More Visible */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '200px',
        height: '200px',
        opacity: 0.6
      }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <line x1="0" y1="0" x2="150" y2="0" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="150" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="2" />
          <line x1="0" y1="0" x2="100" y2="100" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="2" />
          <line x1="50" y1="0" x2="0" y2="50" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="1.5" />
          <line x1="100" y1="0" x2="0" y2="100" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="1.5" />
          <path d="M0 30 Q30 25, 60 30" stroke="rgba(200, 200, 200, 0.3)" strokeWidth="1" fill="none" />
          <path d="M30 0 Q25 30, 30 60" stroke="rgba(200, 200, 200, 0.3)" strokeWidth="1" fill="none" />
          <circle cx="120" cy="20" r="2" fill="rgba(50, 50, 50, 0.8)" />
        </svg>
      </div>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        opacity: 0.6
      }}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <line x1="200" y1="0" x2="50" y2="0" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="2" />
          <line x1="200" y1="0" x2="200" y2="150" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="2" />
          <line x1="200" y1="0" x2="100" y2="100" stroke="rgba(200, 200, 200, 0.5)" strokeWidth="2" />
          <line x1="150" y1="0" x2="200" y2="50" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="1.5" />
          <line x1="100" y1="0" x2="200" y2="100" stroke="rgba(200, 200, 200, 0.4)" strokeWidth="1.5" />
          <path d="M200 30 Q170 25, 140 30" stroke="rgba(200, 200, 200, 0.3)" strokeWidth="1" fill="none" />
          <path d="M170 0 Q175 30, 170 60" stroke="rgba(200, 200, 200, 0.3)" strokeWidth="1" fill="none" />
          <circle cx="80" cy="20" r="2" fill="rgba(50, 50, 50, 0.8)" />
        </svg>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes moonGlow {
          0%, 100% { box-shadow: 0 0 60px 20px rgba(255, 248, 220, 0.4); }
          50% { box-shadow: 0 0 80px 30px rgba(255, 248, 220, 0.6); }
        }

        @keyframes fogRise {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-20px); opacity: 0.7; }
        }

        @keyframes batFly {
          0% { 
            transform: translateX(0) translateY(0) rotate(0deg); 
          }
          15% { 
            transform: translateX(200px) translateY(-40px) rotate(8deg); 
          }
          30% { 
            transform: translateX(400px) translateY(-20px) rotate(-5deg); 
          }
          45% { 
            transform: translateX(600px) translateY(-60px) rotate(12deg); 
          }
          60% { 
            transform: translateX(800px) translateY(-30px) rotate(-8deg); 
          }
          75% { 
            transform: translateX(1000px) translateY(-50px) rotate(6deg); 
          }
          90% { 
            transform: translateX(1200px) translateY(-25px) rotate(-4deg); 
          }
          100% { 
            transform: translateX(1400px) translateY(-40px) rotate(0deg); 
          }
        }

        @keyframes flapWings {
          0%, 100% { 
            transform: scaleX(1) scaleY(1); 
          }
          50% { 
            transform: scaleX(1.2) scaleY(0.9); 
          }
        }

        @keyframes ghostFloatSlow {
          0%, 100% { 
            transform: translateY(0) translateX(0); 
            opacity: 0.35; 
          }
          25% { 
            transform: translateY(-15px) translateX(-10px); 
            opacity: 0.45; 
          }
          50% { 
            transform: translateY(-25px) translateX(5px); 
            opacity: 0.5; 
          }
          75% { 
            transform: translateY(-15px) translateX(-5px); 
            opacity: 0.4; 
          }
        }

        @keyframes candleFlicker {
          0%, 100% { 
            opacity: 1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.8; 
            transform: scale(0.95); 
          }
        }

        @keyframes emberFloat {
          0% { 
            transform: translateY(0) translateX(0); 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-60px) translateX(${Math.random() * 20 - 10}px); 
            opacity: 0; 
          }
        }

        @keyframes mistDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
