# Private Chat - Firebase Rules Update

## Update Your Firebase Realtime Database Rules

Go to Firebase Console → Realtime Database → Rules tab and update to:

```json
{
  "rules": {
    "rooms": {
      "$roomId": {
        "messages": {
          ".read": "auth != null",
          ".write": "auth != null",
          ".indexOn": ["timestamp"]
        },
        "users": {
          ".read": "auth != null",
          "$userId": {
            ".write": "auth.uid === $userId"
          }
        }
      }
    },
    "privateChats": {
      "$chatId": {
        ".read": "auth != null && ($chatId.contains(auth.uid))",
        ".write": "auth != null && ($chatId.contains(auth.uid))",
        "messages": {
          ".indexOn": ["timestamp"]
        }
      }
    }
  }
}
```

Click **Publish** to save the rules.

## How It Works

- Private chat IDs are created by combining both user IDs: `private_user1_user2`
- Users can only read/write to chats that contain their user ID
- Messages are stored separately from public rooms
- Each private chat is isolated and secure
