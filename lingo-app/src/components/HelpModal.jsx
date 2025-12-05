import { X } from 'lucide-react';

export default function HelpModal({ onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    }}>
      <div style={{
        background: '#fff',
        padding: '24px',
        borderRadius: '12px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '24px', color: '#0066FF' }}>Keyboard Shortcuts</h2>
          <button onClick={onClose} style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px'
          }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <ShortcutItem keys="Ctrl + 1" description="Open Spanish Chat Room" />
          <ShortcutItem keys="Ctrl + 2" description="Open AI Language Buddy" />
          <ShortcutItem keys="Ctrl + T" description="Change Theme" />
          <ShortcutItem keys="Ctrl + /" description="Show this help" />
          <ShortcutItem keys="Esc" description="Close active window" />
          <ShortcutItem keys="Enter" description="Send message (in chat)" />
        </div>

        <div style={{ marginTop: '24px', padding: '16px', background: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Tips</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#666' }}>
            <li>Drag windows by their title bar</li>
            <li>Resize windows from corners and edges</li>
            <li>Click taskbar to bring windows to front</li>
            <li>Use voice input in AI Buddy (Chrome/Edge only)</li>
            <li>Right-click messages for quick actions (coming soon)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ShortcutItem({ keys, description }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
      <span style={{ fontSize: '14px', color: '#666' }}>{description}</span>
      <kbd style={{
        padding: '4px 8px',
        background: '#f0f0f0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        boxShadow: '0 2px 0 #ccc'
      }}>
        {keys}
      </kbd>
    </div>
  );
}
