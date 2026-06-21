import { useState } from "react";

const C = {
  navy:      "#0D1B2A",
  navyMid:   "#1B2E45",
  navyLight: "#243B55",
  gold:      "#C9A84C",
  goldDim:   "#8A6E2F",
  white:     "#FFFFFF",
  offWhite:  "#F4F1EA",
  muted:     "#8A9BAD",
  mutedDark: "#4A5A6A",
  accent:    "#2E6FA3",
  green:     "#2E8B57",
  red:       "#C62828",
  border:    "#1E3A55",
};

const DRIVERS = [
  { id: 1, code: "D1", name: "Discover",  weeks: "1–2",   color: C.gold,   desc: "Who are you. What your data reveals." },
  { id: 2, code: "D2", name: "Diagnose",  weeks: "3–4",   color: C.accent, desc: "What is causing your current results." },
  { id: 3, code: "D3", name: "Discuss",   weeks: "5–6",   color: "#9C27B0", desc: "The honest conversation. Truth and decisions." },
  { id: 4, code: "D4", name: "Design",    weeks: "7–9",   color: C.green,  desc: "Reimagine and architect the new you." },
  { id: 5, code: "D5", name: "Deliver",   weeks: "10–12", color: C.red,    desc: "Execute, embody and express the reimagined person." },
];

const WEEKS = [
  { id:1,  driver:1, title:"Who Are You?",                  phase:"D1 Discover · Part One",    videos:1, scorecard:50,  progress:100, locked:false },
  { id:2,  driver:1, title:"Your Patterns & Energy",        phase:"D1 Discover · Part Two",    videos:1, scorecard:50,  progress:60,  locked:false },
  { id:3,  driver:2, title:"Name the Friction",             phase:"D2 Diagnose · Part One",    videos:1, scorecard:60,  progress:0,   locked:false },
  { id:4,  driver:2, title:"Root Cause & Strength",         phase:"D2 Diagnose · Part Two",    videos:1, scorecard:60,  progress:0,   locked:true  },
  { id:5,  driver:3, title:"Time, Tasks & Priorities",      phase:"D3 Discuss · Part One",     videos:1, scorecard:50,  progress:0,   locked:true  },
  { id:6,  driver:3, title:"People, Process & the 4S",      phase:"D3 Discuss · Part Two",     videos:1, scorecard:50,  progress:0,   locked:true  },
  { id:7,  driver:4, title:"Structure & Standards",         phase:"D4 Design · Part One",      videos:3, scorecard:120, progress:0,   locked:true  },
  { id:8,  driver:4, title:"Systems & Simplicity",          phase:"D4 Design · Part Two",      videos:2, scorecard:60,  progress:0,   locked:true  },
  { id:9,  driver:4, title:"Your Complete Operating System",phase:"D4 Design · Integration",   videos:1, scorecard:50,  progress:0,   locked:true  },
  { id:10, driver:5, title:"Embody",                        phase:"D5 Deliver · Part One",     videos:1, scorecard:50,  progress:0,   locked:true  },
  { id:11, driver:5, title:"Execute & Evaluate",            phase:"D5 Deliver · Part Two",     videos:1, scorecard:100, progress:0,   locked:true  },
  { id:12, driver:5, title:"Evolve & Final Integration",    phase:"D5 Deliver · The New You",  videos:1, scorecard:200, progress:0,   locked:true  },
];

const IPHIL_QUESTIONS = [
  { section:"Your Archetype", questions:[
    "How would you describe yourself in three words — not your job title, but who you actually are?",
    "What do people who know you best say about you when you leave the room?",
    "What gives you energy so naturally that time disappears?",
    "What drains you so consistently that you find yourself avoiding it?",
    "When are you at your absolute best — what conditions bring out the highest version of you?",
  ]},
  { section:"Your Definition of Success", questions:[
    "What does success look like for you — specifically, not generally?",
    "What would your daily life look like if you achieved everything you are working toward?",
    "Who in your life represents the kind of success you want — and what do you admire about them?",
    "What would tell you — beyond any doubt — that you have made it?",
  ]},
  { section:"Your Current Reality", questions:[
    "On a scale of 1–10, where are you right now in life overall?",
    "What is working well that you want to protect and build on?",
    "What is clearly not working — the things you know need to change?",
    "What have you been tolerating that is beneath your standard?",
    "What is the one thing that, if changed, would have the greatest positive impact on everything else?",
  ]},
  { section:"Your Challenges & Patterns", questions:[
    "What challenge keeps returning — the one you thought you had resolved but keeps coming back?",
    "Where do you consistently self-sabotage, even when you know better?",
    "What story do you tell yourself that keeps you from the next level?",
    "What are you most afraid of — honestly?",
  ]},
  { section:"Your Goals for This Programme", questions:[
    "What do you want to have changed by the end of 12 weeks — specifically?",
    "What does the reimagined version of you look like, think like, and act like?",
    "What would make this programme worth every penny and every hour?",
    "Who needs the reimagined you to show up — family, team, community, yourself?",
    "What is your commitment to this process?",
  ]},
];

// ─── COMPONENTS ──────────────────────────────────────────

