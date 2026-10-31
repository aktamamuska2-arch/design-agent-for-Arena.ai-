// when_to_use: calendar, month view, event calendar, scheduling, date picker
// Provides: Calendar

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "bg": "#ffffff",
  "text": "#1a1a1a",
  "muted": "#6b6b6b"
}/*EDITMODE-END*/;

const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function Calendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 3, 1));
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [hoveredEvent, setHoveredEvent] = React.useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const events = [
    { date: 3, title: 'Team Standup', color: '#6366f1' },
    { date: 7, title: 'Design Review', color: '#10b981' },
    { date: 10, title: 'Sprint Planning', color: '#f59e0b' },
    { date: 14, title: 'Product Launch', color: '#ef4444' },
    { date: 14, title: 'Press Release', color: '#8b5cf6' },
    { date: 18, title: 'Client Meeting', color: '#06b6d4' },
    { date: 21, title: 'Hackathon', color: '#6366f1' },
    { date: 25, title: 'Quarterly Review', color: '#f59e0b' },
    { date: 28, title: 'Team Outing', color: '#10b981' },
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => setCurrentDate(new Date());

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const selectedEvents = selectedDate ? events.filter(e => e.date === selectedDate) : [];

  return (
    <div style={{ background: 'var(--bg, #fff)', color: 'var(--text, #1a1a1a)', fontFamily: SANS, minHeight: '100vh', padding: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{monthName}</h1>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={prevMonth} style={{ background: 'transparent', border: '1px solid #e5e5e5', borderRadius: '0.375rem', padding: '0.375rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>← Prev</button>
          <button onClick={goToday} style={{ background: 'var(--accent, #6366f1)', color: '#fff', border: 'none', borderRadius: '0.375rem', padding: '0.375rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 }}>Today</button>
          <button onClick={nextMonth} style={{ background: 'transparent', border: '1px solid #e5e5e5', borderRadius: '0.375rem', padding: '0.375rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>Next →</button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '1px', background: '#f0f0f0', borderRadius: '0.75rem', overflow: 'hidden' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted, #6b6b6b)', background: '#fff', fontWeight: 600 }}>{d}</div>
            ))}
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} style={{ background: '#fff', minHeight: '80px' }} />;
              const dayEvents = events.filter(e => e.date === day);
              const isToday = day === 26 && month === 3 && year === 2026;
              const isSelected = day === selectedDate;
              return (
                <div key={day} onClick={() => setSelectedDate(day)} style={{
                  background: isSelected ? 'oklch(93% 0.03 265)' : '#fff',
                  minHeight: '80px',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  border: isSelected ? '2px solid var(--accent, #6366f1)' : 'none',
                }}>
                  <span style={{
                    fontSize: '0.75rem', fontWeight: isToday ? 700 : 400,
                    width: '24px', height: '24px', display: 'inline-flex',
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%',
                    background: isToday ? 'var(--accent, #6366f1)' : 'transparent',
                    color: isToday ? '#fff' : 'var(--text, #1a1a1a)',
                  }}>{day}</span>
                  <div style={{ marginTop: '0.25rem' }}>
                    {dayEvents.slice(0, 2).map((evt, j) => (
                      <div key={j} onMouseEnter={() => setHoveredEvent(evt)} onMouseLeave={() => setHoveredEvent(null)} style={{
                        fontSize: '0.625rem', padding: '0.125rem 0.25rem', borderRadius: '0.25rem',
                        background: `${evt.color}15`, color: evt.color,
                        marginBottom: '0.125rem',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      }}>{evt.title}</div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span style={{ fontSize: '0.625rem', color: 'var(--muted, #6b6b6b)' }}>+{dayEvents.length - 2} more</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ background: '#fff', borderRadius: '0.75rem', border: '1px solid #e5e5e5', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, margin: '0 0 1rem' }}>
            {selectedDate ? `April ${selectedDate}, 2026` : 'Select a date'}
          </h3>
          {selectedEvents.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {selectedEvents.map((evt, i) => (
                <div key={i} style={{ padding: '0.75rem', borderRadius: '0.5rem', background: `${evt.color}08`, borderLeft: `3px solid ${evt.color}` }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>{evt.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted, #6b6b6b)', marginTop: '0.25rem' }}>All day event</div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.875rem', color: 'var(--muted, #6b6b6b)' }}>No events scheduled</p>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Calendar });
