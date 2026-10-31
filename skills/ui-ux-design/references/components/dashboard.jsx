// when_to_use: dashboard, admin console, ops dashboard, analytics view, data UI
// Provides: DashboardOpsDark, DashboardAnalyticsLight, DashboardFinanceLedger, Sparkline

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#0f0f0f",
  "surface": "#1a1a2e",
  "text": "#ffffff",
  "muted": "#a1a1aa"
}/*EDITMODE-END*/;

const SANS = "'DM Sans', sans-serif";
const MONO = "'JetBrains Mono', monospace";

function Sparkline({ data = [30, 45, 35, 50, 40, 60, 55, 70], width = 80, height = 24, color = "#6366f1" }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashboardOpsDark() {
  const kpis = [
    { label: 'Requests', value: '14.2K', delta: '+12%', color: '#6366f1' },
    { label: 'Latency p99', value: '42ms', delta: '-8%', color: '#10b981' },
    { label: 'Error Rate', value: '0.12%', delta: '-0.03%', color: '#f59e0b' },
    { label: 'Uptime', value: '99.97%', delta: '+0.01%', color: '#06b6d4' },
  ];
  return (
    <div style={{
      background: 'var(--bg, #0f0f0f)',
      color: 'var(--text, #fff)',
      fontFamily: SANS,
      minHeight: '100vh',
      padding: '1.5rem',
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Ops Console</h1>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted, #a1a1aa)', fontFamily: MONO }}>SYSTEM ONLINE</span>
        </div>
        <span style={{ fontSize: '0.875rem', fontFamily: MONO, fontVariantNumeric: 'tabular-nums' }}>
          {new Date().toLocaleTimeString()}
        </span>
      </header>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {kpis.map((kpi) => (
          <div key={kpi.label} style={{
            background: 'var(--surface, #1a1a2e)',
            borderRadius: '0.5rem',
            padding: '1rem',
            borderLeft: `4px solid ${kpi.color}`,
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted, #a1a1aa)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', margin: '0.25rem 0' }}>{kpi.value}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkline color={kpi.color} />
              <span style={{ fontSize: '0.75rem', color: kpi.color }}>{kpi.delta}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        <div style={{ background: 'var(--surface, #1a1a2e)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 1rem' }}>Traffic (24h)</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
            {Array.from({ length: 24 }, (_, i) => {
              const h = 20 + Math.random() * 80;
              return <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--accent, #6366f1)', borderRadius: '2px 2px 0 0', opacity: 0.7 }} />;
            })}
          </div>
        </div>
        <div style={{ background: 'var(--surface, #1a1a2e)', borderRadius: '0.5rem', padding: '1rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 1rem' }}>Recent Events</h3>
          {['Deploy v2.4.1', 'SSL cert renewed', 'Cache cleared', 'Scale up +2'].map((evt, i) => (
            <div key={i} style={{ fontSize: '0.75rem', padding: '0.5rem 0', borderBottom: '1px solid oklch(28% 0.01 265)', fontFamily: MONO }}>
              <span style={{ color: 'var(--muted, #a1a1aa)' }}>{String(14 - i).padStart(2, '0')}:00</span> {evt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardAnalyticsLight() {
  return (
    <div style={{ background: '#f8f5f0', color: '#1a1a1a', fontFamily: SANS, minHeight: '100vh', padding: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>Analytics Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Page Views', value: '284.1K', change: '+14.2%' },
          { label: 'Unique Visitors', value: '42.8K', change: '+8.7%' },
          { label: 'Avg. Session', value: '4m 32s', change: '+12.1%' },
        ].map((m) => (
          <div key={m.label} style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', margin: '0.25rem 0' }}>{m.value}</div>
            <span style={{ fontSize: '0.75rem', color: '#10b981' }}>{m.change}</span>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '0.75rem', padding: '1.25rem', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 1rem' }}>Top Pages</h3>
        {[
          { path: '/dashboard', views: '42.1K', pct: 85 },
          { path: '/pricing', views: '28.4K', pct: 62 },
          { path: '/blog/launch', views: '18.7K', pct: 45 },
        ].map((p) => (
          <div key={p.path} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
            <span style={{ flex: 1, fontFamily: MONO, fontSize: '0.875rem' }}>{p.path}</span>
            <div style={{ width: '120px', height: '6px', background: '#e5e5e5', borderRadius: '3px' }}>
              <div style={{ width: `${p.pct}%`, height: '100%', background: '#6366f1', borderRadius: '3px' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontVariantNumeric: 'tabular-nums', width: '60px', textAlign: 'right' }}>{p.views}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardFinanceLedger() {
  return (
    <div style={{ background: '#fafaf9', color: '#1a1a1a', fontFamily: SANS, minHeight: '100vh', padding: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>Finance Ledger</h1>
      <p style={{ fontSize: '0.875rem', color: '#6b6b6b', marginBottom: '1.5rem' }}>Q4 2025 — All figures in USD</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: 'Revenue', value: '$2.4M', color: '#059669' },
          { label: 'Expenses', value: '$1.1M', color: '#dc2626' },
          { label: 'Net Profit', value: '$1.3M', color: '#059669' },
          { label: 'Margin', value: '54.2%', color: '#7c3aed' },
        ].map((m) => (
          <div key={m.label} style={{ background: '#fff', borderRadius: '0.5rem', padding: '1rem', borderLeft: `4px solid ${m.color}` }}>
            <div style={{ fontSize: '0.75rem', color: '#6b6b6b' }}>{m.label}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5' }}>
              {['Date', 'Description', 'Category', 'Amount'].map((h) => (
                <th key={h} style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: 600, color: '#6b6b6b' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { date: '2025-12-15', desc: 'Enterprise license — Acme Corp', cat: 'Revenue', amount: '+$48,000' },
              { date: '2025-12-14', desc: 'AWS infrastructure', cat: 'Infrastructure', amount: '-$12,400' },
              { date: '2025-12-13', desc: 'Team payroll — December', cat: 'Payroll', amount: '-$186,000' },
              { date: '2025-12-12', desc: 'SMB subscription renewals', cat: 'Revenue', amount: '+$23,700' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '0.75rem 1rem', fontFamily: MONO, fontSize: '0.75rem' }}>{row.date}</td>
                <td style={{ padding: '0.75rem 1rem' }}>{row.desc}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '999px', background: '#f0f0f0' }}>{row.cat}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: MONO, fontVariantNumeric: 'tabular-nums', color: row.amount.startsWith('+') ? '#059669' : '#dc2626' }}>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { DashboardOpsDark, DashboardAnalyticsLight, DashboardFinanceLedger, Sparkline });
