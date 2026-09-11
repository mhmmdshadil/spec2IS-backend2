import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StatusDot } from '../components/StatusBadge';

export default function HistoryPage() {
  const navigate = useNavigate();
  const { history, loadFromHistory } = useApp();

  function handleRowClick(item) {
    loadFromHistory(item);
    navigate('/results');
  }

  if (history.length === 0) {
    return (
      <div className="content-container fade-in py-12" style={{ maxWidth: '780px' }}>
        <div className="framer-card p-8 sm:p-10 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3 text-xl">
            🕒
          </div>
          <h1
            className="text-2xl font-bold text-[#0f172a] m-0 mb-2 tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            No Search History
          </h1>
          <p className="text-sm text-[#64748b] max-w-sm mx-auto m-0 leading-relaxed">
            Analyses you run during this session will be preserved here for instant re-citation.
          </p>
          <button
            onClick={() => navigate('/search')}
            className="mt-6 text-sm font-semibold text-white bg-[#0f172a] px-7 py-3 rounded-full cursor-pointer border-none hover:bg-slate-800 transition-all duration-200"
          >
            Start an analysis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container fade-in py-4 sm:py-6" style={{ maxWidth: '780px' }}>
      <div className="mb-6">
        <h1
          className="text-2xl sm:text-3xl font-bold text-[#0f172a] m-0 mb-1 tracking-tight"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Analysis History
        </h1>
        <p className="text-sm text-[#64748b] m-0">
          Saved specification checks from this active session
        </p>
      </div>

      <div className="space-y-3">
        {history.map((item) => {
          const topRec =
            item.result?.recommendations?.length > 0
              ? [...item.result.recommendations].sort(
                  (a, b) => b.confidence - a.confidence
                )[0]
              : null;

          const date = new Date(item.timestamp);
          const timeStr = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
          const dateStr = date.toLocaleDateString([], {
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={item.id}
              onClick={() => handleRowClick(item)}
              className="framer-card p-5 sm:p-6 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm sm:text-base font-semibold text-[#0f172a] m-0 mb-1.5 truncate"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {item.specificationText}
                  </p>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-[#94a3b8] font-medium">
                      {dateStr} at {timeStr}
                    </span>
                    {topRec && (
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md">
                        <span className="text-xs font-mono font-bold text-slate-800">
                          {topRec.standard_number}
                        </span>
                        <StatusDot status={topRec.status} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-slate-100 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
