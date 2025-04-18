
import { Stars } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-purple to-cosmic-blue">
      <div className="container py-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Stars className="h-16 w-16 text-cosmic-gold" />
          </div>
          <h1 className="text-4xl font-bold">About Astro Love Nexus</h1>
          <p className="text-xl text-cosmic-lavender max-w-2xl mx-auto">
            Discover the cosmic connections that shape your destiny and relationships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Astro Love Nexus combines ancient astrological wisdom with modern technology
                to help you understand yourself and your relationships better. We believe that
                the stars can guide us to deeper self-awareness and more meaningful connections.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg">
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Personalized horoscope readings</li>
                <li>Detailed compatibility analysis</li>
                <li>Relationship insights</li>
                <li>Astrological guidance</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-primary/20 bg-card/60 backdrop-blur-lg md:col-span-2">
            <CardHeader>
              <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our platform uses advanced astrological algorithms to analyze planetary
                positions and celestial alignments at the time of your birth. We combine
                this data with traditional astrological wisdom to provide you with accurate
                and insightful readings.
              </p>
              <p>
                For compatibility readings, we compare the astrological profiles of both
                individuals to identify areas of harmony and potential challenges,
                helping you build stronger relationships.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
