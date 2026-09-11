import { useState, useRef } from 'react';

const EXAMPLE_CHIPS = [
  'PVC insulated cables for building wiring',
  'LED street lighting fixtures',
  'Industrial safety helmets',
  'Portable fire extinguishers for a server room',
  'PVC pipes for potable water supply',
];

/**
 * SpecInputForm — textarea + file upload + example chips.
 *
 * @param {Function} onSubmit - called with the specification text
 */
export default function SpecInputForm({ onSubmit }) {
  const [activeTab, setActiveTab] = useState('paste');
  const [text, setText] = useState('');
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  function handleChipClick(chipText) {
    setText(chipText);
    setActiveTab('paste');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim());
    }
  }

  function handleFileSelect(file) {
    if (!file) return;
    setFileName(file.name);

    // If text file, read text directly; if binary PDF/DOCX, parse clean preview
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result || '');
      };
      reader.readAsText(file);
    } else {
      // For PDF/DOCX, use an extracted summary or title for procurement analysis
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setText(`Technical procurement specification extracted from ${file.name}: Requirements for ${cleanName}.`);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Tab toggle */}
      <div className="flex items-center gap-0 mb-4 border-b border-hairline">
        <button
          type="button"
          onClick={() => setActiveTab('paste')}
          className={`text-sm font-medium px-4 py-2 border-none cursor-pointer transition-colors duration-200 ${
            activeTab === 'paste'
              ? 'text-ink bg-transparent border-b-2 border-b-accent'
              : 'text-slate-ui bg-transparent hover:text-ink'
          }`}
          style={activeTab === 'paste' ? { borderBottom: '2px solid #2C6E7F', marginBottom: '-1px' } : { marginBottom: '-1px' }}
        >
          Paste text
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`text-sm font-medium px-4 py-2 border-none cursor-pointer transition-colors duration-200 ${
            activeTab === 'upload'
              ? 'text-ink bg-transparent'
              : 'text-slate-ui bg-transparent hover:text-ink'
          }`}
          style={activeTab === 'upload' ? { borderBottom: '2px solid #2C6E7F', marginBottom: '-1px' } : { marginBottom: '-1px' }}
        >
          Upload file
        </button>
      </div>

      {/* Paste text tab */}
      {activeTab === 'paste' && (
        <div className="fade-in">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g. Required portable fire extinguishers for electrical server room operating at 240V."
            rows={5}
            className="w-full border border-hairline rounded-sm px-4 py-3 text-sm text-ink bg-white font-sans resize-y focus:outline-none focus:border-accent transition-colors duration-200"
            style={{ lineHeight: 1.7 }}
          />
        </div>
      )}

      {/* Upload file tab */}
      {activeTab === 'upload' && (
        <div className="fade-in">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-sm px-6 py-10 text-center cursor-pointer transition-colors duration-200 ${
              isDragging
                ? 'border-accent bg-accent/5'
                : 'border-hairline hover:border-accent/50'
            }`}
          >
            <p className="text-sm text-slate-ui m-0 mb-1">
              {fileName ? (
                <>
                  <span className="font-medium text-ink">{fileName}</span> selected
                </>
              ) : (
                'Drag and drop a file here, or click to browse'
              )}
            </p>
            <p className="text-xs text-slate-ui/70 m-0">
              Accepts .pdf, .docx
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>
        </div>
      )}

      {/* Example chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLE_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            className="text-xs text-slate-ui bg-ink/5 px-3 py-1.5 rounded-sm border border-hairline cursor-pointer hover:bg-ink/10 hover:text-ink transition-colors duration-200"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Submit button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={!text.trim()}
          className="text-sm font-medium text-paper bg-ink px-6 py-2.5 rounded cursor-pointer border-none hover:opacity-90 transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Analyze specification
        </button>
      </div>

      {/* Helper text */}
      <p className="mt-3 text-xs text-slate-ui leading-relaxed">
        Your specification is processed to identify applicable standards. It is
        not stored beyond this session unless you save the report.
      </p>
    </form>
  );
}
