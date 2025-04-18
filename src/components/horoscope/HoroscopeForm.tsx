
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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import HoroscopeResults from "./HoroscopeResults";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  dateOfBirth: z.date({
    required_error: "Date of birth is required.",
  }),
  timeOfBirth: z.string().optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function HoroscopeForm() {
  const [results, setResults] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      timeOfBirth: "",
      location: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    // In a real app, this would be an API call to get horoscope data
    // Here we'll simulate processing for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const dob = values.dateOfBirth;
    const zodiacSign = getZodiacSign(dob.getMonth() + 1, dob.getDate());
    
    setResults({
      name: values.name,
      dateOfBirth: dob,
      timeOfBirth: values.timeOfBirth,
      location: values.location,
      zodiacSign: zodiacSign,
      traits: getPersonalityTraits(zodiacSign),
      horoscope: generateHoroscope(zodiacSign),
      forecast: generateForecast(zodiacSign),
      careerForecast: generateCareerForecast(zodiacSign),
      loveForecast: generateLoveForecast(zodiacSign),
      familyForecast: generateFamilyForecast(zodiacSign),
      financeForecast: generateFinanceForecast(zodiacSign),
      luckyCycle: getLuckyCycle(zodiacSign, dob)
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

  const generateHoroscope = (sign: string): string => {
    const horoscopes: Record<string, string> = {
      "Aries": "Your bold and courageous nature puts you at the forefront of new ventures. As a natural leader, you thrive when taking initiative. Your life path is defined by your courage in facing challenges head-on and your ability to inspire others with your enthusiasm.",
      "Taurus": "Your grounded nature and appreciation for life's pleasures make you a stabilizing force. You value security and comfort, building your life on solid foundations. Your path is characterized by unwavering determination and the ability to create lasting beauty around you.",
      "Gemini": "Your curious and adaptable mind gives you a versatile approach to life. Communication is your strength, allowing you to connect diverse ideas and people. Your journey involves continuous learning and sharing knowledge with others.",
      "Cancer": "Your deep emotional intuition connects you to the feelings of others and your ancestral past. Family and home are central to your life path. Your journey involves creating emotional security for yourself and those you love.",
      "Leo": "Your natural charisma and generous spirit draw others to your warmth. Creativity and self-expression are essential to your fulfillment. Your path involves discovering authentic ways to shine your light and inspire those around you.",
      "Virgo": "Your analytical mind and attention to detail allow you to improve everything you touch. Service and practical problem-solving define your approach to life. Your journey involves finding ways to be of use while maintaining inner harmony.",
      "Libra": "Your sense of balance and fairness guides your interactions. Relationships and harmony are central to your life's meaning. Your path involves creating beauty and justice in your world through diplomacy and cooperation.",
      "Scorpio": "Your intensity and perceptiveness give you profound emotional and psychological insight. Transformation is a constant theme in your life. Your journey involves embracing change and uncovering deeper truths beneath the surface.",
      "Sagittarius": "Your optimistic outlook and love of freedom propel you toward new horizons. Exploration and philosophical growth define your path. Your journey involves expanding your understanding of life through diverse experiences and beliefs.",
      "Capricorn": "Your disciplined nature and ambition drive you toward achievement and mastery. Structure and responsibility give meaning to your life. Your path involves building lasting legacies through patient, persistent effort.",
      "Aquarius": "Your innovative thinking and humanitarian values position you ahead of your time. Community and idealism are central to your purpose. Your journey involves bringing progressive change to benefit the collective.",
      "Pisces": "Your compassionate nature and spiritual sensitivity connect you to realms beyond the ordinary. Imagination and empathy define your approach to life. Your path involves bridging worlds and bringing dreams into reality."
    };
    
    return horoscopes[sign] || "Your cosmic energy is currently evolving in mysterious ways. The stars suggest a period of transformation and discovery ahead.";
  };

  const generateForecast = (sign: string): string => {
    const forecasts: Record<string, string> = {
      "Aries": "The coming days bring opportunities for bold new beginnings. Your energy is particularly high, making this an excellent time to start projects that require courage and initiative. Watch for moments of impatience; taking a breath before acting will lead to better outcomes.",
      "Taurus": "Stability and comfort are highlighted in your immediate future. Financial matters may improve, especially if you've been building solid foundations. Your persistence in practical matters will be rewarded. Take time to enjoy sensory pleasures that ground you.",
      "Gemini": "Your mental agility is especially sharp in the coming period. Communications flow easily, making this an excellent time for important conversations and learning new information. Social connections bring unexpected opportunities. Stay flexible as plans may change rapidly.",
      "Cancer": "Emotional insights bring clarity to personal relationships. Home and family matters take center stage, possibly requiring your nurturing attention. Your intuition is heightened, offering guidance if you take time to listen. Self-care routines establish better emotional boundaries.",
      "Leo": "Creative energy surrounds you in the days ahead. Your natural leadership abilities are recognized, bringing opportunities for recognition. Romantic possibilities brighten for both single and attached Leos. Express yourself authentically and watch how others respond positively.",
      "Virgo": "Practical matters fall into place as your organizational skills are in high demand. Health routines established now have lasting benefits. Your attention to detail solves a problem others have missed. Allow yourself to receive help rather than trying to manage everything alone.",
      "Libra": "Harmonious energy surrounds your relationships, making this an ideal time to resolve conflicts and strengthen bonds. Aesthetic choices made now bring lasting satisfaction. Legal matters trend in your favor. Finding balance between giving and receiving creates more sustainable connections.",
      "Scorpio": "Transformative experiences deepen your understanding of long-held patterns. Financial matters may require your investigative skills to uncover hidden opportunities. Intimate relationships intensify, bringing both challenges and rewards. Trust your instincts about who deserves your confidence.",
      "Sagittarius": "Expansive opportunities for travel, education, or spiritual growth appear on your horizon. Optimism attracts fortunate circumstances, especially in areas where you've been feeling restricted. Legal matters trend positively. Philosophical conversations open new ways of understanding your life path.",
      "Capricorn": "Professional recognition for past efforts creates new opportunities for advancement. Financial planning now lays groundwork for future security. Family responsibilities may require restructuring your approach. Patience with slow-moving projects pays off with substantial results.",
      "Aquarius": "Innovative ideas attract like-minded collaborators. Friendship networks expand, bringing people who appreciate your unique perspective. Technological solutions solve persistent problems. Humanitarian efforts you support make meaningful progress. Balance your visionary thinking with practical steps.",
      "Pisces": "Intuitive insights guide you through complex emotional waters. Creative inspiration flows easily when you make space for solitude and reflection. Spiritual practices deepen your connection to inner wisdom. Compassionate actions toward others return to you in unexpected forms of support."
    };
    
    return forecasts[sign] || "The cosmos aligns to bring unexpected developments in the days ahead. Stay open to new perspectives and be ready to adapt to changing circumstances.";
  };

  const generateCareerForecast = (sign: string): string => {
    const forecasts: Record<string, string> = {
      "Aries": "Your career path accelerates as your leadership qualities catch the attention of decision-makers. Consider taking calculated risks that showcase your innovative thinking. A competitive situation turns in your favor when you focus on authentic strengths rather than comparing yourself to others.",
      "Taurus": "Steady progress in professional matters brings financial stability. Your reliability earns trust from superiors, potentially leading to increased responsibility. A creative approach to practical problems displays your value to the organization. Patience with bureaucratic processes pays off.",
      "Gemini": "Communication skills become your greatest professional asset. Opportunities involving writing, speaking, or negotiating bring favorable attention. Your adaptability helps navigate workplace changes that unsettle colleagues. Consider developing expertise in multiple complementary areas rather than a single specialization.",
      "Cancer": "Nurturing leadership creates loyalty in your professional circle. Your intuitive understanding of others' needs strengthens team dynamics. Home-based business opportunities show particular promise. Creating emotional security in your work environment enhances productivity.",
      "Leo": "Your natural charisma attracts career opportunities requiring public engagement. Creative leadership allows you to delegate effectively while maintaining quality. Recognition for past contributions opens doors to advancement. Teaching or mentoring roles highlight your talents.",
      "Virgo": "Analytical skills solve problems that have stymied others, raising your professional profile. Attention to procedural improvements increases efficiency in your workplace. Health-related or service-oriented fields offer particular fulfillment. Organizing systems that enhance productivity impresses decision-makers.",
      "Libra": "Diplomatic handling of workplace relationships creates harmony that benefits all. Aesthetic judgment enhances projects requiring design elements. Partnership opportunities offer balance between independence and collaboration. Fair negotiations produce agreements that honor everyone's needs.",
      "Scorpio": "Strategic thinking uncovers opportunities hidden from less perceptive colleagues. Research abilities reveal valuable information that influences important decisions. Financial management skills improve resource allocation. Transformation of outdated systems demonstrates your value to the organization.",
      "Sagittarius": "Expansive vision attracts projects with international connections. Educational opportunities enhance your expertise in meaningful ways. Publishing, teaching, or marketing your ideas brings professional recognition. Ethical leadership inspirers others to exceed expectations.",
      "Capricorn": "Structured approach to long-term goals yields substantial results. Administrative abilities bring order to chaotic situations. Mentorship from experienced professionals accelerates your progress. Patience with hierarchical systems while demonstrating competence ensures steady advancement.",
      "Aquarius": "Innovative solutions to organizational challenges showcase your unique perspective. Technological expertise becomes increasingly valuable to your team. Collaborative projects with like-minded colleagues create breakthrough results. Humanitarian elements incorporated into your work increase personal satisfaction.",
      "Pisces": "Creative visualization helps manifest career opportunities aligned with deeper values. Intuitive understanding of market trends guides prescient decisions. Artistic or healing abilities differentiate your contributions. Compassionate leadership creates loyalty among colleagues and clients."
    };
    
    return forecasts[sign] || "Your professional path is entering a period of meaningful evolution. Pay attention to opportunities that align with your authentic strengths rather than conventional expectations.";
  };

  const generateLoveForecast = (sign: string): string => {
    const forecasts: Record<string, string> = {
      "Aries": "Romantic passion ignites when you express your authentic desires. For attached Aries, initiating new shared activities revitalizes your connection. Single Aries attract attention through confident self-expression. Balancing independence with vulnerability creates relationships that honor your need for both freedom and connection.",
      "Taurus": "Sensual connections deepen as you create beautiful experiences with loved ones. Relationship stability comes through patient nurturing. For unattached Taurus, potential partners appreciate your reliability and warm presence. Expressing needs directly rather than expecting others to intuit them strengthens bonds.",
      "Gemini": "Intellectual rapport forms the foundation of your most satisfying relationships. Curiosity about your partner's changing thoughts keeps long-term connections fresh. Single Geminis attract interest through witty conversation and genuine questions. Communication patterns established now set important relationship precedents.",
      "Cancer": "Emotional intimacy deepens when you share vulnerabilities with trusted others. Creating safe space for loved ones to express feelings strengthens bonds. Unattached Cancers attract nurturing partners by demonstrating both strength and sensitivity. Family approval becomes less important as you trust your own emotional wisdom.",
      "Leo": "Romantic generosity and playfulness bring joy to your relationships. Expressing appreciation for your partner's unique qualities strengthens your connection. Single Leos attract admirers through authentic self-expression and warm-hearted engagement. Creative date ideas showcase your special approach to romance.",
      "Virgo": "Practical acts of service communicate your love more clearly than grand gestures. Attention to your partner's preferences shows your deep care. Unattached Virgos attract grounded connections when focusing on mutual growth rather than perfection. Healing past relationship patterns creates space for healthier bonds.",
      "Libra": "Harmonious relationships develop through balanced giving and receiving. Aesthetic experiences shared with partners create beautiful memories. For single Libras, clarity about relationship values attracts compatible connections. Addressing conflicts directly rather than avoiding discomfort creates stronger bonds.",
      "Scorpio": "Intimate connections transform as you allow genuine vulnerability. Trust develops when you share deeper truths gradually. Unattached Scorpios attract intensity when they reveal themselves authentically rather than testing others. Releasing control creates space for truly equal partnerships.",
      "Sagittarius": "Relationships thrive when incorporating adventure and philosophical exploration. Sharing your broader vision with partners expands your connection. Single Sagittarians attract kindred spirits through enthusiasm and optimism. Balancing freedom with commitment creates relationships that enhance rather than restrict.",
      "Capricorn": "Relationship foundations strengthen through consistent, reliable presence. Long-term planning with partners creates shared purpose. Unattached Capricorns attract stable connections when revealing their deeper sensitivity beneath practical exteriors. Family patterns transform through conscious relationship choices.",
      "Aquarius": "Unconventional relationships honor your need for both connection and independence. Intellectual compatibility forms the basis of your strongest bonds. Single Aquarians attract intriguing partners through authentic expression of unique perspectives. Friendships that evolve into romance show particular promise.",
      "Pisces": "Soul-level connections develop through shared creative or spiritual interests. Empathetic understanding creates safe space for emotional expression. Unattached Pisces attract loving partners when establishing healthy boundaries. Releasing idealized romantic fantasies opens space for authentic connections."
    };
    
    return forecasts[sign] || "Your heart opens to new possibilities as you align with your authentic relationship needs. Understanding patterns from past connections helps you create more fulfilling bonds in the present.";
  };

  const generateFamilyForecast = (sign: string): string => {
    const forecasts: Record<string, string> = {
      "Aries": "Family dynamics shift as you express needs more directly. Taking initiative in resolving old conflicts creates new understanding. For parents, encouraging children's independence while providing clear boundaries creates respect. Honoring ancestral strengths while releasing unhelpful patterns transforms your family legacy.",
      "Taurus": "Creating beautiful, comfortable home environments strengthens family bonds. Establishing meaningful traditions gives children security and connection. Financial planning for family needs demonstrates your deep care. Patience with different communication styles improves cross-generational relationships.",
      "Gemini": "Curious questions open new conversations with family members. Sharing knowledge and stories creates bridges across generations. For parents, explaining 'why' behind expectations helps children develop understanding. Flexibility with family plans reduces unnecessary stress and creates space for spontaneous connection.",
      "Cancer": "Intuitive understanding of family members' emotional needs strengthens bonds. Creating safe space for authentic expression fosters trust. Family history research reveals meaningful patterns and connections. Establishing healthy emotional boundaries prevents caretaking from becoming overwhelming.",
      "Leo": "Generous appreciation for each family member's unique gifts creates harmony. Organizing celebrations that honor important milestones strengthens family culture. For parents, encouraging children's self-expression builds confidence. Creative family activities establish warm memories that last generations.",
      "Virgo": "Practical support shows your love for family members. Organizing household systems creates more space for quality time together. For parents, teaching useful skills builds children's confidence. Releasing perfectionism allows more authentic family connections and reduces unnecessary tension.",
      "Libra": "Diplomatic approaches to family differences create harmonious solutions. Creating beautiful home environments enhances everyone's well-being. Establishing fair household responsibilities teaches children important values. Balancing couple time with family activities strengthens the foundation of the home.",
      "Scorpio": "Deep emotional understanding helps transform family patterns. Trust builds as you share appropriate vulnerabilities with older children. Investigating family history reveals illuminating connections. Creating safe space for discussing difficult subjects prevents destructive secrets from forming.",
      "Sagittarius": "Sharing your broader worldview expands family perspectives. Travel or educational experiences create meaningful family memories. For parents, encouraging children's curiosity develops their natural intelligence. Philosophical discussions about values establish important family foundations.",
      "Capricorn": "Structured family traditions create security across generations. Working together on home improvements builds practical skills and connection. For parents, balancing discipline with warmth earns children's respect. Family responsibilities managed well create space for genuine relaxation together.",
      "Aquarius": "Unconventional family structures or traditions honor your unique perspective. Technological connections keep extended family engaged across distances. For parents, encouraging children's individuality builds confidence. Creating family systems that respect everyone's independence reduces unnecessary conflict.",
      "Pisces": "Intuitive understanding of unspoken family dynamics brings healing. Creative expression shared with family members deepens connections. For parents, spiritual or imaginative activities with children develop their inner resources. Establishing gentle boundaries prevents emotional overwhelm in family relationships."
    };
    
    return forecasts[sign] || "Family connections enter a phase of meaningful evolution. Honoring the past while creating new traditions brings balance to your home life. Understanding generational patterns helps you make conscious choices about the legacy you're creating.";
  };

  const generateFinanceForecast = (sign: string): string => {
    const forecasts: Record<string, string> = {
      "Aries": "Financial initiatives taken now show promising results. Entrepreneurial ventures highlight your natural leadership. Impulsive purchases decrease as you align spending with authentic values. Competitive financial situations turn in your favor when you focus on your unique strengths rather than others' achievements.",
      "Taurus": "Steady financial planning establishes long-term security. Natural resource management skills improve investment outcomes. Balancing practical savings with quality-of-life expenditures creates sustainable prosperity. Patience with slow-growing investments yields substantial returns.",
      "Gemini": "Diverse income streams match your varied interests and abilities. Communication skills create valuable professional opportunities. Gathering information before financial decisions prevents costly mistakes. Adaptability helps you navigate economic changes that challenge those with more rigid approaches.",
      "Cancer": "Intuitive financial decisions often outperform purely analytical approaches. Home-related investments show particular promise. Creating emotional security through prudent financial management reduces stress. Family financial history influences your approach to money in ways worth examining.",
      "Leo": "Generous financial energy creates abundance that flows back to you. Creative ventures show increasing income potential. Leadership roles open doors to improved financial opportunities. Balancing current enjoyment with future security creates sustainable prosperity.",
      "Virgo": "Analytical approach to finances maximizes available resources. Attention to details others miss prevents unnecessary losses. Health investments pay dividends through reduced expenses later. Service-oriented income sources align with your natural abilities and values.",
      "Libra": "Balanced approach to spending and saving creates financial harmony. Partnership opportunities improve your financial picture. Aesthetic judgment creates value in creative or design-oriented ventures. Fair negotiations ensure arrangements that benefit all parties.",
      "Scorpio": "Strategic financial thinking uncovers opportunities others miss. Research abilities improve investment outcomes. Joint financial arrangements require clear agreements to prevent complications. Transforming your relationship with power and control around money increases prosperity.",
      "Sagittarius": "Expansive financial vision attracts abundance from unexpected sources. International connections improve your financial picture. Educational investments yield valuable returns. Optimistic approach to money matters attracts positive circumstances while requiring practical grounding.",
      "Capricorn": "Disciplined financial management creates impressive long-term results. Administrative abilities convert chaos to profitable order. Status purchases become less important as you define success on your own terms. Patience with wealth-building processes ensures substantial outcomes.",
      "Aquarius": "Innovative financial approaches yield unconventional but effective results. Technological expertise creates valuable professional opportunities. Collaborative ventures pool resources for mutual benefit. Financial decisions aligned with humanitarian values create both prosperity and meaning.",
      "Pisces": "Intuitive financial insights guide surprisingly effective decisions. Creative abilities translate into increasing prosperity when practically applied. Compassionate use of resources creates positive energetic returns. Establishing clear boundaries prevents financial drains through unbalanced relationships."
    };
    
    return forecasts[sign] || "Your financial landscape enters a period of meaningful evolution. Aligning money management with authentic values creates prosperity with purpose. Patterns established now will influence your material well-being for cycles to come.";
  };

  const getLuckyCycle = (sign: string, birthDate: Date): string => {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const sumDigits = month + day;
    
    let cycle;
    if (sumDigits % 3 === 0) {
      cycle = "You're currently in an upward cycle for luck and opportunity. The next 3-4 months show particular promise for advancement in areas requiring confidence and visibility.";
    } else if (sumDigits % 3 === 1) {
      cycle = "You're in a consolidation phase of your luck cycle. The next 2-3 months favor strengthening foundations and completing existing projects rather than beginning new ventures.";
    } else {
      cycle = "You're entering a seed-planting phase of your luck cycle. Efforts initiated now may not show immediate results but establish important foundations for future growth.";
    }
    
    return cycle;
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
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your name" 
                          {...field} 
                          className="bg-muted/50"
                        />
                      </FormControl>
                      <FormDescription>
                        Your birth name for more accurate readings
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
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
                      <FormDescription>
                        Your date of birth determines your zodiac sign
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time of Birth (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="time"
                          placeholder="e.g., 14:30" 
                          {...field} 
                          className="bg-muted/50"
                        />
                      </FormControl>
                      <FormDescription>
                        For more accurate birth chart details
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Birth Location (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., Paris, France" 
                          {...field} 
                          className="bg-muted/50"
                        />
                      </FormControl>
                      <FormDescription>
                        Your birth location helps with ascendant calculation
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-b-2 border-current"></div>
                      <span>Calculating your cosmic profile...</span>
                    </div>
                  ) : (
                    <span>Generate Horoscope</span>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <HoroscopeResults results={results} onReset={resetForm} />
      )}
    </>
  );
}
