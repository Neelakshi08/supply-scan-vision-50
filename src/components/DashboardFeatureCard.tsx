
import React from "react";
import { useNavigate } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardFeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  className?: string;
}

const DashboardFeatureCard: React.FC<DashboardFeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  className
}) => {
  const navigate = useNavigate();

  return (
    <Card className={cn(
      "overflow-hidden transition-all hover:shadow-md group", 
      className
    )}>
      <CardHeader className="pb-2 relative">
        <div className="absolute top-0 right-0 w-24 h-24 -mt-8 -mr-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300" />
        <CardTitle className="flex items-center gap-2 z-10">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-2">
        <Button 
          variant="default" 
          onClick={() => navigate(path)}
          className="w-full group-hover:bg-primary/90 transition-colors"
        >
          Access
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DashboardFeatureCard;
