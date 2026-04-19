// Grassfed main marketing page — PLG funnel
// Single path: hero → live MLS opt-in (aha moment) → how it works → pricing → footer
const { useState, useRef, useEffect } = React;

// ===== shared UI =====
const buttonPrimary = {
  background: 'var(--primary)', color: '#fff', border: 0,
  padding: '14px 22px', borderRadius: 10, fontWeight: 600, fontSize: 15,
  cursor: 'pointer', fontFamily: 'var(--font-body)',
  display: 'inline-flex', alignItems: 'center', gap: 8,
  transition: 'background 120ms ease',
};
const buttonGhost = {
  background: 'transparent', color: 'var(--fg)', border: '1px solid var(--border-strong)',
  padding: '14px 22px', borderRadius: 10, fontWeight: 500, fontSize: 15,
  cursor: 'pointer', fontFamily: 'var(--font-body)',
  display: 'inline-flex', alignItems: 'center', gap: 8,
};

// ===== navbar =====
function Nav() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(246,245,241,0.88)',
      borderBottom: '1px solid var(--border)',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <a href="/" style={{ borderBottom: 'none', display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logos/trimmed/grsfd-ai.png" alt="grsfd.ai" style={{ height: 22, width: 'auto', display: 'block' }} />
          </a>
          <nav style={{ display: 'flex', gap: 28 }}>
            <a href="#how" style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 500, opacity: 0.75, borderBottom: 'none' }}>How it works</a>
            <a href="/pricing" style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 500, opacity: 0.75, borderBottom: 'none' }}>Pricing</a>
            <a href="/farm" style={{ color: 'var(--fg)', fontSize: 14, fontWeight: 500, opacity: 0.75, borderBottom: 'none' }}>For brokerages</a>
          </nav>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#" style={{ color: 'var(--fg)', fontSize: 14, opacity: 0.75, borderBottom: 'none' }}>Sign in</a>
          <a href="#aha" style={{ ...buttonPrimary, padding: '9px 16px', fontSize: 13, borderBottom: 'none', color: '#fff' }}>
            Get started <Icon.ArrowRight size={14} />
          </a>
        </div>
      </div>
    </header>
  );
}

// ===== hero =====
function Hero({ onStart }) {
  return (
    <section style={{ padding: '96px 32px 40px', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', borderRadius: 9999,
          background: 'hsla(93,55%,42%,.18)', color: 'var(--primary)',
          fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: 28,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }} />
          Circle prospecting, on autopilot
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 88, fontWeight: 600,
          letterSpacing: '-0.035em', lineHeight: 1, margin: '0 0 28px',
          color: 'var(--fg)', textWrap: 'balance',
        }}>
          You close a deal.<br/>
          The neighborhood<br/>
          <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>hears about it.</span>
        </h1>
        <p style={{
          fontSize: 21, lineHeight: 1.45, color: 'var(--fg-muted)',
          margin: '0 auto 40px', maxWidth: 640, textWrap: 'pretty',
        }}>
          Grassfed watches your MLS. The moment a listing closes, we fire a hyper-local
          email campaign to the 250, 500, or 1,000 nearest homeowners. You do nothing.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 12 }}>
          <button style={buttonPrimary} onClick={onStart}>
            See your neighborhood count <Icon.ArrowRight size={16} />
          </button>
          <a href="#how" style={{ ...buttonGhost, borderBottom: 'none' }}>
            <Icon.Play size={14} /> How it works
          </a>
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-subtle)', marginTop: 14 }}>
          No credit card. 60 seconds. MLS ID is all you need.
        </div>
      </div>
    </section>
  );
}

