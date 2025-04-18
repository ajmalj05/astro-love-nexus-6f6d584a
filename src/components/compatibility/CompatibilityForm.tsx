import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { CalendarIcon, User, UserCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CompatibilityResults from "./CompatibilityResults";

const personSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  timeOfBirth: z.string().optional(),
});

const formSchema = z.object({
  person1: personSchema,
  person2: personSchema,
});

type FormValues = z.infer<typeof formSchema>;

export default function CompatibilityForm() {
  const [results, setResults] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      person1: {
        name: "",
        timeOfBirth: "",
      },
      person2: {
        name: "",
        timeOfBirth: "",
      },
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call to get compatibility data
    // Here we'll simulate processing for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const person1Sign = getZodiacSign(values.person1.dateOfBirth.getMonth() + 1, values.person1.dateOfBirth.getDate());
    const person2Sign = getZodiacSign(values.person2.dateOfBirth.getMonth() + 1, values.person2.dateOfBirth.getDate());
    
    // Calculate compatibility score based on zodiac signs (simplified)
    const compatibilityScore = calculateCompatibilityScore(person1Sign, person2Sign);
    
    setResults({
      person1: {
        name: values.person1.name,
        dateOfBirth: values.person1.dateOfBirth,
        timeOfBirth: values.person1.timeOfBirth,
        zodiacSign: person1Sign,
        traits: getPersonalityTraits(person1Sign),
      },
      person2: {
        name: values.person2.name,
        dateOfBirth: values.person2.dateOfBirth,
        timeOfBirth: values.person2.timeOfBirth,
        zodiacSign: person2Sign,
        traits: getPersonalityTraits(person2Sign),
      },
      compatibility: {
        score: compatibilityScore,
        romanticPotential: generateRomanticPotential(person1Sign, person2Sign),
        communicationStyle: generateCommunicationStyle(person1Sign, person2Sign),
        challenges: generateChallenges(person1Sign, person2Sign),
        loveEnergy: generateLoveEnergy(person1Sign, person2Sign),
      }
    });
    
    setIsLoading(false);
  };

  const getZodiacSign = (month: number, day: number): string => {
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
    return "Pisces";
  };

  const getPersonalityTraits = (sign: string): string[] => {
    const traits: Record<string, string[]> = {
      "Aries": ["Courageous", "Determined", "Passionate", "Confident", "Enthusiastic"],
      "Taurus": ["Reliable", "Patient", "Practical", "Devoted", "Responsible"],
      "Gemini": ["Gentle", "Affectionate", "Curious", "Adaptable", "Quick-witted"],
      "Cancer": ["Tenacious", "Highly Imaginative", "Loyal", "Emotional", "Sympathetic"],
      "Leo": ["Creative", "Passionate", "Generous", "Warm-hearted", "Cheerful"],
      "Virgo": ["Loyal", "Analytical", "Kind", "Hardworking", "Practical"],
      "Libra": ["Cooperative", "Diplomatic", "Gracious", "Fair-minded", "Social"],
      "Scorpio": ["Resourceful", "Powerful", "Brave", "Passionate", "Stubborn"],
      "Sagittarius": ["Generous", "Idealistic", "Great sense of humor", "Enthusiastic", "Freedom-loving"],
      "Capricorn": ["Responsible", "Disciplined", "Self-control", "Good managers", "Ambitious"],
      "Aquarius": ["Progressive", "Original", "Independent", "Humanitarian", "Intellectual"],
      "Pisces": ["Compassionate", "Artistic", "Intuitive", "Gentle", "Wise"]
    };
    
    return traits[sign] || ["Mysterious", "Complex", "Unpredictable"];
  };

  // Simplified compatibility calculation
  const calculateCompatibilityScore = (sign1: string, sign2: string): number => {
    // Group by element (Fire, Earth, Air, Water)
    const elements: Record<string, string> = {
      "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
      "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
      "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
      "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
    };
    
    const element1 = elements[sign1];
    const element2 = elements[sign2];
    
    // Base compatibility on elements
    let baseScore = 60; // Start with a neutral score
    
    // Same sign bonus
    if (sign1 === sign2) {
      baseScore += 15;
    }
    
    // Element compatibility
    if (element1 === element2) {
      // Same element
      baseScore += 10;
    } else if (
      (element1 === "Fire" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Fire") ||
      (element1 === "Earth" && element2 === "Water") ||
      (element1 === "Water" && element2 === "Earth")
    ) {
      // Complementary elements
      baseScore += 20;
    } else if (
      (element1 === "Fire" && element2 === "Fire") ||
      (element1 === "Earth" && element2 === "Earth") ||
      (element1 === "Air" && element2 === "Air") ||
      (element1 === "Water" && element2 === "Water")
    ) {
      // Same element
      baseScore += 15;
    }
    
    // Specific sign compatibility adjustments
    const specificPairs: Record<string, number> = {
      "Aries-Libra": 15, "Libra-Aries": 15,
      "Taurus-Scorpio": 15, "Scorpio-Taurus": 15,
      "Gemini-Sagittarius": 15, "Sagittarius-Gemini": 15,
      "Cancer-Capricorn": 15, "Capricorn-Cancer": 15,
      "Leo-Aquarius": 15, "Aquarius-Leo": 15,
      "Virgo-Pisces": 15, "Pisces-Virgo": 15,
      
      "Aries-Leo": 12, "Leo-Aries": 12,
      "Taurus-Virgo": 12, "Virgo-Taurus": 12,
      "Gemini-Libra": 12, "Libra-Gemini": 12,
      "Cancer-Scorpio": 12, "Scorpio-Cancer": 12,
      "Leo-Sagittarius": 12, "Sagittarius-Leo": 12,
      "Virgo-Capricorn": 12, "Capricorn-Virgo": 12,
      "Libra-Aquarius": 12, "Aquarius-Libra": 12,
      "Scorpio-Pisces": 12, "Pisces-Scorpio": 12,
    };
    
    const pairKey = `${sign1}-${sign2}`;
    if (specificPairs[pairKey]) {
      baseScore += specificPairs[pairKey];
    }
    
    // Add some randomness but keep within 45-95 range
    const randomFactor = Math.floor(Math.random() * 10) - 5; // -5 to +5
    let finalScore = baseScore + randomFactor;
    
    // Ensure score stays within reasonable bounds
    finalScore = Math.max(45, Math.min(98, finalScore));
    
    return finalScore;
  };

  const generateRomanticPotential = (sign1: string, sign2: string): string => {
    // Group by element (Fire, Earth, Air, Water)
    const elements: Record<string, string> = {
      "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
      "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
      "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
      "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
    };
    
    const element1 = elements[sign1];
    const element2 = elements[sign2];
    
    if (element1 === element2) {
      return `As two ${element1} signs, your romantic connection has natural understanding and similar approaches to expressing love. You instinctively understand each other's emotional needs, though you may occasionally amplify each other's less balanced tendencies. Your shared element creates a foundation of compatibility that helps you weather relationship challenges.`;
    } 
    
    if (
      (element1 === "Fire" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Fire")
    ) {
      return "The Fire and Air combination creates a relationship filled with inspiration, movement, and intellectual stimulation. You naturally fuel each other's passions and ideas, creating a dynamic and exciting partnership. Fire brings enthusiasm and direct action, while Air contributes mental clarity and communication skills. Together, you create a relationship that stays vibrant through continual growth and exploration.";
    }
    
    if (
      (element1 === "Earth" && element2 === "Water") ||
      (element1 === "Water" && element2 === "Earth")
    ) {
      return "The Earth and Water combination creates a nurturing, productive relationship grounded in emotional depth. Earth provides stability and practical support that helps Water feel secure in expressing their deep emotional nature. Water, in turn, helps Earth connect with their feelings and intuition, softening their practical approach to life. Together, you create a relationship that balances security with emotional intimacy.";
    }
    
    if (
      (element1 === "Fire" && element2 === "Earth") ||
      (element1 === "Earth" && element2 === "Fire")
    ) {
      return "The Fire and Earth combination creates an intriguing blend of action and stability. Fire brings passion, spontaneity and inspiration to the relationship, while Earth contributes practicality, reliability and sensual grounding. When balanced, you complement each other beautifully, with Fire inspiring Earth to take risks and Earth helping Fire manifest their visions. The challenge comes in respecting your different paces and approaches to life.";
    }
    
    if (
      (element1 === "Water" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Water")
    ) {
      return "The Water and Air combination creates a relationship that blends emotion with intellect. Water brings emotional depth, intuition and nurturing qualities, while Air contributes intellectual clarity, communication skills and fresh perspectives. The challenge lies in translating between your different languages—emotional for Water, mental for Air. When you bridge this gap, you create a partnership that satisfies both heart and mind.";
    }
    
    if (
      (element1 === "Fire" && element2 === "Water") ||
      (element1 === "Water" && element2 === "Fire")
    ) {
      return "The Fire and Water combination creates a relationship of intense passion and emotional depth. Your elements are fundamentally different—Fire expresses energy outward while Water draws energy inward—creating both attraction and challenge. Fire brings enthusiasm, courage and inspiration to the relationship, while Water contributes emotional awareness, intuition and nurturing. Learning to balance these opposing tendencies creates a relationship that's both exciting and emotionally fulfilling.";
    }
    
    if (
      (element1 === "Earth" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Earth")
    ) {
      return "The Earth and Air combination creates a relationship that balances practicality with innovation. Earth brings stability, sensuality and practical wisdom, while Air contributes intellectual excitement, social connections and fresh perspectives. The challenge lies in valuing each other's fundamentally different approaches—Earth's material focus and Air's conceptual orientation. When you appreciate these differences as complementary rather than opposing, you create a partnership that's both stable and intellectually stimulating.";
    }
    
    return "Your romantic connection draws on the unique qualities of both your signs, creating a blend of energies that can be both complementary and challenging. The cosmic forces bring you together to learn from your differences while celebrating your shared values. Through conscious communication and appreciation of each other's unique gifts, you can create a relationship that supports both individual growth and deep connection.";
  };

  const generateCommunicationStyle = (sign1: string, sign2: string): string => {
    // Communication styles by element
    const communicationStyles: Record<string, string> = {
      "Aries": "direct and passionate",
      "Taurus": "deliberate and practical",
      "Gemini": "quick and versatile",
      "Cancer": "emotionally nuanced and indirect",
      "Leo": "expressive and warm",
      "Virgo": "precise and analytical",
      "Libra": "diplomatic and balanced",
      "Scorpio": "intense and strategic",
      "Sagittarius": "enthusiastic and philosophical",
      "Capricorn": "structured and purposeful",
      "Aquarius": "innovative and detached",
      "Pisces": "intuitive and compassionate"
    };
    
    return `${sign1}'s ${communicationStyles[sign1]} communication style meets ${sign2}'s ${communicationStyles[sign2]} approach, creating a dynamic where you'll need to consciously adapt to each other's ways of expressing and receiving information. When you understand these different approaches as complementary rather than opposing, your conversations become more effective and satisfying. Listen for the intent behind each other's words rather than focusing only on communication style.`;
  };

  const generateChallenges = (sign1: string, sign2: string): string => {
    // Core challenges by element combination
    const elements: Record<string, string> = {
      "Aries": "Fire", "Leo": "Fire", "Sagittarius": "Fire",
      "Taurus": "Earth", "Virgo": "Earth", "Capricorn": "Earth",
      "Gemini": "Air", "Libra": "Air", "Aquarius": "Air",
      "Cancer": "Water", "Scorpio": "Water", "Pisces": "Water"
    };
    
    const element1 = elements[sign1];
    const element2 = elements[sign2];
    
    if (element1 === element2) {
      return `As two ${element1} signs, you share similar approaches to life, which creates natural understanding but can also amplify each other's blindspots. Your challenge is to appreciate your similarities while developing complementary strengths to balance your shared tendencies. Recognize when your similar approaches create limitations and consciously expand beyond your comfort zones together.`;
    }
    
    if (
      (element1 === "Fire" && element2 === "Water") ||
      (element1 === "Water" && element2 === "Fire")
    ) {
      return "Fire and Water create a challenging elemental combination, as Fire's direct, action-oriented approach can feel overwhelming to Water's sensitive, receptive nature. Conversely, Water's emotional depth and indirect communication can frustrate Fire's desire for clarity and forward movement. Your challenge is learning to temper and translate between these fundamentally different approaches to processing experience.";
    }
    
    if (
      (element1 === "Earth" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Earth")
    ) {
      return "Earth and Air create a challenging elemental combination, as Earth's practical, material focus can feel limiting to Air's conceptual, variety-seeking nature. Conversely, Air's abstract thinking and changeable attention can seem unreliable to Earth's need for stability and tangible results. Your challenge is learning to value these different perspectives as complementary rather than opposing approaches to life.";
    }
    
    if (
      (element1 === "Fire" && element2 === "Earth") ||
      (element1 === "Earth" && element2 === "Fire")
    ) {
      return "Fire and Earth create a relationship with different paces and priorities. Fire's spontaneous, fast-moving energy can feel destabilizing to Earth's methodical, security-focused approach. Conversely, Earth's caution and practical concerns can dampen Fire's enthusiasm and inspiration. Your challenge is learning to respect these different rhythms while finding a shared pace that honors both approaches.";
    }
    
    if (
      (element1 === "Water" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Water")
    ) {
      return "Water and Air create a relationship with different languages and processing styles. Water's emotional, intuitive approach can feel overwhelming to Air's rational, detached perspective. Conversely, Air's intellectual analysis can seem cold or disconnected to Water's feeling-centered experience. Your challenge is developing translation skills that bridge these fundamentally different ways of understanding life.";
    }
    
    if (
      (element1 === "Fire" && element2 === "Air") ||
      (element1 === "Air" && element2 === "Fire")
    ) {
      return "While Fire and Air generally complement each other well, challenges arise around grounding your shared enthusiasm and ideas. You may inspire each other to start many projects without developing the follow-through to complete them. Fire may occasionally overwhelm Air with intensity, while Air might intellectualize experiences Fire wants to engage with more directly. Finding balance between inspiration and practicality strengthens your connection.";
    }
    
    if (
      (element1 === "Earth" && element2 === "Water") ||
      (element1 === "Water" && element2 === "Earth")
    ) {
      return "While Earth and Water generally complement each other well, challenges arise around balancing practicality with emotional needs. Earth may sometimes seem insensitive to Water's emotional fluctuations, while Water might appear unnecessarily complicated to Earth's straightforward approach. Earth can become too focused on material concerns while Water may drift into emotional realms disconnected from practical realities. Finding balance strengthens your connection.";
    }
    
    return "Every relationship faces challenges that offer opportunities for growth. Your different perspectives and approaches to life will occasionally create friction, but these differences also provide balance and completeness when understood as complementary rather than opposing. The key is developing respect for each other's unique gifts and learning to communicate across your different styles and priorities.";
  };

  const generateLoveEnergy = (sign1: string, sign2: string): string => {
    // Random seed based on the two signs to ensure consistent results
    const seed = sign1.length + sign2.length;
    const randomFactor = (seed % 10) / 10; // 0.0 to 0.9
    
    // Create arrays of possible love energy descriptions
    const energyDescriptions = [
      "Your connection vibrates with a magnetic intensity that draws you together even during challenging times. The cosmic energy between you creates both harmony and dynamic tension, a combination that keeps your relationship evolving through various seasons and cycles. There's a sense of familiarity between you, as if your souls recognized each other from a previous time.",
      
      "The energy between you flows like a gentle river, creating a sense of peaceful connection that deepens over time. Your bond has a natural rhythm that allows both closeness and independence, creating space for individual growth within the relationship. There's a feeling of coming home when you're together, a comfortable recognition that soothes both your spirits.",
      
      "Sparks fly when you're together, creating an exciting and unpredictable energy that keeps your connection fresh and engaging. The astrological currents between your signs generate a continuous flow of creative tension that can be channeled into passion, inspiration, and growth. Your relationship has a living quality that requires attention but rewards you with continuous discovery.",
      
      "Your connection resonates with a harmonious frequency that supports both individual expression and shared experience. The cosmic energy between you creates a sense of balance, where strengths and challenges complement each other in a natural dance. There's a feeling of rightness in your partnership, as if the stars themselves conspired to bring your unique energies together.",
      
      "The bond between you has a transformative quality, challenging each of you to grow beyond comfortable patterns into more authentic expressions of yourselves. This sometimes creates intensity as old structures fall away, making space for new ways of relating. The cosmic blueprint of your connection contains potential for profound healing and evolution when you embrace its transformative nature."
    ];
    
    // Select a description based on our seed
    const descriptionIndex = Math.floor(randomFactor * energyDescriptions.length);
    return energyDescriptions[descriptionIndex];
  };

  const resetForm = () => {
    form.reset();
    setResults(null);
  };

  return (
    <>
      {!results ? (
        <Card className="bg-card/60 backdrop-blur-lg border border-primary/20">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Person 1 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="h-5 w-5 text-cosmic-lavender" />
                    <h3 className="text-lg font-medium">Your Details</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="person1.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your name" 
                            {...field} 
                            className="bg-muted/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="person1.dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Your Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-muted/50",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="person1.timeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Time of Birth (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="time"
                            placeholder="e.g., 14:30" 
                            {...field} 
                            className="bg-muted/50"
                          />
                        </FormControl>
                        <FormDescription>
                          For more accurate compatibility
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Separator />
                
                {/* Person 2 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <UserCircle2 className="h-5 w-5 text-cosmic-gold" />
                    <h3 className="text-lg font-medium">Partner Details</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="person2.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner's Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter their name" 
                            {...field} 
                            className="bg-muted/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="person2.dateOfBirth"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Partner's Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal bg-muted/50",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="person2.timeOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner's Time of Birth (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="time"
                            placeholder="e.g., 14:30" 
                            {...field}
                            className="bg-muted/50"
                          />
                        </FormControl>
                        <FormDescription>
                          For more accurate compatibility
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-current"></div>
                      <span>Calculating cosmic compatibility...</span>
                    </div>
                  ) : (
                    <span>Analyze Compatibility</span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <CompatibilityResults results={results} onReset={resetForm} />
      )}
    </>
  );
}
