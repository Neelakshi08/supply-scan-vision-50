
import React from 'react';
import { Globe } from 'lucide-react';
import { Truck, Ship, Plane, Train } from 'lucide-react';

interface EmissionResultsProps {
  distance: number | null;
  emissions: number | null;
  mode: string;
}

export const EmissionResults: React.FC<EmissionResultsProps> = ({ 
  distance, 
  emissions,
  mode 
}) => {
  const getModeIcon = () => {
    switch(mode) {
      case 'truck': return <Truck className="h-6 w-6 text-amber-600" />;
      case 'ship': return <Ship className="h-6 w-6 text-blue-600" />;
      case 'airplane': return <Plane className="h-6 w-6 text-purple-600" />;
      case 'train': return <Train className="h-6 w-6 text-green-600" />;
      default: return <Truck className="h-6 w-6 text-amber-600" />;
    }
  };

  if (!distance || !emissions) {
    return (
      <div className="text-center p-8 text-muted-foreground">
        <Globe className="h-12 w-12 mx-auto mb-4 opacity-30" />
        <p>Enter your route details and calculate to see the results</p>
      </div>
    );
  }

  return (
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
  );
};