// ===== Aha moment: MLS ID + example address opt-in =====
function MlsAha() {
  const [step, setStep] = useState('form'); // form → counting → result
  const [mlsId, setMlsId] = useState('');
  const [address, setAddress] = useState('');
  const [radius, setRadius] = useState(500);

  const go = (e) => {
    e?.preventDefault();
    if (!mlsId || !address) return;
    setStep('counting');
    setTimeout(() => setStep('result'), 1600);
  };

  return (
    <section id="aha" style={{
      padding: '80px 32px 96px', background: 'var(--bg)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          background: 'var(--bg-elevated)', borderRadius: 28,
          border: '1px solid var(--border)', overflow: 'hidden',
          boxShadow: '0 32px 80px -30px hsla(168,60%,14%,.18), 0 4px 12px hsla(168,40%,15%,.04)',
          display: 'grid', gridTemplateColumns: '1.05fr 1fr',
        }}>
          {/* left: form */}
          <div style={{ padding: '56px 52px 52px' }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Try it — 30 seconds</div>
            <h2 style={{ fontSize: 40, lineHeight: 1.05, margin: '0 0 18px', letterSpacing: '-0.025em' }}>
              How many neighbors<br/>would hear about your<br/>last closing?
            </h2>
            <p style={{ fontSize: 15, color: 'var(--fg-muted)', margin: '0 0 32px', lineHeight: 1.5, maxWidth: 420 }}>
              Drop your MLS ID and one address we can use as a center point.
              We'll pull the nearest homeowners and show you the real number — no signup required.
            </p>

            {step === 'form' && <AhaForm {...{mlsId, setMlsId, address, setAddress, radius, setRadius, go}} />}
            {step === 'counting' && <AhaCounting />}
            {step === 'result' && <AhaResult {...{mlsId, address, radius}} />}

            <div style={{
              marginTop: 28, display: 'flex', gap: 20, alignItems: 'center',
              fontSize: 12, color: 'var(--fg-subtle)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon.Check size={12} color="var(--accent)" /> Real MLS data
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon.Check size={12} color="var(--accent)" /> Verified homeowner emails
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon.Check size={12} color="var(--accent)" /> Zero spam risk
              </span>
            </div>
          </div>

          {/* right: proof visual */}
          <AhaVisual step={step} radius={radius} />
        </div>
      </div>
    </section>
  );
}

function AhaForm({ mlsId, setMlsId, address, setAddress, radius, setRadius, go }) {
  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: 10,
    border: '1px solid var(--border-strong)', background: 'var(--bg)',
    fontSize: 15, fontFamily: 'var(--font-body)', color: 'var(--fg)',
    outline: 'none', transition: 'border-color 120ms',
  };
  return (
    <form onSubmit={go} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: 6 }}>
          Your MLS ID
        </label>
        <input value={mlsId} onChange={e => setMlsId(e.target.value)} placeholder="e.g. CALA-2947213"
          style={inputStyle} />
      </div>
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: 6 }}>
          Example address — we'll use this as center
        </label>
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="1234 Sunset Blvd, Los Angeles, CA"
          style={inputStyle} />
      </div>
      <div>
        <label style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-muted)', display: 'block', marginBottom: 10 }}>
          Radius
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[250, 500, 1000].map(r => (
            <button key={r} type="button" onClick={() => setRadius(r)}
              style={{
                padding: '12px 10px', borderRadius: 10, cursor: 'pointer',
                border: '1px solid ' + (radius === r ? 'var(--primary)' : 'var(--border-strong)'),
                background: radius === r ? 'hsla(155,68%,28%,.08)' : 'var(--bg)',
                color: radius === r ? 'var(--primary)' : 'var(--fg)',
                fontWeight: radius === r ? 600 : 500, fontSize: 14,
                fontFamily: 'var(--font-body)', textAlign: 'center',
              }}>
              <div>{r} nearest</div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2, fontWeight: 500 }}>~{r * 2} emails</div>
            </button>
          ))}
        </div>
      </div>
      <button type="submit" style={{ ...buttonPrimary, justifyContent: 'center', marginTop: 10, padding: '15px 22px' }}>
        Run my neighborhood count <Icon.ArrowRight size={16} />
      </button>
    </form>
  );
}

function AhaCounting() {
  const steps = [
    'Validating MLS ID…',
    'Geocoding example address…',
    'Pulling nearest homeowners…',
    'Matching verified emails…',
  ];
  return (
    <div style={{
      padding: '28px 24px', borderRadius: 14,
      background: 'var(--dark)', color: 'var(--dark-fg)',
      fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.7,
    }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: i < 3 ? 1 : 0.5 }}>
          <span style={{ color: i < 3 ? 'var(--accent)' : 'hsl(155,20%,60%)' }}>
            {i < 3 ? '✓' : '·'}
          </span>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}

