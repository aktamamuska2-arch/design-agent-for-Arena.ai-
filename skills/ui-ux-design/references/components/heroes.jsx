// when_to_use: hero section, landing hero, page header, above the fold
// Provides: HeroCenteredCTA, HeroLeftAlignedImage, HeroSplitScreen, HeroVideoBg, HeroMinimalTypography

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#0f0f0f",
  "heading": "#ffffff",
  "sub": "#a1a1aa"
}/*EDITMODE-END*/;

const SERIF = "'Fraunces', serif";
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function HeroCenteredCTA() {
  return (
    <div style={{ background: 'var(--bg, #0f0f0f)', color: 'var(--heading, #fff)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem', fontFamily: SANS }}>
      <span style={{ fontSize: '0.75rem', padding: '0.25rem 1rem', borderRadius: '999px', border: '1px solid oklch(28% 0.01 265)', color: 'var(--sub, #a1a1aa)', marginBottom: '2rem' }}>Now in public beta</span>
      <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', maxWidth: '800px', marginBottom: '1.5rem' }}>Build faster.<br />Ship smarter.</h1>
      <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--sub, #a1a1aa)', maxWidth: '560px', lineHeight: 1.6, marginBottom: '2.5rem' }}>The developer platform that turns your ideas into production-ready applications in minutes.</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button style={{ background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Get Started</button>
        <button style={{ background: 'transparent', color: '#fff', border: '1px solid oklch(28% 0.01 265)', borderRadius: '0.5rem', padding: '0.875rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>View Demo</button>
      </div>
    </div>
  );
}

function HeroLeftAlignedImage() {
  return (
    <div style={{ background: 'var(--bg, #0f0f0f)', color: 'var(--heading, #fff)', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: SANS }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 4rem)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>Design at the speed of thought.</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: 'var(--sub, #a1a1aa)', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '480px' }}>A new kind of design tool that understands what you mean, not just what you click.</p>
        <button style={{ background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.875rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' }}>Try It Free</button>
      </div>
      <div style={{ background: 'linear-gradient(135deg, oklch(30% 0.1 265), oklch(20% 0.08 300))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '60%', aspectRatio: '4/3', background: 'oklch(25% 0.05 265)', borderRadius: '1rem', boxShadow: '0 25px 50px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
        </div>
      </div>
    </div>
  );
}

function HeroSplitScreen() {
  return (
    <div style={{ background: 'var(--bg, #0f0f0f)', color: 'var(--heading, #fff)', minHeight: '100vh', display: 'grid', gridTemplateColumns: '5fr 7fr', fontFamily: SANS }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem, 5vw, 4rem)' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1rem' }}>Your data,<br />finally clear.</h1>
        <p style={{ fontSize: '1rem', color: 'var(--sub, #a1a1aa)', lineHeight: 1.6, marginBottom: '2rem' }}>Analytics that tell a story, not just show numbers.</p>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <input type="email" placeholder="you@company.com" style={{ background: 'oklch(20% 0.01 265)', border: '1px solid oklch(28% 0.01 265)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.875rem', width: '240px' }} />
          <button style={{ background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Start Free</button>
        </div>
      </div>
      <div style={{ background: 'oklch(16% 0.02 265)', padding: 'clamp(1rem, 3vw, 3rem)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          { label: 'Active Users', value: '12,847', pct: 78 },
          { label: 'Revenue', value: '$284K', pct: 62 },
          { label: 'Conversion', value: '4.2%', pct: 42 },
        ].map((m) => (
          <div key={m.label} style={{ background: 'oklch(20% 0.01 265)', borderRadius: '0.75rem', padding: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--sub, #a1a1aa)', marginBottom: '0.25rem' }}>{m.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
            <div style={{ height: '4px', background: 'oklch(28% 0.01 265)', borderRadius: '2px', marginTop: '0.75rem' }}>
              <div style={{ width: `${m.pct}%`, height: '100%', background: 'var(--accent, #6366f1)', borderRadius: '2px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroVideoBg() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SANS, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, oklch(40% 0.15 265 / 0.3), transparent 60%)' }} />
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>Imagine what's next.</h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', margin: '0 auto 2.5rem', lineHeight: 1.6' }}>The creative platform for the next generation of builders, makers, and dreamers.</p>
        <button style={{ background: '#fff', color: '#0f0c29', border: 'none', borderRadius: '999px', padding: '0.875rem 2.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Explore</button>
      </div>
    </div>
  );
}

function HeroMinimalTypography() {
  return (
    <div style={{ background: '#fff', color: '#1a1a1a', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(2rem, 10vh, 6rem) clamp(1rem, 5vw, 4rem)', fontFamily: SERIF }}>
      <h1 style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.04em', maxWidth: '900px' }}>Less,<br />but better.</h1>
      <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#6b6b6b', fontFamily: SANS, maxWidth: '480px', marginTop: '2rem', lineHeight: 1.6 }}>A design studio focused on the essential. We remove the noise so your message can be heard.</p>
      <a href="#work" style={{ marginTop: '2rem', color: '#1a1a1a', fontFamily: SANS, fontSize: '0.875rem', textDecoration: 'none', borderBottom: '1px solid #1a1a1a', alignSelf: 'flex-start', paddingBottom: '0.25rem' }}>View our work →</a>
    </div>
  );
}

Object.assign(window, { HeroCenteredCTA, HeroLeftAlignedImage, HeroSplitScreen, HeroVideoBg, HeroMinimalTypography });
