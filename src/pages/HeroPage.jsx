import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 selection:bg-indigo-100 bg-white overflow-hidden relative">
      {/* Background subtle radial glow for depth without visual noise */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-50/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Perfectly Centered Hero Container */}
      <main className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto py-12">
        {/* ============================================================
            THE LOGO: Commanding, centered, logo-worthy Poppins
            Slightly smaller than the gigantic screen-overflowing version,
            still extraordinarily prominent and confident.
           ============================================================ */}
        <h1
          className="font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[9.75rem] text-[#0f172a] m-0 select-none leading-none tracking-tighter"
          style={{
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '-0.055em',
            textShadow:
              '0 24px 48px rgba(15, 23, 42, 0.08), 0 4px 12px rgba(15, 23, 42, 0.04)',
          }}
        >
          Spec<span className="text-[#4F46E5]">2</span>IS
        </h1>

        {/* ============================================================
            CAPTION / SLOGAN: Noticeably bigger and highly readable,
            yet clearly secondary and elegant beneath the main logo.
           ============================================================ */}
        <p
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-[#64748b] max-w-xl mx-auto leading-relaxed font-normal"
          style={{
            fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
            letterSpacing: '-0.015em',
          }}
        >
          Map complex technical specifications directly to active Bureau of Indian Standards in seconds.
        </p>

        {/* ============================================================
            SINGLE PRIMARY CTA: Centered, tactile, clean modern pill.
            (About CTA removed as requested).
           ============================================================ */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            onClick={() => navigate('/search')}
            className="group px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-white text-sm sm:text-base font-semibold tracking-tight border-none cursor-pointer flex items-center gap-2.5 transition-all duration-200 active:scale-[0.98]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              backgroundColor: '#0f172a',
              boxShadow:
                '0 16px 36px -6px rgba(15, 23, 42, 0.28), 0 4px 12px -2px rgba(15, 23, 42, 0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1e293b';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow =
                '0 20px 42px -6px rgba(15, 23, 42, 0.35), 0 6px 16px -2px rgba(15, 23, 42, 0.16)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#0f172a';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 16px 36px -6px rgba(15, 23, 42, 0.28), 0 4px 12px -2px rgba(15, 23, 42, 0.12)';
            }}
          >
            <span>Analyze spec</span>
            <svg
              className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.4"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
