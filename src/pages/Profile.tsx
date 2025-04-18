
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
  PersonStanding,
  Save,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useUser();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    birth_date: "",
    birth_time: "",
    birth_location: ""
  });
  const [horoscopeReadings, setHoroscopeReadings] = useState<any[]>([]);
  const [compatibilityReadings, setCompatibilityReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
      fetchReadings();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user?.id) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    if (error) {
      console.error("Error fetching profile:", error);
      toast({
        variant: "destructive",
        title: "Error fetching profile",
        description: error.message
      });
    } else if (data) {
      setProfile(data);
      setFormData({
        full_name: data.full_name || "",
        birth_date: data.birth_date || "",
        birth_time: data.birth_time || "",
        birth_location: data.birth_location || ""
      });
    }
  };

  const fetchReadings = async () => {
    if (!user?.id) return;

    try {
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

      console.log("Horoscope readings:", horoscopeData);
      console.log("Compatibility readings:", compatibilityData);

      if (horoscopeData.data) setHoroscopeReadings(horoscopeData.data);
      if (compatibilityData.data) setCompatibilityReadings(compatibilityData.data);
    } catch (error) {
      console.error("Error fetching readings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveProfile = async () => {
    if (!user?.id) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: formData.full_name,
        birth_date: formData.birth_date || null,
        birth_time: formData.birth_time || null,
        birth_location: formData.birth_location || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating profile",
        description: error.message
      });
    } else {
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated"
      });
      setEditMode(false);
      fetchProfile();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cosmic-purple to-cosmic-blue flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-cosmic-gold rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple to-cosmic-blue">
      <div className="container py-8 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="text-white hover:text-cosmic-gold transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold text-white">Your Cosmic Profile</h1>
        </div>

        <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-cosmic-accent/30 to-transparent">
            <CardTitle className="flex items-center gap-2 text-cosmic-gold">
              <User className="h-5 w-5" />
              {editMode ? "Edit Profile" : "Profile Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {editMode ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <UserCircle className="h-4 w-4" />
                      <span>Name</span>
                    </label>
                    <Input 
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>Birth Date</span>
                    </label>
                    <Input 
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Birth Time</span>
                    </label>
                    <Input 
                      type="time"
                      name="birth_time"
                      value={formData.birth_time}
                      onChange={handleInputChange}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Birth Location</span>
                    </label>
                    <Input 
                      name="birth_location"
                      value={formData.birth_location}
                      onChange={handleInputChange}
                      placeholder="City, Country"
                      className="bg-background/50"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setEditMode(false)}>Cancel</Button>
                  <Button onClick={saveProfile} className="bg-cosmic-gold hover:bg-cosmic-gold/80 text-black">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <UserCircle className="h-4 w-4" />
                      <span>Name</span>
                    </div>
                    <div className="text-lg">{profile?.full_name || "Not set"}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>Birth Date</span>
                    </div>
                    <div className="text-lg">
                      {profile?.birth_date ? format(new Date(profile.birth_date), 'PPP') : "Not set"}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Birth Time</span>
                    </div>
                    <div className="text-lg">{profile?.birth_time || "Not set"}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Birth Location</span>
                    </div>
                    <div className="text-lg">{profile?.birth_location || "Not set"}</div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setEditMode(true)} className="bg-cosmic-accent hover:bg-cosmic-accent/80">
                    Edit Profile
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="horoscope" className="space-y-4">
          <TabsList className="w-full max-w-md mx-auto bg-background/20 backdrop-blur-sm">
            <TabsTrigger value="horoscope" className="text-base">Horoscope History</TabsTrigger>
            <TabsTrigger value="compatibility" className="text-base">Compatibility History</TabsTrigger>
          </TabsList>

          <TabsContent value="horoscope">
            <div className="space-y-4">
              {horoscopeReadings.length === 0 ? (
                <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg text-center p-8">
                  <p>You haven't received any horoscope readings yet.</p>
                  <Link to="/horoscope" className="text-cosmic-gold hover:underline mt-2 inline-block">
                    Get your first reading
                  </Link>
                </Card>
              ) : (
                horoscopeReadings.map((reading: any) => (
                  <Card key={reading.id} className="border border-primary/20 bg-card/60 backdrop-blur-lg overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <History className="h-5 w-5 text-cosmic-gold" />
                            <span className="font-medium text-lg">{reading.reading_type}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(reading.created_at), 'PPp')}
                          </span>
                        </div>
                        <p className="text-cosmic-lavender leading-relaxed">{reading.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="compatibility">
            <div className="space-y-4">
              {compatibilityReadings.length === 0 ? (
                <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg text-center p-8">
                  <p>You haven't received any compatibility readings yet.</p>
                  <Link to="/compatibility" className="text-cosmic-gold hover:underline mt-2 inline-block">
                    Get your first compatibility reading
                  </Link>
                </Card>
              ) : (
                compatibilityReadings.map((reading: any) => (
                  <Card key={reading.id} className="border border-primary/20 bg-card/60 backdrop-blur-lg overflow-hidden">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <PersonStanding className="h-5 w-5 text-cosmic-gold" />
                            <span className="font-medium text-lg">
                              {reading.person1_name} & {reading.person2_name}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {format(new Date(reading.created_at), 'PPp')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 bg-cosmic-accent/20 p-3 rounded-md">
                          <span className="text-sm font-medium">Compatibility Score:</span>
                          <span className="text-cosmic-gold text-lg font-bold">{reading.compatibility_score}%</span>
                        </div>
                        <p className="text-cosmic-lavender leading-relaxed">{reading.reading_content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
