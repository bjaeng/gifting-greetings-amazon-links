
import React from 'react';
import { Button } from '@/components/ui/button';
import { Language } from '@/utils/translations';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle = ({ currentLanguage, onLanguageChange }: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full p-1">
      <Button
        variant={currentLanguage === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('en')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          currentLanguage === 'en' 
          ? 'bg-white text-purple-600 hover:bg-white/90' 
          : 'text-white hover:bg-white/10'
        }`}
      >
        EN
      </Button>
      <Button
        variant={currentLanguage === 'no' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onLanguageChange('no')}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          currentLanguage === 'no' 
          ? 'bg-white text-purple-600 hover:bg-white/90' 
          : 'text-white hover:bg-white/10'
        }`}
      >
        NO
      </Button>
    </div>
  );
};

export default LanguageToggle;
