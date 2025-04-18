
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  LogOut, 
  Moon, 
  Stars, 
  UserCircle, 
  Heart,
  FileText,
  Info,
  Settings
} from "lucide-react";
import HoroscopeForm from "@/components/horoscope/HoroscopeForm";
import CompatibilityForm from "@/components/compatibility/CompatibilityForm";

interface DashboardProps {
  activeTab?: string;
}

export default function Dashboard({ activeTab = "horoscope" }: DashboardProps) {
  const { user, logout } = useUser();
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple to-cosmic-blue">
      {/* Header with glass effect */}
      <header className="border-b border-primary/10 backdrop-blur-md bg-background/30 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Stars className="h-7 w-7 text-cosmic-gold" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cosmic-gold to-cosmic-lavender">Astro Love Nexus</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/about"
                className="text-sm text-cosmic-lavender hover:text-cosmic-gold transition-colors flex items-center gap-1"
              >
                <Info className="h-4 w-4" />
                <span>About</span>
              </Link>
              <Link
                to="/profile"
                className="text-sm text-cosmic-lavender hover:text-cosmic-gold transition-colors flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                <span>My Readings</span>
              </Link>
              <Link
                to="/profile"
                className="text-sm text-cosmic-lavender hover:text-cosmic-gold transition-colors flex items-center gap-1"
              >
                <Settings className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </nav>
            <div className="flex items-center gap-2 bg-background/20 px-3 py-1.5 rounded-full">
              <UserCircle className="h-5 w-5 text-cosmic-gold" />
              <span className="text-sm hidden sm:inline-block text-cosmic-lavender">{user?.email}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout} 
              title="Log out"
              className="hover:bg-background/20 text-cosmic-lavender hover:text-white"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-10">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-8">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 w-full max-w-md bg-background/20 backdrop-blur-sm p-1 rounded-full">
              <TabsTrigger 
                value="horoscope" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-cosmic-accent/30 data-[state=active]:text-white px-6 py-3"
              >
                <Moon className="h-4 w-4" />
                <span>Personal Horoscope</span>
              </TabsTrigger>
              <TabsTrigger 
                value="compatibility" 
                className="flex items-center gap-2 rounded-full data-[state=active]:bg-cosmic-accent/30 data-[state=active]:text-white px-6 py-3"
              >
                <Heart className="h-4 w-4" />
                <span>Love Compatibility</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="horoscope" className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-8 space-y-4">
                <div className="inline-block bg-cosmic-accent/20 p-3 rounded-full">
                  <Moon className="h-10 w-10 text-cosmic-gold" />
                </div>
                <h2 className="text-3xl font-bold text-white">Your Cosmic Profile</h2>
                <p className="text-cosmic-lavender max-w-md mx-auto">
                  Discover your zodiac sign and detailed horoscope based on your birth information
                </p>
              </div>
              <Card className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden">
                <CardContent className="p-6">
                  <HoroscopeForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="compatibility" className="space-y-8 animate-in fade-in-50 duration-300">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8 space-y-4">
                <div className="inline-block bg-cosmic-accent/20 p-3 rounded-full">
                  <Heart className="h-10 w-10 text-cosmic-gold" />
                </div>
                <h2 className="text-3xl font-bold text-white">Cosmic Compatibility</h2>
                <p className="text-cosmic-lavender max-w-md mx-auto">
                  Check your astrological match with someone special to understand your relationship dynamics
                </p>
              </div>
              <Card className="border border-primary/20 bg-card/40 backdrop-blur-lg overflow-hidden">
                <CardContent className="p-6">
                  <CompatibilityForm />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
