/**
 * StatusBadge — color-coded left-border strip + status label.
 * Not a pill badge; it's a subtle strip that reads as part of the document.
 */

const STATUS_CONFIG = {
  current: {
    label: 'Active — current edition',
    colorClass: 'text-verified',
    borderClass: 'border-l-verified',
    dotClass: 'bg-verified',
  },
  superseded: {
    label: 'Superseded — a newer edition exists',
    colorClass: 'text-caution',
    borderClass: 'border-l-caution',
    dotClass: 'bg-caution',
  },
  withdrawn: {
    label: 'Withdrawn — do not cite this standard',
    colorClass: 'text-signal',
    borderClass: 'border-l-signal',
    dotClass: 'bg-signal',
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.current;

  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${config.colorClass}`}>
      <span
        className={`inline-block w-2 h-2 rounded-full ${config.dotClass}`}
        style={{ flexShrink: 0 }}
      />
      {config.label}
    </span>
  );
}

/** Minimal dot for history list */
export function StatusDot({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.current;
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${config.dotClass}`}
      title={config.label}
    />
  );
}
