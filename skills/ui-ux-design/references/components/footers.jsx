// when_to_use: footer, site footer, page footer, navigation footer
// Provides: FooterMega, FooterMinimal, FooterLinkGrid, FooterBrandNewsletter

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#0f0f0f",
  "text": "#ffffff",
  "muted": "#a1a1aa"
}/*EDITMODE-END*/;

const SERIF = "'Fraunces', serif";
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function FooterMega() {
  const columns = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Docs'] },
    { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press', 'Partners'] },
    { title: 'Resources', links: ['Community', 'Help Center', 'Templates', 'Guides', 'API'] },
    { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies', 'Licenses'] },
  ];
  return (
    <footer style={{ background: 'var(--bg, #0f0f0f)', color: 'var(--text, #fff)', fontFamily: SANS, padding: 'clamp(3rem, 8vh, 5rem) clamp(1rem, 5vw, 4rem) 2rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4, 1fr)', gap: '2rem', maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem', borderBottom: '1px solid oklch(28% 0.01 265)' }}>
        <div>
          <span style={{ fontFamily: SERIF, fontSize: '1.5rem', fontWeight: 700 }}>Luminary</span>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted, #a1a1aa)', lineHeight: 1.6, marginTop: '1rem', maxWidth: '280px' }}>Design that speaks before you do. Built for product teams who care about craft.</p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted, #a1a1aa)', marginBottom: '1rem' }}>{col.title}</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {col.links.map((link) => (
                <li key={link}><a href="#" style={{ fontSize: '0.875rem', color: 'var(--muted, #a1a1aa)', textDecoration: 'none', display: 'block', padding: '0.25rem 0' }}>{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--muted, #a1a1aa)' }}>
        <span>© 2026 Luminary. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: 'var(--muted, #a1a1aa)', textDecoration: 'none' }}>Twitter</a>
          <a href="#" style={{ color: 'var(--muted, #a1a1aa)', textDecoration: 'none' }}>GitHub</a>
          <a href="#" style={{ color: 'var(--muted, #a1a1aa)', textDecoration: 'none' }}>Discord</a>
        </div>
      </div>
    </footer>
  );
}

function FooterMinimal() {
  return (
    <footer style={{ background: '#fff', color: '#1a1a1a', fontFamily: SANS, padding: '2rem clamp(1rem, 5vw, 4rem)', borderTop: '1px solid #f0f0f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#6b6b6b' }}>
        <span>© 2026 Plain</span>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: '#6b6b6b', textDecoration: 'none' }}>Privacy</a>
          <a href="#" style={{ color: '#6b6b6b', textDecoration: 'none' }}>Terms</a>
          <a href="#" style={{ color: '#6b6b6b', textDecoration: 'none' }}>Contact</a>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkGrid() {
  const links = ['Features', 'Pricing', 'Docs', 'Blog', 'About', 'Careers', 'Press', 'Security', 'Privacy', 'Terms', 'Status', 'Support'];
  return (
    <footer style={{ background: '#fafaf9', color: '#1a1a1a', fontFamily: SANS, padding: 'clamp(2rem, 5vh, 4rem) clamp(1rem, 5vw, 4rem)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontFamily: SERIF, fontSize: '1.25rem', fontWeight: 700 }}>Nexus</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          {links.map((link) => (
            <a key={link} href="#" style={{ fontSize: '0.875rem', color: '#6b6b6b', textDecoration: 'none' }}>{link}</a>
          ))}
        </div>
        <span style={{ fontSize: '0.75rem', color: '#a1a1aa' }}>© 2026 Nexus Infrastructure, Inc.</span>
      </div>
    </footer>
  );
}

function FooterBrandNewsletter() {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  return (
    <footer style={{ background: 'var(--bg, #0f0f0f)', color: 'var(--text, #fff)', fontFamily: SANS, padding: 'clamp(3rem, 8vh, 5rem) clamp(1rem, 5vw, 4rem)' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '0.5rem' }}>Stay in the loop</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted, #a1a1aa)', marginBottom: '1.5rem' }}>Product updates, design tips, and occasional inspiration. No spam.</p>
        {submitted ? (
          <p style={{ fontSize: '0.875rem', color: '#10b981' }}>Thanks! Check your inbox to confirm.</p>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '400px', margin: '0 auto' }}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" style={{ flex: 1, background: 'oklch(20% 0.01 265)', border: '1px solid oklch(28% 0.01 265)', borderRadius: '0.5rem', padding: '0.75rem 1rem', color: '#fff', fontSize: '0.875rem' }} />
            <button onClick={() => email && setSubmitted(true)} style={{ background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Subscribe</button>
          </div>
        )}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid oklch(28% 0.01 265)', display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted, #a1a1aa)' }}>
          <span>© 2026 Luminary</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--muted, #a1a1aa)', textDecoration: 'none' }}>Twitter</a>
            <a href="#" style={{ color: 'var(--muted, #a1a1aa)', textDecoration: 'none' }}>GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { FooterMega, FooterMinimal, FooterLinkGrid, FooterBrandNewsletter });
