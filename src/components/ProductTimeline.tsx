
import React from 'react';
import { Check, Truck, Box, Factory, Store, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  icon: 'factory' | 'truck' | 'box' | 'store';
  description?: string;
}

interface ProductTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const ProductTimeline: React.FC<ProductTimelineProps> = ({ events, className }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'factory':
        return <Factory className="w-4 h-4" />;
      case 'truck':
        return <Truck className="w-4 h-4" />;
      case 'box':
        return <Box className="w-4 h-4" />;
      case 'store':
        return <Store className="w-4 h-4" />;
      default:
        return <ArrowUp className="w-4 h-4" />;
    }
  };

  return (
    <div className={cn("space-y-8", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {/* Timeline connector */}
          {index < events.length - 1 && (
            <div className="timeline-line" />
          )}
          
          <div className="flex gap-4">
            {/* Status indicator */}
            <div className={cn(
              "timeline-circle",
              event.status === 'completed' && "bg-success",
              event.status === 'current' && "bg-primary",
              event.status === 'pending' && "bg-muted"
            )}>
              {event.status === 'completed' && (
                <span className="absolute inset-0 flex items-center justify-center text-white">
                  <Check className="w-2 h-2" />
                </span>
              )}
            </div>
            
            {/* Content */}
            <div className={cn(
              "bg-card shadow-sm rounded-lg p-4 flex-1 transition-all relative",
              event.status === 'current' && "ring-2 ring-primary/30"
            )}>
              <div className="flex items-center gap-2 mb-1">
                <div className={cn(
                  "p-1.5 rounded-md",
                  event.status === 'completed' && "bg-success/10 text-success",
                  event.status === 'current' && "bg-primary/10 text-primary",
                  event.status === 'pending' && "bg-muted/50 text-muted-foreground"
                )}>
                  {getIcon(event.icon)}
                </div>
                <h3 className="font-semibold">{event.title}</h3>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{event.location}</span>
                <span className="text-muted-foreground">{event.timestamp}</span>
              </div>
              
              {event.description && (
                <p className="text-sm mt-2 text-muted-foreground">{event.description}</p>
              )}
              
              {event.status === 'current' && (
                <div className="absolute -right-1 -top-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                  Current
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductTimeline;
