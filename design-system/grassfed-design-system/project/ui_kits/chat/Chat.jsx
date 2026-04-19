// Chat product — faithful rebuild of Index.tsx flow
const { useState: useStateChat, useRef: useRefChat, useEffect: useEffectChat } = React;

const WELCOME_MESSAGE = "AI real estate data & cold email is here.\n\nSee how many emails are in your exact farm area.\n\nUse AI cold email to hit way more homeowners, way faster, for way less than what postcards cost.";

function ChatHeader() {
  return (
    <header style={{
      background: 'var(--dark)', color: 'var(--dark-fg)',
      padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      borderBottom: '1px solid hsla(155,40%,24%,.6)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <img src="../../assets/logos/trimmed/grsfd-ai-ondark.png" alt="grsfd.ai" style={{ height: 18,  }} />
        <div style={{ fontSize: 12, color: 'hsl(155,20%,72%)' }}>market intel</div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <span style={{ padding: '4px 10px', borderRadius: 9999, background: 'hsla(93,55%,42%,.18)', color: 'var(--accent)', fontSize: 11, fontWeight: 600 }}>3 free lookups</span>
      </div>
    </header>
  );
}

function WelcomeHero({ content }) {
  const lines = content.split('\n').filter(Boolean);
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
      borderRadius: 18, padding: 28, boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="eyebrow" style={{ marginBottom: 8 }}>Welcome</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 14 }}>
        {lines[0]}
      </div>
      {lines.slice(1).map((l, i) => (
        <p key={i} style={{ margin: '0 0 8px', fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.55 }}>{l}</p>
      ))}
    </div>
  );
}

function SuggestedChips({ onSelect }) {
  const chips = [
    '90046 West Hollywood',
    'Beverly Hills homeowners tenure 10y+',
    'Silver Lake single-family',
    'My zip: draw a polygon',
  ];
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {chips.map(c => (
        <button key={c} onClick={() => onSelect(c)} style={{
          background: 'var(--bg-elevated)', border: '1px solid var(--border)',
          color: 'var(--fg)', padding: '8px 14px', borderRadius: 9999,
          fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)',
        }}>{c}</button>
      ))}
    </div>
  );
}

