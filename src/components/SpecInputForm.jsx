import { useState, useRef } from 'react';

const EXAMPLE_CHIPS = [
  'PVC insulated cables for building wiring',
  'LED street lighting fixtures',
  'Industrial safety helmets',
  'Portable fire extinguishers for a server room',
  'PVC pipes for potable water supply',
];

/**
 * SpecInputForm — Clean Framer-style form with soft rounded corners,
 * floating pill tabs, refined typography, and responsive micro-interactions.
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

    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result || '');
      };
      reader.readAsText(file);
    } else {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Floating Pill Tab Toggle */}
      <div className="flex items-center">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[#E8E8ED] border border-black/[0.04]">
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 border-none cursor-pointer select-none ${
              activeTab === 'paste'
                ? 'bg-[#1D1D1F] text-white shadow-sm'
                : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] bg-transparent hover:bg-black/[0.03]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}
          >
            Paste text
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-200 border-none cursor-pointer select-none ${
              activeTab === 'upload'
                ? 'bg-[#1D1D1F] text-white shadow-sm'
                : 'text-[#1D1D1F]/70 hover:text-[#1D1D1F] bg-transparent hover:bg-black/[0.03]'
            }`}
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}
          >
            Upload file
          </button>
        </div>
      </div>

      {/* Paste text tab */}
      {activeTab === 'paste' && (
        <div className="fade-in">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Required portable fire extinguishers for electrical server room operating at 240V."
              rows={5}
              className="w-full bg-[#fafafa] hover:bg-white focus:bg-white border border-[#e2e8f0] focus:border-[#4F46E5] rounded-2xl p-4 sm:p-5 text-sm sm:text-[15px] text-[#0f172a] placeholder:text-[#94a3b8] resize-y outline-none transition-all duration-200 leading-relaxed"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: '-0.01em',
                boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.03)',
              }}
            />
            {text && (
              <button
                type="button"
                onClick={() => setText('')}
                className="absolute top-3.5 right-3.5 text-xs text-[#94a3b8] hover:text-[#475569] bg-white/80 backdrop-blur-sm border border-slate-200/80 px-2 py-1 rounded-md cursor-pointer transition-colors"
              >
                Clear
              </button>
            )}
          </div>
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
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
              isDragging
                ? 'border-[#4F46E5] bg-indigo-50/50 scale-[0.99]'
                : 'border-[#cbd5e1] hover:border-[#94a3b8] bg-[#fafafa] hover:bg-white'
            }`}
          >
            <div className="w-11 h-11 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[#0f172a] m-0 mb-1">
                {fileName ? (
                  <>
                    <span className="text-[#4F46E5] font-semibold">{fileName}</span> selected
                  </>
                ) : (
                  'Drag & drop a file here, or click to browse'
                )}
              </p>
              <p className="text-xs text-[#94a3b8] m-0">
                Supports PDF, DOCX, or TXT
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>
        </div>
      )}

      {/* Example chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">
            Quick Examples
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_CHIPS.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleChipClick(chip)}
              className="text-xs font-medium text-[#334155] bg-[#f1f5f9]/80 hover:bg-[#e2e8f0] active:scale-[0.98] px-3.5 py-1.5 rounded-full border border-slate-200/60 cursor-pointer transition-all duration-150"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button & Helper */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-100">
        <button
          type="submit"
          disabled={!text.trim()}
          className="group px-7 py-3 rounded-full text-white text-sm font-semibold tracking-tight border-none cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            backgroundColor: text.trim() ? '#0f172a' : '#94a3b8',
            boxShadow: text.trim()
              ? '0 12px 28px -4px rgba(15, 23, 42, 0.25), 0 4px 10px -2px rgba(15, 23, 42, 0.1)'
              : 'none',
          }}
          onMouseEnter={(e) => {
            if (text.trim()) {
              e.currentTarget.style.backgroundColor = '#1e293b';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }
          }}
          onMouseLeave={(e) => {
            if (text.trim()) {
              e.currentTarget.style.backgroundColor = '#0f172a';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <span>Analyze specification</span>
          <svg
            className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>

        <p className="m-0 text-xs text-[#94a3b8] leading-relaxed max-w-sm">
          Processed against active BIS standards catalog. Private & session-isolated.
        </p>
      </div>
    </form>
  );
}
