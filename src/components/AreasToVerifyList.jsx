/**
 * AreasToVerifyList — renders the areas_to_verify array.
 * Only shown when the array is non-empty.
 */
export default function AreasToVerifyList({ areas }) {
  if (!areas || areas.length === 0) return null;

  return (
    <section className="mt-6 fade-in fade-in-delay-3">
      <div
        className="border border-caution/30 rounded-sm px-5 py-4"
        style={{ borderLeftWidth: '3px', borderLeftColor: '#B8792E' }}
      >
        <h3 className="font-serif text-base font-semibold text-ink m-0 mb-3">
          Areas to verify
        </h3>
        <ul className="list-none p-0 m-0 space-y-2">
          {areas.map((area, idx) => (
            <li
              key={idx}
              className="text-sm text-slate-ui leading-relaxed flex items-start gap-2"
            >
              <span className="text-caution mt-1 shrink-0" style={{ fontSize: '8px' }}>
                ●
              </span>
              {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
