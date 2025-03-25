import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useToast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Truck, Ship, Plane, Train, Map, Globe } from 'lucide-react';

// Emission factors in kg CO₂ per km per kg of weight
const EMISSION_FACTORS = {
  truck: 0.1,
  ship: 0.02,
  airplane: 0.8,
  train: 0.04
};

const EmissionCalculator = () => {
  const { toast } = useToast();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [mode, setMode] = useState('truck');
  const [distance, setDistance] = useState<number | null>(null);
  const [emissions, setEmissions] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // GraphHopper API Key
  const API_KEY = "c5d6e2f7-b0bf-43d3-9de8-ef3a4f6ac247";

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

  const getDistance = async (source: string, destination: string) => {
    try {
      // Get source coordinates
      const sourceUrl = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(source)}&key=${API_KEY}`;
      const sourceResponse = await fetch(sourceUrl);
      const sourceData = await sourceResponse.json();
      
      if (!sourceData.hits || sourceData.hits.length === 0) {
        toast({
          title: "Location Error",
          description: "Could not find source location. Please check the spelling and try again.",
          variant: "destructive",
        });
        return null;
      }
      
      const sourceLat = sourceData.hits[0].point.lat;
      const sourceLon = sourceData.hits[0].point.lng;

      // Get destination coordinates
      const destUrl = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(destination)}&key=${API_KEY}`;
      const destResponse = await fetch(destUrl);
      const destData = await destResponse.json();
      
      if (!destData.hits || destData.hits.length === 0) {
        toast({
          title: "Location Error",
          description: "Could not find destination location. Please check the spelling and try again.",
          variant: "destructive",
        });
        return null;
      }
      
      const destLat = destData.hits[0].point.lat;
      const destLon = destData.hits[0].point.lng;

      // Get route distance
      const routeUrl = `https://graphhopper.com/api/1/route?point=${sourceLat},${sourceLon}&point=${destLat},${destLon}&vehicle=car&key=${API_KEY}&calc_points=false`;
      const routeResponse = await fetch(routeUrl);
      const routeData = await routeResponse.json();

      if (routeData.paths && routeData.paths.length > 0) {
        return parseFloat((routeData.paths[0].distance / 1000).toFixed(2)); // Convert meters to km and round to 2 decimals
      } else {
        toast({
          title: "Routing Error",
          description: "Could not calculate route between these locations.",
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error("Error fetching distance:", error);
      toast({
        title: "API Error",
        description: "An error occurred while fetching data. Please try again later.",
        variant: "destructive",
      });
      return null;
    }
  };

  const calculateEmissions = (weight: number, distance: number, mode: string) => {
    const factor = EMISSION_FACTORS[mode as keyof typeof EMISSION_FACTORS] || EMISSION_FACTORS.truck;
    return parseFloat((weight * distance * factor).toFixed(2));
  };

  

  const getModeIcon = () => {
    switch(mode) {
      case 'truck': return <Truck className="h-6 w-6 text-amber-600" />;
      case 'ship': return <Ship className="h-6 w-6 text-blue-600" />;
      case 'airplane': return <Plane className="h-6 w-6 text-purple-600" />;
      case 'train': return <Train className="h-6 w-6 text-green-600" />;
      default: return <Truck className="h-6 w-6 text-amber-600" />;
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
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="source">Source Location</Label>
                  <Input 
                    id="source" 
                    placeholder="e.g., New York, USA" 
                    value={source}
                    onChange={handleSourceChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination Location</Label>
                  <Input 
                    id="destination" 
                    placeholder="e.g., Los Angeles, USA" 
                    value={destination}
                    onChange={handleDestinationChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Product Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number"
                    placeholder="e.g., 100" 
                    value={weight.toString()}
                    onChange={handleWeightChange}
                    min="0.1"
                    step="0.1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mode">Transport Mode</Label>
                  <Select value={mode} onValueChange={handleModeChange}>
                    <SelectTrigger id="mode">
                      <SelectValue placeholder="Select transport mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="truck">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4" />
                          <span>Truck</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="ship">
                        <div className="flex items-center gap-2">
                          <Ship className="h-4 w-4" />
                          <span>Ship</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="airplane">
                        <div className="flex items-center gap-2">
                          <Plane className="h-4 w-4" />
                          <span>Airplane</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="train">
                        <div className="flex items-center gap-2">
                          <Train className="h-4 w-4" />
                          <span>Train</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleCalculate}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>Calculating...</>
                  ) : (
                    <>Calculate Carbon Footprint</>
                  )}
                </Button>
              </CardFooter>
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
                  {distance && emissions ? (
                    <div className="text-center">
                      <div className="flex justify-center mb-4">
                        {getModeIcon()}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="text-3xl font-bold">{distance} km</p>
                      </div>
                      <div className="h-0.5 bg-border my-6" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Carbon Emissions</p>
                        <p className="text-4xl font-bold text-primary">{emissions} kg CO₂</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8 text-muted-foreground">
                      <Globe className="h-12 w-12 mx-auto mb-4 opacity-30" />
                      <p>Enter your route details and calculate to see the results</p>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col text-xs text-muted-foreground">
                <p>Emission factors (kg CO₂ per km per kg):</p>
                <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                  <div className="flex items-center gap-1"><Truck className="h-3 w-3" /> Truck: {EMISSION_FACTORS.truck}</div>
                  <div className="flex items-center gap-1"><Ship className="h-3 w-3" /> Ship: {EMISSION_FACTORS.ship}</div>
                  <div className="flex items-center gap-1"><Plane className="h-3 w-3" /> Airplane: {EMISSION_FACTORS.airplane}</div>
                  <div className="flex items-center gap-1"><Train className="h-3 w-3" /> Train: {EMISSION_FACTORS.train}</div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmissionCalculator;
