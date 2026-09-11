import { useState } from 'react';

/**
 * ReportActions — the human-in-the-loop step.
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
    <section className="mt-8 pt-6 border-t border-hairline fade-in fade-in-delay-4 no-print">
      {isFlagged && (
        <div className="mb-4 px-4 py-3 bg-caution/10 border border-caution/30 rounded-sm text-sm text-caution flex items-center justify-between">
          <span>
            <strong>Flagged for manual review.</strong> This specification and recommendation set have been marked for human officer verification before tender citation.
          </span>
          <button
            onClick={() => setIsFlagged(false)}
            className="text-xs text-slate-ui bg-transparent border-none cursor-pointer underline ml-3"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={handleExport}
          className="text-sm font-medium text-paper bg-ink px-5 py-2.5 rounded cursor-pointer border-none hover:opacity-90 transition-opacity duration-200"
        >
          Confirm and export report
        </button>
        <button
          onClick={handleFlag}
          disabled={isFlagged}
          className={`text-sm font-medium px-5 py-2.5 rounded cursor-pointer border transition-colors duration-200 ${
            isFlagged
              ? 'text-caution border-caution/40 bg-caution/5 cursor-default'
              : 'text-ink bg-transparent border-hairline hover:border-ink/30'
          }`}
        >
          {isFlagged ? 'Flagged for review ✓' : 'Flag for manual review'}
        </button>
      </div>
    </section>
  );
}
