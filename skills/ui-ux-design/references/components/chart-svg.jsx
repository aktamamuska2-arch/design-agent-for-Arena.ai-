// when_to_use: data visualization, charts, graphs, analytics, dashboard charts
// Provides: LineChart, BarChart, DonutChart, Sparkline

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#6366f1",
  "accent2": "#10b981",
  "bg": "#ffffff",
  "text": "#1a1a1a",
  "grid": "#e5e5e5"
}/*EDITMODE-END*/;

const MONO = "'JetBrains Mono', monospace";
const SANS = "'Plus Jakarta Sans', system-ui, sans-serif";

function LineChart({ data = [
  { label: 'Jan', value: 30 }, { label: 'Feb', value: 45 }, { label: 'Mar', value: 35 },
  { label: 'Apr', value: 55 }, { label: 'May', value: 48 }, { label: 'Jun', value: 62 },
  { label: 'Jul', value: 58 }, { label: 'Aug', value: 72 }, { label: 'Sep', value: 68 },
], width = 400, height = 200, accent = "#6366f1" }) {
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * w,
    y: padding.top + h - ((d.value - min) / range) * h,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + h} L ${points[0].x} ${padding.top + h} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ fontFamily: SANS }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.15" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = padding.top + h * (1 - pct);
        const val = Math.round(min + range * pct);
        return (
          <g key={pct}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--grid, #e5e5e5)" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text, #1a1a1a)" fontFamily={MONO}>{val}</text>
          </g>
        );
      })}
      <path d={areaPath} fill="url(#areaGrad)" />
      <path d={linePath} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={accent} />
      ))}
      {data.map((d, i) => (
        <text key={i} x={points[i].x} y={height - 8} textAnchor="middle" fontSize="10" fill="var(--text, #1a1a1a)">{d.label}</text>
      ))}
    </svg>
  );
}

function BarChart({ data = [
  { label: 'Mon', value: 42 }, { label: 'Tue', value: 58 }, { label: 'Wed', value: 35 },
  { label: 'Thu', value: 72 }, { label: 'Fri', value: 64 }, { label: 'Sat', value: 28 },
  { label: 'Sun', value: 18 },
], width = 400, height = 200, accent = "#6366f1" }) {
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const w = width - padding.left - padding.right;
  const h = height - padding.top - padding.bottom;
  const max = Math.max(...data.map(d => d.value));
  const barWidth = (w / data.length) * 0.6;
  const gap = (w / data.length) * 0.4;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ fontFamily: SANS }}>
      {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
        const y = padding.top + h * (1 - pct);
        return (
          <g key={pct}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--grid, #e5e5e5)" strokeWidth="1" />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text, #1a1a1a)" fontFamily={MONO}>{Math.round(max * pct)}</text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const barH = (d.value / max) * h;
        const x = padding.left + i * (barWidth + gap) + gap / 2;
        const y = padding.top + h - barH;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={barH} rx="3" fill={accent} opacity="0.85" />
            <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" fontSize="10" fill="var(--text, #1a1a1a)">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

function DonutChart({ data = [
  { label: 'Direct', value: 42, color: '#6366f1' },
  { label: 'Organic', value: 28, color: '#10b981' },
  { label: 'Referral', value: 18, color: '#f59e0b' },
  { label: 'Social', value: 12, color: '#06b6d4' },
], size = 200, strokeWidth = 24 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ fontFamily: SANS }}>
      {data.map((d, i) => {
        const pct = d.value / total;
        const dashLen = pct * circumference;
        const dashOffset = -cumulative * circumference;
        cumulative += pct;
        return (
          <circle key={i}
            cx={size / 2} cy={size / 2} r={radius}
            fill="none" stroke={d.color} strokeWidth={strokeWidth}
            strokeDasharray={`${dashLen} ${circumference - dashLen}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        );
      })}
      <text x={size / 2} y={size / 2 - 8} textAnchor="middle" fontSize="24" fontWeight="700" fill="var(--text, #1a1a1a)" fontFamily={MONO}>{total}%</text>
      <text x={size / 2} y={size / 2 + 14} textAnchor="middle" fontSize="10" fill="var(--text, #1a1a1a)">Total</text>
    </svg>
  );
}

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

Object.assign(window, { LineChart, BarChart, DonutChart, Sparkline });
