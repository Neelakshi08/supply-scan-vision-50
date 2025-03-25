
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Scanner from "./pages/Scanner";
import ProductDetails from "./pages/ProductDetails";
import SupplierDashboard from "./pages/SupplierDashboard";
import ConsumerPortal from "./pages/ConsumerPortal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Create a client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
            <Route path="/consumer-portal" element={<ConsumerPortal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
