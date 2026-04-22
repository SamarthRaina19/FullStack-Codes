import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs.min.js';
import './App.css';

const BACKEND_URL = 'http://localhost:8081/ws';

// Convert a Blob to base64 string
const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result); // "data:audio/webm;base64,..."
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

function useRecorder() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.start();
      mediaRecorderRef.current = mr;
      setRecording(true);
      setSeconds(0);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    } catch {
      alert('Microphone access denied. Please allow microphone access and try again.');
    }
  }, []);

  const stop = useCallback(() =>
    new Promise((resolve) => {
      const mr = mediaRecorderRef.current;
      if (!mr) return resolve(null);
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        mr.stream.getTracks().forEach((t) => t.stop());
        resolve(blob);
      };
      mr.stop();
      clearInterval(timerRef.current);
      setRecording(false);
      setSeconds(0);
    }), []);

  useEffect(() => () => clearInterval(timerRef.current), []);

  return { recording, seconds, start, stop };
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function VoicePlayer({ audioData, isOwn }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); } else { el.play(); }
  };

  return (
    <div className={`voice-player ${isOwn ? 'own' : ''}`}>
      <audio
        ref={audioRef}
        src={audioData}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => { setPlaying(false); setProgress(0); }}
        onTimeUpdate={(e) => setProgress(e.target.currentTime / (e.target.duration || 1))}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />
      <button className="play-btn" onClick={toggle} title={playing ? 'Pause' : 'Play'}>
        {playing ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
        )}
      </button>
      <div className="voice-track">
        <div className="voice-bar">
          <div className="voice-fill" style={{ width: `${progress * 100}%` }} />
        </div>
        <span className="voice-duration">
          {audioRef.current && playing
            ? formatTime(Math.floor(audioRef.current.currentTime))
            : formatTime(Math.floor(duration))}
        </span>
      </div>
      <span className="voice-label">🎙</span>
    </div>
  );
}

const avatarColor = (name) => {
  const colors = ['#7c6ff7', '#f06292', '#4db6ac', '#ffb74d', '#4fc3f7', '#aed581'];
  return colors[name ? name.charCodeAt(0) % colors.length : 0];
};

