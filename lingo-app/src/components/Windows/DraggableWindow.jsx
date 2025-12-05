import { Rnd } from 'react-rnd';
import { useTheme } from '../../contexts/ThemeContext';
import { useWindows } from '../../contexts/WindowContext';
import { Minus, X } from 'lucide-react';

export default function DraggableWindow({ 
  windowId, 
  title, 
  children, 
  defaultPosition, 
  defaultSize,
  zIndex,
  minimized 
}) {
  const { theme } = useTheme();
  const { closeWindow, focusWindow, minimizeWindow } = useWindows();

  if (minimized) return null;

  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-title-bar"
      style={{ zIndex }}
      onMouseDown={() => focusWindow(windowId)}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: theme.windowBg,
          border: `3px solid ${theme.windowBorder}`,
          borderRadius: '6px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Title Bar */}
        <div
          className="window-title-bar"
          style={{
            background: theme.titleBarBg,
            color: theme.titleBarText,
            padding: '6px 8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'move',
            userSelect: 'none',
            borderRadius: '3px 3px 0 0',
            fontWeight: 'bold',
            fontSize: '13px',
            fontFamily: 'Tahoma, Verdana, sans-serif',
            boxShadow: theme.isHalloween ? '0 0 10px rgba(157, 78, 221, 0.5)' : 'none',
            animation: theme.isHalloween ? 'neonFlicker 3s ease-in-out infinite' : 'none',
            position: 'relative'
          }}
        >
          {/* Cobweb decoration for Halloween */}
          {theme.isHalloween && (
            <>
              <svg style={{
                position: 'absolute',
                top: -2,
                left: -2,
                width: '50px',
                height: '50px',
                pointerEvents: 'none',
                opacity: 0.7
              }} viewBox="0 0 50 50">
                <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="30" y2="30" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1.5" />
                <line x1="15" y1="0" x2="0" y2="15" stroke="rgba(220, 220, 220, 0.5)" strokeWidth="1" />
                <line x1="30" y1="0" x2="0" y2="30" stroke="rgba(220, 220, 220, 0.5)" strokeWidth="1" />
                <path d="M0 10 Q10 8, 20 10" stroke="rgba(220, 220, 220, 0.4)" strokeWidth="0.8" fill="none" />
                <path d="M10 0 Q8 10, 10 20" stroke="rgba(220, 220, 220, 0.4)" strokeWidth="0.8" fill="none" />
                <circle cx="35" cy="5" r="1.5" fill="rgba(50, 50, 50, 0.9)" />
              </svg>
              <svg style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: '50px',
                height: '50px',
                pointerEvents: 'none',
                opacity: 0.7
              }} viewBox="0 0 50 50">
                <line x1="50" y1="0" x2="10" y2="0" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1.5" />
                <line x1="50" y1="0" x2="50" y2="40" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1.5" />
                <line x1="50" y1="0" x2="20" y2="30" stroke="rgba(220, 220, 220, 0.6)" strokeWidth="1.5" />
                <line x1="35" y1="0" x2="50" y2="15" stroke="rgba(220, 220, 220, 0.5)" strokeWidth="1" />
                <line x1="20" y1="0" x2="50" y2="30" stroke="rgba(220, 220, 220, 0.5)" strokeWidth="1" />
                <path d="M50 10 Q40 8, 30 10" stroke="rgba(220, 220, 220, 0.4)" strokeWidth="0.8" fill="none" />
                <path d="M40 0 Q42 10, 40 20" stroke="rgba(220, 220, 220, 0.4)" strokeWidth="0.8" fill="none" />
                <circle cx="15" cy="5" r="1.5" fill="rgba(50, 50, 50, 0.9)" />
              </svg>
              <style>{`
                @keyframes neonFlicker {
                  0%, 100% { box-shadow: 0 0 10px rgba(157, 78, 221, 0.5); }
                  50% { box-shadow: 0 0 20px rgba(157, 78, 221, 0.8), 0 0 30px rgba(157, 78, 221, 0.4); }
                  75% { box-shadow: 0 0 5px rgba(157, 78, 221, 0.3); }
                }
              `}</style>
            </>
          )}
          <span>{title}</span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => minimizeWindow(windowId)}
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '2px',
                width: '21px',
                height: '21px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: theme.titleBarText,
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)';
                if (theme.isHalloween) {
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(157, 78, 221, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.5)';
              }}
            >
              {theme.isHalloween && <span style={{ position: 'absolute', top: '-8px', right: '-8px', fontSize: '10px' }}>🕷️</span>}
              <Minus size={14} />
            </button>
            <button
              onClick={() => closeWindow(windowId)}
              style={{
                background: theme.isHalloween ? '#8B0000' : '#D93025',
                border: '1px solid #B71C1C',
                borderRadius: '2px',
                width: '21px',
                height: '21px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF0000';
                if (theme.isHalloween) {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 0, 0, 0.8)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = theme.isHalloween ? '#8B0000' : '#D93025';
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.3)';
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </Rnd>
  );
}
