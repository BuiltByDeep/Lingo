import { Bold, Italic, Underline, Smile } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function TextFormattingToolbar({ onFormatChange, onEmojiSelect, formatting, setFormatting }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { theme } = useTheme();
  
  const toggleBold = () => {
    const newFormatting = { ...formatting, bold: !formatting.bold };
    setFormatting(newFormatting);
    onFormatChange(newFormatting);
  };
  
  const toggleItalic = () => {
    const newFormatting = { ...formatting, italic: !formatting.italic };
    setFormatting(newFormatting);
    onFormatChange(newFormatting);
  };
  
  const toggleUnderline = () => {
    const newFormatting = { ...formatting, underline: !formatting.underline };
    setFormatting(newFormatting);
    onFormatChange(newFormatting);
  };
  
  const changeFont = (font) => {
    const newFormatting = { ...formatting, font };
    setFormatting(newFormatting);
    onFormatChange(newFormatting);
  };
  
  const changeSize = (size) => {
    const newFormatting = { ...formatting, size };
    setFormatting(newFormatting);
    onFormatChange(newFormatting);
  };

  // Regular emojis
  const regularEmojis = ['😀', '😂', '😍', '😎', '🤔', '👍', '❤️', '🎉', '🔥', '✨', '💬', '🌟'];
  
  // Halloween-themed emojis
  const halloweenEmojis = [
    '🎃', '👻', '💀', '☠️', '🦇', '🕷️', '🕸️', '🧛', '🧟', '🧙',
    '😱', '👿', '😈', '👹', '👺', '🤡', '👽', '👾', '🤖', '🔮',
    '🌕', '🌚', '⚡', '🌩️', '🕯️', '⚰️', '🪦', '🗡️', '⚱️', '🏚️',
    '🖤', '💚', '🧡', '🩸', '🥀', '⛓️', '🎭', '🦉', '🐺', '🐈‍⬛',
    '🧚', '🧜', '🧝', '🧞', '🦴', '🍫', '🍬', '🍭', '🌃', '🪳'
  ];

  const emojis = theme.isHalloween ? halloweenEmojis : regularEmojis;

  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '4px',
      padding: '4px 8px',
      background: '#F0F0F0',
      borderBottom: '2px solid #C0C0C0'
    }}>
      {/* Bold */}
      <button
        onClick={toggleBold}
        style={{
          padding: '4px 8px',
          background: formatting.bold 
            ? 'linear-gradient(180deg, #D0D0D0 0%, #A0A0A0 100%)' 
            : 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
          border: formatting.bold ? '2px inset #C0C0C0' : '2px outset #C0C0C0',
          borderRadius: '2px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '12px',
          fontFamily: 'Tahoma, sans-serif'
        }}
        title="Bold"
      >
        B
      </button>

      {/* Italic */}
      <button
        onClick={toggleItalic}
        style={{
          padding: '4px 8px',
          background: formatting.italic 
            ? 'linear-gradient(180deg, #D0D0D0 0%, #A0A0A0 100%)' 
            : 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
          border: formatting.italic ? '2px inset #C0C0C0' : '2px outset #C0C0C0',
          borderRadius: '2px',
          cursor: 'pointer',
          fontStyle: 'italic',
          fontSize: '12px',
          fontFamily: 'Tahoma, sans-serif'
        }}
        title="Italic"
      >
        I
      </button>

      {/* Underline */}
      <button
        onClick={toggleUnderline}
        style={{
          padding: '4px 8px',
          background: formatting.underline 
            ? 'linear-gradient(180deg, #D0D0D0 0%, #A0A0A0 100%)' 
            : 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
          border: formatting.underline ? '2px inset #C0C0C0' : '2px outset #C0C0C0',
          borderRadius: '2px',
          cursor: 'pointer',
          textDecoration: 'underline',
          fontSize: '12px',
          fontFamily: 'Tahoma, sans-serif'
        }}
        title="Underline"
      >
        U
      </button>

      {/* Emoji Picker */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          style={{
            padding: '4px 8px',
            background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
            border: '2px outset #C0C0C0',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Emoji"
        >
          😊
        </button>

        {showEmojiPicker && (
          <div style={{
            position: 'absolute',
            top: '32px',
            left: 0,
            background: theme.isHalloween ? '#1a0a2e' : '#fff',
            border: theme.isHalloween ? '2px solid #9D4EDD' : '2px solid #C0C0C0',
            borderRadius: '4px',
            padding: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '4px',
            zIndex: 1000,
            boxShadow: theme.isHalloween 
              ? '0 0 20px rgba(157, 78, 221, 0.6), 0 2px 8px rgba(0,0,0,0.4)' 
              : '0 2px 8px rgba(0,0,0,0.2)',
            maxHeight: '300px',
            overflowY: 'auto',
            minWidth: theme.isHalloween ? '320px' : '240px'
          }}>
            {emojis.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onEmojiSelect(emoji);
                  setShowEmojiPicker(false);
                }}
                style={{
                  padding: '6px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '22px',
                  borderRadius: '4px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = theme.isHalloween ? 'rgba(157, 78, 221, 0.3)' : '#E8E8E8';
                  e.target.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Font Selector */}
      <select
        value={formatting.font}
        onChange={(e) => changeFont(e.target.value)}
        style={{
          padding: '4px 8px',
          border: '2px inset #C0C0C0',
          borderRadius: '2px',
          fontSize: '11px',
          fontFamily: 'Tahoma, sans-serif',
          background: '#FFFFFF',
          cursor: 'pointer'
        }}
      >
        <optgroup label="Classic">
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
        </optgroup>
        <optgroup label="Modern">
          <option value="Helvetica">Helvetica</option>
          <option value="Georgia">Georgia</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Impact">Impact</option>
          <option value="system-ui">System UI</option>
        </optgroup>
        <optgroup label="Cursive & Decorative">
          <option value="Brush Script MT">Brush Script</option>
          <option value="Lucida Handwriting">Lucida Handwriting</option>
          <option value="cursive">Cursive</option>
          <option value="fantasy">Fantasy</option>
        </optgroup>
        <optgroup label="Monospace">
          <option value="Consolas">Consolas</option>
          <option value="Monaco">Monaco</option>
          <option value="monospace">Monospace</option>
        </optgroup>
      </select>

      {/* Font Size */}
      <select
        value={formatting.size}
        onChange={(e) => changeSize(e.target.value)}
        style={{
          padding: '4px 8px',
          border: '2px inset #C0C0C0',
          borderRadius: '2px',
          fontSize: '11px',
          fontFamily: 'Tahoma, sans-serif',
          background: '#FFFFFF',
          cursor: 'pointer',
          width: '50px'
        }}
      >
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
        <option value="16">16</option>
        <option value="18">18</option>
      </select>

      {/* Report Abuse */}
      <button
        style={{
          padding: '4px 12px',
          background: 'linear-gradient(180deg, #FFE4E4 0%, #FFCCCC 100%)',
          border: '2px outset #FFCCCC',
          borderRadius: '2px',
          cursor: 'pointer',
          fontSize: '11px',
          fontFamily: 'Tahoma, sans-serif',
          marginLeft: 'auto',
          color: '#CC0000'
        }}
        title="Report Abuse"
      >
        Report Abuse
      </button>
    </div>
  );
}
