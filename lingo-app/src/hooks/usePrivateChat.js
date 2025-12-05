import { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, serverTimestamp } from 'firebase/database';

export function usePrivateChat(currentUser, otherUser) {
  const [messages, setMessages] = useState([]);

  // Create a consistent chat ID regardless of who initiated
  const getChatId = (user1, user2) => {
    const ids = [user1.userId, user2.userId].sort();
    return `private_${ids[0]}_${ids[1]}`;
  };

  useEffect(() => {
    if (!currentUser || !otherUser) return;

    const database = getDatabase();
    const chatId = getChatId(currentUser, otherUser);
    const messagesRef = ref(database, `privateChats/${chatId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesList = [];
      snapshot.forEach((childSnapshot) => {
        messagesList.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [currentUser, otherUser]);

  const sendMessage = async (messageText, formatting = null, type = 'text', metadata = null) => {
    if (!currentUser || !otherUser || !messageText.trim()) return;

    const database = getDatabase();
    const chatId = getChatId(currentUser, otherUser);
    const messagesRef = ref(database, `privateChats/${chatId}/messages`);

    const message = {
      userId: currentUser.userId,
      username: currentUser.username,
      message: messageText,
      type: type,
      timestamp: serverTimestamp(),
      ...(formatting && { formatting }),
      ...(metadata && { metadata })
    };

    try {
      await push(messagesRef, message);
    } catch (error) {
      console.error('Error sending private message:', error);
    }
  };

  return {
    messages,
    sendMessage
  };
}
