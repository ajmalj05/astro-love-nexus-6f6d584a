
import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  CalendarDays,
  Clock,
  MapPin,
  UserCircle,
  User,
  History,
  PersonStanding
} from "lucide-react";

export default function Profile() {
  const { user } = useUser();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [horoscopeReadings, setHoroscopeReadings] = useState([]);
  const [compatibilityReadings, setCompatibilityReadings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchReadings();
  }, [user]);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching profile",
        description: error.message
      });
    } else if (data) {
      setProfile(data);
    }
  };

  const fetchReadings = async () => {
    if (!user?.id) return;

    const [horoscopeData, compatibilityData] = await Promise.all([
      supabase
        .from('horoscope_readings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('compatibility_readings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    ]);

    if (horoscopeData.data) setHoroscopeReadings(horoscopeData.data);
    if (compatibilityData.data) setCompatibilityReadings(compatibilityData.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-t-2 border-cosmic-gold rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple to-cosmic-blue">
      <div className="container py-8 space-y-6">
        <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <UserCircle className="h-4 w-4" />
                  <span>Name</span>
                </div>
                <div>{profile?.full_name || "Not set"}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>Birth Date</span>
                </div>
                <div>
                  {profile?.birth_date ? format(new Date(profile.birth_date), 'PPP') : "Not set"}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Birth Time</span>
                </div>
                <div>{profile?.birth_time || "Not set"}</div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Birth Location</span>
                </div>
                <div>{profile?.birth_location || "Not set"}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="horoscope" className="space-y-4">
          <TabsList>
            <TabsTrigger value="horoscope">Horoscope History</TabsTrigger>
            <TabsTrigger value="compatibility">Compatibility History</TabsTrigger>
          </TabsList>

          <TabsContent value="horoscope">
            <div className="space-y-4">
              {horoscopeReadings.map((reading: any) => (
                <Card key={reading.id} className="border border-primary/20 bg-card/60 backdrop-blur-lg">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <History className="h-4 w-4 text-cosmic-gold" />
                          <span className="font-medium">{reading.reading_type}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(reading.created_at), 'PPp')}
                        </span>
                      </div>
                      <p className="text-sm">{reading.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="compatibility">
            <div className="space-y-4">
              {compatibilityReadings.map((reading: any) => (
                <Card key={reading.id} className="border border-primary/20 bg-card/60 backdrop-blur-lg">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PersonStanding className="h-4 w-4 text-cosmic-gold" />
                          <span className="font-medium">
                            {reading.person1_name} & {reading.person2_name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(reading.created_at), 'PPp')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Compatibility Score:</span>
                        <span className="text-cosmic-gold">{reading.compatibility_score}%</span>
                      </div>
                      <p className="text-sm">{reading.reading_content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
