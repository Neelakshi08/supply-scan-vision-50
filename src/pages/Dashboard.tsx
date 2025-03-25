
import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Map, Globe, Shield, User } from "lucide-react";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const features = [
    {
      title: "Scan Product",
      description: "Scan QR codes on products to track their journey",
      icon: QrCode,
      path: "/scanner"
    },
    {
      title: "Product Tracking",
      description: "View detailed product journey information",
      icon: Map,
      path: "/product-details"
    },
    {
      title: "Emission Calculator",
      description: "Calculate environmental impact of product journeys",
      icon: Globe,
      path: "/emission-calculator"
    },
    {
      title: "Supplier Dashboard",
      description: "Manage and track your supply chain",
      icon: Shield,
      path: "/supplier-dashboard"
    },
    {
      title: "Consumer Portal",
      description: "Verify products and view consumer information",
      icon: User,
      path: "/consumer-portal"
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <Layout className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome to SupplyScan</h1>
            <p className="text-muted-foreground">
              {currentUser.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <feature.icon className="h-5 w-5 text-primary" />
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-2">
                  <Button 
                    variant="default" 
                    onClick={() => navigate(feature.path)}
                    className="w-full"
                  >
                    Access
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center py-8">
                No recent activity to display
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
