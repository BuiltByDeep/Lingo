import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { WindowProvider } from './contexts/WindowContext';
import { UserProvider, useUser } from './contexts/UserContext';
import Desktop from './components/Desktop/Desktop';
import HomePage from './components/HomePage';
import BackgroundMusic from './components/BackgroundMusic';
import { onAuthChange } from './services/auth';

function AppContent() {
  const { user, login, logout } = useUser();

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        login(firebaseUser); // Pass the full user object
      } else {
        logout();
      }
    });

    return () => unsubscribe();
  }, [login, logout]);

  if (!user) {
    return <HomePage onLogin={(userData) => login(userData)} />; // Pass full user data
  }

  return <Desktop />;
}

function App() {
  return (
    <ThemeProvider>
      <WindowProvider>
        <UserProvider>
          <AppContent />
          <BackgroundMusic />
        </UserProvider>
      </WindowProvider>
    </ThemeProvider>
  );
}

export default App;
