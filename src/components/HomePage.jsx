import { useState } from 'react';
import SignUpModal from './SignUpModal';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/auth';

export default function HomePage({ onLogin }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
      fontSize: '13px',
      color: '#000',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Main Container */}
      <div style={{
        width: '100%',
        flex: 1,
        background: '#ffffff',
        border: 'none',
        boxShadow: 'none',
        borderRadius: '0',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Blue Header Strip */}
        <div style={{
          background: '#4A7BA7',
          color: '#ffffff',
          padding: '20px 50px',
          fontWeight: 'bold',
          fontSize: '22px',
          borderBottom: '1px solid #3A6B97',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span style={{ fontSize: '28px' }}>🌐</span>
          <span>Lingo – Language Learning Buddy</span>
        </div>

        {/* Sub-header */}
        <div style={{
          background: '#E8E8E8',
          borderBottom: '1px solid #cccccc',
          padding: '16px 50px',
          fontSize: '16px'
        }}>
          You must sign in to join chat rooms and practice your languages.
        </div>

        {/* Two Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.3fr 1fr',
          gap: '0',
          flex: 1,
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%',
          marginTop: '30px'
        }}>
          {/* Left Column - New to Lingo */}
          <div style={{
            borderRight: '1px solid #cccccc',
            borderTop: '1px solid #cccccc'
          }}>
            {/* Title Bar */}
            <div style={{
              background: '#e5ecff',
              borderBottom: '1px solid #cccccc',
              padding: '14px 40px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              New to Lingo?
            </div>

            {/* Content */}
            <div style={{
              padding: '60px 40px',
              fontSize: '15px',
              lineHeight: '1.8',
              display: 'flex',
              gap: '40px'
            }}>
              {/* Illustration */}
              <div style={{
                flex: '0 0 250px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '10px'
              }}>
                <img 
                  src="/pixel.png" 
                  alt="People chatting"
                  style={{
                    width: '250px',
                    height: 'auto',
                    imageRendering: 'pixelated'
                  }}
                />
              </div>

              {/* Text Content */}
              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 30px 0', fontSize: '15px' }}>
                  Get a free Lingo account and start practicing languages in nostalgic chat rooms with a friendly AI buddy. No complicated setup — just pick a username and jump in.
                </p>

                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 30px 0'
                }}>
                  <li style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#009900', fontSize: '18px', fontWeight: 'bold' }}>✔</span>
                    <span style={{ fontSize: '15px' }}><strong>Learn through real conversation</strong> – join public rooms and talk with people around the world.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#009900', fontSize: '18px', fontWeight: 'bold' }}>✔</span>
                    <span style={{ fontSize: '15px' }}><strong>Practice with your AI buddy</strong> – get instant help with grammar, vocabulary, and pronunciation.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#009900', fontSize: '18px', fontWeight: 'bold' }}>✔</span>
                    <span style={{ fontSize: '15px' }}><strong>Play mini-games while you learn</strong> – build your skills with quick word and sentence challenges.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#009900', fontSize: '18px', fontWeight: 'bold' }}>✔</span>
                    <span style={{ fontSize: '15px' }}><strong>Voice & text in one place</strong> – send messages, record your voice, and get feedback.</span>
                  </li>
                  <li style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span style={{ color: '#009900', fontSize: '18px', fontWeight: 'bold' }}>✔</span>
                    <span style={{ fontSize: '15px' }}><strong>Retro look, modern tech</strong> – feels like early internet chat, powered by today's AI.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Sign up CTA */}
            <div style={{
              padding: '30px 40px',
              borderTop: '1px solid #cccccc',
              fontSize: '15px',
              background: '#F8F8F8'
            }}>
              <button
                onClick={() => setShowSignUp(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0000cc',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  padding: 0,
                  fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif'
                }}
                onMouseEnter={(e) => e.target.style.color = '#ff0000'}
                onMouseLeave={(e) => e.target.style.color = '#0000cc'}
              >
                Sign up now
              </button>
              {' '}to create your free Lingo Language Learning Buddy account.
            </div>
          </div>

          {/* Right Column - Existing Users */}
          <div style={{
            borderTop: '1px solid #cccccc'
          }}>
            {/* Title */}
            <div style={{
              background: '#e5ecff',
              borderBottom: '1px solid #cccccc',
              padding: '14px 40px',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              Existing Lingo users
            </div>

            {/* Sign In Form */}
            <form onSubmit={handleSignIn} style={{
              padding: '60px 40px'
            }}>
              {error && (
                <div style={{
                  background: '#ffe6e6',
                  border: '1px solid #cc0000',
                  padding: '14px',
                  marginBottom: '24px',
                  fontSize: '14px',
                  color: '#cc0000'
                }}>
                  {error}
                </div>
              )}

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}>
                  Email ID:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #999999',
                    borderRadius: '0',
                    fontSize: '15px',
                    fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontSize: '15px',
                  fontWeight: 'bold'
                }}>
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #999999',
                    borderRadius: '0',
                    fontSize: '15px',
                    fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{
                marginBottom: '35px',
                fontSize: '14px'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me on this computer</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  borderRadius: '0',
                  border: '1px solid #999999',
                  borderTop: '1px solid #FFFFFF',
                  borderLeft: '1px solid #FFFFFF',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: '1px 1px 0 #666666',
                  fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                  marginBottom: '18px',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(to bottom, #F0F0F0 0%, #D8D8D8 100%)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)';
                  }
                }}
                onMouseDown={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(to bottom, #C8C8C8 0%, #B0B0B0 100%)';
                    e.target.style.boxShadow = 'inset 1px 1px 2px rgba(0,0,0,0.3)';
                  }
                }}
                onMouseUp={(e) => {
                  if (!loading) {
                    e.target.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)';
                    e.target.style.boxShadow = '1px 1px 0 #666666';
                  }
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>

              <button
                type="button"
                onClick={() => setShowSignUp(true)}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  background: 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)',
                  color: '#000000',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  borderRadius: '0',
                  border: '1px solid #999999',
                  borderTop: '1px solid #FFFFFF',
                  borderLeft: '1px solid #FFFFFF',
                  cursor: 'pointer',
                  boxShadow: '1px 1px 0 #666666',
                  fontFamily: 'Tahoma, "MS Sans Serif", Arial, sans-serif',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #F0F0F0 0%, #D8D8D8 100%)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)';
                }}
                onMouseDown={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #C8C8C8 0%, #B0B0B0 100%)';
                  e.target.style.boxShadow = 'inset 1px 1px 2px rgba(0,0,0,0.3)';
                }}
                onMouseUp={(e) => {
                  e.target.style.background = 'linear-gradient(to bottom, #E8E8E8 0%, #D0D0D0 100%)';
                  e.target.style.boxShadow = '1px 1px 0 #666666';
                }}
              >
                Sign Up
              </button>

              <div style={{
                marginTop: '28px',
                fontSize: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <span style={{ color: '#666' }}>Forgot your password?</span>
                <span style={{ color: '#666' }}>Need help signing in?</span>
              </div>
            </form>
          </div>
        </div>

        {/* Why Lingo Section */}
        <div style={{
          background: '#fff8c6',
          borderTop: '1px solid #e5e197',
          padding: '18px 40px',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <strong>Why Lingo?</strong> Lingo brings back the feeling of early internet chat rooms and turns them into a playful language-learning playground. Practice in real time, switch between languages, and let your AI buddy guide you step by step — all inside a retro desktop.
        </div>

        {/* Footer */}
        <div style={{
          padding: '15px 40px',
          background: '#f5f5f5',
          borderTop: '1px solid #cccccc',
          fontSize: '13px',
          color: '#666',
          textAlign: 'center'
        }}>
          © 2025 Lingo. Inspired by the early days of the internet.
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && (
        <SignUpModal 
          onClose={() => setShowSignUp(false)} 
          onLogin={onLogin}
          onSwitchToSignIn={() => setShowSignUp(false)}
        />
      )}
    </div>
  );
}
