import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Check each shortcut
      for (const shortcut of shortcuts) {
        const { key, ctrl, alt, shift, callback } = shortcut;
        
        const ctrlMatch = ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
        const altMatch = alt ? event.altKey : !event.altKey;
        const shiftMatch = shift ? event.shiftKey : !event.shiftKey;
        const keyMatch = event.key.toLowerCase() === key.toLowerCase();
        
        if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
          event.preventDefault();
          callback();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}
