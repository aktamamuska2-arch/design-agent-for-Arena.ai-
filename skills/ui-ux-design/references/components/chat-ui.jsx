// when_to_use: chat UI, messaging interface, conversational AI, chatbot, live chat
// Provides: ChatBubble, ThinkingDots, ThinkingBubble, ToolCallCard, StreamingBubble, ChatUI

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#ffffff",
  "userBubble": "#6366f1",
  "aiBubble": "#f0f0f0",
  "text": "#1a1a1a"
}/*EDITMODE-END*/;

const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function ChatBubble({ message, isUser = false }) {
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: '0.75rem' }}>
      <div style={{
        maxWidth: '70%',
        padding: '0.75rem 1rem',
        borderRadius: isUser ? '1rem 1rem 0.25rem 1rem' : '1rem 1rem 1rem 0.25rem',
        background: isUser ? 'var(--userBubble, #6366f1)' : 'var(--aiBubble, #f0f0f0)',
        color: isUser ? '#fff' : 'var(--text, #1a1a1a)',
        fontSize: '0.875rem',
        lineHeight: 1.5,
      }}>{message}</div>
    </div>
  );
}

function ThinkingDots() {
  return (
    <div style={{ display: 'flex', gap: '0.25rem', padding: '0.75rem 1rem', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#a1a1aa',
          animation: `breathe 1.4s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

function ThinkingBubble({ text = 'Thinking...' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
      <div style={{
        padding: '0.75rem 1rem',
        borderRadius: '1rem 1rem 1rem 0.25rem',
        background: 'var(--aiBubble, #f0f0f0)',
        fontSize: '0.875rem',
        color: '#6b6b6b',
        fontStyle: 'italic',
      }}>{text}</div>
    </div>
  );
}

function ToolCallCard({ tool, status = 'completed', output }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div style={{ margin: '0.5rem 0', borderRadius: '0.5rem', border: '1px solid #e5e5e5', overflow: 'hidden', fontSize: '0.75rem' }}>
      <div onClick={() => setExpanded(!expanded)} style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.5rem 0.75rem',
        background: '#fafaf9',
        cursor: 'pointer',
      }}>
        <span style={{ color: status === 'completed' ? '#10b981' : '#f59e0b' }}>{status === 'completed' ? '✓' : '⋯'}</span>
        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{tool}</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.625rem', color: '#a1a1aa' }}>{expanded ? 'collapse' : 'expand'}</span>
      </div>
      {expanded && output && (
        <pre style={{ margin: 0, padding: '0.75rem', background: '#f5f5f5', overflow: 'auto', fontSize: '0.625rem', fontFamily: 'monospace' }}>{output}</pre>
      )}
    </div>
  );
}

function StreamingBubble({ text, speed = 30 }) {
  const [displayed, setDisplayed] = React.useState('');
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '0.75rem' }}>
      <div style={{
        maxWidth: '70%',
        padding: '0.75rem 1rem',
        borderRadius: '1rem 1rem 1rem 0.25rem',
        background: 'var(--aiBubble, #f0f0f0)',
        color: 'var(--text, #1a1a1a)',
        fontSize: '0.875rem',
        lineHeight: 1.5,
      }}>
        {displayed}
        <span style={{ display: 'inline-block', width: '2px', height: '1em', background: 'var(--text, #1a1a1a)', marginLeft: '1px', animation: 'breathe 0.8s ease-in-out infinite' }} />
      </div>
    </div>
  );
}

function ChatUI() {
  const [messages, setMessages] = React.useState([
    { id: 1, text: 'Hi! How can I help you today?', isUser: false },
    { id: 2, text: 'I need a landing page for my SaaS product.', isUser: true },
    { id: 3, text: "I'd love to help with that! Let me create a modern landing page with a hero section, features grid, and a CTA. What's your product about?", isUser: false },
  ]);
  const [input, setInput] = React.useState('');

  return (
    <div style={{ background: 'var(--bg, #fff)', fontFamily: SANS, height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>AI</div>
        <div>
          <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Design Assistant</div>
          <div style={{ fontSize: '0.625rem', color: '#10b981' }}>● Online</div>
        </div>
      </header>
      <div style={{ flex: 1, overflow: 'auto', padding: '1rem 1.5rem' }}>
        {messages.map((m) => (
          <ChatBubble key={m.id} message={m.text} isUser={m.isUser} />
        ))}
      </div>
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '0.5rem' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) { setMessages([...messages, { id: Date.now(), text: input, isUser: true }]); setInput(''); } }} placeholder="Type a message..." style={{ flex: 1, border: '1px solid #e5e5e5', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none' }} />
        <button onClick={() => { if (input.trim()) { setMessages([...messages, { id: Date.now(), text: input, isUser: true }]); setInput(''); } }} style={{ background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.25rem', fontSize: '0.875rem', cursor: 'pointer' }}>Send</button>
      </div>
    </div>
  );
}

Object.assign(window, { ChatBubble, ThinkingDots, ThinkingBubble, ToolCallCard, StreamingBubble, ChatUI });
