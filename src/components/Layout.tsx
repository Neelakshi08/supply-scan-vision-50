
import React, { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  noNavbar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  noNavbar = false
}) => {
  const [mounted, setMounted] = useState(false);

  // Prevent flash of unstyled content
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {!noNavbar && <Navbar />}
      <main className={cn("flex-1", className)}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
