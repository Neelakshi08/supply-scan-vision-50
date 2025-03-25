
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { QrCode, Search, ShieldCheck, AlertTriangle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const ConsumerPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast.error('Please enter a product ID or batch number');
      return;
    }
    
    setIsSearching(true);
    setShowResult(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
      
      // For demo, let's randomly determine if product is verified or not
      // In reality, this would come from the API response
      setIsVerified(Math.random() > 0.2);
      
      if (Math.random() > 0.2) {
        toast.success('Product verification complete');
      } else {
        toast.error('Warning: Potential counterfeit product detected');
      }
    }, 1500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Consumer Verification Portal</h1>
            <p className="text-foreground/70 max-w-xl mx-auto">
              Verify the authenticity of your products and access their complete supply chain journey.
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-card border rounded-xl p-6 shadow-sm mb-10">
            <h2 className="text-xl font-semibold mb-4">Product Verification</h2>
            <p className="text-foreground/70 mb-6">
              Enter a product ID or batch number to verify its authenticity and view its journey.
            </p>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    className="block w-full rounded-md border border-input bg-transparent py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Enter product ID or batch number (e.g., PROD-123456)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isSearching}
                  className="flex-shrink-0"
                >
                  {isSearching ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    'Verify Product'
                  )}
                </Button>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                <span>or</span>
                <button
                  type="button"
                  className="flex items-center text-primary hover:underline"
                  onClick={() => toast.info('Redirecting to QR scanner...')}
                >
                  <QrCode className="h-4 w-4 mr-1" />
                  Scan QR Code
                </button>
              </div>
            </form>
          </div>

          {/* Example Scan Codes */}
          <div className="bg-muted/30 border rounded-xl p-6 mb-10">
            <h3 className="text-lg font-semibold mb-4">Example IDs for Testing</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className="p-3 border rounded-lg bg-card cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors"
                onClick={() => setSearchQuery('PROD-123456')}
              >
                <div className="font-medium">Organic Coffee Beans</div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-foreground/60">PROD-123456</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full dark:bg-green-900/40 dark:text-green-400">Verified</span>
                </div>
              </div>
              
              <div 
                className="p-3 border rounded-lg bg-card cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors"
                onClick={() => setSearchQuery('BATCH-4872')}
              >
                <div className="font-medium">Recycled Paper Notebooks</div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-foreground/60">BATCH-4872</span>
                  <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full dark:bg-green-900/40 dark:text-green-400">Verified</span>
                </div>
              </div>
              
              <div 
                className="p-3 border rounded-lg bg-card cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors"
                onClick={() => setSearchQuery('FAKE-999999')}
              >
                <div className="font-medium">Counterfeit Test Product</div>
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-foreground/60">FAKE-999999</span>
                  <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full dark:bg-red-900/40 dark:text-red-400">Counterfeit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Search Result */}
          {showResult && (
            <div 
              className={`border rounded-xl overflow-hidden transition-all duration-300 animate-fade-in ${
                isVerified 
                  ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900/50' 
                  : 'bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900/50'
              }`}
            >
              {/* Status Header */}
              <div className={`p-4 ${
                isVerified 
                  ? 'bg-green-100 dark:bg-green-900/40' 
                  : 'bg-red-100 dark:bg-red-900/40'
              }`}>
                <div className="flex items-center gap-3">
                  {isVerified ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-green-200 dark:bg-green-800 flex items-center justify-center text-green-700 dark:text-green-300">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-green-800 dark:text-green-300">Authentic Product Verified</h3>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          This product has been verified on the blockchain
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-10 h-10 rounded-full bg-red-200 dark:bg-red-800 flex items-center justify-center text-red-700 dark:text-red-300">
                        <AlertTriangle className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-red-800 dark:text-red-300">Warning: Potential Counterfeit</h3>
                        <p className="text-sm text-red-700 dark:text-red-400">
                          This product could not be verified in our database
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3">Product Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Product Name:</span>
                        <span className="font-medium">
                          {isVerified ? 'Organic Coffee Beans' : 'Unknown Product'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Product ID:</span>
                        <span className="font-medium">{searchQuery}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Manufacturer:</span>
                        <span className="font-medium">
                          {isVerified ? 'Green Mountain Coffee Co.' : 'Unknown'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Manufacturing Date:</span>
                        <span className="font-medium">
                          {isVerified ? 'April 12, 2023' : 'Not Available'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Verification Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Verification Status:</span>
                        <span className={`font-medium ${isVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {isVerified ? 'Verified Authentic' : 'Verification Failed'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Blockchain Record:</span>
                        <span className="font-medium">
                          {isVerified ? 'Found' : 'Not Found'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Verification Date:</span>
                        <span className="font-medium">
                          {isVerified ? new Date().toLocaleString() : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Transparency Score:</span>
                        <span className={`font-medium ${
                          isVerified 
                            ? 'text-green-600 dark:text-green-400' 
                            : 'text-red-600 dark:text-red-400'
                        }`}>
                          {isVerified ? '98%' : '0%'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {isVerified ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Supply Chain Journey</h4>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="grid grid-cols-5 text-xs text-center">
                          <div className="border-r p-2 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                            <div className="mb-1">Origin</div>
                            <CheckIcon />
                          </div>
                          <div className="border-r p-2 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                            <div className="mb-1">Processing</div>
                            <CheckIcon />
                          </div>
                          <div className="border-r p-2 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                            <div className="mb-1">Distribution</div>
                            <CheckIcon />
                          </div>
                          <div className="border-r p-2 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                            <div className="mb-1">In Transit</div>
                            <div className="w-4 h-4 mx-auto border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <div className="p-2 bg-gray-100 text-gray-400 dark:bg-gray-800/40">
                            <div className="mb-1">Retail</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                              <path d="M6 9L12 15 18 9"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Complete Journey
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <QrCode className="w-4 h-4 mr-2" />
                        View Verification Certificate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800/30">
                      <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">
                        What This Means
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-400">
                        This product could not be verified in our blockchain database, indicating it may be:
                      </p>
                      <ul className="list-disc list-inside mt-2 text-sm text-red-700 dark:text-red-400 space-y-1">
                        <li>A counterfeit or unauthorized product</li>
                        <li>A product from a manufacturer not in our network</li>
                        <li>Using a tampered or invalid QR code/product ID</li>
                      </ul>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="destructive" className="flex-1">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Report Counterfeit
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Get Help
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

// Helper component for the verification journey
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
    <path d="M20 6L9 17L4 12"></path>
  </svg>
);

export default ConsumerPortal;
