import { useState } from "react";

const CATEGORY_META = {
  Reach: { color: "#FF6B35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.25)", desc: "Viral / Discovery — naye log aayenge", icon: "🔥" },
  Trust: { color: "#00C2FF", bg: "rgba(0,194,255,0.08)", border: "rgba(0,194,255,0.25)", desc: "Authority / Depth — credibility badhegi", icon: "🧠" },
  Sales: { color: "#A259FF", bg: "rgba(162,89,255,0.08)", border: "rgba(162,89,255,0.25)", desc: "Conversion — fans ko loyal banao", icon: "💰" },
};

const FORMAT_COLORS = {
  "Short Reel": "#FF6B35", "Talking Head": "#00C2FF", "Mini Doc": "#A259FF",
  "Explainer": "#FFD700", "Series": "#00E5A0", "Voiceover B-Roll": "#FF6B35", "Storytime": "#00C2FF",
};

const DEFAULT_IDEAS = [
  { id:1, title:"India mein degree hai, job nahi — kyun?", category:"Reach", format:"Short Reel", hook:"4 saal ki mehnat, aur result? Zero job offer.", angle:"Frustrated job seeker", why:"Millions of graduates relate instantly. Viral potential high because it validates a shared pain." },
  { id:2, title:"NEET paper leak ka sach jo media nahi batata", category:"Reach", format:"Voiceover B-Roll", hook:"Yeh sirf paper leak nahi tha — yeh system ka failure tha.", angle:"Outrage + hidden truth", why:"Conspiracy + education = massive reach among students and parents." },
  { id:3, title:"Instagram pe jo dikhta hai, woh reality nahi hai", category:"Reach", format:"Talking Head", hook:"Yeh influencer 'broke' tha 6 mahine pehle.", angle:"Reality check shock", why:"Social media users feel deceived — this triggers shares and comments." },
  { id:4, title:"Kisan ki ek din ki kamai jaante ho kitni hai?", category:"Reach", format:"Voiceover B-Roll", hook:"Jo roti tum khaate ho, woh banana waale ko ₹30 milte hain poore din.", angle:"Guilt + empathy trigger", why:"Urban audience ko rural reality se connect karata hai — highly shareable." },
  { id:5, title:"Govt job ka sapna — trap hai ya reality?", category:"Reach", format:"Short Reel", hook:"10 saal preparation, 1 seat, 5 lakh candidates.", angle:"Dream vs reality clash", why:"SSC/UPSC aspirants = massive audience in India. Direct pain point." },
  { id:6, title:"Mobile addiction — yeh teri galti nahi hai", category:"Reach", format:"Explainer", hook:"Yeh app tumhe addict karne ke liye design kiya gaya hai.", angle:"Victim validation", why:"Blaming the system not the user = massive positive response + shares." },
  { id:7, title:"Dowry ban hai, fir bhi chal raha hai — kyun?", category:"Reach", format:"Mini Doc", hook:"1961 mein ban hua. 2024 mein bhi zinda hai. Kyun?", angle:"System failure shock", why:"Gender + social issues = broad audience reach across age groups." },
  { id:8, title:"Inflation ka sach — 1 figure jo sarkar nahi batati", category:"Reach", format:"Short Reel", hook:"Government kehti hai 5% inflation. Tumhara ghar kehta hai 30%.", angle:"Betrayal by authority", why:"Everyone feels inflation. This validates their experience vs official data." },
  { id:9, title:"Psychology: Log desh chhod kyun rahe hain?", category:"Reach", format:"Explainer", hook:"Har mahine 1 lakh padhe-likhe Indians desh chhod rahe hain.", angle:"National pride + fear", why:"Brain drain debate always trends. Emotional + factual combination." },
  { id:10, title:"Ek village school ki reality — camera ke saath", category:"Reach", format:"Mini Doc", hook:"Is school mein teacher hai, building hai — lekin padhne wala koi nahi.", angle:"Systemic neglect expose", why:"Rural education reality shocks urban viewers. Documentary style drives deep engagement." },
  { id:11, title:"Education system kaise broke hua — timeline", category:"Trust", format:"Explainer", hook:"1947 se 2024 tak — kab, kahan, kya galat hua.", angle:"Historical deep-dive", why:"Research-based content builds authority. UPSC audience loves timelines." },
  { id:12, title:"Gig economy ka sach — Swiggy waale ki kahani", category:"Trust", format:"Storytime", hook:"Uski degree thi, fir bhi delivery karta hai. Yeh uski galti nahi.", angle:"Dignity + system critique", why:"Personal story + economic reality = deep trust building content." },
  { id:13, title:"Loan waiver kya hai aur kisan ko fayda kyun nahi", category:"Trust", format:"Explainer", hook:"Sarkar ne ₹2 lakh crore maaf kiye. Kisan fir bhi kyun toota hai?", angle:"Policy reality gap", why:"Explains complex policy simply. Builds credibility as a reliable source." },
  { id:14, title:"Psychological trap: Hum galat news kyun share karte hain?", category:"Trust", format:"Talking Head", hook:"Tumhara brain jhooth zyada quickly believe karta hai — science bolta hai.", angle:"Self-awareness unlock", why:"Meta content about media literacy builds deep trust with aware audience." },
  { id:15, title:"Women workforce India mein kyu gir rahi hai?", category:"Trust", format:"Explainer", hook:"1990 mein 30% women working. 2024 mein 19%. Kyun?", angle:"Data-driven revelation", why:"Statistics + social issue = shareable, citable content. Builds research credibility." },
  { id:16, title:"Sarkari scheme jo kaam karti hai — honest review", category:"Trust", format:"Talking Head", hook:"Main sirf criticism nahi karta — yeh scheme actually helpful hai.", angle:"Balanced honest voice", why:"Being fair builds more trust than constant negativity. Audience respects balance." },
  { id:17, title:"Kaise ek scam poore district ko barbad kar deta hai", category:"Trust", format:"Mini Doc", hook:"Ek chit fund scheme. 5000 families. Sabka paisa gaya.", angle:"Investigative expose", why:"Real-life scam stories = high retention + shares. Builds journalistic credibility." },
  { id:18, title:"Mental health India mein — kyu log baat nahi karte?", category:"Trust", format:"Explainer", hook:"India mein 15 crore log mental illness se suffer karte hain. Sirf 3% treatment lete hain.", angle:"Stigma + system failure", why:"Sensitive topic handled with research builds deep community trust." },
  { id:19, title:"UPI ne kaise change ki rural India ki economy?", category:"Trust", format:"Explainer", hook:"Is gaon mein bank nahi tha. UPI se sab badal gaya.", angle:"Positive change documentary", why:"Positive + factual = shareable. Shows nuanced thinking beyond only criticism." },
  { id:20, title:"Why India's ranking falls every year — explained", category:"Trust", format:"Explainer", hook:"Press freedom, hunger index, happiness — hum gir kyun rahe hain?", angle:"Data over emotion", why:"Index-based content gets cited and shared heavily by UPSC/news audience." },
  { id:21, title:"Mera content journey — zero se yahan tak", category:"Sales", format:"Storytime", hook:"6 mahine pehle mujhe koi nahi jaanta tha. Aaj tum yahan ho.", angle:"Authentic origin story", why:"Personal journey builds parasocial connection — converts viewers to loyal followers." },
  { id:22, title:"Yeh 5 creators se main kyun alag hoon", category:"Sales", format:"Talking Head", hook:"Main sirf viral nahi, sach batane aaya hoon.", angle:"Differentiation positioning", why:"Positioning content turns casual viewers into committed audience members." },
  { id:23, title:"Mujhe follow karo — yeh reason hai", category:"Sales", format:"Short Reel", hook:"Har hafte ek aisi reality jo koi nahi batata.", angle:"Value promise CTA", why:"Direct value proposition. Converts view to follow when delivered authentically." },
  { id:24, title:"India ki woh reality jo main cover karunga", category:"Sales", format:"Talking Head", hook:"Yeh topics hain jo main 2025 mein expose karunga.", angle:"Future content teaser", why:"Series announcements build anticipation and long-term audience retention." },
  { id:25, title:"Agar tum UPSC/SSC aspirant ho — yeh dekho", category:"Sales", format:"Short Reel", hook:"Yeh channel tumhare GS ke liye free resource ban sakta hai.", angle:"Niche audience direct pitch", why:"Targeting a specific sub-audience converts at much higher rate than broad CTA." },
  { id:26, title:"Kya main sponsored content karunga? Honest jawab", category:"Sales", format:"Talking Head", hook:"Mujhe offer aa rahe hain. Yeh meri policy hai.", angle:"Transparency = trust", why:"Honesty about monetization paradoxically increases audience trust and support." },
  { id:27, title:"Tumhare comments ne yeh episode banwaya", category:"Sales", format:"Storytime", hook:"Tumne pucha, maine research kiya. Yeh lo jawab.", angle:"Community co-creation", why:"Audience involvement = ownership feeling = stronger loyalty and shares." },
  { id:28, title:"Mere saath ek din — content kaise banta hai?", category:"Sales", format:"Mini Doc", hook:"Script se shoot tak — yeh sab 18 ghante mein hota hai.", angle:"Behind the scenes access", why:"BTS content humanizes the creator and builds deeper connection with process-curious audience." },
  { id:29, title:"Yeh hai meri research process — copy karo", category:"Sales", format:"Explainer", hook:"Main fake news se aise bachta hoon — step by step.", angle:"Skill share + authority", why:"Teaching your process positions you as expert and attracts creators as audience." },
  { id:30, title:"2025 mein main yeh nahi karunga — creator boundaries", category:"Sales", format:"Talking Head", hook:"Kuch topics hain jo main nahi chhunuunga. Reason jaante ho?", angle:"Values-based positioning", why:"Showing what you stand against is as powerful as showing what you stand for." },
];export default function ContentIdeaGenerator() {
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [ideas, setIdeas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  const generateIdeas = async (forceDefault = false) => {
    if (!niche.trim() && !forceDefault) {
      setError("Niche daalo pehle.");
      return;
    }
    setError("");
    setLoading(true);
    setIdeas(null);
    setExpandedId(null);

    if (forceDefault) {
      setTimeout(() => {
        setIdeas(DEFAULT_IDEAS);
        setLoading(false);
      }, 800);
      return;
    }

    const prompt = `You are a content strategist for Indian documentary/social commentary creators (Instagram + YouTube).
Generate exactly 30 content ideas for niche: "${niche}"${audience ? `, audience: "${audience}"` : ""}.
CRITICAL: Return ONLY a raw JSON array. No markdown. No backticks. No explanation. Start with [ and end with ].
Each object must have exactly these keys:
"id" (1-30), "title" (max 10 words), "category" ("Reach" or "Trust" or "Sales"), "format" (one of: "Short Reel","Talking Head","Mini Doc","Explainer","Series","Voiceover B-Roll","Storytime"), "hook" (max 15 words, Hinglish ok), "why" (1-2 sentences), "angle" (3-5 words)
Distribute EXACTLY: 10 Reach, 10 Trust, 10 Sales. Start directly with [`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const raw = (data.content?.find(b => b.type === "text")?.text || "").trim();
      let parsed;
      try { parsed = JSON.parse(raw); }
      catch {
        const start = raw.indexOf("[");
        const end = raw.lastIndexOf("]");
        if (start !== -1 && end !== -1) parsed = JSON.parse(raw.slice(start, end + 1));
        else throw new Error("No JSON array found");
      }
      if (!Array.isArray(parsed) || parsed.length < 5) throw new Error("Bad response");
      setIdeas(parsed);
    } catch (e) {
      setError("API se connect nahi ho paaya. Neeche wala button try karo.");
    } finally {
      setLoading(false);
    }
  };

  const filtered = ideas && activeFilter !== "All" ? ideas.filter(i => i.category === activeFilter) : ideas;
  const counts = ideas ? {
    All: ideas.length,
    Reach: ideas.filter(i => i.category === "Reach").length,
    Trust: ideas.filter(i => i.category === "Trust").length,
    Sales: ideas.filter(i => i.category === "Sales").length,
  } : {};return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", color: "#E8E8F0", fontFamily: "'Inter','Segoe UI',sans-serif" }}>
      <div style={{ background: "linear-gradient(135deg,#0A0A0F,#12101A)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "28px 20px 24px", textAlign: "center" }}>
        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#A259FF", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" }}>AI Content Strategist</div>
        <h1 style={{ fontSize: "clamp(20px,5vw,32px)", fontWeight: 800, margin: "0 0 6px", background: "linear-gradient(135deg,#fff 30%,#A259FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Documentary Content Ideas</h1>
        <p style={{ color: "#666680", fontSize: "12px", margin: 0 }}>30 ideas · Reach · Trust · Sales · Hooks included</p>
      </div>

      <div style={{ padding: "24px 20px 0", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#A259FF", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "7px" }}>Tumhara Niche *</label>
          <input value={niche} onChange={e => setNiche(e.target.value)} onKeyDown={e => e.key === "Enter" && generateIdeas()}
            placeholder="e.g. Social issues, Political corruption..."
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(162,89,255,0.3)", borderRadius: "10px", padding: "12px 14px", color: "#E8E8F0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: "16px" }}>
          <label style={{ display: "block", fontSize: "10px", fontWeight: 700, color: "#666680", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "7px" }}>Target Audience (optional)</label>
          <input value={audience} onChange={e => setAudience(e.target.value)} onKeyDown={e => e.key === "Enter" && generateIdeas()}
            placeholder="e.g. 18-28 years, college students..."
            style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px", padding: "12px 14px", color: "#E8E8F0", fontSize: "14px", outline: "none", boxSizing: "border-box" }} />
        </div>
        {error && <p style={{ color: "#FF6B35", fontSize: "13px", margin: "0 0 10px", textAlign: "center" }}>{error}</p>}
        <button onClick={() => generateIdeas(false)} disabled={loading}
          style={{ width: "100%", padding: "13px", background: loading ? "rgba(162,89,255,0.3)" : "linear-gradient(135deg,#A259FF,#6B2FD9)", border: "none", borderRadius: "10px", color: "#fff", fontSize: "15px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", marginBottom: "10px" }}>
          {loading ? "✨ Generating..." : "⚡ Generate 30 Ideas (AI)"}
        </button>
        <button onClick={() => generateIdeas(true)} disabled={loading}
          style={{ width: "100%", padding: "11px", background: "transparent", border: "1px solid rgba(255,107,53,0.4)", borderRadius: "10px", color: "#FF6B35", fontSize: "13px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          📋 Gourav ke Niche ke Liye Ready Ideas Load Karo
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "50px 20px" }}>
          <div style={{ width: "36px", height: "36px", border: "3px solid rgba(162,89,255,0.2)", borderTop: "3px solid #A259FF", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 14px" }} />
          <p style={{ color: "#666680", fontSize: "13px" }}>Ideas generate ho rahi hain...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {ideas && (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px 20px 40px" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px", flexWrap: "wrap" }}>
            {["All","Reach","Trust","Sales"].map(cat => {
              const meta = cat !== "All" ? CATEGORY_META[cat] : null;
              const isActive = activeFilter === cat;
              return (
                <button key={cat} onClick={() => setActiveFilter(cat)}
                  style={{ padding: "6px 13px", borderRadius: "20px", border: isActive ? `1px solid ${meta?.color||"#A259FF"}` : "1px solid rgba(255,255,255,0.1)", background: isActive ? (meta?.bg||"rgba(162,89,255,0.12)") : "transparent", color: isActive ? (meta?.color||"#A259FF") : "#666680", fontSize: "11px", fontWeight: 700, cursor: "pointer", textTransform: "uppercase" }}>
                  {cat !== "All" && meta?.icon+" "}{cat} <span style={{opacity:0.6}}>({counts[cat]})</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
            {filtered.map(idea => {
              const meta = CATEGORY_META[idea.category] || CATEGORY_META.Reach;
              const isOpen = expandedId === idea.id;
              const fmtColor = FORMAT_COLORS[idea.format] || "#A259FF";
              return (
                <div key={idea.id} onClick={() => setExpandedId(isOpen ? null : idea.id)}
                  style={{ background: isOpen ? meta.bg : "rgba(255,255,255,0.02)", border: `1px solid ${isOpen ? meta.border : "rgba(255,255,255,0.06)"}`, borderRadius: "11px", padding: "13px 15px", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "10px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: "7px", marginBottom: "6px", flexWrap: "wrap" }}>
                        <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 7px", borderRadius: "4px", background: meta.bg, color: meta.color, border: `1px solid ${meta.border}`, textTransform: "uppercase" }}>{meta.icon} {idea.category}</span>
                        <span style={{ fontSize: "10px", fontWeight: 600, padding: "2px 7px", borderRadius: "4px", background: "rgba(255,255,255,0.04)", color: fmtColor, border: "1px solid rgba(255,255,255,0.08)" }}>{idea.format}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#E8E8F0", lineHeight: 1.4 }}>{idea.id}. {idea.title}</p>
                    </div>
                    <span style={{ color: "#444460", fontSize: "14px" }}>{isOpen ? "▲" : "▼"}</span>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "12px" }}>
                      <div style={{ marginBottom: "9px" }}>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: "#666680", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>🎯 Hook</div>
                        <p style={{ margin: 0, fontSize: "13px", color: meta.color, fontStyle: "italic" }}>"{idea.hook}"</p>
                      </div>
                      <div style={{ marginBottom: "9px" }}>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: "#666680", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>💡 Angle</div>
                        <span style={{ fontSize: "11px", padding: "3px 9px", borderRadius: "5px", background: "rgba(255,255,255,0.04)", color: "#C0C0D8", border: "1px solid rgba(255,255,255,0.08)" }}>{idea.angle}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "10px", fontWeight: 700, color: "#666680", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "4px" }}>📈 Why It'll Perform</div>
                        <p style={{ margin: 0, fontSize: "12px", color: "#888899", lineHeight: 1.5 }}>{idea.why}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", color: "#333350", fontSize: "11px", marginTop: "24px" }}>Kisi bhi card pe tap karo — hook, angle aur insight dekhne ke liye</p>
        </div>
      )}
    </div>
  );
            }
