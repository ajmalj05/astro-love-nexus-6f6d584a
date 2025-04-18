
import { Stars, Moon, Heart, Sparkles, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export default function About() {
  const { user } = useUser();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple to-cosmic-blue">
      <div className="container py-8 space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to={user ? "/dashboard" : "/"} className="text-white hover:text-cosmic-gold transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white">About Us</h1>
        </div>

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block relative">
            <Stars className="h-20 w-20 text-cosmic-gold" />
            <div className="absolute -inset-4 rounded-full bg-cosmic-gold/10 animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cosmic-gold via-white to-cosmic-lavender">
            Astro Love Nexus
          </h1>
          <p className="text-xl text-cosmic-lavender max-w-2xl mx-auto leading-relaxed">
            Discover the cosmic connections that shape your destiny and relationships through ancient astrological wisdom and modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          <Card className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cosmic-accent/30 to-transparent pb-4">
              <CardTitle className="flex items-center gap-2 text-cosmic-gold">
                <Sparkles className="h-5 w-5" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="leading-relaxed text-cosmic-lavender">
                Astro Love Nexus combines ancient astrological wisdom with cutting-edge technology
                to help you understand yourself and your relationships on a deeper level. We believe that
                the stars can guide us to greater self-awareness, meaningful connections, and
                personal growth through cosmic insights and astrological guidance.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cosmic-accent/30 to-transparent pb-4">
              <CardTitle className="flex items-center gap-2 text-cosmic-gold">
                <Stars className="h-5 w-5" />
                What We Offer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-3 text-cosmic-lavender">
                <li className="flex items-start gap-2">
                  <div className="bg-cosmic-accent/20 p-1 rounded-full mt-0.5">
                    <Moon className="h-4 w-4 text-cosmic-gold" />
                  </div>
                  <span>Personalized horoscope readings based on your birth details</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-cosmic-accent/20 p-1 rounded-full mt-0.5">
                    <Heart className="h-4 w-4 text-cosmic-gold" />
                  </div>
                  <span>Detailed compatibility analysis for romantic and personal relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-cosmic-accent/20 p-1 rounded-full mt-0.5">
                    <Stars className="h-4 w-4 text-cosmic-gold" />
                  </div>
                  <span>Insights into career paths, life challenges, and personal growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-cosmic-accent/20 p-1 rounded-full mt-0.5">
                    <Sparkles className="h-4 w-4 text-cosmic-gold" />
                  </div>
                  <span>Astrological guidance to help navigate life's biggest questions</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden md:col-span-2">
            <CardHeader className="bg-gradient-to-r from-cosmic-accent/30 to-transparent pb-4">
              <CardTitle className="flex items-center gap-2 text-cosmic-gold">
                <Moon className="h-5 w-5" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <p className="leading-relaxed text-cosmic-lavender">
                  Our platform uses advanced astrological algorithms that analyze the positions of celestial bodies
                  at the time of your birth. We combine this data with traditional astrological wisdom
                  and modern psychological insights to provide you with accurate and meaningful readings.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-background/20 p-6 rounded-lg space-y-3 text-center">
                    <div className="flex justify-center">
                      <div className="bg-cosmic-accent/20 p-2 rounded-full">
                        <Sparkles className="h-6 w-6 text-cosmic-gold" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white">Data Collection</h3>
                    <p className="text-sm text-cosmic-lavender">
                      We collect your birth details including date, time, and location to calculate your exact birth chart
                    </p>
                  </div>
                  <div className="bg-background/20 p-6 rounded-lg space-y-3 text-center">
                    <div className="flex justify-center">
                      <div className="bg-cosmic-accent/20 p-2 rounded-full">
                        <Moon className="h-6 w-6 text-cosmic-gold" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white">Astrological Analysis</h3>
                    <p className="text-sm text-cosmic-lavender">
                      Our system analyzes planetary positions, houses, and aspects to create a comprehensive astrological profile
                    </p>
                  </div>
                  <div className="bg-background/20 p-6 rounded-lg space-y-3 text-center">
                    <div className="flex justify-center">
                      <div className="bg-cosmic-accent/20 p-2 rounded-full">
                        <Heart className="h-6 w-6 text-cosmic-gold" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-white">Personalized Insights</h3>
                    <p className="text-sm text-cosmic-lavender">
                      We generate custom readings that provide meaningful insights about your personality, relationships, and life path
                    </p>
                  </div>
                </div>
                <p className="leading-relaxed text-cosmic-lavender mt-4">
                  For compatibility readings, we compare the astrological profiles of both individuals to identify
                  areas of harmony and potential challenges, helping you build stronger and more fulfilling relationships.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center max-w-xl mx-auto mt-12 space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Cosmic Philosophy</h2>
          <p className="text-cosmic-lavender leading-relaxed">
            At Astro Love Nexus, we believe that astrology is not about predicting a fixed future, 
            but about understanding the cosmic energies that influence our lives. 
            Our readings are designed to empower you with self-knowledge and insight, 
            allowing you to navigate your life's journey with greater awareness and purpose.
          </p>
          <div className="pt-4">
            <Link 
              to={user ? "/dashboard" : "/auth"} 
              className="inline-flex items-center gap-2 bg-cosmic-gold hover:bg-cosmic-gold/80 text-black font-semibold px-6 py-3 rounded-full transition-colors"
            >
              <Stars className="h-5 w-5" />
              <span>{user ? "Go to Dashboard" : "Begin Your Cosmic Journey"}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
