import GiftCard from "@/components/GiftCard";
import LanguageToggle from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { generateRandomGifts } from "@/utils/giftGenerator";
import { Language, translations } from "@/utils/translations";
import { Gift, LogIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

const Index = () => {
  const [language, setLanguage] = useState<Language>("en");
  const { user, loading: authLoading } = useAuth();
  const t = translations[language];
  const [exchangeRateNOK, setExchangeRateNOK] = useState<number | null>(null);
  const [loadingRate, setLoadingRate] = useState<boolean>(true);
  const [upcomingHolidaysList, setUpcomingHolidaysList] = useState<
    { name: string; date: string }[]
  >([]); // Changed state for a list
  const [loadingHolidays, setLoadingHolidays] = useState<boolean>(true);

  useEffect(() => {
    const fetchAppData = async () => {
      // Renamed function
      setLoadingRate(true);
      setLoadingHolidays(true); // Initialize holiday loading state

      // Fetch Exchange Rate
      try {
        const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }
        const data = await response.json();
        const rate = data.rates?.NOK;
        if (rate) {
          setExchangeRateNOK(rate);
        } else {
          console.error("NOK exchange rate not found in API response");
          setExchangeRateNOK(null);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRateNOK(null);
      } finally {
        setLoadingRate(false);
      }

      // Fetch Holidays
      try {
        const currentYear = new Date().getFullYear();
        const holidayResponse = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${currentYear}/NO`
        );
        if (!holidayResponse.ok) {
          throw new Error("Failed to fetch holidays");
        }
        const holidays: Holiday[] = await holidayResponse.json(); // Use Holiday interface
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingHolidays = holidays
          .map((h) => ({ ...h, dateObj: new Date(h.date) }))
          .filter((h) => h.dateObj >= today)
          .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

        if (upcomingHolidays.length > 0) {
          setUpcomingHolidaysList(
            // This setter should now correctly target the new state variable
            upcomingHolidays.slice(0, 3).map((h) => ({
              name: h.localName || h.name,
              date: h.date,
            }))
          );
        } else {
          setUpcomingHolidaysList([]);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setUpcomingHolidaysList([]);
      } finally {
        setLoadingHolidays(false);
      }
    };

    fetchAppData(); // Call the renamed function
  }, []);

  // Generate random gifts once per session
  const randomGifts = useMemo(() => generateRandomGifts(), []);

  const giftData = [
    {
      category: "family",
      gifts: randomGifts.family,
    },
    {
      category: "friends",
      gifts: randomGifts.friends,
    },
    {
      category: "kids",
      gifts: randomGifts.kids,
    },
  ];

  if (authLoading) {
    // Use authLoading here
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500">
      {/* Holiday Banners */}
      {!loadingHolidays && upcomingHolidaysList.length > 0 && (
        <div className="sticky top-0 z-50 shadow-md">
          {upcomingHolidaysList.map((holiday, index) => (
            <div
              key={index}
              className={`p-3 text-center font-semibold ${
                index === 0
                  ? "bg-yellow-400 text-yellow-800"
                  : "bg-yellow-300 text-yellow-700"
              }`}
            >
              {index === 0 ? t.nextHolidayText : t.followedByText}
              {holiday.name} on{" "}
              {new Date(holiday.date).toLocaleDateString(
                language === "no" ? "nb-NO" : "en-GB",
                {
                  day: "numeric",
                  month: "long",
                }
              )}
              !
            </div>
          ))}
        </div>
      )}

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
              <LanguageToggle
                currentLanguage={language}
                onLanguageChange={setLanguage}
              />
              {user ? (
                <UserProfile />
              ) : (
                <Link to="/auth">
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2"
                  >
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
              {language === "en"
                ? "Fresh gift ideas generated for each visit!"
                : "Nye gaveideer generert for hvert besøk!"}
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
                  description={
                    t.gifts[gift.key as keyof typeof t.gifts].description
                  }
                  amazonUrl={gift.amazonUrl}
                  viewOnAmazonText={t.viewOnAmazon}
                  imageUrl={gift.imageUrl}
                  priceUSD={gift.priceUSD}
                  exchangeRateNOK={exchangeRateNOK}
                  loadingExchangeRate={loadingRate}
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
              {language === "en"
                ? "Made with love for gift givers everywhere"
                : "Laget med kjærlighet for gavegivere overalt"}
            </span>
          </div>
          <p className="text-xs opacity-70 mb-2">
            {language === "en"
              ? "Amazon links are affiliate links. We may earn a commission from purchases."
              : "Amazon lenker er tilknyttede lenker. Vi kan tjene provisjon fra kjøp."}
          </p>
          <p className="text-xs opacity-60">
            {language === "en"
              ? "For Google login functionality, connect this project to Supabase for authentication features."
              : "For Google innlogging funksjonalitet, koble dette prosjektet til Supabase for autentiseringsfunksjoner."}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
