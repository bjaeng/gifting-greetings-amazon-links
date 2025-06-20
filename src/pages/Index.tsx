
import React, { useState } from 'react';
import { Gift, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GiftCard from '@/components/GiftCard';
import LanguageToggle from '@/components/LanguageToggle';
import { translations, Language } from '@/utils/translations';

const Index = () => {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  const giftData = [
    // Family gifts
    {
      category: 'family',
      gifts: [
        {
          key: 'smartWatch',
          amazonUrl: 'https://amazon.com/dp/B0CHX7R6WJ',
          imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop'
        },
        {
          key: 'coffeeSet',
          amazonUrl: 'https://amazon.com/dp/B08XQZQ6JX',
          imageUrl: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop'
        },
        {
          key: 'photoFrame',
          amazonUrl: 'https://amazon.com/dp/B07XBQBR7B',
          imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
        }
      ]
    },
    // Friends gifts
    {
      category: 'friends',
      gifts: [
        {
          key: 'portableSpeaker',
          amazonUrl: 'https://amazon.com/dp/B0882HHZLW',
          imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop'
        },
        {
          key: 'skinCareKit',
          amazonUrl: 'https://amazon.com/dp/B08TBXNK4L',
          imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop'
        },
        {
          key: 'bookSet',
          amazonUrl: 'https://amazon.com/dp/B09XVTPMH9',
          imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
        }
      ]
    },
    // Kids gifts
    {
      category: 'kids',
      gifts: [
        {
          key: 'buildingBlocks',
          amazonUrl: 'https://amazon.com/dp/B08FD6QLH2',
          imageUrl: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop'
        },
        {
          key: 'artSupplies',
          amazonUrl: 'https://amazon.com/dp/B08M3K2QXZ',
          imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop'
        },
        {
          key: 'scienceKit',
          amazonUrl: 'https://amazon.com/dp/B08CZXXR9M',
          imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
        }
      ]
    }
  ];

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
            <LanguageToggle currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
          
          <div className="text-center text-white mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {t.subtitle}
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              {t.description}
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
          <p className="text-xs opacity-70">
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
