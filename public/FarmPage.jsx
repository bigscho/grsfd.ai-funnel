// Grassfed Farm page — sales-led funnel
// Path: hero → zip opt-in (get property counts) → how it's different → proof → book call

function FarmHero({ onStart }) {
  return (
    <section style={{ padding: '96px 32px 40px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 9999,
          background: 'var(--dark)', color: 'var(--accent)',
          fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: 28,
        }}>
          <img src="/assets/logos/trimmed/grsfd-farm-ondark.png" style={{ height: 14, width: 'auto' }} />
          For brokerages & top teams
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 88, fontWeight: 600,
          letterSpacing: '-0.035em', lineHeight: 1, margin: '0 0 28px',
          color: 'var(--fg)', textWrap: 'balance',
        }}>
          A whole territory.<br/>
          <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Always on.</span>
        </h1>
        <p style={{
          fontSize: 21, lineHeight: 1.45, color: 'var(--fg-muted)',
          margin: '0 auto 40px', maxWidth: 680, textWrap: 'pretty',
        }}>
          Grassfed Farm is circle prospecting at brokerage scale. Multiple zips, multiple agents,
          one always-on outbound engine — tied to everyone's MLS activity.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button onClick={onStart} style={{
            background: 'var(--primary)', color: '#fff', border: 0,
            padding: '14px 22px', borderRadius: 10, fontWeight: 600, fontSize: 15,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            Send me property counts <Icon.ArrowRight size={16} />
          </button>
          <a href="#how-farm" style={{
            background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border-strong)',
            padding: '14px 22px', borderRadius: 10, fontWeight: 500, fontSize: 15,
            fontFamily: 'var(--font-body)',
            display: 'inline-flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border-strong)',
          }}>
            <Icon.Play size={14} /> How it's different
          </a>
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-subtle)', marginTop: 14 }}>
          Drop your zips. We'll email you the property counts within the hour.
        </div>
      </div>
    </section>
  );
}

