import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { QrCode, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScanClick = () => {
    if (currentUser) {
      navigate('/scanner');
    } else {
      navigate('/login');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      title: 'Real-Time Tracking',
      description: 'Monitor products as they move through the supply chain with live updates and location tracking.',
      icon: TrendingUp,
      delay: 'animate-delay-100'
    },
    {
      title: 'Instant Verification',
      description: 'Verify product authenticity in seconds with our advanced QR scanning technology.',
      icon: CheckCircle,
      delay: 'animate-delay-300'
    },
    {
      title: 'Blockchain-Secured',
      description: 'All supply chain data is secured by blockchain technology for maximum transparency and trust.',
      icon: ShieldCheck,
      delay: 'animate-delay-500'
    }
  ];

  return (
    <Layout className="px-0" noNavbar>
      <section className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background to-blue-50 dark:from-background dark:to-blue-950/20">
        <nav className="absolute top-0 left-0 right-0 z-50 py-6">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SupplyScan
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-foreground/70 hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-foreground/70 hover:text-foreground transition-colors">How It Works</a>
              <a href="#benefits" className="text-foreground/70 hover:text-foreground transition-colors">Benefits</a>
            </div>

            <div className="flex items-center gap-2">
              {currentUser ? (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleDashboardClick}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hidden md:inline-flex"
                    onClick={handleLoginClick}
                  >
                    Login
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 pt-32 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <h1 
              className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Revolutionizing
              </span>{' '}
              Supply Chain Transparency
            </h1>
            
            <p 
              className={`text-lg text-foreground/80 max-w-2xl mb-10 transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Track, verify, and trust your product's journey from origin to destination with blockchain-secured transparency.
            </p>
            
            <div 
              className={`flex flex-wrap gap-4 justify-center transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <Button 
                size="lg" 
                onClick={handleScanClick}
                className="group neu-button text-lg"
              >
                <QrCode className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Scan Product
              </Button>
              
              {currentUser ? (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg"
                  onClick={handleDashboardClick}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg"
                  onClick={handleSignupClick}
                >
                  Learn More
                </Button>
              )}
            </div>
          </div>
          
          <div className={`max-w-4xl mx-auto my-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="relative h-32 rounded-2xl overflow-hidden bg-card shadow-xl border">
              <div className="absolute inset-0 flex">
                <div className="w-1/4 flex justify-center items-center border-r border-border p-4">
                  <div className="text-xs text-center">
                    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-green-100 text-green-700 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 10V5"></path><path d="M12 14v9"></path>
                        <path d="M5 10a7 7 0 0 1 14 0"></path>
                        <path d="M5 14a7 7 0 0 0 14 0"></path>
                      </svg>
                    </div>
                    Farm
                  </div>
                </div>
                <div className="w-1/4 flex justify-center items-center border-r border-border p-4">
                  <div className="text-xs text-center">
                    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                      </svg>
                    </div>
                    Factory
                  </div>
                </div>
                <div className="w-1/4 flex justify-center items-center border-r border-border p-4">
                  <div className="text-xs text-center">
                    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-amber-100 text-amber-700 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="16" height="10" x="4" y="4" rx="2"></rect>
                        <path d="M4 14h16"></path><path d="M8 14v4"></path><path d="M16 14v4"></path>
                      </svg>
                    </div>
                    Warehouse
                  </div>
                </div>
                <div className="w-1/4 flex justify-center items-center p-4">
                  <div className="text-xs text-center">
                    <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center bg-purple-100 text-purple-700 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
                        <path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4"></path>
                        <path d="M2 7h20"></path><path d="M12 12v8"></path><path d="M10 8v1"></path>
                      </svg>
                    </div>
                    Store
                  </div>
                </div>
              </div>
              
              <div className="absolute top-1/2 transform -translate-y-1/2 -left-16 animate-move-right">
                <div className="w-8 h-8 bg-primary text-white rounded-md flex items-center justify-center shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7.5 4.27 9 5.15"></path>
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                    <path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl opacity-70"></div>
      </section>

      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Supply Chain Features</h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Our platform provides end-to-end visibility with powerful tools for tracking, authentication, and transparency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className={`bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow ${feature.delay}`}
              >
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Our seamless process ensures complete product journey visibility from origin to purchase.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <QrCode size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Scan Product</h3>
                <p className="text-foreground/70">
                  Scan the product QR code with our app or enter the product ID manually.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <TrendingUp size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Journey</h3>
                <p className="text-foreground/70">
                  View real-time location tracking and the complete supply chain journey.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50 flex items-center justify-center text-primary">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Verify Authenticity</h3>
                <p className="text-foreground/70">
                  Confirm product authenticity with blockchain verification technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="mb-8 max-w-xl mx-auto opacity-90">
            Join thousands of businesses already using our platform to ensure supply chain transparency and build consumer trust.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              variant="default"
              className="bg-white text-primary hover:bg-white/90"
              onClick={handleScanClick}
            >
              <QrCode className="mr-2 h-5 w-5" />
              Scan Product Now
            </Button>
            {currentUser ? (
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={handleDashboardClick}
              >
                Go to Dashboard
              </Button>
            ) : (
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={handleSignupClick}
              >
                Create Account
              </Button>
            )}
          </div>
        </div>
      </section>

      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">SupplyScan</h3>
              <p className="text-sm text-gray-400">
                Revolutionizing supply chain transparency with cutting-edge blockchain technology.
              </p>
            </div>
            
            <div>
              <h4 className="text-white text-md font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-md font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-md font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} SupplyScan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default Index;

