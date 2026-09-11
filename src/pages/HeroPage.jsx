import { useNavigate } from 'react-router-dom';

export default function HeroPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center px-6 selection:bg-slate-200">
      {/* Central Content Container */}
      <main className="flex flex-col items-center text-center max-w-3xl mx-auto -mt-6 sm:-mt-10">
        {/* ============================================================
            The Entire Logo: Custom modern "S" glyph + "Spec2IS" text
           ============================================================ */}
        <div
          className="flex items-center justify-center gap-4 sm:gap-5"
          style={{
            filter: 'drop-shadow(0 14px 30px rgba(18, 24, 38, 0.10))',
          }}
        >
          {/* Custom crafted geometric S emblem */}
          <div className="relative shrink-0 flex items-center justify-center">
            <svg
              className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20"
              viewBox="0 0 80 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="spec2is-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#111827" />
                  <stop offset="100%" stopColor="#1E293B" />
                </linearGradient>
                <linearGradient id="spec2is-accent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>

              {/* Architectural folded geometric S */}
              <path
                d="M58 24C58 17.3726 52.6274 12 46 12H30C20.0589 12 12 20.0589 12 30C12 39.9411 20.0589 48 30 48H50C59.9411 48 68 56.0589 68 66C68 71.5228 63.5228 76 58 76H32C25.3726 76 20 70.6274 20 64"
                stroke="url(#spec2is-grad)"
                strokeWidth="9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Dynamic precision accent ribbon */}
              <path
                d="M48 12H46C52.6274 12 58 17.3726 58 24V26"
                stroke="url(#spec2is-accent)"
                strokeWidth="9"
                strokeLinecap="round"
              />
              {/* Subtle architectural nodes */}
              <circle cx="30" cy="30" r="4" fill="#4F46E5" />
              <circle cx="50" cy="58" r="4" fill="#06B6D4" />
            </svg>
          </div>

          {/* Logo Brand Name Text */}
          <h1
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tighter text-[#111827] m-0 select-none"
            style={{
              letterSpacing: '-0.04em',
              textShadow: '0 8px 24px rgba(17, 24, 39, 0.08)',
            }}
          >
            Spec<span className="text-[#4F46E5]">2</span>IS
          </h1>
        </div>

        {/* ============================================================
            Slogan directly below in a smaller, clean way
           ============================================================ */}
        <p
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-[#5B6472] max-w-xl mx-auto leading-relaxed font-normal"
          style={{
            textShadow: '0 4px 14px rgba(0, 0, 0, 0.05)',
            letterSpacing: '-0.01em',
          }}
        >
          Map technical specifications directly to active Bureau of Indian Standards in seconds.
        </p>

        {/* ============================================================
            Clean Elevated CTA Button
           ============================================================ */}
        <div className="mt-8 sm:mt-10">
          <button
            onClick={() => navigate('/search')}
            className="group px-7 sm:px-9 py-3 sm:py-3.5 rounded-full text-white text-sm sm:text-base font-medium tracking-tight border-none cursor-pointer flex items-center gap-2.5 transition-all duration-200 hover:opacity-95"
            style={{
              background: '#111827',
              boxShadow:
                '0 18px 36px -6px rgba(17, 24, 39, 0.32), 0 6px 16px -2px rgba(17, 24, 39, 0.16)',
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
