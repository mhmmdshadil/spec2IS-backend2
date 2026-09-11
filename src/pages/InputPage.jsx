import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SpecInputForm from '../components/SpecInputForm';

export default function InputPage() {
  const navigate = useNavigate();
  const { startAnalysis } = useApp();

  function handleSubmit(text) {
    startAnalysis(text);
    navigate('/analyzing');
  }

  return (
    <div className="content-container fade-in">
      {/* Heading */}
      <h1 className="font-serif text-ink mb-2">
        Find the applicable Indian Standard
      </h1>

      {/* Subheading */}
      <p className="text-slate-ui text-base mb-8 max-w-prose">
        Paste a technical specification and get a ranked, status-checked
        recommendation.
      </p>

      {/* Input form */}
      <SpecInputForm onSubmit={handleSubmit} />
    </div>
  );
}
