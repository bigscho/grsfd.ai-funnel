// Lower sections for Grassfed home page — How it works, pricing snapshot, footer
const { useState: useStateLower } = React;

function HowItWorks() {
  const steps = [
    { n: '01', t: 'Connect your MLS', p: 'One MLS ID. We watch it. That\'s the whole setup.', icon: 'Key' },
    { n: '02', t: 'Close a deal', p: 'Listing sale, buyer purchase — doesn\'t matter. We see the event in minutes.', icon: 'Sparkles' },
    { n: '03', t: 'Neighborhood gets the email', p: 'We pull the 250/500/1,000 nearest homeowners and fire a hyper-local campaign the same day.', icon: 'Send' },
    { n: '04', t: 'Replies route to you', p: 'Interested neighbors reply straight to your inbox. You already know what to do next.', icon: 'Inbox' },
  ];
  return (
    <section id="how" style={{ padding: '120px 32px', background: 'var(--dark)', color: 'var(--dark-fg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ marginBottom: 64, maxWidth: 760 }}>
          <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 12 }}>How Grassfed works</div>
          <h2 style={{ fontSize: 52, margin: 0, color: 'var(--dark-fg)', letterSpacing: '-0.03em', lineHeight: 1.02, textWrap: 'balance' }}>
            Four steps. One of them is yours.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              background: 'hsla(155,55%,18%,.55)',
              border: '1px solid hsla(155,40%,30%,.5)',
              borderRadius: 18, padding: 28,
              display: 'flex', flexDirection: 'column', gap: 14, minHeight: 240,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.1em' }}>{s.n}</span>
                {(() => { const IconComp = Icon[s.icon]; return IconComp ? <IconComp size={18} color="hsl(155,30%,55%)" /> : null; })()}
              </div>
              <h3 style={{ fontSize: 20, margin: '12px 0 6px', color: 'var(--dark-fg)', lineHeight: 1.2 }}>{s.t}</h3>
              <p style={{ color: 'hsl(155,20%,78%)', fontSize: 14, lineHeight: 1.55, margin: 0 }}>{s.p}</p>
              {i === 1 && (
                <div style={{
                  marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 11,
                  color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--accent)' }} />
                  you
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSnapshot() {
  const tiers = [
    { name: 'Starter', sub: '250 nearest', emails: '~500 emails / campaign', mo: 150, camp: 175, recommended: false },
    { name: 'Growth', sub: '500 nearest', emails: '~1,000 emails / campaign', mo: 250, camp: 275, recommended: true },
    { name: 'Pro', sub: '1,000 nearest', emails: '~2,000 emails / campaign', mo: 525, camp: 550, recommended: false },
  ];
  return (
    <section style={{ padding: '120px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
          <div style={{ maxWidth: 640 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Pricing</div>
            <h2 style={{ fontSize: 48, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Subscription + per-campaign.<br/>No retainer, no seats, no BS.
            </h2>
          </div>
          <a href="Pricing.html" style={{ fontSize: 14, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Full pricing details <Icon.ArrowRight size={14} />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              background: t.recommended ? 'var(--dark)' : 'var(--bg-elevated)',
              color: t.recommended ? 'var(--dark-fg)' : 'var(--fg)',
              border: t.recommended ? '1px solid var(--dark)' : '1px solid var(--border)',
              borderRadius: 20, padding: 32, position: 'relative',
              boxShadow: t.recommended ? '0 20px 48px -16px hsla(155,60%,14%,.35)' : 'var(--shadow-sm)',
            }}>
              {t.recommended && (
                <div style={{
                  position: 'absolute', top: 20, right: 20,
                  background: 'var(--accent)', color: 'var(--accent-fg)',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 9999,
                }}>Most popular</div>
              )}
              <div style={{ fontSize: 14, fontWeight: 600, opacity: 0.7, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 24 }}>{t.sub}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>${t.mo}</span>
                <span style={{ fontSize: 14, opacity: 0.65 }}>/mo</span>
              </div>
              <div style={{
                fontSize: 13, opacity: 0.65, fontFamily: 'var(--font-mono)',
                marginBottom: 24,
              }}>
                + ${t.camp} per campaign
              </div>
              <div style={{ height: 1, background: t.recommended ? 'hsla(155,40%,30%,.5)' : 'var(--border)', margin: '0 0 20px' }} />
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <Icon.Check size={14} color="var(--accent)" /> {t.emails}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <Icon.Check size={14} color="var(--accent)" /> Auto-triggered by MLS close
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <Icon.Check size={14} color="var(--accent)" /> Replies routed to your inbox
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <Icon.Check size={14} color="var(--accent)" /> Per-home personalization
                </li>
              </ul>
              <a href="#aha" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 18px', borderRadius: 10,
                background: t.recommended ? 'var(--accent)' : 'var(--primary)',
                color: t.recommended ? 'var(--accent-fg)' : '#fff',
                fontWeight: 600, fontSize: 14, borderBottom: 'none',
              }}>
                Start with {t.name} <Icon.ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FarmCallout() {
  return (
    <section style={{ padding: '80px 32px 120px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <div style={{
          background: 'var(--grad-primary)',
          borderRadius: 24, padding: '56px 56px',
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 48, alignItems: 'center',
          position: 'relative', overflow: 'hidden',
          boxShadow: '0 24px 64px -20px hsla(155,60%,14%,.35)',
        }}>
          <div>
            <div style={{
              display: 'inline-block', padding: '5px 12px',
              background: 'hsla(245,240,228,0.15)', borderRadius: 9999,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--bg)', marginBottom: 18,
            }}>For brokerages</div>
            <h2 style={{ fontSize: 44, margin: '0 0 14px', color: 'var(--bg)', letterSpacing: '-0.025em', lineHeight: 1.05 }}>
              Running a whole territory? Meet Grassfed Farm.
            </h2>
            <p style={{ fontSize: 16, color: 'hsla(245,240,228,0.8)', margin: '0 0 28px', lineHeight: 1.5, maxWidth: 520 }}>
              Multiple agents, multiple zips, always-on. Drop your zips, we'll send the property counts and walk you through it on a call.
            </p>
            <a href="Grassfed Farm.html" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '13px 20px', borderRadius: 10,
              background: 'var(--bg)', color: 'var(--fg)',
              fontWeight: 600, fontSize: 14, borderBottom: 'none',
            }}>
              See Grassfed Farm <Icon.ArrowRight size={14} />
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <img src="../../assets/logos/trimmed/grsfd-farm-ondark.png" alt="grsfd farm"
              style={{ height: 48, width: 'auto', opacity: 0.95 }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', color: 'var(--dark-fg)', padding: '60px 32px 32px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <img src="../../assets/logos/trimmed/grsfd-ai-ondark.png" alt="grsfd.ai" style={{ height: 24, width: 'auto', marginBottom: 16 }} />
          <p style={{ fontSize: 14, color: 'hsl(155,20%,72%)', lineHeight: 1.5, margin: 0, maxWidth: 340 }}>
            Circle prospecting, on autopilot. We watch your MLS and email the neighborhood the moment you close.
          </p>
        </div>
        {[
          ['Product', ['Grassfed', 'Grassfed Farm', 'Pricing', 'Changelog']],
          ['Company', ['About', 'Customers', 'Contact']],
          ['Legal', ['Privacy', 'Terms', 'CAN-SPAM']],
        ].map(([h, items]) => (
          <div key={h}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>{h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {items.map(i => <a key={i} href="#" style={{ color: 'hsl(155,20%,88%)', fontSize: 14, borderBottom: 'none' }}>{i}</a>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1240, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid hsla(155,40%,30%,.5)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'hsl(155,20%,60%)' }}>
        <span>© 2026 Grassfed, Inc.</span>
        <span style={{ fontFamily: 'var(--font-mono)' }}>grown, not mailed.</span>
      </div>
    </footer>
  );
}

window.HowItWorks = HowItWorks;
window.PricingSnapshot = PricingSnapshot;
window.FarmCallout = FarmCallout;
window.Footer = Footer;
