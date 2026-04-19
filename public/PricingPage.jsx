// Grassfed pricing page
function PricingHero() {
  return (
    <section style={{ padding: '96px 32px 60px', textAlign: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>Pricing</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 600, letterSpacing: '-0.035em', lineHeight: 1, margin: '0 0 20px', textWrap: 'balance' }}>
          Pay for the<br/><span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>neighborhood,</span> not the seat.
        </h1>
        <p style={{ fontSize: 19, color: 'var(--fg-muted)', lineHeight: 1.5, margin: '0 auto', maxWidth: 620, textWrap: 'pretty' }}>
          One subscription to keep Grassfed watching your MLS. A per-campaign fee when your deal closes and the neighborhood gets notified.
        </p>
      </div>
    </section>
  );
}

function PricingTiers() {
  const tiers = [
    { name: 'Starter', sub: '250 nearest homes', emails: '~500 emails', mo: 150, camp: 175, recommended: false,
      bullets: ['MLS auto-trigger', 'Per-home personalization', 'Reply routing to inbox', '1 agent / 1 MLS ID'] },
    { name: 'Growth', sub: '500 nearest homes', emails: '~1,000 emails', mo: 250, camp: 275, recommended: true,
      bullets: ['Everything in Starter', 'A/B subject lines', 'Light-touch follow-up', 'Priority support'] },
    { name: 'Pro', sub: '1,000 nearest homes', emails: '~2,000 emails', mo: 525, camp: 550, recommended: false,
      bullets: ['Everything in Growth', 'Custom sender domain', 'Dedicated sending IP', 'Reply analytics'] },
  ];
  return (
    <section style={{ padding: '0 32px 100px' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
        {tiers.map((t, i) => (
          <div key={i} style={{
            background: t.recommended ? 'var(--dark)' : 'var(--bg-elevated)',
            color: t.recommended ? 'var(--dark-fg)' : 'var(--fg)',
            border: t.recommended ? '1px solid var(--dark)' : '1px solid var(--border)',
            borderRadius: 20, padding: 36, position: 'relative',
            boxShadow: t.recommended ? '0 32px 64px -20px hsla(155,60%,14%,.35)' : 'var(--shadow-sm)',
            transform: t.recommended ? 'translateY(-12px)' : 'none',
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
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 24 }}>
              {t.sub} · <span style={{ opacity: 0.6, fontSize: 14, fontFamily: 'var(--font-mono)', fontWeight: 500 }}>{t.emails}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 60, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1 }}>${t.mo}</span>
              <span style={{ fontSize: 14, opacity: 0.65 }}>/ month</span>
            </div>
            <div style={{ fontSize: 13, opacity: 0.7, fontFamily: 'var(--font-mono)', marginBottom: 24 }}>
              + ${t.camp} per campaign fired
            </div>
            <div style={{ height: 1, background: t.recommended ? 'hsla(155,40%,30%,.5)' : 'var(--border)', margin: '0 0 22px' }} />
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              {t.bullets.map(b => (
                <li key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                  <Icon.Check size={15} color="var(--accent)" /> {b}
                </li>
              ))}
            </ul>
            <a href="/#aha" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '14px 18px', borderRadius: 10,
              background: t.recommended ? 'var(--accent)' : 'var(--primary)',
              color: t.recommended ? 'var(--accent-fg)' : '#fff',
              fontWeight: 600, fontSize: 14, borderBottom: 'none',
            }}>
              Start with {t.name} <Icon.ArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1240, margin: '32px auto 0', textAlign: 'center', fontSize: 13, color: 'var(--fg-muted)' }}>
        Running a full brokerage? <a href="/farm">See Grassfed Farm →</a>
      </div>
    </section>
  );
}

function CampaignMath() {
  return (
    <section style={{ padding: '100px 32px', background: 'var(--dark)', color: 'var(--dark-fg)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="eyebrow" style={{ color: 'var(--accent)', marginBottom: 14 }}>The math</div>
        <h2 style={{ fontSize: 44, margin: '0 0 48px', color: 'var(--dark-fg)', letterSpacing: '-0.025em', lineHeight: 1.1, maxWidth: 720 }}>
          One Growth campaign versus a postcard run.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'hsla(155,55%,18%,.55)', border: '1px solid hsla(155,40%,30%,.5)', borderRadius: 18, padding: 32 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'hsl(155,20%,72%)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Postcards · 500 homes</div>
            <Row l="Print + postage" v="$0.85 / piece" />
            <Row l="Design / setup" v="$150" />
            <Row l="Delivery" v="7–12 days" />
            <Row l="Trackable replies" v="—" />
            <hr style={{ border: 0, borderTop: '1px solid hsla(155,40%,30%,.5)', margin: '18px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: 'hsl(155,20%,72%)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>$575</span>
            </div>
          </div>
          <div style={{ background: 'var(--grad-primary)', borderRadius: 18, padding: 32, color: 'var(--bg)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'hsla(245,240,228,0.85)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>Grassfed Growth · 1,000 emails</div>
            <Row l="Per-email cost" v="$0.04" dark />
            <Row l="Campaign fee" v="$275" dark />
            <Row l="Delivery" v="same day" dark />
            <Row l="Trackable replies" v="every one" dark />
            <hr style={{ border: 0, borderTop: '1px solid hsla(245,240,228,0.25)', margin: '18px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 13, color: 'hsla(245,240,228,0.85)' }}>Total</span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em' }}>$275</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ l, v, dark }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, padding: '8px 0' }}>
      <span style={{ color: dark ? 'hsla(245,240,228,0.85)' : 'hsl(155,20%,82%)' }}>{l}</span>
      <span style={{ fontFamily: 'var(--font-mono)', color: dark ? 'var(--bg)' : 'var(--dark-fg)' }}>{v}</span>
    </div>
  );
}

function FAQ() {
  const qs = [
    ['What if my MLS close doesn\'t trigger a campaign?', 'You\'re charged subscription only. Per-campaign fees only apply when a campaign is actually fired.'],
    ['Can I pause between closes?', 'Yes. Pause your subscription any month — we stop watching until you resume.'],
    ['Do you send from my email address?', 'Starter and Growth send from a Grassfed-managed domain with your name. Pro includes custom domain + dedicated IP.'],
    ['What counts as a campaign?', 'One MLS-close event = one campaign. Every campaign sends to the full nearest-N homes for your tier.'],
    ['What if I close multiple deals in a month?', 'Each one fires a campaign. We\'ll warn you if you hit unusual volume.'],
  ];
  return (
    <section style={{ padding: '100px 32px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 14 }}>FAQ</div>
        <h2 style={{ fontSize: 40, margin: '0 0 40px', letterSpacing: '-0.025em' }}>Common questions.</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {qs.map(([q, a]) => (
            <details key={q} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <summary style={{ fontSize: 17, fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between' }}>
                {q} <Icon.Plus size={18} color="var(--fg-muted)" />
              </summary>
              <p style={{ fontSize: 15, color: 'var(--fg-muted)', margin: '12px 0 0', lineHeight: 1.55, maxWidth: 620 }}>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

window.PricingHero = PricingHero;
window.PricingTiers = PricingTiers;
window.CampaignMath = CampaignMath;
window.FAQ = FAQ;
