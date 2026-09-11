import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center px-6 selection:bg-slate-200"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Central Content — No Navbar on Hero */}
      <main className="flex flex-col items-center text-center max-w-5xl mx-auto py-12">
        {/* ============================================================
            The Logo: Giant, Central, Logo-Worthy Poppins Typography
           ============================================================ */}
        <h1
          className="font-extrabold text-7xl sm:text-8xl md:text-9xl lg:text-[10.5rem] xl:text-[12rem] text-[#111827] m-0 select-none leading-none"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '-0.055em',
            textShadow:
              '0 28px 56px rgba(17, 24, 39, 0.12), 0 6px 16px rgba(17, 24, 39, 0.05)',
          }}
        >
          Spec<span className="text-[#4F46E5]">2</span>IS
        </h1>

        {/* ============================================================
            Caption / Slogan: Significantly smaller, clean and understated
           ============================================================ */}
        <p
          className="mt-6 sm:mt-8 text-xs sm:text-sm md:text-[15px] text-[#6B7280] max-w-md mx-auto leading-relaxed font-normal"
          style={{
            letterSpacing: '-0.01em',
            textShadow: '0 4px 14px rgba(0, 0, 0, 0.04)',
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
            className="group px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-white text-xs sm:text-sm font-medium tracking-tight border-none cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-95"
            style={{
              background: '#111827',
              boxShadow:
                '0 18px 36px -6px rgba(17, 24, 39, 0.32), 0 6px 16px -2px rgba(17, 24, 39, 0.14)',
            }}
          >
            <span>Analyze spec</span>
            <svg
              className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200"
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
