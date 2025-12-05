import { useState, useRef } from 'react';
import { Mic, Square, Play } from 'lucide-react';

export default function VoiceMessageControls({ onSendVoice }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach(track => track.stop());
        clearInterval(timerRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendVoice = () => {
    if (audioBlob) {
      onSendVoice(audioBlob);
      setAudioBlob(null);
      setRecordingTime(0);
    }
  };

  const cancelRecording = () => {
    setAudioBlob(null);
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {/* Talk Button */}
      {!isRecording && !audioBlob && (
        <button
          onClick={startRecording}
          style={{
            padding: '8px 16px',
            background: 'linear-gradient(180deg, #90EE90 0%, #32CD32 100%)',
            color: '#000',
            border: '2px outset #32CD32',
            borderRadius: '2px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px',
            fontFamily: 'Tahoma, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Mic size={14} />
          Talk
        </button>
      )}

      {/* Recording State */}
      {isRecording && (
        <>
          <div style={{
            padding: '8px 12px',
            background: '#FFE4E4',
            border: '2px solid #FF0000',
            borderRadius: '2px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FF0000',
              animation: 'pulse 1s infinite'
            }} />
            Recording... {formatTime(recordingTime)}
          </div>
          <button
            onClick={stopRecording}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(180deg, #FFB6B6 0%, #FF6B6B 100%)',
              color: '#000',
              border: '2px outset #FF6B6B',
              borderRadius: '2px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px',
              fontFamily: 'Tahoma, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Square size={14} />
            Stop
          </button>
        </>
      )}

      {/* Preview State */}
      {audioBlob && !isRecording && (
        <>
          <div style={{
            padding: '8px 12px',
            background: '#E8F5E9',
            border: '2px solid #4CAF50',
            borderRadius: '2px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Play size={14} />
            <audio controls src={URL.createObjectURL(audioBlob)} style={{ height: '24px' }} />
          </div>
          <button
            onClick={sendVoice}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(180deg, #90EE90 0%, #32CD32 100%)',
              color: '#000',
              border: '2px outset #32CD32',
              borderRadius: '2px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            Send Voice
          </button>
          <button
            onClick={cancelRecording}
            style={{
              padding: '8px 16px',
              background: 'linear-gradient(180deg, #E8E8E8 0%, #C0C0C0 100%)',
              color: '#000',
              border: '2px outset #C0C0C0',
              borderRadius: '2px',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'Tahoma, sans-serif'
            }}
          >
            Cancel
          </button>
        </>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
