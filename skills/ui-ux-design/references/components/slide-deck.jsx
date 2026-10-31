// when_to_use: slide deck, pitch deck, presentation, keynote — one slide per artifact
// Provides: SlideTitle, SlideSection, SlideTwoCol, SlideStat

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#0f0f0f",
  "text": "#ffffff",
  "muted": "#a1a1aa"
}/*EDITMODE-END*/;

const SERIF = "'Fraunces', serif";
const SANS = "'DM Sans', sans-serif";

function SlideTitle({ number = 1, title, subtitle, accent }) {
  return (
    <div style={{
      aspectRatio: '16/9',
      background: 'var(--bg, #0f0f0f)',
      color: 'var(--text, #fff)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vw, 4rem)',
      fontFamily: SANS,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: `var(--accent, ${accent})`,
      }} />
      <span style={{
        fontFamily: SERIF,
        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.03em',
        marginBottom: '0.5rem',
      }}>{title}</span>
      {subtitle && (
        <span style={{
          fontSize: 'clamp(1rem, 2vw, 1.5rem)',
          color: 'var(--muted, #a1a1aa)',
          fontWeight: 400,
        }}>{subtitle}</span>
      )}
      <span style={{
        position: 'absolute',
        bottom: 'clamp(1rem, 2vw, 2rem)',
        right: 'clamp(1rem, 2vw, 2rem)',
        fontSize: '0.75rem',
        color: 'var(--muted, #a1a1aa)',
        fontVariantNumeric: 'tabular-nums',
      }}>{String(number).padStart(2, '0')}</span>
    </div>
  );
}

function SlideSection({ number = 1, number_prefix = '', title, body, accent }) {
  return (
    <div style={{
      aspectRatio: '16/9',
      background: 'var(--bg, #0f0f0f)',
      color: 'var(--text, #fff)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vw, 4rem)',
      fontFamily: SANS,
      position: 'relative',
    }}>
      <div style={{
        fontSize: 'clamp(4rem, 10vw, 8rem)',
        fontWeight: 900,
        fontFamily: SERIF,
        color: `var(--accent, ${accent})`,
        opacity: 0.15,
        position: 'absolute',
        top: 'clamp(0.5rem, 2vw, 1.5rem)',
        left: 'clamp(1rem, 3vw, 3rem)',
        lineHeight: 1,
      }}>{number_prefix}{number}</div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '70%' }}>
        <h2 style={{
          fontFamily: SERIF,
          fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '1rem',
        }}>{title}</h2>
        <p style={{
          fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
          lineHeight: 1.6,
          color: 'var(--muted, #a1a1aa)',
        }}>{body}</p>
      </div>
    </div>
  );
}

function SlideTwoCol({ number = 1, left_title, left_body, right_label, right_visual, accent }) {
  return (
    <div style={{
      aspectRatio: '16/9',
      background: 'var(--bg, #0f0f0f)',
      color: 'var(--text, #fff)',
      display: 'flex',
      padding: 'clamp(2rem, 5vw, 4rem)',
      fontFamily: SANS,
      gap: 'clamp(1rem, 3vw, 3rem)',
      position: 'relative',
    }}>
      <div style={{ flex: 1 }}>
        <h3 style={{
          fontFamily: SERIF,
          fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
          fontWeight: 700,
          marginBottom: '0.75rem',
        }}>{left_title}</h3>
        <p style={{
          fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
          lineHeight: 1.6,
          color: 'var(--muted, #a1a1aa)',
        }}>{left_body}</p>
      </div>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          fontSize: '0.625rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--muted, #a1a1aa)',
          marginBottom: '0.5rem',
        }}>{right_label}</span>
        {right_visual}
      </div>
      <span style={{
        position: 'absolute',
        bottom: 'clamp(1rem, 2vw, 2rem)',
        right: 'clamp(1rem, 2vw, 2rem)',
        fontSize: '0.75rem',
        color: 'var(--muted, #a1a1aa)',
        fontVariantNumeric: 'tabular-nums',
      }}>{String(number).padStart(2, '0')}</span>
    </div>
  );
}

function SlideStat({ number = 1, value, label, delta, accent }) {
  return (
    <div style={{
      aspectRatio: '16/9',
      background: 'var(--bg, #0f0f0f)',
      color: 'var(--text, #fff)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(2rem, 5vw, 4rem)',
      fontFamily: SANS,
      position: 'relative',
    }}>
      <span style={{
        fontFamily: SERIF,
        fontSize: 'clamp(4rem, 12vw, 10rem)',
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        color: `var(--accent, ${accent})`,
      }}>{value}</span>
      <span style={{
        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
        marginTop: '0.5rem',
        fontWeight: 500,
      }}>{label}</span>
      {delta && (
        <span style={{
          fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
          color: 'var(--muted, #a1a1aa)',
          marginTop: '0.25rem',
        }}>{delta}</span>
      )}
      <span style={{
        position: 'absolute',
        bottom: 'clamp(1rem, 2vw, 2rem)',
        right: 'clamp(1rem, 2vw, 2rem)',
        fontSize: '0.75rem',
        color: 'var(--muted, #a1a1aa)',
        fontVariantNumeric: 'tabular-nums',
      }}>{String(number).padStart(2, '0')}</span>
    </div>
  );
}

Object.assign(window, { SlideTitle, SlideSection, SlideTwoCol, SlideStat });
