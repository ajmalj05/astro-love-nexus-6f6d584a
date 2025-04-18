
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Heart, MessageCircle, AlertCircle, Sparkles, UserCircle2 } from "lucide-react";

interface CompatibilityResultsProps {
  results: {
    person1: {
      name: string;
      dateOfBirth: Date;
      timeOfBirth?: string;
      zodiacSign: string;
      traits: string[];
    };
    person2: {
      name: string;
      dateOfBirth: Date;
      timeOfBirth?: string;
      zodiacSign: string;
      traits: string[];
    };
    compatibility: {
      score: number;
      romanticPotential: string;
      communicationStyle: string;
      challenges: string;
      loveEnergy: string;
    };
  };
  onReset: () => void;
}

export default function CompatibilityResults({ results, onReset }: CompatibilityResultsProps) {
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
  
  const person1Details = getZodiacDetails(results.person1.zodiacSign);
  const person2Details = getZodiacDetails(results.person2.zodiacSign);
  
  // Determine compatibility color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 65) return "text-teal-400";
    if (score >= 50) return "text-yellow-400";
    if (score >= 35) return "text-orange-500";
    return "text-red-500";
  };
  
  const scoreColor = getScoreColor(results.compatibility.score);
  
  // Determine compatibility class for progress bar
  const getScoreClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-teal-400";
    if (score >= 50) return "bg-yellow-400";
    if (score >= 35) return "bg-orange-500";
    return "bg-red-500";
  };
  
  const progressClass = getScoreClass(results.compatibility.score);

  return (
    <div className="space-y-8">
      <Card className="border border-primary/20 overflow-hidden bg-card/60 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-center gap-3">
            <div className={`text-2xl ${person1Details.color}`}>{person1Details.emoji}</div>
            <span className="text-cosmic-lavender">{results.person1.name}</span>
            <span className="text-cosmic-gold">&</span>
            <span className="text-cosmic-lavender">{results.person2.name}</span>
            <div className={`text-2xl ${person2Details.color}`}>{person2Details.emoji}</div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Compatibility Score */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-4 border-primary/30">
              <div className={`text-4xl font-bold ${scoreColor}`}>
                {results.compatibility.score}%
              </div>
              <div className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-cosmic-gold text-black font-bold text-xs">
                {results.compatibility.score >= 80 ? "A" : 
                 results.compatibility.score >= 65 ? "B" :
                 results.compatibility.score >= 50 ? "C" :
                 results.compatibility.score >= 35 ? "D" : "F"}
              </div>
            </div>
            <h3 className="text-lg font-medium">Cosmic Compatibility Score</h3>
            <Progress value={results.compatibility.score} className={`w-full h-2 ${progressClass}`} />
          </div>
          
          {/* Partners Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Person 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCircle2 className="h-5 w-5 text-cosmic-lavender" />
                <h3 className="font-medium">{results.person1.name}</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`text-3xl ${person1Details.color}`}>{person1Details.emoji}</div>
                <div>
                  <div className="font-medium text-lg">{results.person1.zodiacSign}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(results.person1.dateOfBirth, "PPP")}
                    {results.person1.timeOfBirth && ` at ${results.person1.timeOfBirth}`}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Element: <span className="text-cosmic-lavender">{person1Details.element}</span></div>
                <div className="text-sm mb-2">Ruling Planet: <span className="text-cosmic-lavender">{person1Details.planet}</span></div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {results.person1.traits.slice(0, 3).map((trait, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 bg-primary/20 rounded-full text-xs"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Person 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <UserCircle2 className="h-5 w-5 text-cosmic-gold" />
                <h3 className="font-medium">{results.person2.name}</h3>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`text-3xl ${person2Details.color}`}>{person2Details.emoji}</div>
                <div>
                  <div className="font-medium text-lg">{results.person2.zodiacSign}</div>
                  <div className="text-sm text-muted-foreground">
                    {format(results.person2.dateOfBirth, "PPP")}
                    {results.person2.timeOfBirth && ` at ${results.person2.timeOfBirth}`}
                  </div>
                </div>
              </div>
              
              <div>
                <div className="text-sm mb-1">Element: <span className="text-cosmic-gold">{person2Details.element}</span></div>
                <div className="text-sm mb-2">Ruling Planet: <span className="text-cosmic-gold">{person2Details.planet}</span></div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {results.person2.traits.slice(0, 3).map((trait, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 bg-primary/20 rounded-full text-xs"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Compatibility Details */}
          <Tabs defaultValue="romance" className="mt-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="romance" className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Romance</span>
              </TabsTrigger>
              <TabsTrigger value="communication" className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Communication</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Challenges</span>
              </TabsTrigger>
              <TabsTrigger value="energy" className="flex items-center gap-1">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Energy</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="romance" className="mt-4 space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Heart className="h-5 w-5 text-cosmic-gold" />
                <span>Romantic Potential</span>
              </h3>
              <p>{results.compatibility.romanticPotential}</p>
            </TabsContent>
            
            <TabsContent value="communication" className="mt-4 space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-cosmic-gold" />
                <span>Communication Style</span>
              </h3>
              <p>{results.compatibility.communicationStyle}</p>
            </TabsContent>
            
            <TabsContent value="challenges" className="mt-4 space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-cosmic-gold" />
                <span>Relationship Challenges</span>
              </h3>
              <p>{results.compatibility.challenges}</p>
            </TabsContent>
            
            <TabsContent value="energy" className="mt-4 space-y-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cosmic-gold" />
                <span>Love Energy Reading</span>
              </h3>
              <p>{results.compatibility.loveEnergy}</p>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={onReset} 
            className="w-full"
          >
            Analyze Another Relationship
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
