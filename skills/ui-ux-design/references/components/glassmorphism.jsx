// when_to_use: glassmorphism, iOS 26 style, visionOS, frosted glass, translucent UI
// Provides: GlassCard, GlassNowPlaying, GlassSettings, GlassNotifications
// Requires: vivid gradient background for blur effect to be visible

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "glassBg": "rgba(255, 255, 255, 0.12)",
  "glassBorder": "rgba(255, 255, 255, 0.18)",
  "text": "#ffffff"
}/*EDITMODE-END*/;

const SANS = "'SF Pro Display', -apple-system, system-ui, sans-serif";

function GlassCard({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--glassBg, rgba(255,255,255,0.12))',
      backdropFilter: 'blur(28px) saturate(180%)',
      WebkitBackdropFilter: 'blur(28px) saturate(180%)',
      border: '1px solid var(--glassBorder, rgba(255,255,255,0.18))',
      borderRadius: '16px',
      padding: '20px',
      ...style,
    }}>
      {children}
    </div>
  );
}

function GlassNowPlaying() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: SANS,
    }}>
      <GlassCard style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ width: '100%', aspectRatio: '1', borderRadius: '12px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="white" opacity="0.9">
            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
          </svg>
        </div>
        <h3 style={{ color: 'var(--text, #fff)', fontSize: '1.125rem', fontWeight: 600, margin: '0 0 0.25rem' }}>Midnight City</h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', margin: '0 0 1.5rem' }}>M83 — Hurry Up, We're Dreaming</p>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '35%', height: '100%', background: '#fff', borderRadius: '2px' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>
            <span>1:42</span><span>4:03</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.25rem' }}>⏮</button>
          <button style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', borderRadius: '50%', width: '48px', height: '48px', cursor: 'pointer', fontSize: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>▶</button>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.25rem' }}>⏭</button>
        </div>
      </GlassCard>
    </div>
  );
}

function GlassSettings() {
  const [toggles, setToggles] = React.useState({ wifi: true, bluetooth: false, airdrop: true });
  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: SANS,
    }}>
      <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: '0 0 1.5rem' }}>Settings</h1>
      <GlassCard style={{ marginBottom: '1rem' }}>
        {Object.entries(toggles).map(([key, val], i, arr) => (
          <div key={key} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          }}>
            <span style={{ color: '#fff', fontSize: '0.875rem', textTransform: 'capitalize' }}>{key}</span>
            <button onClick={() => setToggles(p => ({ ...p, [key]: !p[key] }))} style={{
              width: '51px', height: '31px', borderRadius: '16px',
              background: val ? '#34c759' : 'rgba(255,255,255,0.2)',
              border: 'none', cursor: 'pointer', position: 'relative',
              transition: 'background 0.2s',
            }}>
              <div style={{
                width: '27px', height: '27px', borderRadius: '50%',
                background: '#fff', position: 'absolute', top: '2px',
                left: val ? '22px' : '2px', transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }} />
            </button>
          </div>
        ))}
      </GlassCard>
    </div>
  );
}

function GlassNotifications() {
  const notifications = [
    { app: 'Messages', title: 'Alex Chen', body: 'Hey, are we still on for lunch?', time: '2m ago', color: '#34c759' },
    { app: 'Calendar', title: 'Team Standup', body: 'Starting in 15 minutes', time: '13m ago', color: '#ff3b30' },
    { app: 'Mail', title: 'Design Review', body: 'Sarah shared a new Figma file', time: '1h ago', color: '#007aff' },
  ];
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
      minHeight: '100vh',
      padding: '2rem',
      fontFamily: SANS,
    }}>
      <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 1.5rem' }}>Notifications</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {notifications.map((n, i) => (
          <GlassCard key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: n.color, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>
              {n.app[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{n.app}</span>
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.625rem' }}>{n.time}</span>
              </div>
              <div style={{ color: '#fff', fontSize: '0.875rem', fontWeight: 600, margin: '0.125rem 0' }}>{n.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>{n.body}</div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { GlassCard, GlassNowPlaying, GlassSettings, GlassNotifications });