function QueryFormCard({ onSubmit }) {
  const [zip, setZip] = useStateChat('');
  return (
    <div style={{
      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
      borderRadius: 14, padding: 20, boxShadow: 'var(--shadow-sm)',
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Find your farm</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={zip} onChange={e => setZip(e.target.value)} placeholder="Zip or city"
          style={{
            flex: 1, padding: '11px 14px', border: '1px solid var(--border)', borderRadius: 10,
            fontFamily: 'var(--font-body)', fontSize: 14, background: 'var(--bg)', color: 'var(--fg)',
          }} />
        <button onClick={() => zip && onSubmit(zip)} style={{
          background: 'var(--primary)', color: '#fff', border: 0, padding: '0 18px', borderRadius: 10,
          fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>Check <Icon.ArrowRight size={14} /></button>
      </div>
    </div>
  );
}

function EmailCaptureCard({ onSubmit }) {
  const [e, setE] = useStateChat('');
  const [n, setN] = useStateChat('');
  const [p, setP] = useStateChat('');
  return (
    <div style={{
      background: 'var(--dark)', color: 'var(--dark-fg)', borderRadius: 16, padding: 24,
      border: '1px solid hsla(155,40%,30%,.5)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon.Lock size={14} color="var(--accent)" />
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>Quick unlock</div>
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 6, color: 'var(--dark-fg)' }}>Before we show you the numbers</div>
      <div style={{ fontSize: 13, color: 'hsl(155,20%,78%)', marginBottom: 14 }}>Tell us who we're sending them to. No spam. Unsubscribe anytime.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
        <input value={n} onChange={ev => setN(ev.target.value)} placeholder="First name" style={darkInput} />
        <input value={p} onChange={ev => setP(ev.target.value)} placeholder="Phone (optional)" style={darkInput} />
      </div>
      <input value={e} onChange={ev => setE(ev.target.value)} placeholder="you@brokerage.com" style={{ ...darkInput, width: '100%', boxSizing: 'border-box', marginBottom: 10 }} />
      <button onClick={() => onSubmit(e, n, p)} style={{
        width: '100%', background: 'var(--accent)', color: 'var(--dark)', border: 0,
        padding: '12px 18px', borderRadius: 10, fontWeight: 700, fontSize: 14,
        cursor: 'pointer', fontFamily: 'var(--font-body)',
      }}>Show me the data →</button>
    </div>
  );
}
const darkInput = {
  background: 'hsla(155,55%,18%,.6)', border: '1px solid hsla(155,40%,30%,.5)',
  color: 'var(--dark-fg)', padding: '10px 12px', borderRadius: 8,
  fontFamily: 'var(--font-body)', fontSize: 14,
};

function ChatMessage({ role, content }) {
  const isUser = role === 'user';
  // Simple bold markdown rendering for **x**
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '85%',
        padding: '12px 16px',
        background: isUser ? 'var(--primary)' : 'var(--bg-elevated)',
        color: isUser ? '#fff' : 'var(--fg)',
        border: isUser ? 'none' : '1px solid var(--border)',
        boxShadow: isUser ? 'none' : 'var(--shadow-sm)',
        borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
        fontSize: 14, lineHeight: 1.55, whiteSpace: 'pre-wrap',
      }}>
        {parts.map((p, i) => p.startsWith('**')
          ? <b key={i} style={{ color: isUser ? '#fff' : 'var(--primary)' }}>{p.slice(2, -2)}</b>
          : <span key={i}>{p}</span>)}
      </div>
    </div>
  );
}

function TypingIndicator({ showStatus }) {
  return (
    <div style={{
      alignSelf: 'flex-start', padding: '10px 14px', background: 'var(--bg-elevated)',
      border: '1px solid var(--border)', borderRadius: 14, display: 'inline-flex', gap: 6, alignItems: 'center',
    }}>
      <span className="dot" /><span className="dot" /><span className="dot" />
      {showStatus && <span style={{ fontSize: 12, color: 'var(--fg-muted)', marginLeft: 6 }}>Pulling homeowner data…</span>}
      <style>{`.dot{width:6px;height:6px;border-radius:50%;background:var(--primary);display:inline-block;animation:bn 1.1s infinite ease-in-out}.dot:nth-child(2){animation-delay:.15s}.dot:nth-child(3){animation-delay:.3s}@keyframes bn{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>
    </div>
  );
}

function ChatInput({ onSend, disabled, disabledPlaceholder, remainingLookups }) {
  const [v, setV] = useStateChat('');
  const submit = () => { if (v && !disabled) { onSend(v); setV(''); } };
  return (
    <div style={{
      borderTop: '1px solid var(--border)', background: 'var(--bg-elevated)',
      padding: '14px 20px',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          value={v} onChange={e => setV(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder={disabled ? disabledPlaceholder : 'Message grsfd.ai…'}
          disabled={disabled}
          style={{
            flex: 1, padding: '12px 14px', borderRadius: 10,
            border: '1px solid var(--border)', background: 'var(--bg)',
            fontSize: 14, fontFamily: 'var(--font-body)', color: 'var(--fg)',
            opacity: disabled ? 0.6 : 1,
          }}
        />
        <button disabled={disabled} onClick={submit} style={{
          background: 'var(--primary)', color: '#fff', border: 0, padding: '12px 16px',
          borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1, fontFamily: 'var(--font-body)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}><Icon.Send size={14} /></button>
      </div>
      {remainingLookups !== null && remainingLookups !== undefined && (
        <div style={{ maxWidth: 760, margin: '6px auto 0', fontSize: 12, color: 'var(--fg-muted)', textAlign: 'right' }}>
          {remainingLookups} free lookup{remainingLookups === 1 ? '' : 's'} left
        </div>
      )}
    </div>
  );
}

function CTAWallCard() {
  return (
    <div style={{
      background: 'var(--grad-primary)', color: '#fff', borderRadius: 16, padding: 28, textAlign: 'center',
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 8 }}>
        You've used your free lookups.
      </div>
      <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 16 }}>Unlimited farms + actual sends start at $49/mo.</div>
      <button style={{
        background: '#fff', color: 'var(--primary)', border: 0, padding: '12px 22px',
        borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'var(--font-body)',
      }}>See pricing →</button>
    </div>
  );
}

function ChatApp() {
  const [messages, setMessages] = useStateChat([{ role: 'assistant', content: WELCOME_MESSAGE }]);
  const [showEmail, setShowEmail] = useStateChat(false);
  const [userEmail, setUserEmail] = useStateChat(null);
  const [showForm, setShowForm] = useStateChat(true);
  const [chatsUsed, setChatsUsed] = useStateChat(0);
  const [limitReached, setLimitReached] = useStateChat(false);
  const [loading, setLoading] = useStateChat(false);

  const fakeResponse = (q) => `**~4,050 homeowner emails** in 90046 · West Hollywood.\n\n- Single-family: 2,120\n- Owner-occupied 5y+: 1,630\n- Recent refi activity: 412\n\nThat's a **12×** lift over a typical postcard send.\n\nWant me to draft a cold email sequence for this farm?`;

  const send = (content) => {
    const isFirst = chatsUsed === 0 && !userEmail;
    setShowForm(false);
    setMessages(m => [...m, { role: 'user', content }]);
    if (isFirst) setShowEmail(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!isFirst) {
        setMessages(m => [...m, { role: 'assistant', content: fakeResponse(content) }]);
      }
      setChatsUsed(c => {
        const n = c + 1;
        if (!isFirst && n >= 3) setLimitReached(true);
        return n;
      });
    }, 900);
  };

  const submitEmail = (e, n, p) => {
    setUserEmail(e); setShowEmail(false);
    setMessages(m => [...m, { role: 'assistant', content: fakeResponse() }]);
  };

  const remaining = userEmail && !limitReached ? 3 - chatsUsed : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg)' }} className="noise-overlay">
      <ChatHeader />
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m, i) =>
            i === 0 && m.role === 'assistant'
              ? <WelcomeHero key={i} content={m.content} />
              : <ChatMessage key={i} role={m.role} content={m.content} />
          )}
          {loading && <TypingIndicator showStatus />}
          {showForm && messages.length === 1 && !loading && (
            <>
              <SuggestedChips onSelect={send} />
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              <QueryFormCard onSubmit={send} />
            </>
          )}
          {showEmail && <EmailCaptureCard onSubmit={submitEmail} />}
          {limitReached && <CTAWallCard />}
        </div>
      </div>
      <ChatInput
        onSend={send}
        disabled={loading || showEmail || limitReached || showForm}
        disabledPlaceholder={limitReached ? "You've used your free lookups" : showEmail ? 'Enter your email above to continue' : showForm ? 'Fill out the form above to get started' : undefined}
        remainingLookups={remaining}
      />
    </div>
  );
}

window.ChatApp = ChatApp;
