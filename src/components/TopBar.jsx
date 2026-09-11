import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function TopBar() {
  const { reset } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  function handleNewSearch() {
    reset();
    navigate('/search');
  }

  const isHome = location.pathname === '/';
  const isSearch = location.pathname === '/search';
  const isHistory = location.pathname === '/history';

  return (
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none no-print">
      <div className="pointer-events-auto liquid-glass-nav flex items-center justify-between px-4 sm:px-5 py-2 sm:py-2.5 rounded-full w-full max-w-xl sm:max-w-2xl md:max-w-3xl transition-all duration-300">
        {/* Brand Logo: Pure typographic text "Spec2IS" (no icon), Apple/Poppins typography */}
        <Link
          to="/"
          className="font-extrabold text-lg sm:text-xl text-ink no-underline select-none hover:opacity-85 transition-opacity duration-200"
          style={{ letterSpacing: '-0.04em', fontFamily: "'Poppins', sans-serif" }}
        >
          Spec<span className="text-brand">2</span>IS
        </Link>

        {/* Navigation items */}
        <nav className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium">
          <Link
            to="/"
            className={`liquid-glass-pill px-3 sm:px-3.5 py-1.5 no-underline transition-colors ${
              isHome
                ? 'liquid-glass-pill-active'
                : 'text-slate-ui hover:text-ink'
            }`}
          >
            Home
          </Link>
          <Link
            to="/search"
            className={`liquid-glass-pill px-3 sm:px-3.5 py-1.5 no-underline transition-colors ${
              isSearch
                ? 'liquid-glass-pill-active'
                : 'text-slate-ui hover:text-ink'
            }`}
          >
            Workbench
          </Link>
          <Link
            to="/history"
            className={`liquid-glass-pill px-3 sm:px-3.5 py-1.5 no-underline transition-colors ${
              isHistory
                ? 'liquid-glass-pill-active'
                : 'text-slate-ui hover:text-ink'
            }`}
          >
            History
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center">
          <button
            onClick={handleNewSearch}
            className="hero-glow-button text-white text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-1.5 rounded-full border-none cursor-pointer"
          >
            Analyze
          </button>
        </div>
      </div>
    </header>
  );
}
