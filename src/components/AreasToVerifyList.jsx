/**
 * AreasToVerifyList — Renders verification flags in a modern Framer-style card.
 * Only shown when the array is non-empty.
 */
export default function AreasToVerifyList({ areas }) {
  if (!areas || areas.length === 0) return null;

  return (
    <section className="mt-8 mb-6 fade-in fade-in-delay-2">
      <div className="framer-card p-6 sm:p-7 border border-amber-200/70 bg-gradient-to-b from-amber-50/40 to-white">
        <div className="flex items-center gap-2.5 mb-3.5">
          <div className="w-8 h-8 rounded-full bg-amber-100/90 text-amber-700 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3
              className="text-base sm:text-lg font-bold text-[#0f172a] m-0 tracking-tight"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Areas to verify before tender issuance
            </h3>
            <p className="text-xs text-[#64748b] m-0 mt-0.5">
              Identified scope nuances requiring procurement officer review
            </p>
          </div>
        </div>

        <ul className="list-none p-0 m-0 space-y-2.5 mt-4 pt-3 border-t border-amber-200/50">
          {areas.map((area, idx) => (
            <li
              key={idx}
              className="text-xs sm:text-sm text-[#334155] leading-relaxed flex items-start gap-2.5 bg-white/70 p-3 rounded-xl border border-amber-100/80"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
