import { useState } from 'react';

/**
 * ReportActions — Human-in-the-loop decision support actions.
 * "Confirm and export report" + "Flag for manual review"
 */
export default function ReportActions() {
  const [isFlagged, setIsFlagged] = useState(false);

  function handleExport() {
    window.print();
  }

  function handleFlag() {
    setIsFlagged(true);
  }

  return (
    <section className="mt-8 pt-6 border-t border-slate-200/70 fade-in fade-in-delay-3 no-print">
      {isFlagged && (
        <div className="mb-5 p-4 bg-amber-50 border border-amber-200/80 rounded-2xl text-xs sm:text-sm text-amber-950 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>
              <strong>Marked for manual review.</strong> This specification and recommendation set have been flagged for procurement officer re-assessment.
            </span>
          </div>
          <button
            onClick={() => setIsFlagged(false)}
            className="text-xs text-slate-500 hover:text-slate-800 bg-transparent border-none cursor-pointer underline ml-3 shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex items-center gap-3.5 flex-wrap">
        <button
          onClick={handleExport}
          className="group px-6 py-3 rounded-full text-white text-xs sm:text-sm font-semibold tracking-tight border-none cursor-pointer flex items-center gap-2 transition-all duration-200 active:scale-[0.98]"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            backgroundColor: '#0f172a',
            boxShadow: '0 10px 24px -4px rgba(15, 23, 42, 0.22)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1e293b';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#0f172a';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <svg className="w-4 h-4 text-white/80 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          <span>Confirm and export report</span>
        </button>

        <button
          onClick={handleFlag}
          disabled={isFlagged}
          className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-tight border cursor-pointer flex items-center gap-2 transition-all duration-200 ${
            isFlagged
              ? 'text-amber-700 border-amber-300 bg-amber-50 cursor-default'
              : 'text-[#0f172a] bg-white border-slate-300 hover:border-slate-400 hover:bg-slate-50'
          }`}
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <svg className={`w-4 h-4 ${isFlagged ? 'text-amber-600' : 'text-slate-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
          </svg>
          <span>{isFlagged ? 'Flagged for review ✓' : 'Flag for manual review'}</span>
        </button>
      </div>
    </section>
  );
}
