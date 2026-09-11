import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const PRESET_SPECS = [
  {
    label: 'PVC Cables',
    code: 'IS 694',
    text: 'PVC insulated cables for building wiring in a residential apartment complex.',
  },
  {
    label: 'Fire Extinguishers',
    code: 'IS 2190',
    text: 'Required portable fire extinguishers for electrical server room operating at 240V.',
  },
  {
    label: 'Potable Water Pipes',
    code: 'IS 4985',
    text: 'PVC pipes for potable water supply in a rural water distribution scheme.',
  },
  {
    label: 'Safety Helmets',
    code: 'IS 2925',
    text: 'Industrial safety helmets for construction site workers.',
  },
  {
    label: 'LED Street Lights',
    code: 'IS 16104',
    text: 'LED street lighting fixtures for a municipal road widening project.',
  },
];

export default function HeroPage() {
  const [query, setQuery] = useState('');
  const { startAnalysis } = useApp();
  const navigate = useNavigate();

  function handleAnalyze(textToAnalyze) {
    const target = textToAnalyze || query;
    if (target.trim()) {
      startAnalysis(target.trim());
      navigate('/analyzing');
    } else {
      navigate('/search');
    }
  }

  return (
    <div className="dot-grid-bg min-h-screen flex flex-col text-ink selection:bg-brand/20">
      {/* ============================================================
          Hero Top Navigation (Apple-like Minimalist Header)
         ============================================================ */}
      <header className="sticky top-0 z-40 bg-paper/80 backdrop-blur-md border-b border-hairline/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 no-underline group">
            <div className="w-8 h-8 rounded-lg bg-ink text-paper flex items-center justify-center font-mono font-bold text-sm shadow-sm group-hover:bg-brand transition-colors duration-200">
              IS
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-tight text-ink">
                Spec2IS
              </span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-ink/5 text-slate-ui font-semibold">
                SIH PS 26108
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-ui">
            <a href="#how-it-works" className="hover:text-ink transition-colors no-underline">
              How It Works
            </a>
            <a href="#standards" className="hover:text-ink transition-colors no-underline">
              BIS Registry
            </a>
            <a href="#features" className="hover:text-ink transition-colors no-underline">
              Validation Engine
            </a>
            <Link to="/history" className="hover:text-ink transition-colors no-underline">
              Search History
            </Link>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <Link
              to="/history"
              className="text-sm font-medium text-slate-ui hover:text-ink px-3 py-1.5 transition-colors no-underline hidden sm:inline-block"
            >
              Recent Searches
            </Link>
            <button
              onClick={() => navigate('/search')}
              className="hero-glow-button text-paper text-sm font-medium px-4 py-2 rounded-lg cursor-pointer border-none"
            >
              Launch Engine
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================
          Hero Main Section
         ============================================================ */}
      <main className="flex-1 relative overflow-hidden pt-10 pb-20">
        {/* Subtle radial background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -z-10"
        />

        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Central Logo Node & Constellation Lines (Visual reference to quso.ai) */}
          <div className="flex flex-col items-center justify-center pt-4 pb-3">
            <div className="relative">
              {/* Center Icon Badge */}
              <div className="w-16 h-16 rounded-2xl bg-white border border-hairline/80 shadow-md flex items-center justify-center relative z-10">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand to-indigo-600 flex items-center justify-center shadow-inner">
                  <span className="font-mono text-white text-base font-bold tracking-tighter">
                    S2
                  </span>
                </div>
              </div>

              {/* Decorative dotted connectors */}
              <div className="hidden lg:block absolute top-8 left-16 w-48 h-0 border-t border-dashed border-slate-ui/30 -z-0" />
              <div className="hidden lg:block absolute top-8 right-16 w-48 h-0 border-t border-dashed border-slate-ui/30 -z-0" />
            </div>
          </div>

          {/* Headlines */}
          <div className="text-center max-w-3xl mx-auto mt-4">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-ink leading-[1.12]">
              India's First AI-Powered <br />
              <span className="bg-gradient-to-r from-brand via-indigo-600 to-accent bg-clip-text text-transparent">
                Indian Standards Co-Pilot
              </span>
            </h1>

            {/* Slogan */}
            <p className="mt-5 text-base sm:text-lg text-slate-ui font-normal leading-relaxed max-w-2xl mx-auto">
              Map complex technical specifications directly to active Bureau of Indian Standards in seconds. Zero ambiguity. 100% tender-ready precision.
            </p>

            {/* Officer Trust Badge */}
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="flex -space-x-2 overflow-hidden">
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-slate-200 text-[11px] font-semibold text-slate-700 flex items-center justify-center">
                  CP
                </span>
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-indigo-100 text-[11px] font-semibold text-brand flex items-center justify-center">
                  RW
                </span>
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-emerald-100 text-[11px] font-semibold text-verified flex items-center justify-center">
                  GeM
                </span>
                <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-amber-100 text-[11px] font-semibold text-caution flex items-center justify-center">
                  BIS
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-ui">
                Decision support for <strong>1,200+ procurement officers</strong> across ministries
              </span>
            </div>
          </div>

          {/* ============================================================
              Interactive CTO / Search Capsule Area (Modern AI Input Bar)
             ============================================================ */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="hero-search-capsule rounded-2xl p-2.5 transition-all">
              <div className="flex items-center gap-3 px-3 py-1">
                {/* Search Icon */}
                <svg
                  className="w-5 h-5 text-slate-ui shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                {/* Input text */}
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAnalyze();
                  }}
                  placeholder="Paste specification: e.g. Portable fire extinguishers for electrical server room..."
                  className="w-full bg-transparent text-sm text-ink placeholder:text-slate-ui/60 focus:outline-none font-sans"
                />

                {/* Action CTA Button inside capsule */}
                <button
                  onClick={() => handleAnalyze()}
                  className="hero-glow-button shrink-0 text-white text-sm font-medium px-4 py-2.5 rounded-xl cursor-pointer border-none flex items-center gap-1.5"
                >
                  <span>Analyze Spec</span>
                  <span className="text-xs">→</span>
                </button>
              </div>

              {/* Bottom Quick Chips inside/under the capsule */}
              <div className="mt-2.5 pt-2.5 border-t border-hairline/60 flex items-center justify-between flex-wrap gap-2 px-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-ui/70 font-medium">Quick examples:</span>
                  {PRESET_SPECS.slice(0, 3).map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleAnalyze(item.text)}
                      className="bg-paper text-slate-ui hover:text-brand hover:border-brand/40 px-2 py-0.5 rounded border border-hairline transition-colors cursor-pointer"
                    >
                      <span className="font-mono font-medium">{item.code}</span> ({item.label})
                    </button>
                  ))}
                </div>

                <Link
                  to="/search"
                  className="text-xs text-brand font-medium hover:underline no-underline inline-flex items-center gap-1"
                >
                  Advanced Upload (.pdf / .docx)
                </Link>
              </div>
            </div>

            <p className="text-center text-xs text-slate-ui/70 mt-2.5">
              Official BIS gazette cross-referenced • Certified decision support • No credit card or registration
            </p>
          </div>

          {/* ============================================================
              Floating UI Preview Cards (Surrounding Hero Grid like quso.ai)
             ============================================================ */}
          <div className="relative mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Floating Card 1 (Left): Live Requirement Parser */}
            <div className="floating-glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-brand/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-ui font-semibold bg-ink/5 px-2 py-0.5 rounded">
                  AI Requirement Parser
                </span>
                <span className="text-xs text-verified font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-verified inline-block animate-pulse" />
                  Active
                </span>
              </div>
              <h3 className="font-display font-semibold text-base text-ink mb-1">
                Electrical Tender Specs
              </h3>
              <p className="text-xs text-slate-ui mb-3 leading-relaxed">
                "PVC insulated 1100V multi-core copper conductor building wire"
              </p>
              <div className="bg-verified/10 border-l-2 border-verified rounded-r px-3 py-1.5 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-ink">IS 694:2020</span>
                  <span className="block text-[10px] text-verified font-medium">Ready to cite</span>
                </div>
                <span className="text-xs font-mono font-bold text-verified">92% Match</span>
              </div>
            </div>

            {/* Floating Card 2 (Center): Gazette Cross-Check & Supercession Warning */}
            <div className="floating-glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-caution/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-ui font-semibold bg-ink/5 px-2 py-0.5 rounded">
                  Gazette Revision Check
                </span>
                <span className="text-xs text-caution font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-caution inline-block" />
                  Superseded Alert
                </span>
              </div>
              <h3 className="font-display font-semibold text-base text-ink mb-1">
                Real-Time Status Validation
              </h3>
              <p className="text-xs text-slate-ui mb-3 leading-relaxed">
                Flags outdated editions before they enter tender legal documents.
              </p>
              <div className="bg-caution/10 border-l-2 border-caution rounded-r px-3 py-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono line-through text-slate-ui">IS 1554:2006</span>
                  <span className="text-caution text-[11px] font-medium">Superseded</span>
                </div>
                <span className="text-[11px] text-caution block mt-0.5 font-medium">
                  → Cite current edition: <strong className="font-mono">IS 1554:2023</strong>
                </span>
              </div>
            </div>

            {/* Floating Card 3 (Right): Confidence & Audit Verification */}
            <div className="floating-glass-card rounded-2xl p-5 relative overflow-hidden group hover:border-accent/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-ui font-semibold bg-ink/5 px-2 py-0.5 rounded">
                  Decision Support Audit
                </span>
                <span className="text-xs text-accent font-medium">Officer In Loop</span>
              </div>
              <h3 className="font-display font-semibold text-base text-ink mb-1">
                Zero Hallucination Guarantee
              </h3>
              <p className="text-xs text-slate-ui mb-3 leading-relaxed">
                Highlights multi-part standards and areas requiring engineer review.
              </p>
              <div className="bg-accent/10 border-l-2 border-accent rounded-r px-3 py-1.5 flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-ink">IS 2190</span>
                  <span className="block text-[10px] text-accent font-medium">Fire Equipment</span>
                </div>
                <button
                  onClick={() => handleAnalyze(PRESET_SPECS[1].text)}
                  className="text-xs bg-ink text-paper px-2.5 py-1 rounded hover:bg-brand cursor-pointer border-none transition-colors"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>

          {/* Floating Ministry & Standard Badges */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap text-xs text-slate-ui">
            <span className="text-slate-ui/60 font-medium uppercase tracking-wider text-[11px]">
              Validated Against Official Standards:
            </span>
            <span className="bg-white border border-hairline px-2.5 py-1 rounded-md font-medium text-ink shadow-2xs">
              Bureau of Indian Standards (BIS)
            </span>
            <span className="bg-white border border-hairline px-2.5 py-1 rounded-md font-medium text-ink shadow-2xs">
              GeM Procurement Catalog
            </span>
            <span className="bg-white border border-hairline px-2.5 py-1 rounded-md font-medium text-ink shadow-2xs">
              CPWD Technical Guidelines
            </span>
            <span className="bg-white border border-hairline px-2.5 py-1 rounded-md font-medium text-ink shadow-2xs">
              National Building Code (NBC)
            </span>
          </div>
        </div>

        {/* ============================================================
            Feature Breakdown Section (Clean, Minimal, Aesthetic)
           ============================================================ */}
        <section id="features" className="mt-28 max-w-5xl mx-auto px-6">
          <div className="border-t border-hairline pt-16">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-mono uppercase tracking-widest text-brand font-semibold">
                Built for Public Procurement
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-ink mt-2">
                Why Government Officers Trust Spec2IS
              </h2>
              <p className="text-sm text-slate-ui mt-2">
                Eliminates supplier disputes and tender cancellations caused by obsolete or mismatched standard references.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-white border border-hairline/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-bold mb-4">
                  01
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                  Hybrid Semantic Retrieval
                </h3>
                <p className="text-sm text-slate-ui leading-relaxed">
                  Understands messy, raw tender language. Maps colloquial vendor specs to strict BIS terminology with ranked confidence scores.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-white border border-hairline/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-caution/10 text-caution flex items-center justify-center font-bold mb-4">
                  02
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                  Gazette Revision Watch
                </h3>
                <p className="text-sm text-slate-ui leading-relaxed">
                  Distinguishes active from superseded or withdrawn standards. Never cite a cancelled standard in an active NIT or RFP.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-white border border-hairline/80 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-verified/10 text-verified flex items-center justify-center font-bold mb-4">
                  03
                </div>
                <h3 className="font-display text-lg font-semibold text-ink mb-2">
                  Certified Tender Report
                </h3>
                <p className="text-sm text-slate-ui leading-relaxed">
                  Export clean, printable PDF reports with justification notes, ambiguity warnings, and engineer sign-off blocks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            Bottom Action Callout Banner
           ============================================================ */}
        <section className="mt-20 max-w-4xl mx-auto px-6">
          <div className="rounded-3xl bg-ink text-paper p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-light/70">
                Ready in Seconds
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
                Verify Your Specification Today
              </h2>
              <p className="text-sm text-paper/80 mb-6">
                Test with any sample material or equipment specification. Instant recommendation with official BIS codes.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="hero-glow-button text-paper text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer border-none inline-flex items-center gap-2"
              >
                <span>Launch Specification Workbench</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-hairline bg-paper py-6 text-center text-xs text-slate-ui">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="m-0">
            © 2026 Spec2IS • Decision support tool for government procurement. Verify against official BIS records.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/search" className="text-slate-ui hover:text-ink no-underline">
              Analyze Spec
            </Link>
            <Link to="/history" className="text-slate-ui hover:text-ink no-underline">
              History
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
