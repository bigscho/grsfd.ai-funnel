// grsfd farm — large-scale territory product
const { useState: useStateFarm } = React;

function FarmShell({ children, active = 'territories' }) {
  const nav = [
    { id: 'territories', icon: 'Layers', label: 'Territories' },
    { id: 'sequences', icon: 'Send', label: 'Sequences' },
    { id: 'inbox', icon: 'Inbox', label: 'Replies' },
    { id: 'team', icon: 'Users', label: 'Team' },
    { id: 'schedule', icon: 'Calendar', label: 'Schedule' },
    { id: 'analytics', icon: 'TrendingUp', label: 'Analytics' },
    { id: 'settings', icon: 'Settings', label: 'Settings' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', background: 'var(--bg)' }}>
      <aside style={{ background: 'var(--dark)', color: 'var(--dark-fg)', padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ padding: '6px 8px 18px' }}>
          <img src="../../assets/logos/trimmed/grsfd-farm-ondark.png" alt="grsfd farm" style={{ height: 20, width: 'auto' }} />
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'hsl(155,20%,60%)', textTransform: 'uppercase', padding: '10px 10px 6px' }}>Workspace</div>
        {nav.map(n => {
          const I = Icon[n.icon];
          const on = n.id === active;
          return (
            <div key={n.id} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
              background: on ? 'hsla(93,55%,42%,.15)' : 'transparent',
              color: on ? 'var(--accent)' : 'hsl(155,20%,82%)',
              fontSize: 13.5, fontWeight: on ? 600 : 500,
            }}>
              <I size={16} /> {n.label}
            </div>
          );
        })}
        <div style={{ marginTop: 'auto', padding: 12, background: 'hsla(155,55%,18%,.6)', borderRadius: 10, fontSize: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--dark)', fontWeight: 700 }}>RW</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-fg)' }}>Rodeo Walsh Group</div>
              <div style={{ fontSize: 11, color: 'hsl(155,20%,72%)' }}>Team · 14 seats</div>
            </div>
          </div>
        </div>
      </aside>
      <main style={{ padding: '24px 32px', overflow: 'auto' }}>{children}</main>
    </div>
  );
}

function FarmTopbar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--fg-muted)', marginBottom: 6 }}>
          <span>Workspace</span> <Icon.ChevronRight size={12} /> <span>Territories</span> <Icon.ChevronRight size={12} /> <span style={{ color: 'var(--fg)' }}>West LA region</span>
        </div>
        <h1 style={{ fontSize: 32, margin: 0 }}>West LA region</h1>
        <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 13, color: 'var(--fg-muted)' }}>
          <span>14 territories</span><span>·</span><span>~62,400 homeowners</span><span>·</span><span>3 active sequences</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button style={{
          background: 'transparent', border: '1px solid var(--border)', color: 'var(--fg)',
          padding: '10px 14px', borderRadius: 10, fontWeight: 500, fontSize: 13, cursor: 'pointer',
          fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: 6,
        }}><Icon.Users size={14} /> Invite</button>
        <button style={{
          background: 'var(--primary)', color: '#fff', border: 0, padding: '10px 16px',
          borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer',
          fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: 6,
        }}><Icon.Plus size={14} /> Add territory</button>
      </div>
    </div>
  );
}

function VolumeDashboard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14, marginBottom: 20 }}>
      <div style={{ background: 'var(--dark)', color: 'var(--dark-fg)', borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: 10 }}>Sends this week</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>38,204</div>
            <div style={{ fontSize: 13, color: 'hsl(155,20%,78%)', marginTop: 6 }}>of 120,000 weekly cap · <span style={{ color: 'var(--accent)' }}>↑ 14% vs last week</span></div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {['7d', '30d', 'QTD'].map((t, i) => (
              <button key={t} style={{
                background: i === 0 ? 'hsla(93,55%,42%,.2)' : 'transparent',
                color: i === 0 ? 'var(--accent)' : 'hsl(155,20%,82%)',
                border: '1px solid ' + (i === 0 ? 'transparent' : 'hsla(155,40%,30%,.5)'),
                padding: '5px 11px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}>{t}</button>
            ))}
          </div>
        </div>
        <BarChartSVG />
      </div>
      <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 14 }}>
        <StatTile k="Reply rate" v="4.2%" d="178 replies this week" accent />
        <StatTile k="Booked calls" v="23" d="up from 16 last week" />
      </div>
    </div>
  );
}

