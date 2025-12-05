import { useState, useEffect } from 'react';
import { sendMessage, subscribeToMessages, updateUserPresence, subscribeToUsers } from '../services/firebase';

export function useFirebaseChat(roomId, user) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!roomId || !user) return;

    // Subscribe to messages
    const unsubscribeMessages = subscribeToMessages(roomId, (newMessages) => {
      setMessages(newMessages);
      setIsConnected(true);
    });

    // Subscribe to users
    const unsubscribeUsers = subscribeToUsers(roomId, (newUsers) => {
      setUsers(newUsers);
    });

    // Update user presence
    updateUserPresence(roomId, user.userId, {
      username: user.username,
      status: 'online'
    });

    // Cleanup on unmount
    return () => {
      unsubscribeMessages();
      unsubscribeUsers();
      
      // Set user as offline
      updateUserPresence(roomId, user.userId, {
        username: user.username,
        status: 'offline'
      });
    };
  }, [roomId, user]);

  const sendChatMessage = async (messageText, type = 'text', voiceData = null, formatting = null) => {
    if (!user || (!messageText.trim() && !voiceData)) return;

    const message = {
      userId: user.userId,
      username: user.username,
      message: messageText,
      type: type,
      language: 'es', // Default to Spanish for now
      ...(voiceData && { voiceData }),
      ...(formatting && { formatting })
    };

    try {
      await sendMessage(roomId, message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    messages,
    users,
    isConnected,
    sendMessage: sendChatMessage
  };
}
