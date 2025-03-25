
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useToast } from "@/components/ui/use-toast";
import { Globe, Map } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

// Import refactored components and services
import { RouteForm } from '@/components/emissions/RouteForm';
import { EmissionResults } from '@/components/emissions/EmissionResults';
import { EmissionFactors } from '@/components/emissions/EmissionFactors';
import { getDistance, calculateEmissions } from '@/services/emissionCalculator';

const EmissionCalculator = () => {
  const { toast } = useToast();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [mode, setMode] = useState('truck');
  const [distance, setDistance] = useState<number | null>(null);
  const [emissions, setEmissions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSourceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSource(e.target.value);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || !isNaN(Number(value))) {
      setWeight(value === '' ? '' : Number(value));
    }
  };

  const handleModeChange = (value: string) => {
    setMode(value);
  };

  const handleCalculate = async () => {
    if (!source || !destination || weight === '' || weight <= 0) {
      toast({
        title: "Input Error",
        description: "Please fill all fields with valid values.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const calculatedDistance = await getDistance(source, destination);
      setDistance(calculatedDistance);

      if (calculatedDistance) {
        const calculatedEmissions = calculateEmissions(Number(weight), calculatedDistance, mode);
        setEmissions(calculatedEmissions);
        
        toast({
          title: "Calculation Complete",
          description: `The carbon footprint is ${calculatedEmissions} kg CO₂.`,
        });
      } else {
        toast({
          title: "Location Error",
          description: "Could not calculate route between these locations.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "API Error",
        description: "An error occurred while fetching data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto pt-24 pb-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Carbon Footprint Calculator
            </span>
          </h1>
          
          <p className="text-muted-foreground mb-8 text-center max-w-2xl">
            Calculate the carbon emissions of your product's journey through the supply chain.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Route Information
                </CardTitle>
                <CardDescription>
                  Enter the source, destination, and product details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RouteForm
                  source={source}
                  destination={destination}
                  weight={weight}
                  mode={mode}
                  isLoading={isLoading}
                  onSourceChange={handleSourceChange}
                  onDestinationChange={handleDestinationChange}
                  onWeightChange={handleWeightChange}
                  onModeChange={handleModeChange}
                  onCalculate={handleCalculate}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  Calculation Results
                </CardTitle>
                <CardDescription>
                  Environmental impact of your product's journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center py-8">
                  <EmissionResults
                    distance={distance}
                    emissions={emissions}
                    mode={mode}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col text-xs text-muted-foreground">
                <p>Emission factors (kg CO₂ per km per kg):</p>
                <EmissionFactors />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmissionCalculator;
