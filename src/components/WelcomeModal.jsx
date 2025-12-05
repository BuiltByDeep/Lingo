import { useState } from 'react';
import { useUser } from '../contexts/UserContext';

export default function WelcomeModal() {
  const { login } = useUser();
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username.trim());
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: '#fff',
        padding: '40px',
        borderRadius: '16px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '32px', color: '#0066FF' }}>
          Welcome to Lingo
        </h1>
        <p style={{ margin: '0 0 24px 0', color: '#666', fontSize: '14px' }}>
          Enter a username to join the language learning community
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username..."
            autoFocus
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
              marginBottom: '16px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0066FF',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Enter Lingo
          </button>
        </form>
      </div>
    </div>
  );
}
