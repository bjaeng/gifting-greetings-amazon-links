
import React, { useState, useMemo } from 'react';
import { Gift, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GiftCard from '@/components/GiftCard';
import LanguageToggle from '@/components/LanguageToggle';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { translations, Language } from '@/utils/translations';
import { generateRandomGifts } from '@/utils/giftGenerator';

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const { user, loading } = useAuth();
  const t = translations[language];

  // Generate random gifts once per session
  const randomGifts = useMemo(() => generateRandomGifts(), []);

  const giftData = [
    {
      category: 'family',
      gifts: randomGifts.family
    },
    {
      category: 'friends', 
      gifts: randomGifts.friends
    },
    {
      category: 'kids',
      gifts: randomGifts.kids
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {t.title}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
              {user ? (
                <UserProfile />
              ) : (
                <Link to="/auth">
                  <Button variant="secondary" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="text-center text-white mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {t.subtitle}
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              {t.description}
            </p>
            <p className="text-sm opacity-75 mt-2">
              {language === 'en' 
                ? 'Fresh gift ideas generated for each visit!' 
                : 'Nye gaveideer genererte for hvert besøk!'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Gift Categories Section */}
      <div className="container mx-auto px-4 py-16">
        {giftData.map((categoryData) => (
          <div key={categoryData.category} className="mb-16">
            <h3 className="text-3xl font-bold text-white text-center mb-8">
              {t.categories[categoryData.category as keyof typeof t.categories]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.gifts.map((gift) => (
                <GiftCard
                  key={gift.key}
                  title={t.gifts[gift.key as keyof typeof t.gifts].title}
                  description={t.gifts[gift.key as keyof typeof t.gifts].description}
                  amazonUrl={gift.amazonUrl}
                  viewOnAmazonText={t.viewOnAmazon}
                  imageUrl={gift.imageUrl}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-white/80">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 mb-4">
            <Gift className="w-5 h-5" />
            <span className="text-sm">
              {language === 'en' 
                ? 'Made with love for gift givers everywhere' 
                : 'Laget med kjærlighet for gavegivere overalt'
              }
            </span>
          </div>
          <p className="text-xs opacity-70 mb-2">
            {language === 'en' 
              ? 'Amazon links are affiliate links. We may earn a commission from purchases.' 
              : 'Amazon lenker er tilknyttede lenker. Vi kan tjene provisjon fra kjøp.'
            }
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
