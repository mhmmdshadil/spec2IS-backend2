import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { analyzeSpecification } from '../api/client';
import PipelineStepper from '../components/PipelineStepper';

export default function AnalyzingPage() {
  const navigate = useNavigate();
  const { specificationText, result, error, setResult, setError } = useApp();

  // If user navigated here without a spec, redirect back to workbench
  useEffect(() => {
    if (!specificationText) {
      navigate('/search', { replace: true });
    }
  }, [specificationText, navigate]);

  const [stepperFinished, setStepperFinished] = useState(false);

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
          const message =
            err.response?.data?.message ||
            err.message ||
            "We couldn't reach the recommendation engine. Check your connection and try again.";
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
