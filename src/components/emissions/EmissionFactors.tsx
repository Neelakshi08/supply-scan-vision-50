
import React from 'react';
import { Truck, Ship, Plane, Train } from 'lucide-react';

// Emission factors in kg CO₂ per km per kg of weight
export const EMISSION_FACTORS = {
  truck: 0.1,
  ship: 0.02,
  airplane: 0.8,
  train: 0.04
};

export const EmissionFactors: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2 w-full text-xs text-muted-foreground">
      <div className="flex items-center gap-1"><Truck className="h-3 w-3" /> Truck: {EMISSION_FACTORS.truck}</div>
      <div className="flex items-center gap-1"><Ship className="h-3 w-3" /> Ship: {EMISSION_FACTORS.ship}</div>
      <div className="flex items-center gap-1"><Plane className="h-3 w-3" /> Airplane: {EMISSION_FACTORS.airplane}</div>
      <div className="flex items-center gap-1"><Train className="h-3 w-3" /> Train: {EMISSION_FACTORS.train}</div>
    </div>
  );
};
