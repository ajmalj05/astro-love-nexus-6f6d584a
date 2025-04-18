import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Stars, MoonStar, Moon, User, Heart } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-12 overflow-hidden">
      {/* Stars background animation */}
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

      {/* Content */}
      <div className="z-10 max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Stars className="h-20 w-20 text-cosmic-gold" />
        </div>
        
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white mb-6">
          Astro Love Nexus
        </h1>
        
        <p className="text-xl text-cosmic-lavender mb-8 max-w-2xl mx-auto">
          Discover your cosmic destiny and unlock the secrets of the stars. Explore detailed horoscopes and compatibility matches with the power of celestial wisdom.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto mb-12">
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-primary/20 flex flex-col items-center">
            <Moon className="h-12 w-12 mb-4 text-cosmic-lavender" />
            <h2 className="text-xl font-semibold mb-2">Personal Horoscope</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Discover your zodiac sign, personality traits, and detailed predictions for your life path.
            </p>
            <ul className="text-sm text-left space-y-2 mb-6 w-full">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                  <MoonStar className="h-3 w-3" />
                </div>
                <span>Detailed zodiac profile</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                  <MoonStar className="h-3 w-3" />
                </div>
                <span>Career & finance predictions</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                  <MoonStar className="h-3 w-3" />
                </div>
                <span>Relationship & family insights</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-primary/20 flex flex-col items-center">
            <Heart className="h-12 w-12 mb-4 text-cosmic-gold" />
            <h2 className="text-xl font-semibold mb-2">Compatibility Match</h2>
            <p className="text-muted-foreground mb-4 text-sm">
              Analyze your cosmic connection with someone special and discover your relationship potential.
            </p>
            <ul className="text-sm text-left space-y-2 mb-6 w-full">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                  <MoonStar className="h-3 w-3" />
                </div>
                <span>Compatibility score & analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                  <MoonStar className="h-3 w-3" />
                </div>
                <span>Communication style insights</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                  <MoonStar className="h-3 w-3" />
                </div>
                <span>Relationship potential & challenges</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button
            size="lg"
            className="bg-cosmic-gold hover:bg-cosmic-gold/80 text-black font-semibold px-8"
            onClick={() => navigate(user ? "/dashboard" : "/auth")}
          >
            <Stars className="mr-2 h-5 w-5" />
            {user ? "View Your Dashboard" : "Begin Your Cosmic Journey"}
          </Button>
          
          {!user && (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/auth")}
                className="text-cosmic-gold underline-offset-4 hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
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
