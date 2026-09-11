import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'Extracting requirements' },
  { label: 'Matching against Indian Standards' },
  { label: 'Checking status and version' },
  { label: 'Scoring confidence' },
];

/**
 * PipelineStepper — vertical stepper that lights up in sequence.
 * This is the one deliberate moment of motion in the app.
 *
 * @param {Function} onComplete - called when all steps finish
 */
export default function PipelineStepper({ onComplete }) {
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    let stepIndex = 0;
    const timers = [];

    // Start the first step after a small initial delay
    const initial = setTimeout(() => {
      setActiveStep(0);
      stepIndex = 1;

      // Then advance each subsequent step
      for (let i = 1; i <= STEPS.length; i++) {
        const delay = i * 800;
        const timer = setTimeout(() => {
          if (i < STEPS.length) {
            setActiveStep(i);
          } else {
            // All steps complete
            onComplete?.();
          }
        }, delay);
        timers.push(timer);
      }
    }, 300);

    timers.push(initial);

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="space-y-0">
      {STEPS.map((step, idx) => {
        const isActive = idx <= activeStep;
        const isCurrent = idx === activeStep;

        return (
          <div key={idx} className="flex items-stretch gap-4">
            {/* Vertical rail */}
            <div className="flex flex-col items-center" style={{ width: '24px' }}>
              {/* Dot */}
              <div
                className="rounded-full transition-all duration-500 ease-out flex items-center justify-center shrink-0"
                style={{
                  width: isCurrent ? '12px' : '10px',
                  height: isCurrent ? '12px' : '10px',
                  backgroundColor: isActive ? '#4F46E5' : '#e5e5e5',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(79, 70, 229, 0.12)' : 'none',
                }}
              />
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className="flex-1 transition-colors duration-500"
                  style={{
                    width: '2px',
                    minHeight: '28px',
                    backgroundColor: idx < activeStep ? '#4F46E5' : '#e5e5e5',
                  }}
                />
              )}
            </div>

            {/* Label */}
            <p
              className="m-0 pb-5 transition-colors duration-500"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '0.82rem',
                color: isActive ? '#0f0f0f' : '#999',
                fontWeight: isActive ? 500 : 400,
                paddingTop: '0',
                lineHeight: '12px',
                letterSpacing: '-0.01em',
              }}
            >
              {step.label}
              {isCurrent && (
                <span className="inline-block ml-2 animate-pulse" style={{ color: '#4F46E5' }}>
                  …
                </span>
              )}
              {isActive && !isCurrent && idx <= activeStep && (
                <span className="inline-block ml-2 text-xs" style={{ color: '#1F7A5C' }}>✓</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