function StatTile({ k, v, d, accent }) {
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{k}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 38, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--fg)', marginTop: 6 }}>{v}</div>
      <div style={{ fontSize: 12, color: accent ? 'var(--accent)' : 'var(--fg-muted)', fontWeight: accent ? 600 : 500, marginTop: 2 }}>{d}</div>
    </div>
  );
}

function BarChartSVG() {
  const bars = [0.35, 0.5, 0.42, 0.68, 0.82, 0.74, 0.9];
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <div style={{ marginTop: 28, height: 110, display: 'flex', gap: 8, alignItems: 'flex-end' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: '100%', height: h * 92, borderRadius: '4px 4px 0 0',
            background: i === bars.length - 1 ? 'var(--accent)' : 'hsla(93,55%,42%,.55)',
          }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'hsl(155,20%,72%)' }}>{days[i]}</div>
        </div>
      ))}
    </div>
  );
}

function TerritoryTable() {
  const rows = [
    { name: 'Beverly Hills 90210', zip: '90210', owners: 2847, rate: 41.2, status: 'Active', seq: 'Luxury tenure-10y' },
    { name: 'West Hollywood 90046', zip: '90046', owners: 4050, rate: 38.7, status: 'Active', seq: 'SFH owner-occ' },
    { name: 'Silver Lake 90026', zip: '90026', owners: 6122, rate: 36.4, status: 'Active', seq: 'SFH owner-occ' },
    { name: 'Atwater Village 90039', zip: '90039', owners: 3411, rate: 39.1, status: 'Paused', seq: 'SFH owner-occ' },
    { name: 'Los Feliz 90027', zip: '90027', owners: 5204, rate: 0, status: 'Draft', seq: '—' },
    { name: 'Echo Park 90026', zip: '90026', owners: 4819, rate: 34.8, status: 'Active', seq: 'SFH owner-occ' },
  ];
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr 1fr 40px',
        padding: '12px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--fg-muted)', borderBottom: '1px solid var(--border)', background: 'var(--muted)',
      }}>
        <span>Territory</span><span>Homeowners</span><span>Open rate</span><span>Sequence</span><span>Status</span><span/>
      </div>
      {rows.map((r, i) => {
        const statusStyle = r.status === 'Active'
          ? { bg: 'hsla(145,65%,38%,.12)', fg: 'var(--success)' }
          : r.status === 'Paused'
          ? { bg: 'hsla(38,92%,50%,.15)', fg: '#b77a00' }
          : { bg: 'var(--muted)', fg: 'var(--fg-muted)' };
        return (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.4fr 1fr 40px',
            padding: '14px 20px', fontSize: 14,
            borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
            alignItems: 'center',
          }}>
            <div>
              <div style={{ fontWeight: 500, color: 'var(--fg)' }}>{r.name}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{r.zip}</div>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg)' }}>{r.owners.toLocaleString()}</span>
            <span style={{ fontFamily: 'var(--font-mono)', color: r.rate > 0 ? 'var(--accent)' : 'var(--fg-muted)', fontWeight: 600 }}>
              {r.rate > 0 ? r.rate + '%' : '—'}
            </span>
            <span style={{ color: r.seq === '—' ? 'var(--fg-muted)' : 'var(--fg)', fontSize: 13 }}>{r.seq}</span>
            <span style={{
              justifySelf: 'flex-start',
              padding: '3px 10px', borderRadius: 9999,
              background: statusStyle.bg, color: statusStyle.fg,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>{r.status}</span>
            <div style={{ color: 'var(--fg-muted)', cursor: 'pointer' }}><Icon.ChevronRight size={16} /></div>
          </div>
        );
      })}
    </div>
  );
}

function TeamRoster() {
  const members = [
    { i: 'CM', n: 'Casey Martinez', r: 'Owner', ter: 6, c: 'var(--primary)' },
    { i: 'DK', n: 'Dev Kapoor', r: 'Admin', ter: 4, c: '#4a7a9c' },
    { i: 'PL', n: 'Priya Lee', r: 'Agent', ter: 3, c: '#b77a00' },
    { i: 'JS', n: 'Jordan Silver', r: 'Agent', ter: 1, c: '#8a5a9c' },
  ];
  return (
    <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 14, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 600 }}>Team · 4 of 14 seats</div>
        <a href="#" style={{ fontSize: 12, fontWeight: 600 }}>Manage →</a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {members.map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: m.c, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{m.i}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)' }}>{m.n}</div>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{m.r} · {m.ter} territories</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.FarmShell = FarmShell;
window.FarmTopbar = FarmTopbar;
window.VolumeDashboard = VolumeDashboard;
window.TerritoryTable = TerritoryTable;
window.TeamRoster = TeamRoster;
