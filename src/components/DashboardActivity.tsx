
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";

interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
}

const DashboardActivity: React.FC<{
  activities?: ActivityItem[];
}> = ({ activities = [] }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length > 0 ? (
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="flex gap-3 items-start">
                <span className={cn(
                  "mt-0.5 rounded-full w-2 h-2 flex-shrink-0",
                  activity.type === "success" && "bg-success",
                  activity.type === "error" && "bg-destructive",
                  activity.type === "warning" && "bg-warning",
                  activity.type === "info" && "bg-info"
                )} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-muted-foreground text-center py-8 flex flex-col items-center gap-2">
            <AlertCircle className="h-6 w-6 text-muted-foreground/70" />
            <p>No recent activity to display</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

import { cn } from "@/lib/utils";
export default DashboardActivity;
