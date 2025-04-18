
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Stars, 
  Moon, 
  Heart, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Shield,
  Clock,
  Sparkles,
  CalendarDays,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const features = [
    {
      icon: <Moon className="h-10 w-10 text-cosmic-lavender" />,
      title: "Daily Horoscope",
      description: "Get personalized daily insights based on your zodiac sign and celestial alignments.",
    },
    {
      icon: <Heart className="h-10 w-10 text-cosmic-gold" />,
      title: "Love Compatibility",
      description: "Discover your cosmic connection potential with detailed compatibility analysis.",
    },
    {
      icon: <CalendarDays className="h-10 w-10 text-cosmic-pink" />,
      title: "Birth Chart Analysis",
      description: "Understand your personality traits and life path through your natal chart.",
    },
    {
      icon: <Sparkles className="h-10 w-10 text-cosmic-accent" />,
      title: "Personalized Readings",
      description: "Get detailed astrological readings tailored specifically for you.",
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-cosmic-gold" />,
      title: "Secure & Private",
      description: "Your personal data is always protected and encrypted"
    },
    {
      icon: <Clock className="h-6 w-6 text-cosmic-gold" />,
      title: "24/7 Access",
      description: "Get your readings anytime, anywhere"
    },
    {
      icon: <Star className="h-6 w-6 text-cosmic-gold" />,
      title: "Expert Analysis",
      description: "Advanced algorithms for accurate predictions"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Animated stars background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-cosmic-purple to-cosmic-blue">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.7,
                animation: `twinkle ${Math.random() * 5 + 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Stars className="h-24 w-24 text-cosmic-gold animate-pulse" />
              <div className="absolute -inset-4 rounded-full bg-cosmic-gold/20 animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cosmic-gold via-cosmic-lavender to-cosmic-pink mb-6">
            Discover Your Cosmic Path
          </h1>
          
          <p className="text-xl md:text-2xl text-cosmic-lavender max-w-3xl mx-auto mb-8">
            Uncover the secrets written in the stars and navigate your destiny with our powerful astrological insights
          </p>
          
          <Button
            size="lg"
            className="bg-cosmic-gold hover:bg-cosmic-gold/80 text-black font-semibold px-8 py-6 text-lg"
            onClick={() => navigate(user ? "/dashboard" : "/auth")}
          >
            {user ? "Go to Dashboard" : "Begin Your Journey"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Celestial Features
            </h2>
            <p className="text-cosmic-lavender max-w-2xl mx-auto">
              Explore our comprehensive suite of astrological tools and services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border border-cosmic-lavender/20 bg-cosmic-purple/30 backdrop-blur-lg hover:bg-cosmic-purple/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 bg-cosmic-purple/40 p-4 rounded-full inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">
                    {feature.title}
                  </h3>
                  <p className="text-cosmic-lavender">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative z-10 py-20 px-4 bg-cosmic-purple/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-cosmic-lavender max-w-2xl mx-auto">
              Experience the difference with our advanced astrological platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="mb-4 bg-cosmic-purple/40 p-4 rounded-full inline-block">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cosmic-gold">
                  {benefit.title}
                </h3>
                <p className="text-cosmic-lavender">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="border border-cosmic-lavender/20 bg-gradient-to-br from-cosmic-purple/40 to-cosmic-blue/40 backdrop-blur-lg p-8">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-white">
                Ready to Explore Your Cosmic Journey?
              </h2>
              <p className="text-cosmic-lavender">
                Join us today and discover what the stars have in store for you
              </p>
              <Button
                size="lg"
                className="bg-cosmic-gold hover:bg-cosmic-gold/80 text-black font-semibold"
                onClick={() => navigate(user ? "/dashboard" : "/auth")}
              >
                {user ? "View Your Dashboard" : "Start Now"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

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