function Logo({ size = 22 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:9 }}>
      <div style={{ width:size+6, height:size+6, borderRadius:5, border:`1.5px solid ${C.gold}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:size*0.5, color:C.gold, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>C1</span>
      </div>
      <div>
        <div style={{ fontSize:size*0.68, fontWeight:"bold", color:C.white, fontFamily:"Arial,sans-serif", letterSpacing:2, lineHeight:1.1 }}>CODE1</div>
        <div style={{ fontSize:size*0.42, color:C.gold, fontFamily:"Arial,sans-serif", letterSpacing:1 }}>ME REIMAGINED</div>
      </div>
    </div>
  );
}

function ProgressRing({ pct, size=52, stroke=4, color=C.gold }) {
  const r=(size-stroke)/2, circ=2*Math.PI*r, dash=(pct/100)*circ;
  return (
    <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.border} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition:"stroke-dasharray 0.5s ease" }}/>
    </svg>
  );
}

function Bar({ pct, color=C.gold, h=4 }) {
  return <div style={{ background:C.border, borderRadius:99, height:h, overflow:"hidden" }}>
    <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:99, transition:"width 0.4s ease" }}/>
  </div>;
}

function Tag({ text, color=C.gold }) {
  return <span style={{ fontSize:9, fontWeight:"bold", letterSpacing:1.5, fontFamily:"Arial,sans-serif", color, background:`${color}22`, border:`1px solid ${color}44`, padding:"2px 7px", borderRadius:3 }}>{text}</span>;
}

// ─── LANDING PAGE ─────────────────────────────────────────
function Landing({ onEnrol, onLogin }) {
  return (
    <div style={{ background:C.navy, minHeight:"100vh", color:C.white, fontFamily:"Georgia,serif" }}>
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 28px", borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:10, background:C.navy }}>
        <Logo size={20}/>
        <div style={{ display:"flex", gap:12 }}>
          <button onClick={onLogin} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, padding:"8px 18px", borderRadius:4, cursor:"pointer", fontSize:13, fontFamily:"Arial,sans-serif" }}>Sign In</button>
          <button onClick={onEnrol} style={{ background:C.gold, border:"none", color:C.navy, padding:"8px 20px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>Start Now</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"64px 28px 48px", textAlign:"center" }}>
        <div style={{ fontSize:11, letterSpacing:4, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:20 }}>CODE1  ·  12-WEEK PERSONAL TRANSFORMATION</div>
        <h1 style={{ fontSize:"clamp(44px,9vw,88px)", fontWeight:"normal", margin:"0 0 8px", lineHeight:1.0 }}>
          Me<br/><span style={{ color:C.gold }}>Reimagined.</span>
        </h1>
        <div style={{ fontSize:20, color:C.muted, fontFamily:"Arial,sans-serif", marginTop:16, fontStyle:"italic" }}>And we love it.</div>
        <p style={{ fontSize:17, color:C.muted, lineHeight:1.7, margin:"24px auto 36px", maxWidth:540, fontFamily:"Arial,sans-serif" }}>
          A 12-week programme built on iPhilosophy, the 5D Drivers, and HI-AI augmentation.
          First design the human. Then upgrade the performance.
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={onEnrol} style={{ background:C.gold, border:"none", color:C.navy, padding:"14px 36px", borderRadius:4, cursor:"pointer", fontSize:15, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>Begin Your Transformation →</button>
          <button onClick={onLogin} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, padding:"14px 22px", borderRadius:4, cursor:"pointer", fontSize:14, fontFamily:"Arial,sans-serif" }}>Already enrolled?</button>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:28, justifyContent:"center", marginTop:52, flexWrap:"wrap" }}>
          {[["12","Weeks"],["5","Drivers"],["28","Videos"],["14","Scorecards"]].map(([v,l]) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontSize:36, color:C.gold, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>{v}</div>
              <div style={{ fontSize:10, color:C.muted, letterSpacing:2, fontFamily:"Arial,sans-serif" }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Three layers */}
      <div style={{ maxWidth:860, margin:"0 auto", padding:"0 28px 48px" }}>
        <div style={{ fontSize:10, letterSpacing:3, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:20, textAlign:"center" }}>THE THREE LAYERS</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))", gap:14 }}>
          {[
            { label:"iPhilosophy", subtitle:"The Foundation", desc:"A deep intake that surfaces your archetype, your definition of success, your patterns and your current reality. The personalised foundation for everything that follows.", color:C.gold },
            { label:"The 5D Drivers", subtitle:"The Methodology", desc:"Five sequential drivers — Discover, Diagnose, Discuss, Design, Deliver — each with video, training, scorecard and AI prompts. The personal antidote.", color:C.accent },
            { label:"HI-AI Augmentation", subtitle:"The Thread", desc:"Human Intelligence leads at every stage. AI supports, accelerates and reflects. The right prompt at the right moment to help you go deeper.", color:C.green },
          ].map((l,i) => (
            <div key={i} style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderTop:`3px solid ${l.color}`, borderRadius:4, padding:"18px 20px 22px" }}>
              <div style={{ fontSize:10, letterSpacing:2.5, color:l.color, fontFamily:"Arial,sans-serif", marginBottom:4 }}>{l.subtitle.toUpperCase()}</div>
              <div style={{ fontSize:18, color:C.white, marginBottom:10 }}>{l.label}</div>
              <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6 }}>{l.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 5D Drivers */}
      <div style={{ background:C.navyMid, borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, padding:"40px 28px" }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>
          <div style={{ fontSize:10, letterSpacing:3, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:20, textAlign:"center" }}>THE 5D DRIVERS</div>
          <div style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
            {DRIVERS.map((d,i) => (
              <div key={i} style={{ flex:1, minWidth:120, padding:"16px 12px", borderLeft:`3px solid ${d.color}`, marginLeft:i>0?8:0, background:"#0D1B2A", borderRadius:4 }}>
                <div style={{ fontSize:10, color:d.color, fontFamily:"Arial,sans-serif", fontWeight:"bold", letterSpacing:1 }}>{d.code}  ·  Weeks {d.weeks}</div>
                <div style={{ fontSize:16, color:C.white, marginTop:4, marginBottom:6 }}>{d.name}</div>
                <div style={{ fontSize:11, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.5 }}>{d.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ maxWidth:680, margin:"0 auto", padding:"56px 28px" }}>
        <div style={{ fontSize:10, letterSpacing:3, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:24, textAlign:"center" }}>INVESTMENT</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          <div style={{ background:C.gold, borderRadius:4, padding:"24px 22px" }}>
            <div style={{ fontSize:11, letterSpacing:2, color:C.navy, fontFamily:"Arial,sans-serif", marginBottom:8, fontWeight:"bold" }}>PAY IN FULL</div>
            <div style={{ fontSize:44, fontWeight:"bold", color:C.navy, fontFamily:"Arial,sans-serif" }}>$497</div>
            <div style={{ fontSize:13, color:C.navy, fontFamily:"Arial,sans-serif", marginTop:4, marginBottom:16 }}>One payment · Best value</div>
            <button onClick={onEnrol} style={{ background:C.navy, border:"none", color:C.gold, padding:"11px", borderRadius:4, cursor:"pointer", fontSize:13, fontWeight:"bold", fontFamily:"Arial,sans-serif", width:"100%" }}>Enrol Now →</button>
          </div>
          <div style={{ background:C.navyMid, border:`2px solid ${C.border}`, borderRadius:4, padding:"24px 22px" }}>
            <div style={{ fontSize:11, letterSpacing:2, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:8, fontWeight:"bold" }}>PAY MONTHLY</div>
            <div style={{ fontSize:44, fontWeight:"bold", color:C.white, fontFamily:"Arial,sans-serif" }}>$197</div>
            <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", marginTop:4, marginBottom:16 }}>× 3 months · Total $591</div>
            <button onClick={onEnrol} style={{ background:"none", border:`1px solid ${C.gold}`, color:C.gold, padding:"11px", borderRadius:4, cursor:"pointer", fontSize:13, fontFamily:"Arial,sans-serif", width:"100%" }}>Start with $197 →</button>
          </div>
        </div>
        <div style={{ textAlign:"center", marginTop:20, fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif" }}>
          Includes live monthly group session  ·  Graduation Zoom with Danston  ·  Full 12-week access
        </div>
      </div>

      {/* Quote */}
      <div style={{ background:C.navyMid, borderTop:`1px solid ${C.border}`, padding:"40px 28px", textAlign:"center" }}>
        <div style={{ fontSize:"clamp(16px,3vw,22px)", color:C.white, fontStyle:"italic", maxWidth:600, margin:"0 auto", lineHeight:1.6 }}>
          "Information informs. Transformation reforms."
        </div>
        <div style={{ fontSize:11, color:C.gold, fontFamily:"Arial,sans-serif", marginTop:12, letterSpacing:1.5 }}>DANSTON MUGARURA  ·  FOUNDER & CEO, CODE1</div>
      </div>

      <div style={{ textAlign:"center", padding:"20px", borderTop:`1px solid ${C.border}`, color:C.mutedDark, fontSize:11, fontFamily:"Arial,sans-serif" }}>
        © 2026 Code1  ·  code1.one  ·  Divinus Investment Group
      </div>
    </div>
  );
}

// ─── ENROL PAGE ───────────────────────────────────────────
function EnrolPage({ onBack, onComplete }) {
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState("full");
  const [form, setForm] = useState({ name:"", email:"", password:"", card:"", expiry:"", cvv:"" });
  const [agreed, setAgreed] = useState(false);
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const inp = { width:"100%", background:C.navyLight, border:`1px solid ${C.border}`, borderRadius:4, padding:"11px 14px", color:C.white, fontSize:14, fontFamily:"Arial,sans-serif", boxSizing:"border-box", outline:"none" };
  const lbl = { fontSize:11, letterSpacing:1.5, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:6, display:"block" };

  return (
    <div style={{ background:C.navy, minHeight:"100vh", color:C.white, fontFamily:"Georgia,serif" }}>
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 28px", borderBottom:`1px solid ${C.border}` }}>
        <Logo size={18}/> <button onClick={onBack} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:13, fontFamily:"Arial,sans-serif" }}>← Back</button>
      </nav>
      <div style={{ maxWidth:460, margin:"40px auto", padding:"0 24px" }}>

        {/* Steps */}
        <div style={{ display:"flex", alignItems:"center", marginBottom:32 }}>
          {["Plan","Account","Payment"].map((s,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", flex:1 }}>
              <div style={{ textAlign:"center", flex:1 }}>
                <div style={{ width:28, height:28, borderRadius:"50%", margin:"0 auto 4px", background: step>i+1?C.green:step===i+1?C.gold:C.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:"bold", color:step>=i+1?C.navy:C.muted, fontFamily:"Arial,sans-serif" }}>
                  {step>i+1?"✓":i+1}
                </div>
                <div style={{ fontSize:10, color:step===i+1?C.gold:C.mutedDark, fontFamily:"Arial,sans-serif", letterSpacing:1 }}>{s.toUpperCase()}</div>
              </div>
              {i<2 && <div style={{ width:32, height:1, background:step>i+1?C.green:C.border, marginBottom:18 }}/>}
            </div>
          ))}
        </div>

        {step===1 && (
          <div>
            <div style={{ fontSize:22, marginBottom:4 }}>Choose your plan</div>
            <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:24 }}>Both plans include full 12-week access, live sessions and graduation.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
              {[{id:"full",price:"$497",label:"Pay in Full",sub:"One payment · Best value"},
                {id:"monthly",price:"$197/mo",label:"Pay Monthly",sub:"3 payments · Total $591"}].map(p=>(
                <button key={p.id} onClick={()=>setPlan(p.id)} style={{ background:plan===p.id?`${C.gold}22`:"#0D1B2A", border:`2px solid ${plan===p.id?C.gold:C.border}`, borderRadius:4, padding:"16px 18px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontSize:15, color:plan===p.id?C.gold:C.white, fontFamily:"Arial,sans-serif", fontWeight:"bold" }}>{p.label}</div>
                    <div style={{ fontSize:12, color:C.muted, fontFamily:"Arial,sans-serif" }}>{p.sub}</div>
                  </div>
                  <div style={{ fontSize:22, color:plan===p.id?C.gold:C.muted, fontFamily:"Arial,sans-serif", fontWeight:"bold" }}>{p.price}</div>
                </button>
              ))}
            </div>
            <button onClick={()=>setStep(2)} style={{ background:C.gold, border:"none", color:C.navy, padding:"13px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif", width:"100%" }}>
              Continue →
            </button>
          </div>
        )}

        {step===2 && (
          <div>
            <div style={{ fontSize:22, marginBottom:4 }}>Create your account</div>
            <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:24 }}>Your transformation begins here.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div><label style={lbl}>FULL NAME</label><input style={inp} placeholder="Your full name" value={form.name} onChange={e=>upd("name",e.target.value)}/></div>
              <div><label style={lbl}>EMAIL</label><input style={inp} placeholder="you@email.com" value={form.email} onChange={e=>upd("email",e.target.value)}/></div>
              <div><label style={lbl}>PASSWORD</label><input style={inp} type="password" placeholder="Create a password" value={form.password} onChange={e=>upd("password",e.target.value)}/></div>
              <button onClick={()=>setStep(3)} style={{ background:C.gold, border:"none", color:C.navy, padding:"13px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif", marginTop:4 }}>Continue →</button>
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <div style={{ fontSize:22, marginBottom:4 }}>Payment</div>
            <div style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, padding:"14px 16px", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:14, color:C.white, fontFamily:"Arial,sans-serif" }}>Me Reimagined — 12-Week Programme</div>
                  <div style={{ fontSize:12, color:C.muted, fontFamily:"Arial,sans-serif" }}>{plan==="full"?"One payment · Lifetime access":"First of 3 monthly payments · Total $591"}</div>
                </div>
                <div style={{ fontSize:22, color:C.gold, fontFamily:"Arial,sans-serif", fontWeight:"bold" }}>{plan==="full"?"$497":"$197"}</div>
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div><label style={lbl}>CARD NUMBER</label><input style={inp} placeholder="1234 5678 9012 3456" value={form.card} onChange={e=>upd("card",e.target.value)}/></div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div><label style={lbl}>EXPIRY</label><input style={inp} placeholder="MM / YY" value={form.expiry} onChange={e=>upd("expiry",e.target.value)}/></div>
                <div><label style={lbl}>CVV</label><input style={inp} placeholder="123" value={form.cvv} onChange={e=>upd("cvv",e.target.value)}/></div>
              </div>
              <div style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} style={{ marginTop:3, accentColor:C.gold }}/>
                <div style={{ fontSize:12, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.5 }}>I agree to the Terms & Conditions and understand the payment plan selected above.</div>
              </div>
              <button onClick={()=>agreed&&onComplete()} disabled={!agreed} style={{ background:agreed?C.gold:C.mutedDark, border:"none", color:C.navy, padding:"13px", borderRadius:4, cursor:agreed?"pointer":"not-allowed", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>
                {plan==="full"?"Pay $497 & Enrol →":"Pay $197 & Enrol →"}
              </button>
              <div style={{ textAlign:"center", fontSize:11, color:C.mutedDark, fontFamily:"Arial,sans-serif" }}>🔒 Secured by Stripe · SSL encrypted</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── iPhilosophy INTAKE ───────────────────────────────────
function IPhilosophy({ name, onComplete }) {
  const [section, setSection] = useState(0);
  const [answers, setAnswers] = useState({});
  const totalQ = IPHIL_QUESTIONS.reduce((a,s)=>a+s.questions.length,0);
  const answered = Object.keys(answers).filter(k=>answers[k]?.trim()).length;
  const pct = Math.round((answered/totalQ)*100);

  const setAns = (key, val) => setAnswers(a=>({...a,[key]:val}));
  const currentSection = IPHIL_QUESTIONS[section];
  const isLast = section === IPHIL_QUESTIONS.length - 1;

  return (
    <div style={{ background:C.navy, minHeight:"100vh", color:C.white, fontFamily:"Georgia,serif" }}>
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 24px", borderBottom:`1px solid ${C.border}`, background:C.navyMid, position:"sticky", top:0, zIndex:10 }}>
        <Logo size={18}/>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ fontSize:12, color:C.muted, fontFamily:"Arial,sans-serif" }}>{pct}% complete</div>
          <div style={{ width:100 }}><Bar pct={pct}/></div>
        </div>
      </nav>

      <div style={{ maxWidth:680, margin:"0 auto", padding:"32px 24px 64px" }}>

        {/* Header */}
        <div style={{ marginBottom:28 }}>
          <div style={{ fontSize:11, letterSpacing:3, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:6 }}>iPHILOSOPHY INTAKE  ·  THE FOUNDATION</div>
          <div style={{ fontSize:28, marginBottom:8 }}>Know yourself first.</div>
          <div style={{ fontSize:14, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6 }}>
            Welcome, {name}. Before Week 1 begins, complete this questionnaire. There are no right or wrong answers. Take 45–60 minutes. Answer from where you actually are — not where you wish you were.
          </div>
        </div>

        {/* Section nav */}
        <div style={{ display:"flex", gap:6, marginBottom:28, flexWrap:"wrap" }}>
          {IPHIL_QUESTIONS.map((s,i)=>(
            <button key={i} onClick={()=>setSection(i)} style={{ background: section===i?C.gold:"#0D1B2A", border:`1px solid ${section===i?C.gold:C.border}`, color:section===i?C.navy:C.muted, padding:"6px 12px", borderRadius:3, cursor:"pointer", fontSize:11, fontFamily:"Arial,sans-serif", fontWeight:section===i?"bold":"normal" }}>
              {i+1}. {s.section}
            </button>
          ))}
        </div>

        {/* Current section */}
        <div style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderTop:`3px solid ${C.gold}`, borderRadius:4, padding:"20px 22px", marginBottom:20 }}>
          <div style={{ fontSize:11, letterSpacing:2.5, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:12 }}>PART {section+1}  ·  {currentSection.section.toUpperCase()}</div>
          {currentSection.questions.map((q, qi)=>{
            const key = `${section}-${qi}`;
            return (
              <div key={qi} style={{ marginBottom:20 }}>
                <div style={{ fontSize:13, color:C.white, fontFamily:"Arial,sans-serif", fontStyle:"italic", marginBottom:8, lineHeight:1.5 }}>{q}</div>
                <textarea
                  value={answers[key]||""}
                  onChange={e=>setAns(key,e.target.value)}
                  style={{ width:"100%", background:"#0D1B2A", border:`1px solid ${answers[key]?.trim()?C.gold:C.border}`, borderRadius:4, padding:"10px 12px", color:C.white, fontSize:13, fontFamily:"Arial,sans-serif", resize:"vertical", minHeight:72, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" }}
                  placeholder="Write your honest answer here…"
                />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div style={{ display:"flex", justifyContent:"space-between", gap:12 }}>
          <button onClick={()=>setSection(Math.max(0,section-1))} disabled={section===0} style={{ background:"none", border:`1px solid ${C.border}`, color:section===0?C.mutedDark:C.muted, padding:"11px 22px", borderRadius:4, cursor:section===0?"not-allowed":"pointer", fontSize:13, fontFamily:"Arial,sans-serif" }}>← Previous</button>
          {isLast ? (
            <button onClick={onComplete} style={{ background:C.gold, border:"none", color:C.navy, padding:"11px 28px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>
              Complete iPhilosophy & Begin Week 1 →
            </button>
          ) : (
            <button onClick={()=>setSection(section+1)} style={{ background:C.gold, border:"none", color:C.navy, padding:"11px 28px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>
              Next Section →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────
function Dashboard({ onSelectWeek, onSignOut, onMonthly }) {
  const completedWeeks = WEEKS.filter(w=>w.progress===100).length;
  const totalScore = 100;
  const maxScore = WEEKS.reduce((a,w)=>a+w.scorecard,0);
  const pct = Math.round((totalScore/maxScore)*100);

  return (
    <div style={{ background:C.navy, minHeight:"100vh", color:C.white, fontFamily:"Georgia,serif" }}>
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 22px", borderBottom:`1px solid ${C.border}`, background:C.navyMid, position:"sticky", top:0, zIndex:10 }}>
        <Logo size={18}/>
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ fontSize:12, color:C.muted, fontFamily:"Arial,sans-serif" }}>Welcome, <span style={{ color:C.gold }}>Danston</span></div>
          <button onClick={onMonthly} style={{ background:`${C.gold}22`, border:`1px solid ${C.gold}44`, color:C.gold, padding:"6px 14px", borderRadius:4, cursor:"pointer", fontSize:12, fontFamily:"Arial,sans-serif" }}>📅 Live Session</button>
          <button onClick={onSignOut} style={{ background:"none", border:`1px solid ${C.border}`, color:C.muted, padding:"6px 14px", borderRadius:4, cursor:"pointer", fontSize:12, fontFamily:"Arial,sans-serif" }}>Sign Out</button>
        </div>
      </nav>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 20px 48px" }}>

        {/* Welcome */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:20, marginBottom:28, alignItems:"start" }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:3, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:6 }}>YOUR DASHBOARD</div>
            <div style={{ fontSize:28, marginBottom:4 }}>Me Reimagined.</div>
            <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif" }}>Week 3 is open. Continue your journey.</div>
          </div>
          <div style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:8, padding:"14px 18px", display:"flex", flexDirection:"column", alignItems:"center" }}>
            <div style={{ position:"relative", marginBottom:4 }}>
              <ProgressRing pct={pct} size={60} stroke={5}/>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:"bold", color:C.gold, fontFamily:"Arial,sans-serif" }}>{pct}%</div>
            </div>
            <div style={{ fontSize:9, letterSpacing:2, color:C.muted, fontFamily:"Arial,sans-serif" }}>OVERALL</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:10, marginBottom:28 }}>
          {[
            { l:"Weeks Done", v:`${completedWeeks}/12`, c:C.green },
            { l:"Score",      v:`${totalScore}pts`,    c:C.gold  },
            { l:"Max Score",  v:`${maxScore}pts`,      c:C.muted },
            { l:"Driver",     v:"D2 Diagnose",         c:C.accent},
          ].map(s=>(
            <div key={s.l} style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, padding:"12px 14px" }}>
              <div style={{ fontSize:20, fontWeight:"bold", color:s.c, fontFamily:"Arial,sans-serif" }}>{s.v}</div>
              <div style={{ fontSize:10, color:C.muted, fontFamily:"Arial,sans-serif", marginTop:2 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Live session banner */}
        <div style={{ background:`${C.gold}11`, border:`1px solid ${C.gold}44`, borderRadius:4, padding:"14px 18px", marginBottom:28, display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:12, color:C.gold, fontFamily:"Arial,sans-serif", fontWeight:"bold", letterSpacing:1 }}>📅  NEXT LIVE SESSION WITH DANSTON</div>
            <div style={{ fontSize:14, color:C.white, fontFamily:"Arial,sans-serif", marginTop:3 }}>Tuesday 15 July 2026 · 7:00pm BST · Open to all participants</div>
          </div>
          <button onClick={onMonthly} style={{ background:C.gold, border:"none", color:C.navy, padding:"9px 18px", borderRadius:4, cursor:"pointer", fontSize:12, fontWeight:"bold", fontFamily:"Arial,sans-serif", flexShrink:0 }}>Register →</button>
        </div>

        {/* Drivers with weeks */}
        {DRIVERS.map((driver,di)=>{
          const driverWeeks = WEEKS.filter(w=>w.driver===driver.id);
          return (
            <div key={di} style={{ marginBottom:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, paddingBottom:8, borderBottom:`1px solid ${C.border}` }}>
                <div style={{ width:3, height:18, background:driver.color, borderRadius:2 }}/>
                <div>
                  <div style={{ fontSize:10, letterSpacing:2.5, color:driver.color, fontFamily:"Arial,sans-serif" }}>{driver.code}  ·  WEEKS {driver.weeks}</div>
                  <div style={{ fontSize:16, color:C.white }}>{driver.name}</div>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {driverWeeks.map(week=>(
                  <button key={week.id} onClick={()=>!week.locked&&onSelectWeek(week.id)} disabled={week.locked}
                    style={{ background:week.locked?"#0D1B2A":C.navyMid, border:`1px solid ${week.progress>0&&week.progress<100?driver.color+"66":C.border}`, borderRadius:4, padding:"12px 14px", cursor:week.locked?"not-allowed":"pointer", display:"flex", alignItems:"center", gap:12, opacity:week.locked?0.45:1, textAlign:"left", width:"100%", transition:"border-color 0.2s" }}>
                    <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, background:week.progress===100?C.green:week.progress>0?driver.color:C.border, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:"bold", color:week.progress>0?C.navy:C.muted, fontFamily:"Arial,sans-serif" }}>
                      {week.progress===100?"✓":week.locked?"🔒":week.id}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", marginBottom:3 }}>
                        <div style={{ fontSize:14, color:C.white, fontFamily:"Arial,sans-serif", fontWeight:week.progress>0?"bold":"normal" }}>{week.title}</div>
                        {week.progress>0&&week.progress<100 && <Tag text="IN PROGRESS" color={driver.color}/>}
                        {week.progress===100 && <Tag text="COMPLETE" color={C.green}/>}
                      </div>
                      <div style={{ fontSize:11, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:week.progress>0?5:0 }}>
                        {week.phase}  ·  {week.videos} video{week.videos!==1?"s":""}  ·  /{week.scorecard}pts
                      </div>
                      {week.progress>0 && <Bar pct={week.progress} color={week.progress===100?C.green:driver.color}/>}
                    </div>
                    {!week.locked && <span style={{ color:C.mutedDark, fontSize:18, flexShrink:0 }}>›</span>}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Graduation */}
        <div style={{ background:"#0a1520", border:`1px solid ${C.border}`, borderRadius:4, padding:"18px 20px", marginTop:8 }}>
          <div style={{ fontSize:11, letterSpacing:2.5, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:8 }}>🎓  GRADUATION</div>
          <div style={{ fontSize:14, color:C.white, fontFamily:"Arial,sans-serif", marginBottom:4 }}>Graduation sessions are announced once you complete Week 12.</div>
          <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif" }}>Complete the programme, register for the next graduation Zoom with Danston, and celebrate with your cohort.</div>
        </div>
      </div>
    </div>
  );
}

// ─── WEEK VIEW ────────────────────────────────────────────
function WeekView({ weekId, onBack }) {
  const week = WEEKS.find(w=>w.id===weekId);
  const driver = DRIVERS.find(d=>d.id===week.driver);
  const [activeSection, setActiveSection] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const sections = [
    { type:"video",    label:"VIDEO",        title:`Introducing ${driver.name}` },
    { type:"teach",    label:"TEACH",        title:"Core Teaching" },
    { type:"exercise", label:"EXERCISES",    title:"Training Exercises" },
    { type:"scorecard",label:"SCORECARD",    title:`Week ${week.id} Scorecard`, score: weekId===1?42:weekId===2?38:null, outOf: week.scorecard },
    { type:"ailab",    label:"HI-AI LAB",    title:"Your AI Prompt" },
    { type:"quiz",     label:"QUIZ",         title:"Week Knowledge Check" },
    { type:"commit",   label:"COMMIT",       title:"My Week Commitment" },
  ];

  const typeColor = { video:C.gold, teach:C.accent, exercise:"#9C27B0", scorecard:C.green, ailab:C.gold, quiz:C.green, commit:C.gold };
  const cur = sections[activeSection];

  const quiz = [
    { q:`What is the primary goal of Driver ${week.driver}: ${driver.name}?`, options:[`Complete a checklist of tasks`,`See yourself or your situation more clearly in this area`,`Get AI to do the work for you`,`Read about transformation`], correct:1 },
    { q:"In the HI-AI approach, what does Human Intelligence provide that AI cannot?", options:["Speed","Pattern recognition","Judgement, values and wisdom","Data organisation"], correct:2 },
    { q:"What does the Wet Log Philosophy mean for your development?", options:["Attack your weaknesses first","Strengthen your strengths first, then address weaknesses","Ignore weaknesses entirely","Focus only on new skills"], correct:1 },
    { q:"What is the difference between a symptom and a root cause?", options:["A symptom is visible; a root cause is what creates it","They are the same thing","A symptom is deeper","Root causes are always external"], correct:0 },
    { q:`Complete this: Information informs. ___`, options:["Education educates","Knowledge grows","Transformation reforms","AI accelerates"], correct:2 },
  ];

  const quizScore = quizSubmitted ? quiz.filter((_,i)=>quizAnswers[i]===quiz[i].correct).length : 0;

  return (
    <div style={{ background:C.navy, minHeight:"100vh", color:C.white, fontFamily:"Georgia,serif", display:"flex", flexDirection:"column" }}>
      <nav style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 18px", borderBottom:`1px solid ${C.border}`, background:C.navyMid, position:"sticky", top:0, zIndex:10, flexShrink:0 }}>
        <button onClick={onBack} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:22, lineHeight:1 }}>‹</button>
        <Logo size={16}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:9, letterSpacing:2, color:driver.color, fontFamily:"Arial,sans-serif" }}>WEEK {week.id}  ·  {driver.code} {driver.name.toUpperCase()}</div>
          <div style={{ fontSize:13, color:C.white, fontFamily:"Arial,sans-serif", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{week.title}</div>
        </div>
        <Bar pct={week.progress} color={driver.color} h={3}/>
        <div style={{ fontSize:11, color:C.muted, fontFamily:"Arial,sans-serif", flexShrink:0 }}>{week.progress}%</div>
      </nav>

      <div style={{ display:"flex", flex:1, overflow:"hidden" }}>
        {/* Sidebar */}
        <div style={{ width:240, flexShrink:0, background:"#0a1520", borderRight:`1px solid ${C.border}`, overflowY:"auto" }}>
          <div style={{ padding:"14px 14px 6px" }}>
            <div style={{ fontSize:9, letterSpacing:2, color:C.muted, fontFamily:"Arial,sans-serif" }}>WEEK {week.id} CONTENT</div>
          </div>
          <div style={{ padding:"0 6px 16px" }}>
            {sections.map((s,i)=>(
              <button key={i} onClick={()=>setActiveSection(i)} style={{ width:"100%", background:activeSection===i?C.navyMid:"none", border:"none", borderRadius:4, padding:"9px 10px", cursor:"pointer", display:"flex", gap:9, alignItems:"flex-start", textAlign:"left", marginBottom:2 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:typeColor[s.type]||C.muted, flexShrink:0, marginTop:6 }}/>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:8, letterSpacing:1.5, color:typeColor[s.type]||C.muted, fontFamily:"Arial,sans-serif", marginBottom:1 }}>{s.label}</div>
                  <div style={{ fontSize:12, color:activeSection===i?C.white:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.3 }}>{s.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, overflowY:"auto", padding:"22px 26px" }}>
          {/* Section header */}
          <div style={{ marginBottom:18 }}>
            <Tag text={cur.label} color={typeColor[cur.type]||C.muted}/>
            <h2 style={{ fontSize:22, fontWeight:"normal", margin:"8px 0 0" }}>{cur.title}</h2>
          </div>

          {cur.type==="video" && (
            <div>
              <div onClick={()=>{}} style={{ background:C.navyMid, borderRadius:6, aspectRatio:"16/9", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18, cursor:"pointer", border:`1px solid ${C.border}`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyLight} 100%)` }}/>
                <div style={{ position:"relative", textAlign:"center" }}>
                  <div style={{ width:60, height:60, borderRadius:"50%", background:driver.color, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 12px" }}>
                    <span style={{ fontSize:22, color:C.navy, marginLeft:4 }}>▶</span>
                  </div>
                  <div style={{ fontSize:15, color:C.white, fontFamily:"Arial,sans-serif" }}>Week {week.id} — {week.title}</div>
                  <div style={{ fontSize:12, color:driver.color, fontFamily:"Arial,sans-serif", marginTop:4 }}>Click to play</div>
                </div>
              </div>
              <div style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, padding:"12px 16px" }}>
                <div style={{ fontSize:10, letterSpacing:2, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:6 }}>BEFORE YOU CONTINUE</div>
                <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6 }}>Watch this video in full before moving to the next section. Take notes as you go — your best insights often come in the first 24 hours after watching.</div>
              </div>
            </div>
          )}

          {cur.type==="teach" && (
            <div>
              <div style={{ borderLeft:`3px solid ${driver.color}`, paddingLeft:16, marginBottom:18, fontSize:18, color:C.white, fontStyle:"italic", lineHeight:1.5 }}>
                "First design the human. Then upgrade the performance."
              </div>
              <div style={{ fontSize:14, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.7, marginBottom:16 }}>
                This week's teaching is drawn from Driver {driver.id}: {driver.name}. {driver.desc} Every concept in this section connects directly to the reflections and exercises that follow. Read with the intention to apply — not to collect.
              </div>
              {twoColInfo(
                {title:"HUMAN INTELLIGENCE LEADS", items:["Your self-awareness","Your honesty","Your judgement","Your values","Your decisions"]},
                {title:"AI SUPPORTS", items:["Pattern identification","Reflection organisation","Alternative perspectives","Deeper questioning","Progress tracking"]},
                driver.color
              )}
            </div>
          )}

          {cur.type==="exercise" && (
            <div>
              <div style={{ fontSize:14, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6, marginBottom:20 }}>
                These exercises are the work of {driver.name}. Honest answers only. Not the answers you wish were true — the answers your behaviour would confirm.
              </div>
              {["What are you discovering about yourself in this driver — not what you expected to find, but what is actually showing up?",
                "Where is the resistance coming from — the thing in this driver you are most reluctant to answer honestly?",
                "What would the reimagined version of you do differently in this area starting today?"
              ].map((q,i)=>(
                <div key={i} style={{ marginBottom:16 }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:driver.color, fontFamily:"Arial,sans-serif", marginBottom:6 }}>REFLECTION {String(i+1).padStart(2,"0")}</div>
                  <div style={{ fontSize:14, color:C.white, fontStyle:"italic", marginBottom:8, lineHeight:1.4 }}>{q}</div>
                  <textarea style={{ width:"100%", background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, padding:"10px 12px", color:C.white, fontSize:13, fontFamily:"Arial,sans-serif", resize:"vertical", minHeight:72, outline:"none", boxSizing:"border-box" }} placeholder="Write your reflection here…"/>
                </div>
              ))}
            </div>
          )}

          {cur.type==="scorecard" && (
            <div>
              <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:16 }}>Rate each statement 1–10. Rate what is actually true right now — not what you aspire to.</div>
              <div style={{ background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, overflow:"hidden", marginBottom:16 }}>
                <div style={{ background:C.navyLight, padding:"10px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between" }}>
                  <div style={{ fontSize:10, letterSpacing:2, color:driver.color, fontFamily:"Arial,sans-serif" }}>RATE EACH 1–10</div>
                  {cur.score && <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif" }}>Your score: <span style={{ color:C.gold, fontWeight:"bold" }}>{cur.score}/{cur.outOf}</span></div>}
                </div>
                {["I have a clear picture of where I am in this area","I understand what is driving my current results","I can name the patterns that keep appearing","I know what needs to change and why","I am ready to take action on what this reveals"].map((s,i)=>(
                  <div key={i} style={{ padding:"11px 16px", borderBottom:i<4?`1px solid ${C.border}`:"none", display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
                    <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif" }}>{s}</div>
                    <div style={{ fontSize:14, color:C.gold, fontFamily:"Arial,sans-serif", fontWeight:"bold", flexShrink:0, background:"#0D1B2A", padding:"4px 10px", borderRadius:3, minWidth:32, textAlign:"center" }}>{cur.score?[8,7,9,7,cur.score>40?9:6][i]:"___"}</div>
                  </div>
                ))}
              </div>
              {cur.score && (
                <div style={{ background:"#0D1B2A", border:`1px solid ${C.score>40?C.green:C.gold}44`, borderRadius:4, padding:"12px 16px", fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif" }}>
                  Score {cur.score}/{cur.outOf} — {cur.score>=40?"Strong foundation. Continue building.":cur.score>=25?"Growing clarity. Go deeper with the exercises.":"Early awareness. The honest answer is always the right answer."}
                </div>
              )}
            </div>
          )}

          {cur.type==="ailab" && (
            <div>
              <div style={{ background:`${driver.color}11`, border:`1px solid ${driver.color}44`, borderRadius:4, padding:"16px 18px", marginBottom:18 }}>
                <div style={{ fontSize:10, letterSpacing:2, color:driver.color, fontFamily:"Arial,sans-serif", marginBottom:8 }}>HI-AI PERFORMANCE LAB</div>
                <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6, marginBottom:14 }}>Human Intelligence leads. AI supports. Use the prompt below with any AI assistant — Claude, ChatGPT, or similar. Your thinking comes first. AI helps you go deeper.</div>
                <div style={{ background:"#0D1B2A", border:`1px solid ${C.border}`, borderRadius:4, padding:"14px 16px", marginBottom:14 }}>
                  <div style={{ fontSize:9, letterSpacing:2, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:8 }}>YOUR AI PROMPT FOR WEEK {week.id}</div>
                  <div style={{ fontSize:13, color:C.white, fontFamily:"Arial,sans-serif", lineHeight:1.7, fontStyle:"italic" }}>
                    "I am in Week {week.id} of my Me Reimagined programme, working through the {driver.name} driver. I am going to share my key reflections and scorecard results from this week. Once I share them, I want you to: 1. Identify the strongest patterns you notice. 2. Ask me two questions that go deeper than my surface answers. 3. Tell me the single most important thing I should focus on before moving to Week {week.id+1}. Human Intelligence leads — you are here to help me see more clearly, not to decide for me."
                  </div>
                </div>
              </div>
              <div style={{ fontSize:10, letterSpacing:2, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:8 }}>MY KEY INSIGHT</div>
              <textarea style={{ width:"100%", background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, padding:"12px 14px", color:C.white, fontSize:13, fontFamily:"Arial,sans-serif", resize:"vertical", minHeight:100, outline:"none", boxSizing:"border-box" }} placeholder="Record your key insight after using this prompt…"/>
            </div>
          )}

          {cur.type==="quiz" && (
            <div>
              {!quizStarted && !quizSubmitted && (
                <div style={{ textAlign:"center", padding:"28px 0" }}>
                  <div style={{ fontSize:44, marginBottom:14 }}>✏️</div>
                  <div style={{ fontSize:20, marginBottom:6 }}>Week {week.id} Knowledge Check</div>
                  <div style={{ fontSize:14, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:24 }}>5 questions · No time limit</div>
                  <button onClick={()=>setQuizStarted(true)} style={{ background:C.gold, border:"none", color:C.navy, padding:"12px 32px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>Begin Quiz</button>
                </div>
              )}
              {quizStarted && !quizSubmitted && (
                <div>
                  {quiz.map((q,qi)=>(
                    <div key={qi} style={{ marginBottom:20, background:C.navyMid, border:`1px solid ${C.border}`, borderRadius:4, padding:"14px 16px" }}>
                      <div style={{ fontSize:10, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:5 }}>Q{qi+1}</div>
                      <div style={{ fontSize:14, color:C.white, fontFamily:"Arial,sans-serif", marginBottom:12, lineHeight:1.4 }}>{q.q}</div>
                      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                        {q.options.map((opt,oi)=>(
                          <button key={oi} onClick={()=>setQuizAnswers(a=>({...a,[qi]:oi}))} style={{ background:quizAnswers[qi]===oi?`${C.gold}22`:"#0D1B2A", border:`1px solid ${quizAnswers[qi]===oi?C.gold:C.border}`, borderRadius:4, padding:"9px 12px", cursor:"pointer", display:"flex", gap:10, alignItems:"center", textAlign:"left" }}>
                            <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${quizAnswers[qi]===oi?C.gold:C.mutedDark}`, background:quizAnswers[qi]===oi?C.gold:"none", flexShrink:0 }}/>
                            <span style={{ fontSize:13, color:quizAnswers[qi]===oi?C.gold:C.muted, fontFamily:"Arial,sans-serif" }}>{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={()=>setQuizSubmitted(true)} disabled={Object.keys(quizAnswers).length<quiz.length} style={{ background:Object.keys(quizAnswers).length===quiz.length?C.gold:C.mutedDark, border:"none", color:C.navy, padding:"12px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif", width:"100%" }}>Submit</button>
                </div>
              )}
              {quizSubmitted && (
                <div>
                  <div style={{ textAlign:"center", padding:"20px 0 28px" }}>
                    <div style={{ fontSize:52, fontWeight:"bold", color:quizScore>=4?C.green:quizScore>=3?C.gold:C.red, fontFamily:"Arial,sans-serif" }}>{quizScore}/5</div>
                    <div style={{ fontSize:16, color:C.white, marginTop:6 }}>{quizScore===5?"Perfect.":quizScore>=4?"Well done.":quizScore>=3?"Good effort.":"Review the teaching and try again."}</div>
                  </div>
                  {quiz.map((q,qi)=>{
                    const ok=quizAnswers[qi]===q.correct;
                    return <div key={qi} style={{ marginBottom:10, background:C.navyMid, border:`1px solid ${ok?C.green+"44":C.red+"44"}`, borderRadius:4, padding:"11px 14px" }}>
                      <div style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                        <span style={{ color:ok?C.green:C.red, flexShrink:0 }}>{ok?"✓":"✗"}</span>
                        <div>
                          <div style={{ fontSize:13, color:C.white, fontFamily:"Arial,sans-serif" }}>{q.q}</div>
                          {!ok && <div style={{ fontSize:12, color:C.green, fontFamily:"Arial,sans-serif", marginTop:4 }}>Correct: {q.options[q.correct]}</div>}
                        </div>
                      </div>
                    </div>;
                  })}
                </div>
              )}
            </div>
          )}

          {cur.type==="commit" && (
            <div>
              <div style={{ fontSize:14, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6, marginBottom:22 }}>
                Write your commitments with precision. Vague intentions produce vague results.
              </div>
              {[{l:"THE MOST IMPORTANT THING THIS WEEK REVEALED ABOUT ME:", c:driver.color},{l:"THE ONE THING I AM COMMITTING TO BEFORE WEEK "+(week.id+1)+":", c:C.gold}].map((item,i)=>(
                <div key={i} style={{ marginBottom:14, background:C.navyMid, border:`1px solid ${item.c}44`, borderRadius:4, padding:"14px 16px" }}>
                  <div style={{ fontSize:9, letterSpacing:1.5, color:item.c, fontFamily:"Arial,sans-serif", marginBottom:8 }}>{item.l}</div>
                  <textarea style={{ width:"100%", background:"#0D1B2A", border:`1px solid ${C.border}`, borderRadius:4, padding:"10px 12px", color:C.white, fontSize:13, fontFamily:"Arial,sans-serif", resize:"vertical", minHeight:64, outline:"none", boxSizing:"border-box" }} placeholder="Be specific…"/>
                </div>
              ))}
              <button style={{ background:C.gold, border:"none", color:C.navy, padding:"13px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif", width:"100%", marginTop:6 }}>
                Save & Complete Week {week.id} ✓
              </button>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:28, paddingTop:18, borderTop:`1px solid ${C.border}` }}>
            <button onClick={()=>setActiveSection(Math.max(0,activeSection-1))} disabled={activeSection===0} style={{ background:"none", border:`1px solid ${C.border}`, color:activeSection===0?C.mutedDark:C.muted, padding:"9px 18px", borderRadius:4, cursor:activeSection===0?"not-allowed":"pointer", fontSize:13, fontFamily:"Arial,sans-serif" }}>← Previous</button>
            <button onClick={()=>setActiveSection(Math.min(sections.length-1,activeSection+1))} disabled={activeSection===sections.length-1} style={{ background:activeSection===sections.length-1?C.mutedDark:C.gold, border:"none", color:C.navy, padding:"9px 22px", borderRadius:4, cursor:activeSection===sections.length-1?"not-allowed":"pointer", fontSize:13, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── LIVE SESSION PAGE ────────────────────────────────────
function LiveSession({ onBack }) {
  return (
    <div style={{ background:C.navy, minHeight:"100vh", color:C.white, fontFamily:"Georgia,serif" }}>
      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 24px", borderBottom:`1px solid ${C.border}` }}>
        <Logo size={18}/><button onClick={onBack} style={{ background:"none", border:"none", color:C.muted, cursor:"pointer", fontSize:13, fontFamily:"Arial,sans-serif" }}>← Dashboard</button>
      </nav>
      <div style={{ maxWidth:620, margin:"40px auto", padding:"0 24px" }}>
        <div style={{ fontSize:11, letterSpacing:3, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:16 }}>LIVE MONTHLY SESSION</div>
        <div style={{ fontSize:30, marginBottom:6 }}>Live with Danston</div>
        <div style={{ fontSize:14, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6, marginBottom:28 }}>
          Every month, all active participants join a live Zoom session with Danston. Whether you are in Week 1 or Week 11, this session meets you where you are. New starters get orientation. Mid-programme participants get a boost. Near-completers get a final push. Everyone sits in the same room, with the same energy.
        </div>
        <div style={{ background:C.navyMid, border:`2px solid ${C.gold}44`, borderRadius:4, padding:"20px 22px", marginBottom:20 }}>
          <div style={{ fontSize:11, letterSpacing:2, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:12 }}>NEXT SESSION</div>
          <div style={{ fontSize:22, color:C.white, marginBottom:4 }}>Tuesday 15 July 2026</div>
          <div style={{ fontSize:16, color:C.gold, fontFamily:"Arial,sans-serif", marginBottom:16 }}>7:00pm BST  ·  2:00pm EST  ·  11:00am PST</div>
          <div style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", lineHeight:1.6, marginBottom:20 }}>Duration: 90–120 minutes. Open to all active participants regardless of where you are in the programme. Zoom link sent on registration.</div>
          <button style={{ background:C.gold, border:"none", color:C.navy, padding:"13px 32px", borderRadius:4, cursor:"pointer", fontSize:14, fontWeight:"bold", fontFamily:"Arial,sans-serif" }}>Register for This Session →</button>
        </div>
        <div style={{ background:"#0a1520", border:`1px solid ${C.border}`, borderRadius:4, padding:"16px 18px" }}>
          <div style={{ fontSize:11, letterSpacing:2, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:8 }}>UPCOMING SESSIONS</div>
          {["Tuesday 19 August 2026","Tuesday 16 September 2026","Tuesday 21 October 2026"].map((d,i)=>(
            <div key={i} style={{ fontSize:13, color:C.muted, fontFamily:"Arial,sans-serif", padding:"8px 0", borderBottom:i<2?`1px solid ${C.border}`:"none" }}>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── HELPER ──────────────────────────────────────────────
function twoColInfo({title:t1, items:i1}, {title:t2, items:i2}, accent=C.gold) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:16 }}>
      {[[t1,i1,accent],[t2,i2,C.muted]].map(([title,items,color],ci)=>(
        <div key={ci} style={{ background:"#0D1B2A", border:`1px solid ${C.border}`, borderRadius:4, padding:"12px 14px" }}>
          <div style={{ fontSize:9, letterSpacing:1.5, color, fontFamily:"Arial,sans-serif", marginBottom:8 }}>{title}</div>
          {items.map((item,ii)=>(
            <div key={ii} style={{ fontSize:12, color:C.muted, fontFamily:"Arial,sans-serif", marginBottom:4, display:"flex", gap:6 }}>
              <span style={{ color }}>—</span>{item}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── APP SHELL ────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing");
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [participantName, setParticipantName] = useState("Danston");

  if (view==="landing")    return <Landing onEnrol={()=>setView("enrol")} onLogin={()=>setView("dashboard")}/>;
  if (view==="enrol")      return <EnrolPage onBack={()=>setView("landing")} onComplete={()=>setView("iphilosophy")}/>;
  if (view==="iphilosophy")return <IPhilosophy name={participantName} onComplete={()=>setView("dashboard")}/>;
  if (view==="live")       return <LiveSession onBack={()=>setView("dashboard")}/>;
  if (view==="week")       return <WeekView weekId={selectedWeek} onBack={()=>setView("dashboard")}/>;
  return <Dashboard onSelectWeek={id=>{setSelectedWeek(id);setView("week");}} onSignOut={()=>setView("landing")} onMonthly={()=>setView("live")}/>;
}
