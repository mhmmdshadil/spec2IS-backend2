import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'Extracting requirements', icon: '⬡' },
  { label: 'Matching against Indian Standards', icon: '⬡' },
  { label: 'Checking status and version', icon: '⬡' },
  { label: 'Scoring confidence', icon: '⬡' },
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
                  backgroundColor: isActive ? '#2C6E7F' : '#DCD7CC',
                  boxShadow: isCurrent ? '0 0 0 4px #2C6E7F22' : 'none',
                }}
              />
              {/* Connector line */}
              {idx < STEPS.length - 1 && (
                <div
                  className="flex-1 transition-colors duration-500"
                  style={{
                    width: '2px',
                    minHeight: '28px',
                    backgroundColor: idx < activeStep ? '#2C6E7F' : '#DCD7CC',
                  }}
                />
              )}
            </div>

            {/* Label */}
            <p
              className="text-sm m-0 pb-5 transition-colors duration-500"
              style={{
                color: isActive ? '#16233D' : '#5B6472',
                fontWeight: isActive ? 500 : 400,
                paddingTop: '0',
                lineHeight: '12px',
              }}
            >
              {step.label}
              {isCurrent && (
                <span className="inline-block ml-2 animate-pulse text-accent">
                  …
                </span>
              )}
              {isActive && !isCurrent && idx <= activeStep && (
                <span className="inline-block ml-2 text-verified text-xs">✓</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
