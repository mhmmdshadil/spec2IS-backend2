import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StandardCard from '../components/StandardCard';
import AreasToVerifyList from '../components/AreasToVerifyList';
import ReportActions from '../components/ReportActions';

export default function ResultsPage() {
  const navigate = useNavigate();
  const { result, error, specificationText } = useApp();

  // If no result and no error, redirect
  useEffect(() => {
    if (!result && !error) {
      navigate('/search', { replace: true });
    }
  }, [result, error, navigate]);

  // Error state
  if (error) {
    return (
      <div className="content-container fade-in py-12">
        <div className="border border-signal/30 rounded-sm px-5 py-6" style={{ borderLeftWidth: '3px', borderLeftColor: '#B23A34' }}>
          <h2 className="font-serif text-lg text-ink m-0 mb-2">Something went wrong</h2>
          <p className="text-sm text-slate-ui m-0 leading-relaxed">{error}</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 text-sm font-medium text-paper bg-ink px-5 py-2 rounded cursor-pointer border-none hover:opacity-90 transition-opacity duration-200"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { specification, recommendations, areas_to_verify } = result;

  // Sort by confidence descending
  const sorted = [...recommendations].sort((a, b) => b.confidence - a.confidence);
  const bestMatchNumber = sorted.length > 0 ? sorted[0].standard_number : null;

  // Empty recommendations
  if (sorted.length === 0) {
    return (
      <div className="content-container fade-in py-12">
        {/* Section A — Spec submitted */}
        <SectionSpecification specification={specification} />

        <hr className="hairline" />

        <div className="py-8">
          <h2 className="font-serif text-lg text-ink m-0 mb-3">No matching standards found</h2>
          <p className="text-sm text-slate-ui m-0 leading-relaxed max-w-prose">
            We couldn't find a standard that confidently matches this
            specification. Try adding more detail about the material, product
            type, or intended use.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="mt-6 text-sm font-medium text-paper bg-ink px-5 py-2 rounded cursor-pointer border-none hover:opacity-90 transition-opacity duration-200"
          >
            Revise specification
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      {/* Section A — Your Specification */}
      <section className="fade-in">
        <SectionSpecification specification={specification} />
      </section>

      <hr className="hairline" />

      {/* Section B — Recommended Standards */}
      <section className="fade-in fade-in-delay-1">
        <h2 className="font-serif text-lg text-ink m-0 mb-5">
          Recommended Standards
        </h2>

        <div className="space-y-0">
          {sorted.map((rec, idx) => (
            <div key={rec.standard_number}>
              <StandardCard
                rec={rec}
                isBestMatch={
                  sorted.length > 1 && rec.standard_number === bestMatchNumber
                }
              />
              {idx < sorted.length - 1 && <hr className="hairline" />}
            </div>
          ))}
        </div>
      </section>

      {/* Section C — Areas to Verify */}
      <AreasToVerifyList areas={areas_to_verify} />

      {/* Section D — Actions */}
      <ReportActions />
    </div>
  );
}

/** Small reusable block for Section A */
function SectionSpecification({ specification }) {
  return (
    <>
      <p className="text-xs font-medium text-slate-ui uppercase tracking-wide m-0 mb-2" style={{ letterSpacing: '0.05em' }}>
        Specification submitted
      </p>
      <div className="bg-ink/3 border border-hairline rounded-sm px-4 py-3">
        <p className="text-sm text-ink leading-relaxed m-0">{specification}</p>
      </div>
    </>
  );
}
