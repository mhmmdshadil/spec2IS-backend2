import StatusBadge from './StatusBadge';
import ConfidenceRing from './ConfidenceRing';

/**
 * Action tag label mapping.
 */
const ACTION_LABELS = {
  recommended: 'Ready to cite',
  verify_replacement: 'Check replacement first',
  manual_verification: 'Needs manual check',
};

const ACTION_STYLES = {
  recommended: 'bg-verified/10 text-verified',
  verify_replacement: 'bg-caution/10 text-caution',
  manual_verification: 'bg-slate-ui/10 text-slate-ui',
};

/**
 * StandardCard — one recommendation block.
 * Hero element is the standard_number in monospace.
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

  const statusBorderClass =
    status === 'current'
      ? 'status-strip--current'
      : status === 'superseded'
        ? 'status-strip--superseded'
        : 'status-strip--withdrawn';

  return (
    <article className={`status-strip ${statusBorderClass} py-5`}>
      {/* Top row: action tag + best match dot */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${ACTION_STYLES[action] || ACTION_STYLES.manual_verification}`}
        >
          {ACTION_LABELS[action] || action}
        </span>
        {isBestMatch && (
          <span className="inline-flex items-center gap-1 text-xs text-accent font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
            Best match
          </span>
        )}
      </div>

      {/* Main content: left text, right confidence ring */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 min-w-0">
          {/* Standard number — hero element */}
          <h3
            className="font-mono text-2xl font-medium text-ink m-0 mb-1 tracking-tight"
            style={{ letterSpacing: '-0.01em' }}
          >
            {standard_number}
          </h3>

          {/* Metadata row: edition/year · status */}
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className="text-sm text-slate-ui">
              Edition {version_year}
            </span>
            <span className="text-hairline">·</span>
            <StatusBadge status={status} />
          </div>

          {/* Justification (why) — single prose line */}
          <p className="text-sm text-slate-ui leading-relaxed m-0 mb-2 max-w-prose">
            {why}
          </p>

          {/* Replacement standard note */}
          {replacement_standard && (
            <p className="text-sm text-caution m-0 mb-2">
              Newer standard available:{' '}
              <span className="font-mono font-medium">{replacement_standard}</span>
            </p>
          )}

          {/* Ambiguity note */}
          {ambiguous && ambiguity_reason && (
            <p className="text-sm text-slate-ui m-0 mt-2 pl-3 border-l-2 border-hairline italic">
              {ambiguity_reason}
            </p>
          )}
        </div>

        {/* Confidence ring */}
        <div className="shrink-0">
          <ConfidenceRing value={confidence * 100} />
        </div>
      </div>
    </article>
  );
}
