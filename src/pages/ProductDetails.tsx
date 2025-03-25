
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductTimeline } from '@/components/ProductTimeline';
import { MapView } from '@/components/MapView';
import { Package, QrCode, ShieldCheck, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductData {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  manufacturingDate: string;
  batchNumber: string;
  blockchainVerified: boolean;
  transparencyScore: number;
}

interface LocationData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'origin' | 'destination' | 'completed' | 'current' | 'pending';
}

const ProductDetails = () => {
  const location = useLocation();
  const productId = location.state?.productId || 'PROD-123456';
  
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'timeline' | 'map'>('timeline');

  // Mock product data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API request
    setTimeout(() => {
      setProduct({
        id: productId,
        name: 'Organic Coffee Beans',
        description: 'Premium Arabica coffee beans sourced from Colombian highlands',
        manufacturer: 'Green Mountain Coffee Co.',
        manufacturingDate: '2023-04-12',
        batchNumber: 'BT-28976',
        blockchainVerified: true,
        transparencyScore: 98
      });
      setLoading(false);
    }, 1000);
  }, [productId]);

  // Mock timeline events
  const timelineEvents = [
    {
      id: '1',
      title: 'Harvested at Farm',
      location: 'Santa Marta, Colombia',
      timestamp: 'Apr 12, 2023 • 08:24 AM',
      status: 'completed' as const,
      icon: 'factory' as const,
      description: 'Coffee beans harvested and prepared for processing'
    },
    {
      id: '2',
      title: 'Quality Testing',
      location: 'Bogotá, Colombia',
      timestamp: 'Apr 15, 2023 • 02:15 PM',
      status: 'completed' as const,
      icon: 'box' as const,
      description: 'Sample testing for quality assurance and certification'
    },
    {
      id: '3',
      title: 'Processing & Packaging',
      location: 'Medellín, Colombia',
      timestamp: 'Apr 18, 2023 • 11:42 AM',
      status: 'completed' as const,
      icon: 'factory' as const,
      description: 'Beans processed and packaged for international shipping'
    },
    {
      id: '4',
      title: 'Shipped to Distribution Center',
      location: 'Miami, USA',
      timestamp: 'Apr 24, 2023 • 03:30 PM',
      status: 'completed' as const,
      icon: 'truck' as const,
      description: 'International shipment received at distribution hub'
    },
    {
      id: '5',
      title: 'In Transit to Retail',
      location: 'Chicago, USA',
      timestamp: 'Apr 29, 2023 • 10:18 AM',
      status: 'current' as const,
      icon: 'truck' as const,
      description: 'Product in transit to regional retail distribution center'
    },
    {
      id: '6',
      title: 'Arriving at Store',
      location: 'Minneapolis, USA',
      timestamp: 'May 02, 2023 • (Estimated)',
      status: 'pending' as const,
      icon: 'store' as const,
      description: 'Final delivery to retail store for consumer purchase'
    }
  ];

  // Mock location data for map view
  const locationData: LocationData[] = [
    { id: '1', name: 'Santa Marta', lat: 11.24, lng: -74.20, status: 'completed' },
    { id: '2', name: 'Bogotá', lat: 4.71, lng: -74.07, status: 'completed' },
    { id: '3', name: 'Medellín', lat: 6.25, lng: -75.56, status: 'completed' },
    { id: '4', name: 'Miami', lat: 25.76, lng: -80.19, status: 'completed' },
    { id: '5', name: 'Chicago', lat: 41.88, lng: -87.63, status: 'current' },
    { id: '6', name: 'Minneapolis', lat: 44.98, lng: -93.27, status: 'pending' }
  ];

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-24 px-4 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-foreground/70">Loading product details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto py-24 px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-foreground/70 mb-8">
            We couldn't find any details for this product. Please try scanning again.
          </p>
          <Button>Go Back to Scanner</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        {/* Product Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
                <span>Product ID: {product.id}</span>
                <span>•</span>
                <span>Batch: {product.batchNumber}</span>
              </div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium ${
                product.blockchainVerified 
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
              }`}>
                <ShieldCheck className="w-4 h-4" />
                {product.blockchainVerified ? 'Blockchain Verified' : 'Verification Pending'}
              </div>
              
              <Button size="sm" variant="outline">
                <RefreshCw className="w-4 h-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold mb-3">Product Information</h2>
                <p className="text-foreground/80 mb-4">{product.description}</p>
                
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <div className="text-foreground/60">Manufacturer</div>
                    <div className="font-medium">{product.manufacturer}</div>
                  </div>
                  <div>
                    <div className="text-foreground/60">Manufacturing Date</div>
                    <div className="font-medium">{product.manufacturingDate}</div>
                  </div>
                  <div>
                    <div className="text-foreground/60">Batch Number</div>
                    <div className="font-medium">{product.batchNumber}</div>
                  </div>
                  <div>
                    <div className="text-foreground/60">Transparency Score</div>
                    <div className="font-medium">
                      <span className={
                        product.transparencyScore > 90 ? 'text-green-600' :
                        product.transparencyScore > 70 ? 'text-amber-600' :
                        'text-red-600'
                      }>
                        {product.transparencyScore}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold mb-3">Verification Details</h2>
                
                <div className="bg-card flex-1 border rounded-lg overflow-hidden">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border-b">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-700 dark:text-green-400">100% Verified on Ethereum</span>
                    </div>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-foreground/60">Transaction Hash</span>
                      <code className="font-mono bg-secondary p-1.5 rounded mt-1 text-xs">0x7c5ea36004851c764c803e36e37b2706e8dc5bd58a39892225652e23b0b02ddd</code>
                    </div>
                    
                    <div className="flex flex-col text-sm">
                      <span className="text-foreground/60">Verified On</span>
                      <span className="font-medium">Apr 12, 2023 at 10:27 AM UTC</span>
                    </div>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      <QrCode className="w-4 h-4 mr-2" />
                      View Verification Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Journey Tabs */}
        <div className="mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${
                activeTab === 'timeline'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
              onClick={() => setActiveTab('timeline')}
            >
              <Package className="w-4 h-4" />
              Journey Timeline
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm flex items-center gap-1.5 ${
                activeTab === 'map'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-foreground/60 hover:text-foreground'
              }`}
              onClick={() => setActiveTab('map')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Map View
            </button>
          </div>
        </div>

        {/* Journey Content */}
        <div className="bg-card border rounded-lg p-6 shadow-sm">
          {activeTab === 'timeline' ? (
            <div className="py-2">
              <ProductTimeline events={timelineEvents} />
            </div>
          ) : (
            <div className="py-2">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-1">Journey Map</h3>
                <p className="text-foreground/70 text-sm">
                  Track the product's real-time movement through the supply chain
                </p>
              </div>
              <MapView locations={locationData} className="h-[400px]" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
