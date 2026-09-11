import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { reset } = useApp();
  const navigate = useNavigate();

  function handleNewSearch() {
    reset();
    navigate('/search');
  }

  return (
    <header
      className="border-b border-hairline bg-paper/90 backdrop-blur-sm"
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div className="content-container flex items-center justify-between py-3.5">
        {/* App name with minimalist badge */}
        <Link
          to="/"
          className="flex items-center gap-2.5 no-underline group"
        >
          <div className="w-7 h-7 rounded-md bg-ink text-paper flex items-center justify-center font-mono font-bold text-xs shadow-xs group-hover:bg-brand transition-colors duration-200">
            IS
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display font-extrabold text-lg tracking-tight text-ink">
              Spec2IS
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-ink/5 text-slate-ui font-semibold">
              PS 26108
            </span>
          </div>
        </Link>

        {/* Right side nav */}
        <nav className="flex items-center gap-5">
          <Link
            to="/"
            className="text-sm font-medium text-slate-ui no-underline hover:text-ink transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/history"
            className="text-sm font-medium text-slate-ui no-underline hover:text-ink transition-colors duration-200"
          >
            History
          </Link>
          <button
            onClick={handleNewSearch}
            className="text-sm font-medium text-paper bg-ink px-3.5 py-1.5 rounded-md cursor-pointer border-none hover:opacity-90 transition-opacity duration-200"
          >
            New Search
          </button>
        </nav>
      </div>
    </header>
  );
}
