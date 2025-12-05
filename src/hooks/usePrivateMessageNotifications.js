import { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

export function usePrivateMessageNotifications(currentUser) {
  const [notifications, setNotifications] = useState([]);
  const [seenChats, setSeenChats] = useState(new Set());

  useEffect(() => {
    if (!currentUser) {
      console.log('No current user for notifications');
      return;
    }

    console.log('Setting up notifications for user:', currentUser.userId);

    const database = getDatabase();
    const privateChatsRef = ref(database, 'privateChats');

    const unsubscribe = onValue(privateChatsRef, (snapshot) => {
      console.log('Private chats snapshot received');
      const newNotifications = [];
      
      snapshot.forEach((chatSnapshot) => {
        const chatId = chatSnapshot.key;
        console.log('Checking chat:', chatId);
        
        // Check if this chat involves the current user
        if (chatId.includes(currentUser.userId)) {
          console.log('Chat involves current user');
          const messagesSnapshot = chatSnapshot.child('messages');
          
          if (messagesSnapshot.exists()) {
            const messages = messagesSnapshot.val();
            const messagesList = Object.values(messages);
            const lastMessage = messagesList[messagesList.length - 1];
            
            console.log('Last message from:', lastMessage.userId, 'Current user:', currentUser.userId);
            
            // If the last message is not from current user and we haven't seen this chat
            if (lastMessage.userId !== currentUser.userId && !seenChats.has(chatId)) {
              console.log('Adding notification for:', lastMessage.username);
              newNotifications.push({
                chatId,
                sender: {
                  userId: lastMessage.userId,
                  username: lastMessage.username
                },
                lastMessage: lastMessage.message,
                timestamp: lastMessage.timestamp
              });
            }
          }
        }
      });

      console.log('Total notifications:', newNotifications.length);
      setNotifications(newNotifications);
    }, (error) => {
      console.error('Error listening to private chats:', error);
    });

    return () => unsubscribe();
  }, [currentUser, seenChats]);

  const dismissNotification = useCallback((senderId) => {
    console.log('Dismissing notification for:', senderId);
    setNotifications(prev => prev.filter(n => n.sender.userId !== senderId));
    
    // Mark this chat as seen
    setNotifications(prev => {
      const chatToMark = prev.find(n => n.sender.userId === senderId);
      if (chatToMark) {
        setSeenChats(prevSeen => new Set([...prevSeen, chatToMark.chatId]));
      }
      return prev.filter(n => n.sender.userId !== senderId);
    });
  }, []);

  return {
    notifications,
    dismissNotification
  };
}
