
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { QrCode, Map, User, Shield } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    { path: '/', label: 'Home' },
    { path: '/scanner', label: 'Scan Product', icon: QrCode },
    { path: '/product-details', label: 'Tracking', icon: Map },
    { path: '/supplier-dashboard', label: 'Suppliers', icon: Shield },
    { path: '/consumer-portal', label: 'Verify', icon: User },
  ];

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

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Login
          </Button>
          <Button size="sm" className="neu-button">
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};
