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

  const isSearch = location.pathname === '/search';
  const isHistory = location.pathname === '/history';

  return (
    <header className="fixed top-4 sm:top-5 inset-x-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none no-print">
      <div className="pointer-events-auto liquid-glass-nav flex items-center justify-between px-3 sm:px-5 py-2 rounded-full w-full max-w-xl sm:max-w-2xl md:max-w-3xl transition-all duration-300">
        {/* Brand Logo: Pure typographic text "Spec2IS" (no icon), Apple/Poppins typography */}
        <Link
          to="/"
          className="font-extrabold text-lg sm:text-xl text-[#0f172a] no-underline select-none hover:opacity-80 transition-opacity duration-200 pl-1 sm:pl-2"
          style={{ letterSpacing: '-0.04em', fontFamily: "'Poppins', sans-serif" }}
        >
          Spec<span className="text-[#4F46E5]">2</span>IS
        </Link>

        {/* Floating Pill Navigation container — Framer FloatingPillNavigation style */}
        <nav
          className="flex items-center gap-1 p-1 rounded-full bg-[#E8E8ED]/90 border border-black/[0.04]"
          style={{
            fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
          }}
        >
          <Link
            to="/search"
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 no-underline select-none ${
              isSearch
                ? 'bg-[#1D1D1F] text-white shadow-sm'
                : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-black/[0.03]'
            }`}
            style={{ letterSpacing: '-0.015em' }}
          >
            Workbench
          </Link>

          <Link
            to="/history"
            className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 no-underline select-none ${
              isHistory
                ? 'bg-[#1D1D1F] text-white shadow-sm'
                : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-black/[0.03]'
            }`}
            style={{ letterSpacing: '-0.015em' }}
          >
            History
          </Link>
        </nav>

        {/* Action Button */}
        <div className="flex items-center pr-0.5">
          <button
            onClick={handleNewSearch}
            className="text-white text-xs sm:text-[13px] font-semibold px-3.5 sm:px-4 py-1.5 rounded-full border-none cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              backgroundColor: '#0f172a',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
            }}
          >
            New Search
          </button>
        </div>
      </div>
    </header>
  );
}
