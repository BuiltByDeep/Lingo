import { useWindows } from '../../contexts/WindowContext';
import DraggableWindow from './DraggableWindow';
import ChatRoomWindow from './ChatRoomWindow';
import AIBuddyWindow from './AIBuddyWindow';
import PrivateChatWindow from './PrivateChatWindow';
import JoinRoomWindow from './JoinRoomWindow';
import WordScrambleWindow from './WordScrambleWindow';
import HalloweenHangmanWindow from './HalloweenHangmanWindow';

export default function WindowManager() {
  const { windows } = useWindows();

  const renderWindowContent = (window) => {
    switch (window.type) {
      case 'chatRoom':
        return <ChatRoomWindow />;
      case 'aiBuddy':
        return <AIBuddyWindow />;
      case 'privateChat':
        return <PrivateChatWindow otherUser={window.otherUser} />;
      case 'joinRoom':
        return <JoinRoomWindow onJoinRoom={window.onJoinRoom} onCancel={window.onCancel} />;
      case 'wordScramble':
        return <WordScrambleWindow />;
      case 'halloweenHangman':
        return <HalloweenHangmanWindow />;
      default:
        return <div>Unknown window type</div>;
    }
  };

  return (
    <>
      {windows.map(window => (
        <DraggableWindow
          key={window.id}
          windowId={window.id}
          title={window.title}
          defaultPosition={window.defaultPosition}
          defaultSize={window.defaultSize}
          zIndex={window.zIndex}
          minimized={window.minimized}
        >
          {renderWindowContent(window)}
        </DraggableWindow>
      ))}
    </>
  );
}
