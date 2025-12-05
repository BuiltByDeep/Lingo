import { useState, useEffect, useRef } from 'react';
import { Send, Wifi, WifiOff, Volume2, Copy, ArrowLeftRight, Image } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useWindows } from '../../contexts/WindowContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useFirebaseChat } from '../../hooks/useFirebaseChat';
import { translateText } from '../../services/gemini';
import VoiceMessageControls from './VoiceMessageControls';
import TextFormattingToolbar from './TextFormattingToolbar';

// Common languages for translation
const TRANSLATION_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Russian', 'Japanese', 'Korean', 'Chinese', 'Arabic', 'Hindi',
  'Bengali', 'Turkish', 'Vietnamese', 'Polish', 'Dutch', 'Swedish'
];

export default function ChatRoomWindow() {
  const { user } = useUser();
  const { openWindow } = useWindows();
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');
  const [userStatus, setUserStatus] = useState('available');
  const [isTranslating, setIsTranslating] = useState(false);
  const [fromLanguage, setFromLanguage] = useState('English');
  const [toLanguage, setToLanguage] = useState('Spanish');
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    font: 'Arial',
    size: '12'
  });
  const messagesEndRef = useRef(null);
  
  // Use Firebase for real-time chat
  const { messages, users, isConnected, sendMessage: sendChatMessage } = useFirebaseChat('spanish-intermediate', user);

  const handleUserClick = (clickedUser) => {
    // Don't open chat with yourself
    if (clickedUser.userId === user.userId) return;

    // Open private chat window
    openWindow({
      type: 'privateChat',
      title: `Private: ${clickedUser.username}`,
      otherUser: clickedUser,
      defaultPosition: { x: 200, y: 150 },
      defaultSize: { width: 450, height: 500 }
    });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !user) return;
    
    // Send message with formatting metadata
    await sendChatMessage(inputValue, 'text', null, formatting);
    setInputValue('');
  };

  const handleGifUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Check if it's a GIF
    if (!file.type.includes('gif')) {
      alert('Please select a GIF file');
      return;
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Gif = reader.result;
      // Send GIF as a special message type
      await sendChatMessage(base64Gif, 'gif', { title: file.name });
    };
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = '';
  };

  const handleSendVoice = async (audioBlob) => {
    // Convert to base64 and store in Firebase
    const reader = new FileReader();
    reader.readAsDataURL(audioBlob);
    reader.onloadend = async () => {
      const base64Audio = reader.result;
      await sendChatMessage('[Voice Message]', 'voice', base64Audio);
    };
  };

  const handleEmojiSelect = (emoji) => {
    setInputValue(prev => prev + emoji);
  };

  // Copy message to input box
  const handleCopyMessage = (messageText) => {
    setInputValue(messageText);
  };

  // Translate with selected languages
  const handleTranslate = async () => {
    if (!inputValue.trim()) return;
    setIsTranslating(true);
    try {
      const translated = await translateText(inputValue, fromLanguage, toLanguage);
      setInputValue(translated);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Swap languages (reverse translation direction)
  const handleSwapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Connection Status */}
        <div style={{ 
          padding: '4px 8px', 
          background: isConnected ? '#E8F5E9' : '#FFEBEE',
          borderBottom: '1px solid #C0C0C0',
          fontSize: '11px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color: isConnected ? '#2E7D32' : '#C62828'
        }}>
          {isConnected ? <Wifi size={12} /> : <WifiOff size={12} />}
          {isConnected ? 'Connected' : 'Connecting...'}
        </div>
        
        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            background: theme.chatBg || '#FFFFFF'
          }}
        >
          {messages.map((msg) => (
            <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', color: theme.usernameColor || '#0257EE', fontSize: '12px' }}>
                  {msg.username}:
                </span>
                <span style={{ fontSize: '10px', color: theme.textColor || '#808080', marginLeft: '8px', opacity: 0.7 }}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  background: 'transparent', 
                  padding: '4px 0', 
                  fontSize: msg.formatting?.size ? `${msg.formatting.size}px` : '13px',
                  maxWidth: '80%',
                  fontFamily: msg.formatting?.font || 'Verdana, Tahoma, sans-serif',
                  fontWeight: msg.formatting?.bold ? 'bold' : 'normal',
                  fontStyle: msg.formatting?.italic ? 'italic' : 'normal',
                  textDecoration: msg.formatting?.underline ? 'underline' : 'none',
                  color: theme.messageColor || theme.textColor || '#000'
                }}>
                  {msg.type === 'voice' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Volume2 size={16} color={theme.accent || '#0257EE'} />
                      <audio controls src={msg.voiceData} style={{ height: '30px' }} />
                    </div>
                  ) : msg.type === 'gif' ? (
                    <img 
                      src={msg.message} 
                      alt={msg.voiceData?.title || 'GIF'} 
                      style={{ 
                        maxWidth: '250px', 
                        maxHeight: '250px',
                        borderRadius: '4px',
                        border: '1px solid #ccc'
                      }} 
                    />
                  ) : (
                    msg.message
                  )}
                </div>
                {msg.type !== 'voice' && (
                  <button
                    onClick={() => handleCopyMessage(msg.message)}
                    title="Copy to input"
                    style={{
                      padding: '4px',
                      background: 'transparent',
                      border: '1px solid #D0D0D0',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      color: theme.accent || '#0257EE'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#F0F0F0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Copy size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            borderTop: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
            background: theme.toolbarBg || '#ECE9D8'
          }}
        >
          {/* Line 1: Text Formatting Toolbar (Bold, Italic, Smiles, Text Size, Report Abuse) */}
          <div style={{ padding: '8px 8px 4px 8px' }}>
            <TextFormattingToolbar 
              onFormatChange={() => {}}
              onEmojiSelect={handleEmojiSelect}
              formatting={formatting}
              setFormatting={setFormatting}
            />
          </div>

          {/* Line 2: Text Input */}
          <div style={{ padding: '0 8px 4px 8px' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '6px 8px',
                border: `2px inset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                fontSize: `${formatting.size}px`,
                outline: 'none',
                fontFamily: formatting.font,
                fontWeight: formatting.bold ? 'bold' : 'normal',
                fontStyle: formatting.italic ? 'italic' : 'normal',
                textDecoration: formatting.underline ? 'underline' : 'none',
                background: '#FFFFFF',
                color: '#000',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Line 3: Talk Button, GIF Button, Translation Controls, Send Button */}
          <div style={{ display: 'flex', gap: '6px', padding: '0 8px 8px 8px', alignItems: 'center', position: 'relative' }}>
            <VoiceMessageControls onSendVoice={handleSendVoice} />
            
            {/* GIF Upload Button */}
            <label
              htmlFor="gif-upload"
              title="Upload GIF"
              style={{
                padding: '6px 10px',
                background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
                color: '#000',
                border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif',
                fontWeight: 'bold'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
              }}
            >
              <Image size={14} />
              GIF
              <input
                id="gif-upload"
                type="file"
                accept="image/gif"
                onChange={handleGifUpload}
                style={{ display: 'none' }}
              />
            </label>
            
            {/* From Language Dropdown */}
            <select
              value={fromLanguage}
              onChange={(e) => setFromLanguage(e.target.value)}
              style={{
                padding: '4px 6px',
                border: `2px inset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif',
                background: '#FFFFFF',
                color: '#000',
                cursor: 'pointer'
              }}
            >
              {TRANSLATION_LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* Swap Button */}
            <button
              onClick={handleSwapLanguages}
              title="Swap languages"
              style={{
                padding: '4px 6px',
                background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
                color: '#000',
                border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
              }}
            >
              <ArrowLeftRight size={14} />
            </button>

            {/* To Language Dropdown */}
            <select
              value={toLanguage}
              onChange={(e) => setToLanguage(e.target.value)}
              style={{
                padding: '4px 6px',
                border: `2px inset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif',
                background: '#FFFFFF',
                color: '#000',
                cursor: 'pointer'
              }}
            >
              {TRANSLATION_LANGUAGES.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>

            {/* Translate Button */}
            <button
              onClick={handleTranslate}
              disabled={!inputValue.trim() || isTranslating}
              title="Translate"
              style={{
                padding: '6px 10px',
                background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
                color: '#000',
                border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                cursor: inputValue.trim() && !isTranslating ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '11px',
                fontFamily: 'Tahoma, sans-serif',
                fontWeight: 'bold',
                opacity: inputValue.trim() && !isTranslating ? 1 : 0.5
              }}
              onMouseDown={(e) => {
                if (inputValue.trim() && !isTranslating) {
                  e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
                }
              }}
              onMouseUp={(e) => {
                if (inputValue.trim() && !isTranslating) {
                  e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
                }
              }}
            >
              {isTranslating ? 'Translating...' : 'Translate'}
            </button>

            <button
              onClick={handleSend}
              style={{
                padding: '6px 14px',
                background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
                color: '#000',
                border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 'bold',
                fontSize: '12px',
                fontFamily: 'Tahoma, sans-serif'
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
              }}
            >
              <Send size={14} />
              Send
            </button>
          </div>
        </div>
      </div>

      {/* User List Sidebar */}
      <div
        style={{
          width: '200px',
          borderLeft: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
          display: 'flex',
          flexDirection: 'column',
          background: theme.userListBg || '#F5F5F5'
        }}
      >
        {/* Chatters Header */}
        <div style={{
          padding: '8px',
          background: theme.sectionHeaderBg || theme.titleBarBg,
          borderBottom: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
          fontWeight: 'bold',
          fontSize: '13px',
          fontFamily: 'Tahoma, sans-serif',
          color: theme.sectionHeaderText || theme.titleBarText
        }}>
          Chatters
        </div>

        {/* User List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '11px', fontFamily: 'Tahoma, sans-serif', color: theme.textColor || '#000' }}>
            Online ({users.filter(u => u.status === 'online').length})
          </div>
          {users.map((u, idx) => (
            <div
              key={idx}
              style={{
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '11px',
                borderRadius: '2px',
                fontFamily: 'Verdana, sans-serif',
                marginBottom: '2px'
              }}
            >
              {theme.isHalloween ? (
                <span style={{ fontSize: '14px' }}>
                  {u.status === 'online' ? '💀' : '🦇'}
                </span>
              ) : (
                <div
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: u.status === 'online' ? (theme.statusOnline || '#00CC00') : '#FFA500',
                    border: '1px solid #666'
                  }}
                />
              )}
              <span style={{ flex: 1, cursor: 'pointer', color: theme.textColor || '#000' }} onClick={() => handleUserClick(u)}>
                {u.username}
              </span>
            </div>
          ))}
        </div>

        {/* IM and Ignore Buttons */}
        <div style={{
          padding: '8px',
          borderTop: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
          display: 'flex',
          gap: '8px',
          background: theme.toolbarBg || '#ECE9D8'
        }}>
          <button
            style={{
              flex: 1,
              padding: '6px',
              background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
              border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              fontFamily: 'Tahoma, sans-serif',
              color: '#000'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
            }}
          >
            IM
          </button>
          <button
            style={{
              flex: 1,
              padding: '6px',
              background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
              border: `2px outset ${theme.windowBorder || '#C0C0C0'}`,
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              fontFamily: 'Tahoma, sans-serif',
              color: '#000'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.border = `2px inset ${theme.windowBorder || '#C0C0C0'}`;
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.border = `2px outset ${theme.windowBorder || '#C0C0C0'}`;
            }}
          >
            Ignore
          </button>
        </div>

        {/* Status Selector */}
        <div style={{
          padding: '8px',
          borderTop: `2px solid ${theme.windowBorder || '#C0C0C0'}`,
          background: theme.toolbarBg || '#ECE9D8'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', marginBottom: '4px', fontFamily: 'Tahoma, sans-serif', color: '#000' }}>
            Status:
          </div>
          <select
            value={userStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '4px',
              border: `2px inset ${theme.windowBorder || '#C0C0C0'}`,
              borderRadius: '2px',
              fontSize: '11px',
              fontFamily: 'Tahoma, sans-serif',
              background: '#FFFFFF',
              color: '#000'
            }}
          >
            <option value="available">I'm Available</option>
            <option value="busy">Busy</option>
            <option value="away">Be Right Back</option>
            <option value="invisible">Invisible</option>
          </select>
        </div>
      </div>
    </div>
  );
}
