import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { analyzeSpecification } from '../api/client';
import PipelineStepper from '../components/PipelineStepper';

const WAKE_MESSAGES = [
  'Extracting technical requirements and searching BIS catalog...',
  'Checking standard versions and gazette cross-references...',
  'Executing vector similarity matching across clauses...',
  'Synthesizing recommendations and match confidence scores...',
];

export default function AnalyzingPage() {
  const navigate = useNavigate();
  const { specificationText, result, error, setResult, setError } = useApp();
  const [stepperFinished, setStepperFinished] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  // If user navigated here without a spec, redirect back to workbench
  useEffect(() => {
    if (!specificationText) {
      navigate('/search', { replace: true });
    }
  }, [specificationText, navigate]);

  // Rotate wake messages if waiting longer than 8 seconds
  useEffect(() => {
    const slowTimer = setTimeout(() => {
      setIsSlow(true);
    }, 8000);

    return () => clearTimeout(slowTimer);
  }, []);

  useEffect(() => {
    if (!isSlow) return;

    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % WAKE_MESSAGES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isSlow]);

  // Start the API call when the page mounts
  useEffect(() => {
    if (!specificationText) return;

    let cancelled = false;

    analyzeSpecification(specificationText)
      .then((data) => {
        if (!cancelled) {
          setResult(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('API Error:', err);
          let message =
            err.response?.data?.message ||
            (typeof err.response?.data?.detail === 'string'
              ? err.response.data.detail
              : Array.isArray(err.response?.data?.detail)
              ? err.response.data.detail.map((d) => d.msg || JSON.stringify(d)).join(', ')
              : null) ||
            err.message ||
            "We couldn't reach the recommendation engine. Check your connection and try again.";

          if (err.message === 'Network Error') {
            message = "We couldn't reach the recommendation engine. The server may be waking up or temporarily unreachable.";
          }

          setError(message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [specificationText, setResult, setError]);

  // When stepper completes, mark it finished
  const handleStepperComplete = useCallback(() => {
    setStepperFinished(true);
  }, []);

  // When both the stepper animation has completed and we have result or error, navigate to results
  useEffect(() => {
    if (stepperFinished && (result || error)) {
      const timer = setTimeout(() => {
        navigate('/results', { replace: true });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [stepperFinished, result, error, navigate]);

  if (!specificationText) return null;

  return (
    <div className="content-container" style={{ maxWidth: '520px' }}>
      <div className="py-12">
        {/* Stepper */}
        <PipelineStepper onComplete={handleStepperComplete} />

        {/* Rotating Progress Notice if waiting > 8s */}
        {isSlow && !result && !error && (
          <div className="mt-8 p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-left fade-in transition-all duration-300">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-600"></span>
              </span>
              <p
                key={messageIndex}
                className="text-xs sm:text-[13px] font-medium text-indigo-950 m-0 fade-in leading-relaxed"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {WAKE_MESSAGES[messageIndex]}
              </p>
            </div>
            <p className="text-[11px] text-indigo-700/80 m-0 mt-1.5 pl-5">
              Multi-step AI pipeline actively querying Indian Standards repository...
            </p>
          </div>
        )}

        {/* Submitted spec preview */}
        <hr className="hairline mt-8" />
        <p className="text-xs text-slate-ui/60 m-0 mt-4 leading-relaxed">
          Analyzing:{' '}
          <span className="italic">
            {specificationText.length > 200
              ? specificationText.slice(0, 200) + '…'
              : specificationText}
          </span>
        </p>
      </div>
    </div>
  );
}

