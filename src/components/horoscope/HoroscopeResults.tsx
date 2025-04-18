
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Moon, CalendarDays, BriefcaseBusiness, Heart, Home, DollarSign, CalendarClock, Star } from "lucide-react";

interface HoroscopeResultsProps {
  results: {
    name: string;
    dateOfBirth: Date;
    timeOfBirth?: string;
    location?: string;
    zodiacSign: string;
    traits: string[];
    horoscope: string;
    forecast: string;
    careerForecast: string;
    loveForecast: string;
    familyForecast: string;
    financeForecast: string;
    luckyCycle: string;
  };
  onReset: () => void;
}

export default function HoroscopeResults({ results, onReset }: HoroscopeResultsProps) {
  // Get the zodiac sign's corresponding element, ruling planet, and emoji
  const getZodiacDetails = (sign: string) => {
    const details: Record<string, { element: string; planet: string; emoji: string; color: string }> = {
      "Aries": { element: "Fire", planet: "Mars", emoji: "♈", color: "text-red-500" },
      "Taurus": { element: "Earth", planet: "Venus", emoji: "♉", color: "text-green-600" },
      "Gemini": { element: "Air", planet: "Mercury", emoji: "♊", color: "text-yellow-500" },
      "Cancer": { element: "Water", planet: "Moon", emoji: "♋", color: "text-blue-400" },
      "Leo": { element: "Fire", planet: "Sun", emoji: "♌", color: "text-orange-500" },
      "Virgo": { element: "Earth", planet: "Mercury", emoji: "♍", color: "text-green-500" },
      "Libra": { element: "Air", planet: "Venus", emoji: "♎", color: "text-pink-400" },
      "Scorpio": { element: "Water", planet: "Pluto, Mars", emoji: "♏", color: "text-red-600" },
      "Sagittarius": { element: "Fire", planet: "Jupiter", emoji: "♐", color: "text-purple-500" },
      "Capricorn": { element: "Earth", planet: "Saturn", emoji: "♑", color: "text-gray-700" },
      "Aquarius": { element: "Air", planet: "Uranus, Saturn", emoji: "♒", color: "text-blue-500" },
      "Pisces": { element: "Water", planet: "Neptune, Jupiter", emoji: "♓", color: "text-teal-500" },
    };
    
    return details[sign] || { element: "Unknown", planet: "Unknown", emoji: "⭐", color: "text-white" };
  };
  
  const zodiacDetails = getZodiacDetails(results.zodiacSign);

  return (
    <div className="space-y-8">
      <Card className="border border-primary/20 overflow-hidden bg-card/60 backdrop-blur-lg">
        <div className="absolute top-0 right-0 p-4 text-5xl opacity-20">
          {zodiacDetails.emoji}
        </div>
        
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Moon className={`h-6 w-6 ${zodiacDetails.color}`} />
            <span>{results.name}'s Cosmic Profile</span>
          </CardTitle>
          <CardDescription>
            Born on {format(results.dateOfBirth, "PPP")}
            {results.timeOfBirth && ` at ${results.timeOfBirth}`}
            {results.location && ` in ${results.location}`}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-start sm:items-center">
            <div className="flex flex-col items-center">
              <div className={`text-6xl mb-2 ${zodiacDetails.color}`}>{zodiacDetails.emoji}</div>
              <h3 className="text-2xl font-bold">{results.zodiacSign}</h3>
            </div>
            
            <div className="space-y-2 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-cosmic-gold" />
                  <span><strong>Element:</strong> {zodiacDetails.element}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-cosmic-gold" />
                  <span><strong>Ruling Planet:</strong> {zodiacDetails.planet}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Key Personality Traits:</h4>
                <div className="flex flex-wrap gap-2">
                  {results.traits.map((trait, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-primary/20 rounded-full text-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Your Cosmic Journey</h3>
            <p className="text-muted-foreground">{results.horoscope}</p>
          </div>
          
          <Tabs defaultValue="general">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 w-full">
              <TabsTrigger value="general" className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">General</span>
              </TabsTrigger>
              <TabsTrigger value="career" className="flex items-center gap-1">
                <BriefcaseBusiness className="h-4 w-4" />
                <span className="hidden sm:inline">Career</span>
              </TabsTrigger>
              <TabsTrigger value="love" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Love</span>
              </TabsTrigger>
              <TabsTrigger value="family" className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Family</span>
              </TabsTrigger>
              <TabsTrigger value="finance" className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="hidden sm:inline">Finance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-lg mb-2">Weekly Forecast</h4>
                <p>{results.forecast}</p>
              </div>
              <div>
                <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <CalendarClock className="h-5 w-5 text-cosmic-gold" />
                  <span>Cosmic Timing</span>
                </h4>
                <p>{results.luckyCycle}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="career" className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <BriefcaseBusiness className="h-5 w-5 text-cosmic-gold" />
                  <span>Professional Path</span>
                </h4>
                <p>{results.careerForecast}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="love" className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-cosmic-gold" />
                  <span>Romantic Outlook</span>
                </h4>
                <p>{results.loveForecast}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="family" className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <Home className="h-5 w-5 text-cosmic-gold" />
                  <span>Family Connections</span>
                </h4>
                <p>{results.familyForecast}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="finance" className="space-y-4 mt-4">
              <div>
                <h4 className="font-medium text-lg mb-2 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-cosmic-gold" />
                  <span>Financial Outlook</span>
                </h4>
                <p>{results.financeForecast}</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={onReset} 
            className="w-full"
          >
            Get Another Reading
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
