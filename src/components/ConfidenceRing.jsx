import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

/**
 * ConfidenceRing — a single-segment radial/donut chart showing match confidence.
 * Takes a value 0–100, renders in Accent Teal.
 */
export default function ConfidenceRing({ value, size = 96 }) {
  const percentage = Math.round(value);
  const data = [{ value: percentage, fill: '#2C6E7F' }];

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <RadialBarChart
        width={size}
        height={size}
        cx={size / 2}
        cy={size / 2}
        innerRadius={size * 0.34}
        outerRadius={size * 0.46}
        barSize={size * 0.1}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background={{ fill: '#DCD7CC44' }}
          dataKey="value"
          angleAxisId={0}
          cornerRadius={size * 0.05}
        />
      </RadialBarChart>

      {/* Center label */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
        <span className="text-lg font-semibold text-accent leading-none">
          {percentage}%
        </span>
        <span className="text-[10px] text-slate-ui mt-0.5">match</span>
      </div>
    </div>
  );
}
