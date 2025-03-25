
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Truck, Ship, Plane, Train } from 'lucide-react';

interface RouteFormProps {
  source: string;
  destination: string;
  weight: number | '';
  mode: string;
  isLoading: boolean;
  onSourceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDestinationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onModeChange: (value: string) => void;
  onCalculate: () => void;
}

export const RouteForm: React.FC<RouteFormProps> = ({
  source,
  destination,
  weight,
  mode,
  isLoading,
  onSourceChange,
  onDestinationChange,
  onWeightChange,
  onModeChange,
  onCalculate
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="source">Source Location</Label>
        <Input 
          id="source" 
          placeholder="e.g., New York, USA" 
          value={source}
          onChange={onSourceChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="destination">Destination Location</Label>
        <Input 
          id="destination" 
          placeholder="e.g., Los Angeles, USA" 
          value={destination}
          onChange={onDestinationChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="weight">Product Weight (kg)</Label>
        <Input 
          id="weight" 
          type="number"
          placeholder="e.g., 100" 
          value={weight.toString()}
          onChange={onWeightChange}
          min="0.1"
          step="0.1"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="mode">Transport Mode</Label>
        <Select value={mode} onValueChange={onModeChange}>
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

      <Button 
        onClick={onCalculate}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? "Calculating..." : "Calculate Carbon Footprint"}
      </Button>
    </div>
  );
};
