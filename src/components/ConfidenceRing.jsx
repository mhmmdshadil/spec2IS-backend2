/**
 * ConfidenceRing — Ultra-crisp SVG donut gauge for recommendation confidence score.
 * Designed with smooth rounded caps, soft background ring, and adaptive brand colors.
 */
export default function ConfidenceRing({ value, size = 96 }) {
  const percentage = Math.max(0, Math.min(100, Math.round(value)));

  // Gauge parameters
  const strokeWidth = 8.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine vibrant accent color based on confidence score
  let strokeColor = '#4F46E5'; // Default indigo
  let bgColor = '#e2e8f0';

  if (percentage >= 80) {
    strokeColor = '#0d9488'; // Vibrant teal/emerald for high confidence
  } else if (percentage >= 50) {
    strokeColor = '#0284c7'; // Sky/Blue for medium confidence
  } else {
    strokeColor = '#d97706'; // Amber for manual review needed
  }

  return (
    <div
      className="relative inline-flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg] overflow-visible"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
          opacity="0.55"
        />

        {/* Foreground animated value arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Centered Typography */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span
          className="text-lg sm:text-xl font-bold tracking-tight leading-none"
          style={{
            color: strokeColor,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          {percentage}%
        </span>
        <span
          className="text-[10px] font-semibold text-[#94a3b8] uppercase tracking-wider mt-1"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          match
        </span>
      </div>
    </div>
  );
}
