import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SpecInputForm from '../components/SpecInputForm';

export default function InputPage() {
  const navigate = useNavigate();
  const { startAnalysis } = useApp();

  function handleSubmit(text) {
    startAnalysis(text);
    navigate('/analyzing');
  }

  return (
    <div id="workbench" className="content-container fade-in py-4 sm:py-6" style={{ maxWidth: '780px' }}>
      {/* Header with Apple/Plus Jakarta Sans Typography */}
      <div className="mb-6 sm:mb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-3.5">
          <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-xs font-semibold text-indigo-900 tracking-tight">
            Bureau of Indian Standards Co-Pilot
          </span>
        </div>
        <h1
          className="m-0 mb-2.5 text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] tracking-tight leading-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif" }}
        >
          Find the applicable Indian Standard
        </h1>
        <p
          className="m-0 text-sm sm:text-base text-[#64748b] leading-relaxed max-w-2xl"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Paste a technical specification and get an instant, ranked, status-checked recommendation verified against official records.
        </p>
      </div>

      {/* Input Form wrapped in Framer Testimonial UI Card style */}
      <div className="framer-card p-6 sm:p-8 md:p-9 transition-all duration-300">
        <SpecInputForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
