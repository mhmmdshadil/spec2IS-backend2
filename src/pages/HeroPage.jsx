import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 selection:bg-slate-200 relative"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Floating Framer-style Liquid Glass Navbar */}
      <TopBar />

      {/* Central Hero Content */}
      <main className="flex flex-col items-center text-center max-w-4xl mx-auto pt-24 sm:pt-20">
        {/* ============================================================
            Hero Main Highlight: The text "Spec2IS" itself is the entire logo
           ============================================================ */}
        <h1
          className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#111827] m-0 select-none"
          style={{
            letterSpacing: '-0.05em',
            lineHeight: 1,
            textShadow:
              '0 24px 48px rgba(17, 24, 39, 0.12), 0 4px 12px rgba(17, 24, 39, 0.06)',
          }}
        >
          Spec<span className="text-[#4F46E5]">2</span>IS
        </h1>

        {/* ============================================================
            Caption / Slogan: Smaller, clean, directly below the logo
           ============================================================ */}
        <p
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#5B6472] max-w-xl mx-auto leading-relaxed font-normal"
          style={{
            letterSpacing: '-0.015em',
            textShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
          }}
        >
          Map technical specifications directly to active Bureau of Indian Standards in seconds.
        </p>

        {/* ============================================================
            Clean Elevated CTA Button (Tactile hovering presence)
           ============================================================ */}
        <div className="mt-8 sm:mt-10">
          <button
            onClick={() => navigate('/search')}
            className="group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white text-sm sm:text-base font-medium tracking-tight border-none cursor-pointer flex items-center gap-2.5 transition-all duration-200 hover:opacity-95"
            style={{
              background: '#111827',
              boxShadow:
                '0 20px 40px -8px rgba(17, 24, 39, 0.35), 0 6px 16px -2px rgba(17, 24, 39, 0.16)',
            }}
          >
            <span>Analyze spec</span>
            <svg
              className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
