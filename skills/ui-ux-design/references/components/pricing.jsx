// when_to_use: pricing page, pricing table, plans, tiers, compare plans
// Provides: Pricing3TierCards, PricingTableComparison, PricingSingleCTA, PricingFreemiumToggle

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#f8f5f0",
  "text": "#1a1a1a",
  "muted": "#6b6b6b"
}/*EDITMODE-END*/;

const SERIF = "'Fraunces', serif";
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function Pricing3TierCards() {
  const plans = [
    { name: 'Starter', price: '$0', period: '/month', desc: 'For individuals exploring the platform', features: ['1 project', 'Basic analytics', 'Community support', '1GB storage'], cta: 'Get Started', highlighted: false },
    { name: 'Pro', price: '$29', period: '/month', desc: 'For growing teams that need more power', features: ['Unlimited projects', 'Advanced analytics', 'Priority support', '50GB storage', 'Custom domains', 'Team collaboration'], cta: 'Start Free Trial', highlighted: true },
    { name: 'Enterprise', price: '$99', period: '/month', desc: 'For organizations with advanced needs', features: ['Everything in Pro', 'SSO & SAML', 'Dedicated support', 'Unlimited storage', 'SLA guarantee', 'Custom integrations', 'Audit logs'], cta: 'Contact Sales', highlighted: false },
  ];
  return (
    <div style={{ background: 'var(--bg, #f8f5f0)', color: 'var(--text, #1a1a1a)', fontFamily: SANS, minHeight: '100vh', padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 4rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '0.5rem' }}>Simple, transparent pricing</h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--muted, #6b6b6b)' }}>Start free. Upgrade when you're ready.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto', alignItems: 'start' }}>
        {plans.map((plan) => (
          <div key={plan.name} style={{
            background: plan.highlighted ? 'var(--accent, #6366f1)' : '#fff',
            color: plan.highlighted ? '#fff' : 'var(--text, #1a1a1a)',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: plan.highlighted ? '0 20px 40px oklch(62% 0.22 265 / 0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
            transform: plan.highlighted ? 'scale(1.03)' : 'none',
          }}>
            {plan.highlighted && <span style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.8 }}>Most Popular</span>}
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0' }}>{plan.name}</h3>
            <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '1rem' }}>{plan.desc}</p>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 800, fontVariantNumeric: 'tabular-nums' }}>{plan.price}</span>
              <span style={{ fontSize: '0.875rem', opacity: 0.7 }}>{plan.period}</span>
            </div>
            <button style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              border: plan.highlighted ? 'none' : '1px solid oklch(85% 0.01 0)',
              background: plan.highlighted ? '#fff' : 'transparent',
              color: plan.highlighted ? 'var(--accent, #6366f1)' : 'var(--text, #1a1a1a)',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '1.5rem',
            }}>{plan.cta}</button>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontSize: '0.875rem', padding: '0.375rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: plan.highlighted ? '#fff' : '#10b981' }}>✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PricingTableComparison() {
  const features = ['Projects', 'Storage', 'Analytics', 'Custom Domain', 'Team Members', 'API Access', 'SSO', 'SLA'];
  const tiers = [
    { name: 'Free', values: ['1', '1GB', 'Basic', '—', '1', '—', '—', '—'] },
    { name: 'Pro', values: ['Unlimited', '50GB', 'Advanced', '✓', '10', '✓', '—', '—'] },
    { name: 'Enterprise', values: ['Unlimited', 'Unlimited', 'Custom', '✓', 'Unlimited', '✓', '✓', '99.9%'] },
  ];
  return (
    <div style={{ background: '#fff', color: '#1a1a1a', fontFamily: SANS, minHeight: '100vh', padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 4rem)' }}>
      <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem' }}>Compare Plans</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem 1rem', color: '#6b6b6b' }}>Feature</th>
              {tiers.map((t) => <th key={t.name} style={{ padding: '0.75rem 1rem', textAlign: 'center', fontWeight: 700 }}>{t.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem 1rem' }}>{f}</td>
                {tiers.map((t) => (
                  <td key={t.name} style={{ padding: '0.75rem 1rem', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{t.values[i]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PricingSingleCTA() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', color: '#fff', fontFamily: SANS, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>One plan. Everything included.</h1>
        <p style={{ fontSize: '1.125rem', opacity: 0.85, marginBottom: '2rem', lineHeight: 1.6 }}>No tiers. No upsells. Just $19/month for everything you need.</p>
        <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem' }}>$19<span style={{ fontSize: '1rem', fontWeight: 400, opacity: 0.7 }}>/month</span></div>
        <p style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '2rem' }}>14-day free trial · No credit card required</p>
        <button style={{ background: '#fff', color: '#6366f1', border: 'none', borderRadius: '999px', padding: '1rem 3rem', fontSize: '1.125rem', fontWeight: 700, cursor: 'pointer' }}>Start Your Free Trial</button>
      </div>
    </div>
  );
}

function PricingFreemiumToggle() {
  const [annual, setAnnual] = React.useState(false);
  return (
    <div style={{ background: 'var(--bg, #f8f5f0)', color: 'var(--text, #1a1a1a)', fontFamily: SANS, minHeight: '100vh', padding: 'clamp(3rem, 8vh, 6rem) clamp(1rem, 5vw, 4rem)' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: '1.5rem' }}>Choose your plan</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#fff', borderRadius: '999px', padding: '0.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <button onClick={() => setAnnual(false)} style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', background: !annual ? 'var(--accent, #6366f1)' : 'transparent', color: !annual ? '#fff' : '#6b6b6b', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Monthly</button>
          <button onClick={() => setAnnual(true)} style={{ padding: '0.5rem 1.25rem', borderRadius: '999px', border: 'none', background: annual ? 'var(--accent, #6366f1)' : 'transparent', color: annual ? '#fff' : '#6b6b6b', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>Annual <span style={{ fontSize: '0.75rem', color: '#10b981' }}>Save 20%</span></button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
        {[
          { name: 'Free', price: '$0', features: ['1 project', 'Basic analytics', 'Community support'] },
          { name: 'Pro', price: annual ? '$23' : '$29', features: ['Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom domains'] },
        ].map((plan) => (
          <div key={plan.name} style={{ background: '#fff', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>{plan.name}</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800 }}>{plan.price}</span>
              <span style={{ fontSize: '0.875rem', color: '#6b6b6b' }}>/month</span>
            </div>
            <button style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid oklch(85% 0.01 0)', background: 'transparent', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1.5rem' }}>{plan.name === 'Free' ? 'Get Started' : 'Start Trial'}</button>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {plan.features.map((f) => (
                <li key={f} style={{ fontSize: '0.875rem', padding: '0.375rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#10b981' }}>✓</span> {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { Pricing3TierCards, PricingTableComparison, PricingSingleCTA, PricingFreemiumToggle });
