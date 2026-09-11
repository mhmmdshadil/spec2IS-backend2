/**
 * StatusBadge — Modern status badges with clean micro-copy.
 * No generic long em-dashes (—). Crisp, executive-level presentation.
 */

const STATUS_CONFIG = {
  current: {
    statusText: 'Active',
    subText: 'Current official edition',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
    dotClass: 'bg-emerald-500',
  },
  superseded: {
    statusText: 'Superseded',
    subText: 'Replaced by newer standard',
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200/70',
    dotClass: 'bg-amber-500',
  },
  withdrawn: {
    statusText: 'Withdrawn',
    subText: 'Do not cite in tender',
    badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/70',
    dotClass: 'bg-rose-500',
  },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.current;

  return (
    <div className="inline-flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${config.badgeClass}`}
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
        {config.statusText}
      </span>
      <span className="text-xs text-[#64748b] font-medium hidden sm:inline">
        {config.subText}
      </span>
    </div>
  );
}

/** Minimal dot for history list */
export function StatusDot({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.current;
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${config.dotClass}`}
      title={`${config.statusText}: ${config.subText}`}
    />
  );
}
