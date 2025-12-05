import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const themes = {
  retroYahoo: {
    name: 'Retro Yahoo',
    wallpaper: 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)',
    accent: '#0257EE',
    windowBg: '#ECE9D8',
    windowBorder: '#C0C0C0',
    titleBarBg: '#0257EE',
    titleBarText: '#FFFFFF',
    font: 'Tahoma, Verdana, sans-serif',
    // Yahoo retro specific colors
    chatBg: '#FFFFFF',
    inputBg: '#FFFFFF',
    textColor: '#000',
    userListBg: '#F5F5F5',
    buttonBg: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
    buttonText: '#000',
    messageColor: '#000',
    usernameColor: '#0257EE',
    statusOnline: '#00CC00',
    toolbarBg: '#ECE9D8',
    connectionBg: '#E8F5E9',
    sectionHeaderBg: '#0257EE',
    sectionHeaderText: '#FFFFFF',
    categoryBg: '#FFFFFF',
    selectedCategoryBg: '#D0D0D0',
    hoverCategoryBg: '#F0F0F0',
    selectedRoomBorder: '#0257EE',
    selectedRoomBg: '#E0E0E0',
    levelTagBg: '#E0E0E0',
    levelTagColor: '#0257EE',
    isRetroYahoo: true
  },
  halloween: {
    name: 'Halloween 🎃',
    wallpaper: '#0a0a0a',
    accent: '#9D4EDD',
    windowBg: 'rgba(20, 10, 30, 0.95)',
    windowBorder: '#9D4EDD',
    titleBarBg: 'linear-gradient(180deg, #9D4EDD 0%, #5A189A 100%)',
    titleBarText: '#FFE4B5',
    font: 'Georgia, serif',
    // Halloween-specific colors
    chatBg: 'rgba(15, 10, 25, 0.9)',
    inputBg: 'rgba(10, 5, 15, 0.95)',
    textColor: '#E0D5FF',
    userListBg: 'rgba(20, 10, 30, 0.9)',
    buttonBg: 'linear-gradient(180deg, #9D4EDD 0%, #7B2CBF 100%)',
    buttonText: '#FFE4B5',
    messageColor: '#E0D5FF',
    usernameColor: '#FF6B35',
    statusOnline: '#39FF14',
    toolbarBg: 'rgba(25, 15, 35, 0.95)',
    connectionBg: 'rgba(25, 15, 35, 0.9)',
    isHalloween: true
  },

};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('retroYahoo');

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