function FarmZipOptIn() {
  const [step, setStep] = React.useState('form');
  const [zips, setZips] = React.useState(['']);
  const [email, setEmail] = React.useState('');
  const [brokerage, setBrokerage] = React.useState('');

  const updateZip = (idx, val) => {
    const next = [...zips];
    next[idx] = val.replace(/[^0-9]/g, '').slice(0, 5);
    if (idx === zips.length - 1 && val.length >= 5 && zips.length < 8) next.push('');
    setZips(next);
  };
  const removeZip = (idx) => {
    if (zips.length === 1) { setZips(['']); return; }
    setZips(zips.filter((_, i) => i !== idx));
  };

  const go = (e) => {
    e.preventDefault();
    if (!email || !zips.some(z => z.length === 5)) return;
    setStep('loading');
    setTimeout(() => setStep('result'), 1400);
  };

  return (
    <section id="farm-opt-in" style={{ padding: '80px 32px 120px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          background: 'var(--bg-elevated)', borderRadius: 28,
          border: '1px solid var(--border)', overflow: 'hidden',
          boxShadow: '0 32px 80px -30px hsla(168,60%,14%,.18), 0 4px 12px hsla(168,40%,15%,.04)',
          display: 'grid', gridTemplateColumns: '1.1fr 1fr',
        }}>
          <div style={{ padding: '56px 52px 52px' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Free property count</div>
            <h2 style={{ fontSize: 40, lineHeight: 1.05, margin: '0 0 18px', letterSpacing: '-0.025em' }}>
              Every address<br/>in your territory,<br/>counted.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-muted)', margin: '0 0 32px', lineHeight: 1.5, maxWidth: 440 }}>
              Drop the zips you farm. We'll pull the verified homeowner count for each, email you the breakdown, and walk you through it on a 20-minute call.
            </p>

            {step === 'form' && <FarmForm {...{ zips, updateZip, removeZip, email, setEmail, brokerage, setBrokerage, go }} />}
            {step === 'loading' && <FarmLoading />}
            {step === 'result' && <FarmResult {...{ zips, email }} />}
          </div>
          <FarmVisual step={step} zips={zips} />
        </div>
      </div>
    </section>
  );
}

function FarmForm({ zips, updateZip, removeZip, email, setEmail, brokerage, setBrokerage, go }) {
  const input = {
    width: '100%', padding: '13px 15px', borderRadius: 10,
    border: '1px solid var(--border-strong)', background: 'var(--bg)',
    fontSize: 15, fontFamily: 'var(--font-body)', color: 'var(--fg)', outline: 'none',
  };
  const label = { fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: 6 };
  return (
    <form onSubmit={go} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={label}>Zips you want counts for</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {zips.map((z, i) => (
            <div key={i} style={{ display: 'flex', gap: 6 }}>
              <input value={z} onChange={e => updateZip(i, e.target.value)} placeholder="90046"
                style={{ ...input, fontFamily: 'var(--font-mono)' }} />
              {zips.length > 1 && (
                <button type="button" onClick={() => removeZip(i)} style={{
                  background: 'transparent', border: '1px solid var(--border-strong)', borderRadius: 10,
                  width: 44, cursor: 'pointer', color: 'var(--fg-muted)',
                }}>
                  <Icon.X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--fg-subtle)', marginTop: 6 }}>
          Up to 8. Type a zip, another field appears.
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={label}>Work email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@brokerage.com" style={input} />
        </div>
        <div>
          <label style={label}>Brokerage</label>
          <input value={brokerage} onChange={e => setBrokerage(e.target.value)} placeholder="Sunset Realty" style={input} />
        </div>
      </div>
      <button type="submit" style={{
        background: 'var(--primary)', color: '#fff', border: 0,
        padding: '15px 22px', borderRadius: 10, fontWeight: 600, fontSize: 15,
        cursor: 'pointer', fontFamily: 'var(--font-body)',
        display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: 8,
        marginTop: 6,
      }}>
        Send me the counts <Icon.ArrowRight size={16} />
      </button>
      <div style={{ fontSize: 11, color: 'var(--fg-subtle)', textAlign: 'center' }}>
        We'll also send a calendar link — no obligation to book.
      </div>
    </form>
  );
}

function FarmLoading() {
  const lines = ['Validating zip codes…', 'Pulling parcel records…', 'Matching homeowner emails…', 'Drafting your territory report…'];
  return (
    <div style={{
      padding: '28px 24px', borderRadius: 14,
      background: 'var(--dark)', color: 'var(--dark-fg)',
      fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.7,
    }}>
      {lines.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: i < 3 ? 1 : 0.5 }}>
          <span style={{ color: i < 3 ? 'var(--accent)' : 'hsl(155,20%,60%)' }}>{i < 3 ? '✓' : '·'}</span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

function FarmResult({ zips, email }) {
  const validZips = zips.filter(z => z.length === 5);
  const totals = validZips.map(z => ({
    zip: z,
    homes: Math.floor(1200 + Math.random() * 3800),
  }));
  const grand = totals.reduce((a, b) => a + b.homes, 0);

  return (
    <div>
      <div style={{
        background: 'var(--dark)', color: 'var(--dark-fg)',
        borderRadius: 14, padding: '22px 24px',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(155,20%,72%)', marginBottom: 8 }}>
          Verified homeowner emails across your territory
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--accent)' }}>
            {grand.toLocaleString()}
          </span>
          <span style={{ fontSize: 13, color: 'hsl(155,20%,78%)' }}>across {validZips.length} zip{validZips.length !== 1 ? 's' : ''}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 12, color: 'hsl(155,20%,85%)' }}>
          {totals.map(t => (
            <div key={t.zip} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{t.zip}</span>
              <span style={{ color: 'var(--accent)' }}>{t.homes.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        padding: '16px 18px', borderRadius: 12,
        background: 'hsla(93,55%,42%,.08)', border: '1px solid hsla(93,55%,42%,.28)',
        display: 'flex', gap: 14, alignItems: 'flex-start',
      }}>
        <Icon.Inbox size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Report sent to {email || 'your inbox'}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 12, lineHeight: 1.45 }}>
            We've also included a calendar link. Book a 20-min call and we'll walk you through how Farm would run across these zips.
          </div>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 14px', borderRadius: 8,
            background: 'var(--primary)', color: '#fff',
            fontSize: 13, fontWeight: 600, borderBottom: 'none',
          }}>
            <Icon.Calendar size={13} /> Book the 20-min walkthrough
          </a>
        </div>
      </div>
    </div>
  );
}

function FarmVisual({ step, zips }) {
  const validCount = zips.filter(z => z.length === 5).length;
  return (
    <div style={{
      background: 'var(--dark)', color: 'var(--dark-fg)',
      padding: 36, position: 'relative', overflow: 'hidden',
      minHeight: 560,
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'hsl(155,20%,72%)', letterSpacing: '0.08em', textTransform: 'uppercase',
        marginBottom: 24,
      }}>
        ~/territory · grsfd farm
      </div>
      {/* Stacked zip tiles */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {zips.slice(0, 6).map((z, i) => {
          const active = z.length === 5;
          return (
            <div key={i} style={{
              padding: '14px 18px', borderRadius: 12,
              background: active ? 'hsla(93,55%,42%,.15)' : 'hsla(155,40%,24%,.5)',
              border: `1px solid ${active ? 'hsla(93,55%,42%,.4)' : 'hsla(155,40%,30%,.4)'}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'all 200ms',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 8, height: 8, borderRadius: 4,
                  background: active ? 'var(--accent)' : 'hsl(155,20%,50%)',
                  boxShadow: active ? '0 0 12px hsla(93,60%,48%,.6)' : 'none',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, color: active ? 'var(--dark-fg)' : 'hsl(155,20%,60%)' }}>
                  {active ? z : 'zip ——'}
                </span>
              </div>
              {active && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)' }}>
                  {step === 'result' ? `~${(Math.floor(1200 + Math.random() * 3800)).toLocaleString()}` : 'pending…'}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div style={{
        position: 'absolute', bottom: 24, left: 36, right: 36,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'hsl(155,20%,72%)',
        paddingTop: 16, borderTop: '1px solid hsla(155,40%,30%,.5)',
      }}>
        <span>{validCount} / 8 zips entered</span>
        <span>{step === 'result' ? 'report ready →' : 'live preview'}</span>
      </div>
    </div>
  );
}

function FarmHowItWorks() {
  const items = [
    { n: '01', t: 'Every agent, one MLS link', p: 'Each agent connects their MLS ID once. You manage territory, they keep closing deals.' },
    { n: '02', t: 'Zips, not zip', p: 'Farm runs across your full territory — 3, 5, 8 zip codes at once. Always-on.' },
    { n: '03', t: 'One close fires the whole neighborhood', p: 'When any agent closes, the surrounding homes get the email. No manual trigger, no per-agent setup.' },
    { n: '04', t: 'Team dashboard', p: 'You see every send, every reply, every booked tour. Routing rules assign leads to the right agent.' },
  ];
  return (
    <section id="how-farm" style={{ padding: '120px 32px', background: 'var(--dark)', color: 'var(--dark-fg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 64, maxWidth: 760 }}>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 12 }}>How Farm is different</div>
          <h2 style={{ fontSize: 52, margin: 0, color: 'var(--dark-fg)', letterSpacing: '-0.03em', lineHeight: 1.02 }}>
            Grassfed, multiplied by your team.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {items.map((s, i) => (
            <div key={i} style={{
              background: 'hsla(155,55%,18%,.55)', border: '1px solid hsla(155,40%,30%,.5)',
              borderRadius: 18, padding: '28px 32px',
              display: 'flex', gap: 24, alignItems: 'flex-start',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)',
                letterSpacing: '0.1em', flexShrink: 0, paddingTop: 4,
              }}>{s.n}</span>
              <div>
                <h3 style={{ fontSize: 22, margin: '0 0 8px', color: 'var(--dark-fg)', lineHeight: 1.25 }}>{s.t}</h3>
                <p style={{ color: 'hsl(155,20%,82%)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmProof() {
  const stats = [
    { n: '38,204', l: 'sends last week' },
    { n: '41%', l: 'avg open rate' },
    { n: '2.4%', l: 'reply rate' },
    { n: '$0.04', l: 'cost per send' },
  ];
  return (
    <section style={{ padding: '96px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          background: 'var(--bg-elevated)', borderRadius: 20,
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
          overflow: 'hidden',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '36px 32px',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--fg)', marginBottom: 6, lineHeight: 1 }}>
                {s.n}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmCTA() {
  return (
    <section style={{ padding: '40px 32px 120px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          background: 'var(--grad-primary)', borderRadius: 24,
          padding: '72px 56px', textAlign: 'center',
          boxShadow: '0 24px 64px -20px hsla(155,60%,14%,.35)',
          position: 'relative', overflow: 'hidden',
        }}>
          <h2 style={{ fontSize: 48, margin: '0 0 14px', color: 'var(--bg)', letterSpacing: '-0.025em', lineHeight: 1.05, textWrap: 'balance' }}>
            Ready to farm your whole territory?
          </h2>
          <p style={{ fontSize: 17, color: 'hsla(245,240,228,0.85)', margin: '0 auto 32px', maxWidth: 560, lineHeight: 1.5 }}>
            Drop your zips, we'll send you the property count, and we'll show you what always-on looks like.
          </p>
          <a href="#farm-opt-in" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '14px 24px', borderRadius: 10,
            background: 'var(--bg)', color: 'var(--fg)',
            fontWeight: 600, fontSize: 15, borderBottom: 'none',
          }}>
            Send me my property counts <Icon.ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

window.FarmHero = FarmHero;
window.FarmZipOptIn = FarmZipOptIn;
window.FarmHowItWorks = FarmHowItWorks;
window.FarmProof = FarmProof;
window.FarmCTA = FarmCTA;
