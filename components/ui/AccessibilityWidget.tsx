"use client";
import { useState, useEffect } from 'react';
import { Accessibility, Type, Eye, Underline, X } from 'lucide-react';

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  // מצבים של נגישות
  const [isLargeText, setIsLargeText] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [linksUnderlined, setLinksUnderlined] = useState(false);

  // הפעלת השינויים על ה-Body
  useEffect(() => {
    const root = document.documentElement;
    
    // גודל טקסט
    if (isLargeText) root.style.fontSize = '125%';
    else root.style.fontSize = '100%';

    // ניגודיות וצבעים (משתמשים ב-CSS Filters)
    let filterString = '';
    if (isGrayscale) filterString += 'grayscale(100%) ';
    if (isHighContrast) filterString += 'contrast(125%) ';
    root.style.filter = filterString;

    // הדגשת קישורים
    if (linksUnderlined) document.body.classList.add('underline-links');
    else document.body.classList.remove('underline-links');

  }, [isLargeText, isHighContrast, isGrayscale, linksUnderlined]);

  return (
    <div className="fixed bottom-4 left-4 z-[100] font-sans">
      
      {/* התפריט שנפתח */}
      {isOpen && (
        <div className="mb-4 bg-white text-black p-4 rounded-xl shadow-2xl border border-gray-200 w-64 animate-in slide-in-from-bottom-5">
          <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h3 className="font-bold text-lg">Accessibility</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-2">
            <ToggleButton 
              active={isLargeText} 
              onClick={() => setIsLargeText(!isLargeText)} 
              icon={Type} 
              label="Bigger Text" 
            />
            <ToggleButton 
              active={isHighContrast} 
              onClick={() => setIsHighContrast(!isHighContrast)} 
              icon={Eye} 
              label="High Contrast" 
            />
            <ToggleButton 
              active={isGrayscale} 
              onClick={() => setIsGrayscale(!isGrayscale)} 
              icon={Eye} 
              label="Grayscale" 
            />
            <ToggleButton 
              active={linksUnderlined} 
              onClick={() => setLinksUnderlined(!linksUnderlined)} 
              icon={Underline} 
              label="Highlight Links" 
            />
          </div>

          <button 
            onClick={() => {
              setIsLargeText(false);
              setIsHighContrast(false);
              setIsGrayscale(false);
              setLinksUnderlined(false);
            }}
            className="w-full mt-4 text-xs text-red-600 hover:bg-red-50 p-2 rounded text-center transition-colors"
          >
            Reset All
          </button>
        </div>
      )}

      {/* הכפתור הצף */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0056D2] hover:bg-[#004494] text-white p-3 rounded-full shadow-lg transition-all transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#fcd839]"
        aria-label="Accessibility Menu"
      >
        <Accessibility className="w-8 h-8" />
      </button>
      
      {/* סגנון גלובלי להדגשת קישורים */}
      <style jsx global>{`
        .underline-links a {
          text-decoration: underline !important;
          text-decoration-color: #fcd839 !important;
          text-decoration-thickness: 2px !important;
        }
      `}</style>
    </div>
  );
}

// רכיב עזר לכפתורים בתפריט
function ToggleButton({ active, onClick, icon: Icon, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
        active 
          ? 'bg-[#0056D2] text-white shadow-md' 
          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm">{label}</span>
      {active && <span className="ml-auto text-xs bg-white/20 px-2 py-0.5 rounded">ON</span>}
    </button>
  );
}