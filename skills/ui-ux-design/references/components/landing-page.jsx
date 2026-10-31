// when_to_use: landing page, homepage, marketing site, launch page
// Provides: LandingEditorial, LandingProductTech, LandingMinimalStartup

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#f8f5f0",
  "text": "#1a1a1a",
  "muted": "#6b6b6b"
}/*EDITMODE-END*/;

const SERIF = "'Fraunces', serif";
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function LandingEditorial() {
  return (
    <div style={{ background: 'var(--bg, #f8f5f0)', color: 'var(--text, #1a1a1a)', fontFamily: SANS }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem clamp(1rem, 5vw, 4rem)' }}>
        <span style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 700 }}>Luminary</span>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
          <a href="#features" style={{ color: 'var(--muted, #6b6b6b)', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ color: 'var(--muted, #6b6b6b)', textDecoration: 'none' }}>Pricing</a>
          <a href="#about" style={{ color: 'var(--muted, #6b6b6b)', textDecoration: 'none' }}>About</a>
        </div>
      </nav>
      <header style={{ padding: 'clamp(3rem, 10vh, 8rem) clamp(1rem, 5vw, 4rem)', maxWidth: '800px' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
          Design that speaks before you do.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.7, color: 'var(--muted, #6b6b6b)', maxWidth: '560px', marginBottom: '2rem' }}>
          Luminary helps product teams ship polished interfaces in hours, not weeks. No design degree required.
        </p>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{
            background: 'var(--accent, #6366f1)',
            color: '#fff',
            border: 'none',
            borderRadius: '999px',
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}>Get Started Free</button>
          <a href="#demo" style={{ color: 'var(--text, #1a1a1a)', textDecoration: 'underline', fontSize: '0.875rem' }}>Watch demo</a>
        </div>
      </header>
      <section style={{ padding: '2rem clamp(1rem, 5vw, 4rem)', borderTop: '1px solid oklch(85% 0.01 0)' }}>
        <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted, #6b6b6b)', textAlign: 'center', marginBottom: '1.5rem' }}>Trusted by teams at</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.5 }}>
          {['Vercel', 'Stripe', 'Linear', 'Notion', 'Figma'].map((name) => (
            <span key={name} style={{ fontFamily: SERIF, fontSize: '1.125rem', fontWeight: 700 }}>{name}</span>
          ))}
        </div>
      </section>
      <section id="features" style={{ padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 4rem)' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>Built for the way you work</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { title: 'Prompt to prototype', desc: 'Describe what you need in plain language. Get a working HTML prototype in seconds.' },
            { title: 'Design system aware', desc: 'Import your tokens. Every output respects your palette, fonts, and spacing.' },
            { title: 'Iterate with intent', desc: 'Click any element, leave a note, and watch the model rewrite just that region.' },
          ].map((f) => (
            <div key={f.title} style={{ padding: '1.5rem', borderRadius: '0.75rem', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted, #6b6b6b)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 4rem)', textAlign: 'center', background: 'var(--accent, #6366f1)', color: '#fff' }}>
        <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 3.5vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>Ready to ship better design?</h2>
        <p style={{ fontSize: '1rem', opacity: 0.85, marginBottom: '2rem' }}>Join 12,000+ product teams already using Luminary.</p>
        <button style={{ background: '#fff', color: 'var(--accent, #6366f1)', border: 'none', borderRadius: '999px', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Start Building</button>
      </section>
    </div>
  );
}

function LandingProductTech() {
  return (
    <div style={{ background: '#0f0f0f', color: '#fff', fontFamily: SANS }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem clamp(1rem, 5vw, 4rem)', borderBottom: '1px solid oklch(28% 0.01 265)' }}>
        <span style={{ fontFamily: 'monospace', fontSize: '1rem', fontWeight: 700 }}>⚡ Nexus</span>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem' }}>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Docs</a>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>GitHub</a>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Blog</a>
        </div>
      </nav>
      <header style={{ padding: 'clamp(3rem, 10vh, 8rem) clamp(1rem, 5vw, 4rem)', textAlign: 'center' }}>
        <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', border: '1px solid oklch(28% 0.01 265)', color: '#a1a1aa' }}>v3.0 — Now with edge functions</span>
        <h1 style={{ fontFamily: SANS, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em', margin: '1.5rem 0' }}>
          Infrastructure that<br />scales with you.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#a1a1aa', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
          Deploy globally in seconds. Nexus handles routing, caching, and edge compute so you can focus on code.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Deploy Now</button>
          <button style={{ background: 'transparent', color: '#fff', border: '1px solid oklch(28% 0.01 265)', borderRadius: '0.5rem', padding: '0.75rem 2rem', fontSize: '1rem', cursor: 'pointer' }}>Read Docs</button>
        </div>
      </header>
      <section style={{ padding: '2rem clamp(1rem, 5vw, 4rem)', borderTop: '1px solid oklch(28% 0.01 265)', borderBottom: '1px solid oklch(28% 0.01 265)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { value: '99.99%', label: 'Uptime SLA' },
            { value: '< 50ms', label: 'Global p99' },
            { value: '180+', label: 'Edge locations' },
            { value: '4.2M', label: 'Deployments' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 4rem)' }}>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>Everything you need</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            { icon: '◆', title: 'Edge Functions', desc: 'Run code at the edge with zero cold starts.' },
            { icon: '◇', title: 'Smart Caching', desc: 'Automatic cache invalidation with stale-while-revalidate.' },
            { icon: '○', title: 'Real-time Logs', desc: 'Stream logs from every region in one dashboard.' },
            { icon: '△', title: 'Auto Scaling', desc: 'From zero to millions of requests without config.' },
            { icon: '□', title: 'Team Collaboration', desc: 'Role-based access with preview environments.' },
            { icon: '⬡', title: 'Observability', desc: 'Built-in metrics, traces, and alerting.' },
          ].map((f) => (
            <div key={f.title} style={{ padding: '1.25rem', borderRadius: '0.5rem', background: 'oklch(18% 0.01 265)', border: '1px solid oklch(28% 0.01 265)' }}>
              <span style={{ fontSize: '1.5rem', color: '#6366f1' }}>{f.icon}</span>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: '0.5rem 0' }}>{f.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#a1a1aa', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function LandingMinimalStartup() {
  return (
    <div style={{ background: '#fff', color: '#1a1a1a', fontFamily: SANS, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem clamp(1rem, 5vw, 4rem)' }}>
        <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>Plain</span>
        <a href="#" style={{ fontSize: '0.875rem', color: '#6b6b6b', textDecoration: 'none' }}>Sign in</a>
      </nav>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(2rem, 10vh, 6rem) clamp(1rem, 5vw, 4rem)', textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
          Writing, simplified.
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.7, color: '#6b6b6b', marginBottom: '2.5rem' }}>
          A distraction-free editor for people who take words seriously. No features you don't need. Just you and the page.
        </p>
        <button style={{ background: '#1a1a1a', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.875rem 2.5rem', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
          Start Writing — It's Free
        </button>
        <p style={{ fontSize: '0.75rem', color: '#a1a1aa', marginTop: '1rem' }}>No credit card required. 10,000+ writers already.</p>
      </main>
      <footer style={{ padding: '1.5rem clamp(1rem, 5vw, 4rem)', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#a1a1aa' }}>
        <span>© 2026 Plain</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#a1a1aa', textDecoration: 'none' }}>Terms</a>
        </div>
      </footer>
    </div>
  );
}

Object.assign(window, { LandingEditorial, LandingProductTech, LandingMinimalStartup });
