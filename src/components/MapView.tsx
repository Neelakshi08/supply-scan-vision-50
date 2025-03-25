
import React, { useEffect, useState, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'origin' | 'destination' | 'completed' | 'current' | 'pending';
}

interface MapViewProps {
  locations: Location[];
  className?: string;
}

export const MapView: React.FC<MapViewProps> = ({ locations, className }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [currentLocation, setCurrentLocation] = useState<number>(0);

  // Simulate movement between locations
  useEffect(() => {
    if (locations.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentLocation((prev) => (prev + 1) % locations.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [locations]);

  return (
    <div className={cn("relative w-full rounded-xl overflow-hidden bg-muted", className)}>
      {/* This would be a real map in production. Showing a placeholder for the demo. */}
      <div ref={mapRef} className="w-full h-full min-h-[300px] bg-gray-200 relative">
        {/* Create a stylized map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          {/* Draw some map features */}
          <div className="absolute left-0 right-0 h-[1px] top-1/4 bg-blue-200/30 dark:bg-blue-800/30"></div>
          <div className="absolute left-0 right-0 h-[1px] top-2/4 bg-blue-200/30 dark:bg-blue-800/30"></div>
          <div className="absolute left-0 right-0 h-[1px] top-3/4 bg-blue-200/30 dark:bg-blue-800/30"></div>
          
          <div className="absolute top-0 bottom-0 w-[1px] left-1/4 bg-blue-200/30 dark:bg-blue-800/30"></div>
          <div className="absolute top-0 bottom-0 w-[1px] left-2/4 bg-blue-200/30 dark:bg-blue-800/30"></div>
          <div className="absolute top-0 bottom-0 w-[1px] left-3/4 bg-blue-200/30 dark:bg-blue-800/30"></div>
          
          {/* Add some land masses */}
          <div className="absolute top-[15%] left-[20%] w-[20%] h-[25%] rounded-full bg-green-100/20 dark:bg-green-900/20"></div>
          <div className="absolute bottom-[20%] right-[15%] w-[35%] h-[30%] rounded-full bg-green-100/20 dark:bg-green-900/20"></div>
        </div>

        {/* Map markers */}
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
              {
                "text-green-500": location.status === "completed",
                "text-primary animate-pulse": location.status === "current" || index === currentLocation,
                "text-muted-foreground": location.status === "pending" && index !== currentLocation,
              }
            )}
            style={{
              left: `${20 + (location.lat * 60) % 80}%`,
              top: `${20 + (location.lng * 60) % 80}%`,
              zIndex: index === currentLocation ? 10 : 1,
            }}
          >
            <div className="flex flex-col items-center">
              <MapPin
                className={cn(
                  "h-6 w-6",
                  index === currentLocation && "animate-bounce"
                )}
                fill={index === currentLocation ? "currentColor" : "none"}
              />
              <div
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap",
                  index === currentLocation 
                    ? "bg-primary text-white shadow-lg" 
                    : "bg-background/80 backdrop-blur-sm text-foreground"
                )}
              >
                {location.name}
              </div>
            </div>
          </div>
        ))}

        {/* Route lines between points */}
        {locations.length > 1 && (
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {locations.map((location, index) => {
              if (index === locations.length - 1) return null;
              
              const startX = 20 + (location.lat * 60) % 80;
              const startY = 20 + (location.lng * 60) % 80;
              const endX = 20 + (locations[index + 1].lat * 60) % 80;
              const endY = 20 + (locations[index + 1].lng * 60) % 80;
              
              return (
                <line
                  key={`route-${index}`}
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  className={cn(
                    "stroke-2",
                    index < currentLocation
                      ? "stroke-green-500/70"
                      : index === currentLocation
                      ? "stroke-primary/70 stroke-dasharray-2"
                      : "stroke-muted-foreground/30 stroke-dasharray-2"
                  )}
                />
              );
            })}
          </svg>
        )}
      </div>

      {/* Map overlay with controls (for a real implementation) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background">
          <span className="sr-only">Zoom in</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
        <button className="p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-md hover:bg-background">
          <span className="sr-only">Zoom out</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MapView;
