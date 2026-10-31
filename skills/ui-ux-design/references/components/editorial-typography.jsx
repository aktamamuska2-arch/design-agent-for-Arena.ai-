// when_to_use: editorial design, magazine layout, typography showcase, essay, article, poetry
// Provides: EssayClassical, MagazineSpread, PoetryMinimal

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#b45309",
  "bg": "#faf8f5",
  "text": "#1a1a1a",
  "muted": "#6b6b6b"
}/*EDITMODE-END*/;

const SERIF = "'Fraunces', serif";
const SANS = "'DM Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

function EssayClassical() {
  return (
    <div style={{ background: 'var(--bg, #faf8f5)', color: 'var(--text, #1a1a1a)', fontFamily: SERIF, maxWidth: '680px', margin: '0 auto', padding: 'clamp(2rem, 8vh, 6rem) 1.5rem' }}>
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--muted, #6b6b6b)', fontFamily: SANS }}>The Long Read</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '1rem 0' }}>
          The Architecture of Silence
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--muted, #6b6b6b)', fontFamily: SANS }}>By Elena Vasquez · 12 min read</p>
      </header>
      <div style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)', lineHeight: 1.8 }}>
        <p style={{ margin: '0 0 1.5rem' }}>
          <span style={{ fontSize: '3.5rem', fontWeight: 700, float: 'left', lineHeight: 1, marginRight: '0.5rem', color: 'var(--accent, #b45309)' }}>T</span>
          here is a particular quality to the silence of a library at dawn — not the absence of sound, but the presence of something held in reserve. The books stand like sentinels, each one a sealed room waiting for a visitor to turn the key.
        </p>
        <p style={{ margin: '0 0 1.5rem' }}>
          I have spent three years studying the acoustic design of reading rooms across Europe. What I found was not a story about noise reduction, but about the deliberate cultivation of attention. The best libraries do not eliminate sound; they curate it.
        </p>
        <blockquote style={{
          borderLeft: '3px solid var(--accent, #b45309)',
          paddingLeft: '1.5rem',
          margin: '2rem 0',
          fontStyle: 'italic',
          fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
          lineHeight: 1.5,
          color: 'var(--muted, #6b6b6b)',
        }}>
          "A reading room should feel like a conversation with someone who knows when to listen."
          <footer style={{ fontSize: '0.875rem', marginTop: '0.5rem', fontFamily: SANS }}>— Dr. Henrik Møller, Acoustic Architect</footer>
        </blockquote>
        <p style={{ margin: '0 0 1.5rem' }}>
          The British Library's reading room, for instance, maintains a reverberation time of exactly 0.8 seconds — long enough to give speech warmth, short enough to prevent echo from becoming distraction. This is not an accident. It is the result of decades of iterative design.
        </p>
      </div>
    </div>
  );
}

function MagazineSpread() {
  return (
    <div style={{ background: '#fff', color: '#1a1a1a', fontFamily: SANS, minHeight: '100vh', padding: 'clamp(2rem, 5vw, 4rem)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'clamp(1rem, 3vw, 3rem)', maxWidth: '1200px', margin: '0 auto' }}>
        <aside style={{ borderRight: '1px solid #e5e5e5', paddingRight: 'clamp(1rem, 2vw, 2rem)' }}>
          <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted, #6b6b6b)' }}>Feature</span>
          <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 700, lineHeight: 1.2, margin: '0.5rem 0 1rem' }}>
            The New Minimalism
          </h2>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--muted, #6b6b6b)' }}>
            How a generation of designers is stripping away the non-essential to reveal what matters.
          </p>
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#faf8f5', borderRadius: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: MONO, color: 'var(--muted, #6b6b6b)' }}>PAGES 24–31</span>
          </div>
        </aside>
        <div style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', lineHeight: 1.8 }}>
          <p style={{ margin: '0 0 1.5rem' }}>
            There was a time when more was better — more features, more pixels, more gradients. That time has passed. The designers shaping today's most compelling interfaces are not asking "what can we add?" but "what can we remove without losing meaning?"
          </p>
          <p style={{ margin: '0 0 1.5rem' }}>
            This is not minimalism as aesthetic choice. It is minimalism as ethical stance: every element on a screen demands attention, and attention is the scarcest resource we have.
          </p>
          <div style={{ columns: 2, columnGap: '2rem', columnRule: '1px solid #e5e5e5' }}>
            <p style={{ margin: '0 0 1rem', breakInside: 'avoid' }}>
              The movement traces its lineage to Dieter Rams and his ten principles for good design, but it has evolved beyond industrial design into the digital realm. The constraint is no longer physical material — it is cognitive load.
            </p>
            <p style={{ margin: '0 0 1rem', breakInside: 'avoid' }}>
              "We used to design for the widest possible audience," says Mara Okonkwo, design director at a studio in Lagos. "Now we design for the most distracted possible reader. That changes everything."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PoetryMinimal() {
  return (
    <div style={{
      background: '#0f0f0f',
      color: '#fff',
      fontFamily: SERIF,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 10vh, 6rem) clamp(1rem, 5vw, 4rem)',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted, #a1a1aa)', fontFamily: SANS }}>Selected Works</span>
        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.4, margin: '2rem 0', letterSpacing: '-0.01em' }}>
          The space between<br />what we say<br />and what we mean
        </h1>
        <div style={{ width: '40px', height: '1px', background: 'var(--accent, #b45309)', margin: '2rem auto' }} />
        <p style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'var(--muted, #a1a1aa)', fontFamily: SANS, lineHeight: 1.8 }}>
          is where the poem lives —<br />
          not in the word, but in the silence<br />
          that gives the word its shape.
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--muted, #a1a1aa)', fontFamily: SANS, marginTop: '2rem' }}>
          — from "Margins," 2025
        </p>
      </div>
    </div>
  );
}

Object.assign(window, { EssayClassical, MagazineSpread, PoetryMinimal });
