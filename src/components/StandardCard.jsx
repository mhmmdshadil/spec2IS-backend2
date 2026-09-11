import StatusBadge from './StatusBadge';
import ConfidenceRing from './ConfidenceRing';

/**
 * StandardCard — Modern Framer-style card with soft rounded corners,
 * layered ambient shadows, crisp typography, and no generic em-dashes.
 */
export default function StandardCard({ rec, isBestMatch = false }) {
  const {
    standard_number,
    version_year,
    status,
    confidence,
    action,
    why,
    replacement_standard,
    ambiguous,
    ambiguity_reason,
  } = rec;

  return (
    <article className="framer-card p-6 sm:p-7 transition-all duration-300 hover:shadow-lg mb-5 relative">
      {/* Top row: action tag + best match badge */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          {action === 'recommended' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              Ready to cite
            </span>
          )}

          {action === 'verify_replacement' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200/70">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Check replacement first
            </span>
          )}

          {action === 'manual_verification' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200/80">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Needs manual check
            </span>
          )}

          {isBestMatch && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70">
              <svg className="w-3.5 h-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Best match
            </span>
          )}
        </div>
      </div>

      {/* Main card body: Left content + Right Confidence donut */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex-1 min-w-0">
          {/* Standard Number */}
          <h3
            className="font-mono text-2xl sm:text-3xl font-bold text-[#0f172a] m-0 mb-2.5 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {standard_number}
          </h3>

          {/* Metadata badges (No em-dashes!) */}
          <div className="flex items-center gap-2 mb-3.5 flex-wrap">
            <span className="inline-flex items-center text-xs font-semibold text-[#475569] bg-slate-100/90 border border-slate-200/60 px-2.5 py-1 rounded-md">
              Edition {version_year}
            </span>
            <StatusBadge status={status} />
          </div>

          {/* Justification / why text */}
          <p
            className="text-sm sm:text-[15px] text-[#334155] leading-relaxed m-0 mb-3 font-normal"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {why}
          </p>

          {/* Replacement Standard Alert Box */}
          {replacement_standard && (
            <div className="mt-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200/70 flex items-center gap-2 text-xs sm:text-sm text-amber-950 font-medium">
              <svg className="w-4 h-4 text-amber-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span>
                Newer standard available:{' '}
                <span className="font-mono font-bold text-amber-900 bg-amber-100/80 px-1.5 py-0.5 rounded">
                  {replacement_standard}
                </span>
              </span>
            </div>
          )}

          {/* Ambiguity Reason Alert Box */}
          {ambiguous && ambiguity_reason && (
            <div className="mt-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-[#475569] flex items-start gap-2.5 leading-relaxed">
              <span className="text-slate-400 font-bold shrink-0">ℹ</span>
              <span>{ambiguity_reason}</span>
            </div>
          )}
        </div>

        {/* Confidence Graph Widget */}
        <div className="shrink-0 flex items-center justify-center sm:self-center bg-[#fafafa] p-3 rounded-2xl border border-slate-100/80">
          <ConfidenceRing value={confidence * 100} size={102} />
        </div>
      </div>
    </article>
  );
}
