
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  QrCode, Map, User, Shield, LogOut, Globe, Menu, X, Home, ChevronRight
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter 
} from '@/components/ui/sheet';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/scanner', label: 'Scan Product', icon: QrCode },
    { path: '/product-details', label: 'Tracking', icon: Map },
    { path: '/supplier-dashboard', label: 'Suppliers', icon: Shield },
    { path: '/consumer-portal', label: 'Verify', icon: User },
    { path: '/emission-calculator', label: 'Emissions', icon: Globe },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setMobileMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const goToLogin = () => {
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const goToSignup = () => {
    navigate('/signup');
    setMobileMenuOpen(false);
  };

  const goToDashboard = () => {
    navigate('/dashboard');
    setMobileMenuOpen(false);
  };

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-md'
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            SupplyScan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative py-1 group transition-colors',
                  isActive ? 'text-primary font-medium' : 'text-foreground/70 hover:text-foreground'
                )}
              >
                <div className="flex items-center gap-1.5">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </div>
                <span
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
                    isActive && 'scale-x-100'
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {currentUser ? (
            <>
              <span className="mr-2 text-sm text-muted-foreground">
                {currentUser.email}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goToDashboard}
              >
                Dashboard
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToLogin}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="neu-button"
                onClick={goToSignup}
              >
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="py-6">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-left text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                SupplyScan
              </SheetTitle>
            </SheetHeader>
            
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                
                return (
                  <Button
                    key={link.path}
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "justify-start h-10",
                      isActive ? "font-medium" : ""
                    )}
                    onClick={() => navigateTo(link.path)}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {link.label}
                    <ChevronRight className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                );
              })}
            </div>
            
            <SheetFooter className="flex flex-col gap-2 mt-auto">
              {currentUser ? (
                <>
                  <p className="text-sm text-muted-foreground mb-2">
                    Signed in as: <span className="font-medium">{currentUser.email}</span>
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={goToDashboard}
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={goToLogin}
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={goToSignup}
                  >
                    Create Account
                  </Button>
                </>
              )}
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
