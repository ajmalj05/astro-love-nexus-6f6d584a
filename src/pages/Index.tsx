
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stars, MoonStar, Moon, User, Heart, ArrowRight, CheckCircle, Star } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const features = [
    {
      icon: <Moon className="h-10 w-10 text-cosmic-lavender" />,
      title: "Personal Horoscope",
      description: "Get detailed insights about your zodiac sign, personality traits, and cosmic destiny.",
    },
    {
      icon: <Heart className="h-10 w-10 text-cosmic-gold" />,
      title: "Love Compatibility",
      description: "Discover your cosmic connection with someone special and analyze your relationship potential.",
    },
    {
      icon: <Star className="h-10 w-10 text-cosmic-accent" />,
      title: "Profile Storage",
      description: "Save your birth details and access all your previous readings in one place.",
    }
  ];

  const testimonials = [
    {
      name: "Sophia L.",
      text: "The compatibility reading was spot-on! It helped me understand my relationship dynamics so much better.",
      zodiac: "Aries"
    },
    {
      name: "Michael T.",
      text: "I was skeptical at first, but my horoscope reading was incredibly accurate and insightful.",
      zodiac: "Cancer"
    },
    {
      name: "Emma R.",
      text: "I've been using Astro Love Nexus for months. It's become my go-to for cosmic guidance!",
      zodiac: "Libra"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-cosmic-purple to-cosmic-blue">
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white opacity-70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-20 pb-16 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6 relative">
            <Stars className="h-24 w-24 text-cosmic-gold filter drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
            <div className="absolute -inset-4 rounded-full bg-cosmic-gold/10 animate-pulse"></div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-tight">
            Astro <span className="text-cosmic-gold">Love</span> Nexus
          </h1>
          
          <p className="text-xl md:text-2xl text-cosmic-lavender max-w-3xl mx-auto leading-relaxed">
            Discover your cosmic destiny and unlock the secrets of the stars with our powerful astrological insights
          </p>
          
          <div className="pt-6">
            <Button
              size="lg"
              className="bg-cosmic-gold hover:bg-cosmic-gold/80 text-black font-semibold px-8 py-6 text-lg group"
              onClick={() => navigate(user ? "/dashboard" : "/auth")}
            >
              {user ? "View Your Dashboard" : "Begin Your Cosmic Journey"}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            {!user && (
              <p className="mt-4 text-sm text-cosmic-lavender">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/auth")}
                  className="text-cosmic-gold underline-offset-4 hover:underline font-medium"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cosmic Features</h2>
            <p className="text-cosmic-lavender max-w-2xl mx-auto">Explore the powerful features that will help you navigate your cosmic journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden hover:bg-card/60 transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="mb-4 bg-background/20 p-4 rounded-full">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-cosmic-lavender">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="relative z-10 py-20 px-4 md:px-6 bg-gradient-to-br from-cosmic-purple/60 to-cosmic-blue/60 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose Astro Love Nexus?</h2>
            <p className="text-cosmic-lavender max-w-2xl mx-auto">See how we compare to other astrological services</p>
          </div>
          
          <div className="rounded-xl overflow-hidden backdrop-blur-lg border border-primary/20">
            <Table>
              <TableHeader>
                <TableRow className="bg-card/60">
                  <TableHead className="text-left text-white">Feature</TableHead>
                  <TableHead className="text-center text-cosmic-gold">Astro Love Nexus</TableHead>
                  <TableHead className="text-center text-cosmic-lavender">Other Services</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="border-t border-primary/10">
                  <TableCell className="font-medium">Personalized Readings</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-cosmic-gold mx-auto" /></TableCell>
                  <TableCell className="text-center text-muted-foreground">Limited</TableCell>
                </TableRow>
                <TableRow className="border-t border-primary/10">
                  <TableCell className="font-medium">Compatibility Analysis</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-cosmic-gold mx-auto" /></TableCell>
                  <TableCell className="text-center text-muted-foreground">Basic Only</TableCell>
                </TableRow>
                <TableRow className="border-t border-primary/10">
                  <TableCell className="font-medium">Reading History</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-cosmic-gold mx-auto" /></TableCell>
                  <TableCell className="text-center text-muted-foreground">Often Premium</TableCell>
                </TableRow>
                <TableRow className="border-t border-primary/10">
                  <TableCell className="font-medium">Detailed Profile Management</TableCell>
                  <TableCell className="text-center"><CheckCircle className="h-5 w-5 text-cosmic-gold mx-auto" /></TableCell>
                  <TableCell className="text-center text-muted-foreground">Rarely Available</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cosmic Testimonials</h2>
            <p className="text-cosmic-lavender max-w-2xl mx-auto">Hear what others are saying about their experience</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-cosmic-gold text-cosmic-gold" />
                    ))}
                  </div>
                  <p className="text-cosmic-lavender italic mb-4">"{testimonial.text}"</p>
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <span className="text-sm text-cosmic-gold">{testimonial.zodiac}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              size="lg"
              className="bg-cosmic-gold hover:bg-cosmic-gold/80 text-black font-semibold px-8 py-6 text-lg"
              onClick={() => navigate(user ? "/dashboard" : "/auth")}
            >
              {user ? "Explore Your Cosmic Profile" : "Start Your Celestial Journey"}
            </Button>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Index;