function AhaResult({ mlsId, address, radius }) {
  const count = { 250: 507, 500: 1034, 1000: 2082 }[radius];
  return (
    <div>
      <div style={{
        background: 'var(--dark)', color: 'var(--dark-fg)',
        borderRadius: 14, padding: '24px 26px',
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 18,
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'hsl(155,20%,72%)', marginBottom: 6 }}>
            Verified homeowner emails
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--accent)' }}>
            {count.toLocaleString()}
          </div>
          <div style={{ fontSize: 13, color: 'hsl(155,20%,78%)', marginTop: 8 }}>
            within {radius} nearest homes of {address || 'your center point'}
          </div>
        </div>
        <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'hsl(155,20%,60%)', textAlign: 'right' }}>
          MLS · {mlsId || '—'}<br/>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* two paths */}
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12 }}>
        What next →
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{
          padding: '16px 16px', borderRadius: 12,
          border: '1px solid var(--primary)',
          background: 'hsla(155,68%,28%,.06)',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute', top: 10, right: 10,
            background: 'var(--accent)', color: 'var(--accent-fg)',
            fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: 9999,
          }}>Promo</div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Sign up now</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 12, lineHeight: 1.4 }}>
            First campaign $99. We fire it the next time your MLS shows a close.
          </div>
          <a href="/unlock" style={{ ...buttonPrimary, padding: '9px 14px', fontSize: 13, borderBottom: 'none', color: '#fff', width: '100%', justifyContent: 'center' }}>
            Claim promo →
          </a>
        </div>
        <div style={{
          padding: '16px 16px', borderRadius: 12,
          border: '1px solid var(--border-strong)',
          background: 'var(--bg)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Book a 15-min call</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 12, lineHeight: 1.4 }}>
            Show up and walk away with the full neighbor list — free.
          </div>
          <a href="/unlock" style={{ ...buttonGhost, padding: '9px 14px', fontSize: 13, borderBottom: 'none', width: '100%', justifyContent: 'center' }}>
            Pick a time →
          </a>
        </div>
      </div>
    </div>
  );
}

function AhaVisual({ step, radius }) {
  // Build a grid of parcels with a center-out radius reveal
  const cols = 11, rows = 13;
  const cx = (cols - 1) / 2, cy = (rows - 1) / 2;
  const parcels = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const d = Math.sqrt((c - cx) ** 2 + (r - cy) ** 2);
      parcels.push({ r, c, d });
    }
  }
  const maxD = { 250: 3.2, 500: 4.5, 1000: 6.2 }[radius];
  const showAll = step !== 'form';

  return (
    <div style={{
      background: 'var(--dark)', color: 'var(--dark-fg)',
      padding: 36, position: 'relative', overflow: 'hidden',
    }}>
      {/* corner label */}
      <div style={{
        position: 'absolute', top: 24, left: 24, zIndex: 2,
        fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'hsl(155,20%,72%)', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        ~/neighborhood · live
      </div>
      <div style={{
        position: 'absolute', top: 24, right: 24, zIndex: 2,
        background: 'hsla(93,55%,42%,.2)', color: 'var(--accent)',
        padding: '4px 10px', borderRadius: 9999,
        fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
      }}>
        {radius} nearest
      </div>

      <div style={{
        position: 'absolute', inset: 0, display: 'grid',
        placeItems: 'center',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 34px)`,
          gridTemplateRows: `repeat(${rows}, 34px)`,
          gap: 5,
        }}>
          {parcels.map((p, i) => {
            const inRadius = p.d <= maxD;
            const show = showAll && inRadius;
            const isCenter = p.r === Math.floor(cy) && p.c === Math.floor(cx);
            return (
              <div key={i} style={{
                width: 34, height: 34, borderRadius: 4,
                background: isCenter
                  ? 'var(--accent)'
                  : show
                  ? 'hsla(93,55%,42%,.85)'
                  : 'hsla(155,40%,24%,.6)',
                boxShadow: isCenter ? '0 0 0 3px hsla(93,55%,42%,.4), 0 0 20px hsla(93,60%,48%,.5)' : 'none',
                transition: `background 400ms ease ${i * 3}ms`,
                outline: isCenter ? '2px solid var(--accent)' : 'none',
                outlineOffset: 2,
              }} />
            );
          })}
        </div>
      </div>

      {/* bottom legend */}
      <div style={{
        position: 'absolute', bottom: 24, left: 24, right: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        fontFamily: 'var(--font-mono)', fontSize: 11, color: 'hsl(155,20%,78%)',
      }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: 'var(--accent)', borderRadius: 2 }} /> your listing
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, background: 'hsla(93,55%,42%,.85)', borderRadius: 2 }} /> will receive
          </span>
        </div>
      </div>
    </div>
  );
}

window.Nav = Nav;
window.Hero = Hero;
window.MlsAha = MlsAha;
