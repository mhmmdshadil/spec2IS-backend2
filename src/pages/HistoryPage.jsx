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
      <div className="content-container fade-in py-12">
        <h1 className="font-serif text-ink mb-3">History</h1>
        <p className="text-sm text-slate-ui max-w-prose">
          No past searches yet. Analyses you run this session will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="content-container fade-in">
      <h1 className="font-serif text-ink mb-6">History</h1>

      <div className="space-y-0">
        {history.map((item, idx) => {
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
            <div key={item.id}>
              <button
                onClick={() => handleRowClick(item)}
                className="w-full text-left bg-transparent border-none cursor-pointer py-4 px-0 hover:bg-ink/3 rounded-sm transition-colors duration-200"
                style={{ display: 'block' }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink m-0 mb-1 truncate font-medium">
                      {item.specificationText.length > 80
                        ? item.specificationText.slice(0, 80) + '…'
                        : item.specificationText}
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-ui">
                        {dateStr} at {timeStr}
                      </span>
                      {topRec && (
                        <>
                          <span className="text-hairline">·</span>
                          <span className="text-xs font-mono text-ink font-medium">
                            {topRec.standard_number}
                          </span>
                          <StatusDot status={topRec.status} />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Chevron */}
                  <span className="text-slate-ui text-sm mt-1 shrink-0">›</span>
                </div>
              </button>
              {idx < history.length - 1 && <hr className="hairline m-0" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