function App() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [showStickers, setShowStickers] = useState(false);
  const clientRef = useRef(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const STICKERS = ['/stickers/smile.svg', '/stickers/heart.svg', '/stickers/fire.svg'];
  const { recording, seconds, start: startRec, stop: stopRec } = useRecorder();

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const connect = useCallback(() => {
    setConnecting(true);
    const client = new Client({
      webSocketFactory: () => new SockJS(BACKEND_URL),
      reconnectDelay: 5000,
      onConnect: () => {
        setConnected(true);
        setConnecting(false);
        client.subscribe('/topic/messages', (frame) => {
          const msg = JSON.parse(frame.body);
          const now = new Date();
          setMessages((prev) => [
            ...prev,
            { ...msg, timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), id: Date.now() + Math.random() },
          ]);
          setOnlineUsers((prev) => prev.includes(msg.sender) ? prev : [...prev, msg.sender]);
        });
      },
      onDisconnect: () => { setConnected(false); setConnecting(false); },
      onStompError: (frame) => { console.error('STOMP error:', frame); setConnecting(false); },
    });
    client.activate();
    clientRef.current = client;
  }, []);

  const disconnect = useCallback(() => {
    clientRef.current?.deactivate();
    setConnected(false); setJoined(false);
    setMessages([]); setUsername(''); setOnlineUsers([]);
  }, []);

  useEffect(() => () => clientRef.current?.deactivate(), []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    connect();
    setJoined(true);
    setOnlineUsers([username]);
    setMessages([{
      sender: 'System', content: `${username} joined the chat`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSystem: true, id: 'welcome', type: 'text',
    }]);
  };

  const publishMessage = (payload) => {
    if (!clientRef.current || !connected) return;
    try {
      clientRef.current.publish({ destination: '/app/chat', body: JSON.stringify(payload) });
    } catch (err) {
      console.error('Failed to publish message:', err);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !connected) return;
    publishMessage({ sender: username, content: input, type: 'text' });
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) handleSend(e);
  };

  const handleMicClick = async () => {
    if (!recording) {
      await startRec();
    } else {
      const blob = await stopRec();
      if (!blob || !connected) return;

      // Guard: empty blob means no mic audio was captured
      if (blob.size < 1000) {
        console.warn('Voice blob is empty or too small — no microphone audio captured.');
        alert('No audio was captured. Make sure your microphone is connected and allowed.');
        return;
      }

      // Guard: base64 of ~1MB audio ≈ 1.33MB payload — warn if too large
      if (blob.size > 750_000) {
        alert('Recording is too long (max ~30 seconds). Please record a shorter message.');
        return;
      }

      const base64 = await blobToBase64(blob);
      console.log(`Sending voice message: ${blob.size} bytes, type=${blob.type}`);
      publishMessage({ sender: username, content: '', type: 'voice', audioData: base64 });
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !connected) return;
    if (file.size > 5_000_000) {
      alert('Image is too large (max 5MB).');
      return;
    }
    const base64 = await blobToBase64(file);
    publishMessage({ sender: username, content: '', type: 'image', fileData: base64 });
    e.target.value = null; // reset input
  };

  const handleStickerSend = (url) => {
    if (!connected) return;
    publishMessage({ sender: username, content: url, type: 'sticker' });
    setShowStickers(false);
  };

  const groupedMessages = messages.reduce((acc, msg, idx) => {
    const prev = messages[idx - 1];
    const grouped = prev && prev.sender === msg.sender && !msg.isSystem && !prev.isSystem;
    acc.push({ ...msg, grouped });
    return acc;
  }, []);

  if (!joined) {
    return (
      <div className="app join-screen">
        <div className="join-left">
          <div className="brand">
            <span className="brand-icon">💬</span>
            <div>
              <h1>NexusChat</h1>
              <p>Real-time team messaging</p>
            </div>
          </div>
          <div className="feature-list">
            <div className="feature-item"><span>⚡</span><div><strong>Instant Delivery</strong><p>Messages delivered in milliseconds via WebSockets</p></div></div>
            <div className="feature-item"><span>🎙</span><div><strong>Voice Messages</strong><p>Record and send audio clips directly in the chat</p></div></div>
            <div className="feature-item"><span>👥</span><div><strong>Multi-User</strong><p>Unlimited users in the same room simultaneously</p></div></div>
            <div className="feature-item"><span>🌐</span><div><strong>Spring Boot Powered</strong><p>STOMP over WebSocket protocol on the backend</p></div></div>
          </div>
          <div className="stack-badges">
            <span className="badge">React</span><span className="badge">Vite</span>
            <span className="badge">Spring Boot</span><span className="badge">STOMP</span><span className="badge">SockJS</span>
          </div>
        </div>
        <div className="join-right">
          <div className="join-card">
            <h2>Welcome back</h2>
            <p className="join-sub">Enter your display name to join the chat room</p>
            <form onSubmit={handleJoin} className="join-form">
              <label htmlFor="username-input">Display Name</label>
              <div className="input-wrapper">
                <span className="input-prefix">@</span>
                <input id="username-input" type="text" placeholder="e.g. Alice, Bob..." value={username}
                  onChange={(e) => setUsername(e.target.value)} autoFocus maxLength={30} />
              </div>
              <button id="join-btn" type="submit" disabled={!username.trim()}>Join Chat Room →</button>
              <p className="hint">Open in multiple tabs to simulate multiple users</p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app chat-layout">
      {/* ── Server List ── */}
      <nav className="server-list">
        <div className="server-item discord-home" title="Home">
          <svg width="28" height="20" viewBox="0 0 28 20" fill="currentColor"><path d="M23.0212 1.67671C21.3107 0.880496 19.5079 0.318258 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461742 10.3368 0C8.48074 0.318258 6.6845 0.880496 4.98059 1.67671C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22358 19.2743 8.69539 18.4903 9.09832 17.6584C8.32976 17.3518 7.58524 16.9859 6.87702 16.5614C7.06536 16.4257 7.24748 16.2796 7.43603 16.1335C11.6961 18.0664 16.3311 18.0664 20.528 16.1335C20.7101 16.2796 20.8984 16.4257 21.0868 16.5614C20.3786 16.9859 19.634 17.3518 18.8655 17.6584C19.2684 18.4903 19.7402 19.2743 20.272 20C22.6438 19.2743 24.869 18.1418 26.8527 16.652C27.4258 10.9731 25.9665 6.04694 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0072 8.34973 18.3161 8.34973C19.625 8.34973 20.6752 9.54272 20.6543 10.994C20.6543 12.4453 19.625 13.6383 18.3161 13.6383Z" /></svg>
        </div>
        <div className="server-separator" />
        <div className="server-item active" title="Nexus Server">
          <span>N</span>
        </div>
        <div className="server-item" title="Gaming">
          <span>G</span>
        </div>
      </nav>

      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span>Nexus Server</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
            TEXT CHANNELS
          </div>
          <div className="channel active"><span>#</span> general</div>
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-title">ONLINE — {onlineUsers.length}</div>
          <div className="user-list">
            {onlineUsers.map((u) => (
              <div key={u} className={`user-item ${u === username ? 'is-self' : ''}`}>
                <div className="user-avatar" style={{ background: avatarColor(u) }}>{u[0]?.toUpperCase()}</div>
                <span className="user-name">{u}</span>
                {u === username && <span className="you-tag">you</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="self-info">
            <div className="user-avatar sm" style={{ background: avatarColor(username) }}>{username[0]?.toUpperCase()}</div>
            <div className="self-meta">
              <span className="self-name">{username}</span>
              <span className={`self-status ${connected ? 'online' : 'offline'}`}>
                <span className="dot" /> {connecting ? 'Connecting…' : connected ? 'Online' : 'Disconnected'}
              </span>
            </div>
          </div>
          <div className="self-controls">
            <button className="control-btn" title="Mute">🎤</button>
            <button className="control-btn" title="Deafen">🎧</button>
            <button id="disconnect-btn" className="control-btn leave" onClick={disconnect} title="Disconnect">⏏</button>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="main">
        <header className="topbar">
          <div className="topbar-left">
            <span className="channel-hash"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L7.60074 8H3V6H8.00473L8.64154 2.41259C8.69591 2.10632 8.95669 1.88657 9.26778 1.88657H11.2678C11.5789 1.88657 11.8144 2.16773 11.76 2.474L11.1232 6H15.1232L15.7601 2.41259C15.8144 2.10632 16.0752 1.88657 16.3863 1.88657H18.3863C18.6974 1.88657 18.933 2.16773 18.8786 2.474L18.2418 6H22V8H17.8378L15.6313 20.4126C15.577 20.7189 15.3162 21 15.0051 21H13.0051C12.694 21 12.4584 20.7189 12.5128 20.4126L13.1496 16.8252H9.1496L8.43574 20.8447C8.38137 21.151 8.12059 21 7.80949 21H5.88657ZM9.50426 14.8252H13.5043L14.2255 8H10.2255L9.50426 14.8252Z"/></svg></span>
            <span className="channel-name">general</span>
            <span className="topbar-divider" />
            <span className="topbar-desc">Text &amp; voice messaging — everyone can see &amp; hear</span>
          </div>
          <div className="topbar-right">
            <div className={`conn-status ${connected ? 'live' : 'dead'}`}>
              <span className="dot" />{connecting ? 'Connecting…' : connected ? 'Live' : 'Disconnected'}
            </div>
            <div className="msg-count">{messages.filter(m => !m.isSystem).length} messages</div>
          </div>
        </header>

        <main className="messages-pane" id="messages-area">
          <div className="channel-welcome">
            <div className="welcome-icon">#</div>
            <h3>Welcome to #general</h3>
            <p>Send text or tap the mic button to record a voice message.</p>
          </div>

          {groupedMessages.map((msg) => {
            if (msg.isSystem) return (
              <div key={msg.id} className="system-msg"><span>{msg.content}</span></div>
            );
            const isOwn = msg.sender === username;
            return (
              <div key={msg.id} className={`msg-row ${msg.grouped ? 'grouped' : ''}`}>
                {!msg.grouped
                  ? <div className="msg-avatar" style={{ background: avatarColor(msg.sender) }}>{msg.sender[0]?.toUpperCase()}</div>
                  : <div className="msg-avatar-spacer" />
                }
                <div className="msg-body">
                  {!msg.grouped && (
                    <div className="msg-meta">
                      <span className="msg-sender">{msg.sender}</span>
                      <span className="msg-time">Today at {msg.timestamp}</span>
                    </div>
                  )}
                  {msg.type === 'voice'
                    ? <VoicePlayer audioData={msg.audioData} isOwn={isOwn} />
                    : msg.type === 'image'
                      ? <img src={msg.fileData} className="msg-image" alt="User upload" />
                      : msg.type === 'sticker'
                        ? <img src={msg.content} className="msg-sticker" alt="Sticker" />
                        : <div className="msg-content">{msg.content}</div>
                  }
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </main>

        <footer className="input-bar">
          {recording && (
            <div className="recording-banner">
              <span className="rec-dot" />
              <span>Recording… {formatTime(seconds)}</span>
              <span className="rec-hint">Click the mic again to send</span>
            </div>
          )}
          <form onSubmit={handleSend} className="input-form">
            <div className={`input-box ${!connected ? 'disabled' : ''}`}>
              {/* Image Upload */}
              <button
                type="button"
                className="action-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={!connected || recording}
                title="Upload Image"
              >
                📷
              </button>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleImageUpload} 
              />
              
              {/* Sticker Toggle */}
              <div className="sticker-container">
                <button
                  type="button"
                  className="action-btn"
                  onClick={() => setShowStickers(!showStickers)}
                  disabled={!connected || recording}
                  title="Send Sticker"
                >
                  😀
                </button>
                {showStickers && (
                  <div className="sticker-popover">
                    {STICKERS.map((sticker) => (
                      <img 
                        key={sticker} 
                        src={sticker} 
                        className="sticker-item" 
                        alt="sticker" 
                        onClick={() => handleStickerSend(sticker)} 
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Mic button */}
              <button
                id="mic-btn"
                type="button"
                className={`mic-btn ${recording ? 'recording' : ''}`}
                onClick={handleMicClick}
                disabled={!connected}
                title={recording ? 'Stop & send voice message' : 'Start voice recording'}
              >
                {recording ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.49 6-3.31 6-6.72h-1.7z"/>
                  </svg>
                )}
              </button>

              <input
                id="message-input"
                type="text"
                placeholder={recording ? 'Recording… click mic to send' : connected ? `Message #general as ${username}…` : 'Connecting to server…'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!connected || recording}
                maxLength={500}
                autoComplete="off"
              />
              <button id="send-btn" type="submit" disabled={!connected || !input.trim() || recording} className="send-btn">
                Send
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
            {!connected && !connecting && (
              <p className="conn-warn">⚠ Not connected — make sure Spring Boot is running on port 8081</p>
            )}
          </form>
        </footer>
      </div>
    </div>
  );
}

export default App;
