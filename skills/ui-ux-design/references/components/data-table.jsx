// when_to_use: data table, admin table, sortable table, filterable list, admin dashboard
// Provides: DataTable

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#ffffff",
  "text": "#1a1a1a",
  "muted": "#6b6b6b"
}/*EDITMODE-END*/;

const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";
const MONO = "'JetBrains Mono', monospace";

function DataTable() {
  const [sort, setSort] = React.useState({ key: 'name', dir: 'asc' });
  const [filter, setFilter] = React.useState('');
  const [selected, setSelected] = React.useState(new Set());
  const [page, setPage] = React.useState(0);
  const perPage = 8;

  const data = React.useMemo(() => {
    const rows = [
      { id: 1, name: 'Aurora Analytics', status: 'active', plan: 'Pro', revenue: '$14,200', users: 847, updated: '2026-04-24' },
      { id: 2, name: 'Bolt Commerce', status: 'active', plan: 'Enterprise', revenue: '$48,000', users: 2341, updated: '2026-04-23' },
      { id: 3, name: 'CloudSync Pro', status: 'trial', plan: 'Starter', revenue: '$0', users: 12, updated: '2026-04-22' },
      { id: 4, name: 'DataPulse AI', status: 'active', plan: 'Pro', revenue: '$23,700', users: 1204, updated: '2026-04-21' },
      { id: 5, name: 'EcoTrack Dashboard', status: 'inactive', plan: 'Starter', revenue: '$0', users: 3, updated: '2026-04-15' },
      { id: 6, name: 'FinLedger', status: 'active', plan: 'Enterprise', revenue: '$67,400', users: 4521, updated: '2026-04-24' },
      { id: 7, name: 'GridOps Monitor', status: 'active', plan: 'Pro', revenue: '$18,900', users: 923, updated: '2026-04-20' },
      { id: 8, name: 'HealthSync Portal', status: 'trial', plan: 'Pro', revenue: '$0', users: 45, updated: '2026-04-19' },
      { id: 9, name: 'InsightFlow', status: 'active', plan: 'Enterprise', revenue: '$91,200', users: 6780, updated: '2026-04-24' },
      { id: 10, name: 'JetStream CDN', status: 'active', plan: 'Pro', revenue: '$32,100', users: 1890, updated: '2026-04-22' },
      { id: 11, name: 'KubeOps Platform', status: 'active', plan: 'Enterprise', revenue: '$54,800', users: 3210, updated: '2026-04-23' },
      { id: 12, name: 'LogVault', status: 'inactive', plan: 'Starter', revenue: '$0', users: 8, updated: '2026-04-10' },
    ];
    let filtered = rows.filter(r => r.name.toLowerCase().includes(filter.toLowerCase()));
    filtered.sort((a, b) => {
      const aVal = a[sort.key];
      const bVal = b[sort.key];
      if (typeof aVal === 'number') return sort.dir === 'asc' ? aVal - bVal : bVal - aVal;
      return sort.dir === 'asc' ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
    });
    return filtered;
  }, [sort, filter]);

  const totalPages = Math.ceil(data.length / perPage);
  const pageData = data.slice(page * perPage, (page + 1) * perPage);

  const toggleSort = (key) => setSort(s => ({ key, dir: s.key === key && s.dir === 'asc' ? 'desc' : 'asc' }));
  const toggleSelect = (id) => setSelected(s => { const next = new Set(s); next.has(id) ? next.delete(id) : next.add(id); return next; });
  const toggleAll = () => setSelected(s => s.size === pageData.length ? new Set() : new Set(pageData.map(r => r.id)));

  const statusColor = { active: '#10b981', trial: '#f59e0b', inactive: '#6b6b6b' };

  return (
    <div style={{ background: 'var(--bg, #fff)', color: 'var(--text, #1a1a1a)', fontFamily: SANS, minHeight: '100vh', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Projects</h1>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted, #6b6b6b)' }}>{data.length} total</span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          {selected.size > 0 && (
            <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: 'oklch(93% 0.03 265)', color: 'var(--accent, #6366f1)' }}>{selected.size} selected</span>
          )}
          <input value={filter} onChange={(e) => { setFilter(e.target.value); setPage(0); }} placeholder="Search projects..." style={{ border: '1px solid #e5e5e5', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', fontSize: '0.875rem', width: '200px' }} />
        </div>
      </div>
      <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e5e5e5', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
              <th style={{ padding: '0.75rem 1rem', width: '40px' }}><input type="checkbox" checked={selected.size === pageData.length && pageData.length > 0} onChange={toggleAll} /></th>
              {[
                { key: 'name', label: 'Name' },
                { key: 'status', label: 'Status' },
                { key: 'plan', label: 'Plan' },
                { key: 'revenue', label: 'Revenue' },
                { key: 'users', label: 'Users' },
                { key: 'updated', label: 'Updated' },
              ].map((col) => (
                <th key={col.key} onClick={() => toggleSort(col.key)} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--muted, #6b6b6b)', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.label} {sort.key === col.key ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #f5f5f5', background: selected.has(row.id) ? 'oklch(97% 0.01 265)' : 'transparent' }}>
                <td style={{ padding: '0.75rem 1rem' }}><input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleSelect(row.id)} /></td>
                <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{row.name}</td>
                <td style={{ padding: '0.75rem 1rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.125rem 0.5rem', borderRadius: '999px', background: `${statusColor[row.status]}15`, color: statusColor[row.status] }}>{row.status}</span>
                </td>
                <td style={{ padding: '0.75rem 1rem' }}>{row.plan}</td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: MONO, fontVariantNumeric: 'tabular-nums' }}>{row.revenue}</td>
                <td style={{ padding: '0.75rem 1rem', fontFamily: MONO, fontVariantNumeric: 'tabular-nums' }}>{row.users.toLocaleString()}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--muted, #6b6b6b)' }}>{row.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i)} style={{
              width: '32px', height: '32px', borderRadius: '0.375rem',
              border: 'none', fontSize: '0.75rem', fontWeight: 600,
              background: page === i ? 'var(--accent, #6366f1)' : 'transparent',
              color: page === i ? '#fff' : 'var(--muted, #6b6b6b)',
              cursor: 'pointer',
            }}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DataTable });
