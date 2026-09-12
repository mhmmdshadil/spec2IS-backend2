import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StandardCard from '../components/StandardCard';
import StatusBadge from '../components/StatusBadge';
import AreasToVerifyList from '../components/AreasToVerifyList';
import ReportActions from '../components/ReportActions';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { result, error } = useApp();
  const [showMoreCandidates, setShowMoreCandidates] = useState(false);

  // If no result and no error, redirect
  useEffect(() => {
    if (!result && !error) {
      navigate('/search', { replace: true });
    }
  }, [result, error, navigate]);

  // Error state — Backend Unreachable / Connection Failed
  if (error) {
    return (
      <div className="content-container fade-in py-12" style={{ maxWidth: '780px' }}>
        <div className="framer-card p-7 sm:p-8 border border-rose-200/90 bg-rose-50/40 text-left">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-base shrink-0">
              ✕
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#0f172a] m-0" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Backend unreachable
              </h2>
              <p className="text-xs text-rose-700/80 m-0 mt-0.5">
                Recommendation engine connection or timeout error
              </p>
            </div>
          </div>
          <p className="text-sm text-[#475569] m-0 leading-relaxed max-w-2xl">{error}</p>
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => navigate('/search')}
              className="text-sm font-semibold text-white bg-[#0f172a] px-6 py-2.5 rounded-full cursor-pointer border-none hover:bg-slate-800 transition-all duration-200"
            >
              Try again
            </button>
            <button
              onClick={() => navigate('/search')}
              className="text-sm font-semibold text-[#475569] bg-white border border-slate-200/80 px-5 py-2.5 rounded-full cursor-pointer hover:bg-slate-50 transition-all duration-200"
            >
              Edit specification
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { specification, recommendations = [], areas_to_verify } = result;

  // Sort by confidence descending
  const sorted = [...recommendations].sort((a, b) => (b.confidence ?? 0) - (a.confidence ?? 0));
  const bestMatchNumber = sorted.length > 0 ? sorted[0].standard_number : null;

  // Empty recommendations
  if (sorted.length === 0) {
    return (
      <div className="content-container fade-in py-6" style={{ maxWidth: '780px' }}>
        {/* Section A — Spec submitted */}
        <SectionSpecification specification={specification} />

        <div className="framer-card p-8 text-center my-6">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">
            🔍
          </div>
          <h2 className="text-xl font-bold text-[#0f172a] m-0 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            No matching standards found
          </h2>
          <p className="text-sm text-[#64748b] m-0 leading-relaxed max-w-md mx-auto">
            We couldn't find an official Indian Standard that confidently matches this specification. Try adding material grades, electrical parameters, or intended application context.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="mt-6 text-sm font-semibold text-white bg-[#0f172a] px-7 py-3 rounded-full cursor-pointer border-none hover:bg-slate-800 transition-all duration-200"
          >
            Revise specification
          </button>
        </div>
      </div>
    );
  }

  // Show top 3 by confidence as full cards, remaining ones collapsed into compact list
  const topRecommendations = sorted.slice(0, 3);
  const remainingRecommendations = sorted.slice(3);

  return (
    <div className="content-container py-4 sm:py-6" style={{ maxWidth: '780px' }}>
      {/* Section A — Analyzed Specification */}
      <section className="fade-in">
        <SectionSpecification specification={specification} />
      </section>

      {/* Section B — Recommended Standards */}
      <section className="fade-in fade-in-delay-1 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-xl sm:text-2xl font-bold text-[#0f172a] m-0 tracking-tight flex items-center gap-2.5"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Recommended Standards
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200/80">
              {sorted.length} {sorted.length === 1 ? 'result' : 'ranked results'}
            </span>
          </h2>
        </div>

        {/* Top 3 Full Standard Cards */}
        <div className="space-y-4">
          {topRecommendations.map((rec) => (
            <StandardCard
              key={rec.standard_number}
              rec={rec}
              isBestMatch={
                sorted.length > 1 && rec.standard_number === bestMatchNumber
              }
            />
          ))}
        </div>

        {/* Remaining Candidates: Collapsible Compact List */}
        {remainingRecommendations.length > 0 && (
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setShowMoreCandidates((prev) => !prev)}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-slate-200/80 bg-[#f8fafc] hover:bg-[#f1f5f9] text-xs sm:text-sm font-semibold text-[#334155] cursor-pointer transition-all duration-200 select-none shadow-xs"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <span>
                {showMoreCandidates
                  ? 'Hide additional candidates'
                  : `Show ${remainingRecommendations.length} more candidates`}
              </span>
              <svg
                className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${
                  showMoreCandidates ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showMoreCandidates && (
              <div className="mt-3 framer-card overflow-hidden divide-y divide-slate-100 border border-slate-200/80 fade-in">
                {remainingRecommendations.map((rec) => (
                  <div
                    key={rec.standard_number}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono font-bold text-sm sm:text-base text-[#0f172a] tracking-tight">
                        {rec.standard_number}
                      </span>
                      <StatusBadge status={rec.status} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-slate-700 bg-slate-100/90 px-2.5 py-1 rounded-full border border-slate-200/60 shrink-0 font-mono">
                      {Math.round((rec.confidence ?? 0) * 100)}% match
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Section C — Areas to Verify (only rendered when non-empty) */}
      {areas_to_verify && areas_to_verify.length > 0 && (
        <AreasToVerifyList areas={areas_to_verify} />
      )}

      {/* Section D — Human-in-the-loop Actions */}
      <ReportActions />
    </div>
  );
}

/** Section A — Submitted spec in Framer Card style */
function SectionSpecification({ specification }) {
  return (
    <div className="framer-card p-5 sm:p-6 mb-6">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Specification Submitted
        </span>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
          BIS Verified Catalog
        </span>
      </div>
      <p
        className="text-sm sm:text-base font-medium text-[#0f172a] leading-relaxed m-0"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        {specification}
      </p>
    </div>
  );
}

