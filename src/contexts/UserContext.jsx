import { createContext, useContext, useState, useCallback } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((userData) => {
    // Handle both string (username) and object (full user data) inputs
    const newUser = typeof userData === 'string' 
      ? {
          userId: `user_${Date.now()}`,
          username: userData,
          status: 'online',
          joinedAt: Date.now()
        }
      : {
          userId: userData.userId || `user_${Date.now()}`,
          username: userData.username,
          email: userData.email,
          status: 'online',
          joinedAt: Date.now()
        };
    
    setUser(newUser);
    localStorage.setItem('lingoUser', JSON.stringify(newUser));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('lingoUser');
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
