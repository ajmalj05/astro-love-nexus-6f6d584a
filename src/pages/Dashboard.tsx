
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LogOut, 
  Moon, 
  Stars, 
  Sun, 
  UserCircle, 
  Users, 
  CalendarDays, 
  Heart
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
      {/* Header */}
      <header className="border-b border-primary/10 backdrop-blur-sm bg-background/50 sticky top-0 z-10">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <Stars className="h-6 w-6 text-cosmic-gold" />
            <h1 className="text-xl font-bold">Astro Love Nexus</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <UserCircle className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm hidden sm:inline-block">{user?.email}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Log out">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-6">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid grid-cols-2 w-full max-w-md">
              <TabsTrigger value="horoscope" className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Personal Horoscope</span>
              </TabsTrigger>
              <TabsTrigger value="compatibility" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Love Compatibility</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="horoscope" className="space-y-6">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Your Cosmic Profile</h2>
                <p className="text-muted-foreground">Discover your zodiac sign and detailed horoscope</p>
              </div>
              <HoroscopeForm />
            </div>
          </TabsContent>
          
          <TabsContent value="compatibility" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Cosmic Compatibility</h2>
                <p className="text-muted-foreground">Check your astrological match with someone special</p>
              </div>
              <CompatibilityForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
