import { useState, useEffect, useRef } from 'react';
import { Send, Copy, ArrowLeftRight, Image } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import { useTheme } from '../../contexts/ThemeContext';
import { usePrivateChat } from '../../hooks/usePrivateChat';
import { translateText } from '../../services/gemini';
import VoiceMessageControls from './VoiceMessageControls';
import TextFormattingToolbar from './TextFormattingToolbar';

// Common languages for translation
const TRANSLATION_LANGUAGES = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Russian', 'Japanese', 'Korean', 'Chinese', 'Arabic', 'Hindi',
  'Bengali', 'Turkish', 'Vietnamese', 'Polish', 'Dutch', 'Swedish'
];

export default function PrivateChatWindow({ otherUser }) {
  const { user } = useUser();
  const { theme } = useTheme();
  const [inputValue, setInputValue] = useState('');
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
  
  const { messages, sendMessage: sendPrivateMessage } = usePrivateChat(user, otherUser);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || !user) return;
    
    // Send message with formatting metadata
    await sendPrivateMessage(inputValue, formatting);
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
      await sendPrivateMessage(base64Gif, formatting, 'gif', { title: file.name });
    };
    reader.readAsDataURL(file);
    
    // Reset input
    e.target.value = '';
  };

  const handleSendVoice = async (audioBlob) => {
    // For now, just show a placeholder - voice in private chat can be implemented later
    console.log('Voice message in private chat:', audioBlob);
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{
        padding: '8px 12px',
        background: '#F0F0F0',
        borderBottom: '2px solid #C0C0C0',
        fontWeight: 'bold',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#00CC00',
          border: '1px solid #666'
        }} />
        Private chat with {otherUser.username}
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
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: '#999',
            fontSize: '13px',
            marginTop: '20px'
          }}>
            Start a conversation with {otherUser.username}!
          </div>
        )}
        {messages.map((msg) => {
          const isMe = msg.userId === user.userId;
          return (
            <div key={msg.id} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '4px',
              alignItems: isMe ? 'flex-end' : 'flex-start'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontWeight: 'bold', color: isMe ? (theme.accent || '#0066FF') : (theme.usernameColor || '#000080'), fontSize: '12px' }}>
                  {isMe ? 'You' : msg.username}:
                </span>
                <span style={{ fontSize: '10px', color: theme.textColor || '#808080', opacity: 0.7 }}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <div style={{ 
                  background: isMe ? 'rgba(0, 102, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  padding: '8px 12px', 
                  borderRadius: '8px',
                  fontSize: msg.formatting?.size ? `${msg.formatting.size}px` : '13px',
                  maxWidth: '80%',
                  fontFamily: msg.formatting?.font || 'Verdana, Tahoma, sans-serif',
                  fontWeight: msg.formatting?.bold ? 'bold' : 'normal',
                  fontStyle: msg.formatting?.italic ? 'italic' : 'normal',
                  textDecoration: msg.formatting?.underline ? 'underline' : 'none',
                  color: theme.messageColor || theme.textColor || '#000'
                }}>
                  {msg.type === 'gif' ? (
                    <img 
                      src={msg.message} 
                      alt={msg.metadata?.title || 'GIF'} 
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
                {msg.type !== 'gif' && (
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
          );
        })}
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
            htmlFor="gif-upload-private"
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
              id="gif-upload-private"
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
  );
}
