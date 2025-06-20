import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift } from "lucide-react";

interface GiftCardProps {
  title: string;
  description: string;
  amazonUrl: string;
  viewOnAmazonText: string;
  imageUrl?: string;
  priceUSD?: number;
  exchangeRateNOK: number | null; // Added prop
  loadingExchangeRate: boolean; // Added prop
}

const GiftCard = ({
  title,
  description,
  amazonUrl,
  viewOnAmazonText,
  imageUrl,
  priceUSD,
  exchangeRateNOK, // Added prop
  loadingExchangeRate, // Added prop
}: GiftCardProps) => {
  const priceNOK =
    priceUSD && exchangeRateNOK
      ? (priceUSD * exchangeRateNOK).toFixed(2)
      : null;
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50 border-purple-100 hover:border-purple-200 overflow-hidden">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      )}
      <CardHeader className="text-center pb-4">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 mt-2">
          {description}
        </CardDescription>
        {priceUSD && (
          <div className="mt-3 text-lg">
            <p className="font-semibold text-green-600">
              ${priceUSD.toFixed(2)} USD
            </p>
            {loadingExchangeRate && (
              <p className="text-sm text-gray-500">Loading NOK price...</p>
            )}
            {!loadingExchangeRate && priceNOK && (
              <p className="font-semibold text-blue-600">{priceNOK} NOK</p>
            )}
            {!loadingExchangeRate &&
              !priceNOK &&
              priceUSD &&
              !exchangeRateNOK && (
                <p className="text-sm text-red-500">
                  Could not load NOK price.
                </p>
              )}
          </div>
        )}
      </CardHeader>
      <CardContent className="text-center pt-0">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2"
          >
            <Gift className="w-4 h-4" />
            {viewOnAmazonText}
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default GiftCard;
