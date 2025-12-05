import { createContext, useContext, useState } from 'react';

const WindowContext = createContext();

export function WindowProvider({ children }) {
  const [windows, setWindows] = useState([]);
  const [activeWindowId, setActiveWindowId] = useState(null);

  const openWindow = (windowConfig) => {
    const newWindow = {
      id: `window-${Date.now()}`,
      ...windowConfig,
      zIndex: windows.length + 100
    };
    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
    return newWindow.id;
  };

  const closeWindow = (windowId) => {
    setWindows(windows.filter(w => w.id !== windowId));
    if (activeWindowId === windowId) {
      const remaining = windows.filter(w => w.id !== windowId);
      setActiveWindowId(remaining.length > 0 ? remaining[remaining.length - 1].id : null);
    }
  };

  const focusWindow = (windowId) => {
    setActiveWindowId(windowId);
    setWindows(windows.map(w => 
      w.id === windowId 
        ? { ...w, zIndex: Math.max(...windows.map(win => win.zIndex)) + 1 }
        : w
    ));
  };

  const minimizeWindow = (windowId) => {
    setWindows(windows.map(w => 
      w.id === windowId ? { ...w, minimized: !w.minimized } : w
    ));
  };

  return (
    <WindowContext.Provider value={{
      windows,
      activeWindowId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow
    }}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error('useWindows must be used within WindowProvider');
  }
  return context;
}
