import { useState, useRef } from 'react';
import { Wand2, RefreshCw, X } from 'lucide-react';
import { rephraseText, RephraseOptions } from '../../utls/gemini';

interface RephraseTooltipProps {
  originalText: string;
  onRephrase: (newText: string) => void;
  questionLabel: string;
  isVisible: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

const RephraseTooltip = ({ 
  originalText, 
  onRephrase, 
  isVisible, 
  onClose,
  position 
}: RephraseTooltipProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState<RephraseOptions['tone']>('inspiring');
  const [selectedStyle, setSelectedStyle] = useState<RephraseOptions['style']>('detailed');
  const requestInProgress = useRef(false);

  if (!isVisible) return null;

  const handleRephrase = async () => {
    if (!originalText.trim() || isLoading || requestInProgress.current) return;
    
    setIsLoading(true);
    requestInProgress.current = true;
    
    try {
      const rephrasedText = await rephraseText(originalText, {
        tone: selectedTone,
        style: selectedStyle
      });
      onRephrase(rephrasedText);
      onClose();
    } catch (error: any) {
      console.error('Failed to rephrase:', error);
      
      // Show user-friendly error message
      const errorMessage = error.message || 'Failed to rephrase text. Please try again later.';
      alert(errorMessage);
    } finally {
      setIsLoading(false);
      requestInProgress.current = false;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Tooltip */}
      <div 
        className="fixed z-50 bg-gradient-to-br from-[#1A1339] to-[#402659] border border-[#2B2042] rounded-xl p-4 shadow-2xl w-80 max-w-[90vw]"
        style={{
          top: Math.min(position.top, window.innerHeight - 300),
          left: Math.min(position.left, window.innerWidth - 320),
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Wand2 className="text-[#8866FF]" size={20} />
            <h3 className="text-white font-semibold">Rephrase Text</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Options */}
        <div className="mb-4">
          <div className="mb-3">
            <label className="text-white text-sm font-medium mb-2 block">Tone:</label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as RephraseOptions['tone'])}
              className="w-full bg-[#18122B] border border-[#3C2960] text-white text-sm px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A66CFF]"
            >
              <option value="inspiring">Inspiring</option>
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="creative">Creative</option>
              <option value="concise">Concise</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label className="text-white text-sm font-medium mb-2 block">Style:</label>
            <select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value as RephraseOptions['style'])}
              className="w-full bg-[#18122B] border border-[#3C2960] text-white text-sm px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-[#A66CFF]"
            >
              <option value="detailed">Detailed</option>
              <option value="brief">Brief</option>
              <option value="poetic">Poetic</option>
              <option value="straightforward">Straightforward</option>
            </select>
          </div>
        </div>

        {/* Rephrase Button */}
        <button
          onClick={handleRephrase}
          disabled={isLoading || !originalText.trim()}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00AAFF] to-[#CC66FF] text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:from-[#3C2960] hover:to-[#A66CFF] disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <RefreshCw className="animate-spin" size={16} />
              Rephrasing...
            </>
          ) : (
            <>
              <Wand2 size={16} />
              Rephrase Text
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default RephraseTooltip;
