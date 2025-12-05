import { MessageCircle, X } from 'lucide-react';

export default function PrivateMessageNotification({ sender, onOpen, onDismiss }) {
  const isHalloween = new Date().getMonth() === 9; // October = Halloween mode
  
  return (
    <div style={{
      position: 'relative',
      background: isHalloween ? 'rgba(20, 10, 30, 0.95)' : '#fff',
      border: isHalloween ? '2px solid #9D4EDD' : '2px solid #0066FF',
      borderRadius: '8px',
      padding: '16px',
      boxShadow: isHalloween 
        ? '0 0 20px rgba(157, 78, 221, 0.6), 0 4px 12px rgba(0, 0, 0, 0.5)' 
        : '0 4px 12px rgba(0, 0, 0, 0.3)',
      minWidth: '280px',
      animation: isHalloween ? 'zombieRise 0.8s ease-out' : 'slideIn 0.3s ease-out',
      color: isHalloween ? '#E0D5FF' : '#000',
      overflow: 'visible',
      pointerEvents: 'auto'
    }}>
      {/* Zombie Hand - Only for Halloween */}
      {isHalloween && (
        <div style={{
          position: 'absolute',
          left: '-65px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-15deg)',
          animation: 'zombieGrab 2s ease-in-out infinite',
          zIndex: -1,
          pointerEvents: 'none'
        }}>
          <svg width="80" height="100" viewBox="0 0 80 100">
            {/* Arm */}
            <rect x="50" y="40" width="30" height="60" fill="#7a9b76" rx="5" />
            {/* Hand palm */}
            <ellipse cx="50" cy="45" rx="20" ry="25" fill="#8fae8b" />
            {/* Fingers */}
            <rect x="35" y="20" width="8" height="30" fill="#8fae8b" rx="4" />
            <rect x="45" y="15" width="8" height="35" fill="#8fae8b" rx="4" />
            <rect x="55" y="18" width="8" height="32" fill="#8fae8b" rx="4" />
            <rect x="65" y="22" width="8" height="28" fill="#8fae8b" rx="4" />
            {/* Nails */}
            <ellipse cx="39" cy="20" rx="4" ry="3" fill="#4a4a4a" />
            <ellipse cx="49" cy="15" rx="4" ry="3" fill="#4a4a4a" />
            <ellipse cx="59" cy="18" rx="4" ry="3" fill="#4a4a4a" />
            <ellipse cx="69" cy="22" rx="4" ry="3" fill="#4a4a4a" />
            {/* Stitches */}
            <line x1="50" y1="50" x2="55" y2="52" stroke="#2d2d2d" strokeWidth="1.5" />
            <line x1="55" y1="52" x2="50" y2="54" stroke="#2d2d2d" strokeWidth="1.5" />
            <line x1="50" y1="60" x2="55" y2="62" stroke="#2d2d2d" strokeWidth="1.5" />
            <line x1="55" y1="62" x2="50" y2="64" stroke="#2d2d2d" strokeWidth="1.5" />
          </svg>
        </div>
      )}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Close button clicked! Sender:', sender.userId);
          onDismiss();
        }}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '28px',
          height: '28px',
          background: isHalloween ? '#9D4EDD' : '#FF4444',
          border: 'none',
          cursor: 'pointer',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          pointerEvents: 'auto',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isHalloween ? '#B565FF' : '#FF0000';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isHalloween ? '#9D4EDD' : '#FF4444';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <X size={16} color="#fff" strokeWidth={3} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #0066FF 0%, #00F0FF 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <MessageCircle size={20} color="#fff" />
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
            New Private Message
          </div>
          <div style={{ fontSize: '13px', color: '#666' }}>
            from {sender.username}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        style={{
          width: '100%',
          padding: '10px',
          background: isHalloween ? '#9D4EDD' : '#0066FF',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isHalloween ? '#B565FF' : '#0052CC';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isHalloween ? '#9D4EDD' : '#0066FF';
        }}
      >
        Open Chat
      </button>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes zombieRise {
          0% {
            transform: translateY(100px) rotate(-5deg);
            opacity: 0;
          }
          60% {
            transform: translateY(-10px) rotate(2deg);
          }
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes zombieGrab {
          0%, 100% {
            transform: translateY(-50%) rotate(-15deg) translateX(0);
          }
          50% {
            transform: translateY(-50%) rotate(-10deg) translateX(15px);
          }
        }

        @keyframes sparkShoot {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -200%) scale(0.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
