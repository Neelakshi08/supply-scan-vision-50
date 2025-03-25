
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { QrCode, ShieldCheck, Truck, Upload, ArrowRight, Package, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const SupplierDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('updateLocation');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock products data
  const products = [
    { id: 'PROD-123456', name: 'Organic Coffee Beans', batch: 'BT-28976', status: 'In Transit' },
    { id: 'PROD-789012', name: 'Sustainable Cotton T-Shirt', batch: 'BT-35421', status: 'Processing' },
    { id: 'PROD-345678', name: 'Recycled Paper Notebooks', batch: 'BT-92137', status: 'At Distribution Center' }
  ];

  // Mock locations
  const locations = [
    { id: 'LOC-1', name: 'Manufacturing Facility', address: 'Portland, Oregon' },
    { id: 'LOC-2', name: 'Distribution Center', address: 'Chicago, Illinois' },
    { id: 'LOC-3', name: 'Regional Warehouse', address: 'Dallas, Texas' },
    { id: 'LOC-4', name: 'Retail Store #42', address: 'Seattle, Washington' }
  ];

  const handleUpdateLocation = () => {
    if (!selectedProduct || !selectedLocation) {
      toast.error('Please select both a product and a location');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Location updated successfully', {
        description: `Product ${selectedProduct} has been updated with location ${selectedLocation}`,
      });
      setSelectedProduct(null);
      setSelectedLocation(null);
    }, 1500);
  };

  const handleCreateProduct = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      
      const newProductId = `PROD-${Math.floor(Math.random() * 900000) + 100000}`;
      
      toast.success('Product created successfully', {
        description: `New product ID: ${newProductId} has been registered on the blockchain`,
      });
    }, 2000);
  };

  const handleSmartContract = () => {
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Smart contract executed', {
        description: 'Payment has been automatically released to all suppliers in the chain',
      });
    }, 2500);
  };

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Supplier Dashboard</h1>
          <p className="text-foreground/70">
            Manage your supply chain operations and product tracking
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Active Products</p>
                <h3 className="text-3xl font-bold mt-1">247</h3>
              </div>
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <Package className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"></path>
              </svg>
              <span className="ml-1">12% increase</span>
              <span className="ml-2 text-foreground/60">from last month</span>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">In Transit</p>
                <h3 className="text-3xl font-bold mt-1">37</h3>
              </div>
              <div className="p-3 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-red-600 dark:text-red-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
              <span className="ml-1">5% decrease</span>
              <span className="ml-2 text-foreground/60">from last week</span>
            </div>
          </div>

          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-foreground/60 text-sm">Verification Rate</p>
                <h3 className="text-3xl font-bold mt-1">99.7%</h3>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m18 15-6-6-6 6"></path>
              </svg>
              <span className="ml-1">2.3% increase</span>
              <span className="ml-2 text-foreground/60">from last quarter</span>
            </div>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden mb-10">
          <div className="border-b">
            <div className="flex overflow-x-auto">
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center gap-1.5 ${
                  selectedTab === 'updateLocation'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={() => setSelectedTab('updateLocation')}
              >
                <Truck className="w-4 h-4" />
                Location Updates
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center gap-1.5 ${
                  selectedTab === 'productUpload'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={() => setSelectedTab('productUpload')}
              >
                <Upload className="w-4 h-4" />
                Product Upload
              </button>
              <button
                className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex items-center gap-1.5 ${
                  selectedTab === 'smartContract'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={() => setSelectedTab('smartContract')}
              >
                <ShieldCheck className="w-4 h-4" />
                Smart Contract
              </button>
            </div>
          </div>

          <div className="p-6">
            {selectedTab === 'updateLocation' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Update Product Location</h3>
                <p className="text-foreground/70 mb-6">
                  Log a new location update for a product to track its journey through the supply chain.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Product</label>
                    <div className="space-y-3">
                      {products.map(product => (
                        <div 
                          key={product.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedProduct === product.id 
                              ? 'bg-primary/5 border-primary' 
                              : 'hover:bg-card/80'
                          }`}
                          onClick={() => setSelectedProduct(product.id)}
                        >
                          <div className="flex justify-between">
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-foreground/60">{product.id}</div>
                          </div>
                          <div className="flex justify-between mt-1 text-sm">
                            <div className="text-foreground/60">Batch: {product.batch}</div>
                            <div 
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                product.status === 'In Transit' 
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' 
                                  : product.status === 'Processing'
                                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
                                  : 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400'
                              }`}
                            >
                              {product.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Select New Location</label>
                    <div className="space-y-3">
                      {locations.map(location => (
                        <div 
                          key={location.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedLocation === location.id 
                              ? 'bg-primary/5 border-primary' 
                              : 'hover:bg-card/80'
                          }`}
                          onClick={() => setSelectedLocation(location.id)}
                        >
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-foreground/60 mt-1">{location.address}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleUpdateLocation}
                  disabled={!selectedProduct || !selectedLocation || isProcessing}
                  className="w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Update Location
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            )}

            {selectedTab === 'productUpload' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Register New Product</h3>
                <p className="text-foreground/70 mb-6">
                  Add a new product to the blockchain with authentication details and initial location.
                </p>

                <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 text-blue-700 dark:text-blue-400">
                    <QrCode className="w-5 h-5" />
                    <p className="text-sm">
                      After registering a product, a unique QR code will be generated for tracking and verification.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="productName">Product Name</label>
                    <input
                      type="text"
                      id="productName"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="batchNumber">Batch Number</label>
                    <input
                      type="text"
                      id="batchNumber"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter batch number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="originLocation">Origin Location</label>
                    <select
                      id="originLocation"
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="">Select location</option>
                      {locations.map(location => (
                        <option key={location.id} value={location.id}>{location.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="manufactureDate">Manufacturing Date</label>
                    <input
                      type="date"
                      id="manufactureDate"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2" htmlFor="productDescription">Product Description</label>
                  <textarea
                    id="productDescription"
                    rows={3}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter product details and description"
                  ></textarea>
                </div>

                <Button 
                  onClick={handleCreateProduct}
                  disabled={isProcessing}
                  className="w-full sm:w-auto"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 w-4 h-4" />
                      Register on Blockchain
                    </>
                  )}
                </Button>
              </div>
            )}

            {selectedTab === 'smartContract' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Execute Smart Contract</h3>
                <p className="text-foreground/70 mb-6">
                  Trigger automatic payments to suppliers based on verified delivery milestones.
                </p>

                <div className="bg-card border rounded-lg mb-6">
                  <div className="border-b px-4 py-3">
                    <h4 className="font-medium">Active Smart Contracts</h4>
                  </div>
                  <div className="p-4">
                    <div className="space-y-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Coffee Bean Producers Payment</div>
                          <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                            Ready
                          </div>
                        </div>
                        <div className="text-sm text-foreground/70 mb-2">
                          Automatic payment to 3 suppliers upon delivery verification
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="text-foreground/60">Contract ID: SC-392175</div>
                          <div className="font-medium">$12,450.00 USD</div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Cotton Supplier Milestone Payment</div>
                          <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                            Pending
                          </div>
                        </div>
                        <div className="text-sm text-foreground/70 mb-2">
                          Payment release upon quality verification completion
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="text-foreground/60">Contract ID: SC-285941</div>
                          <div className="font-medium">$8,720.00 USD</div>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">Paper Mill Quarterly Payment</div>
                          <div className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                            Scheduled
                          </div>
                        </div>
                        <div className="text-sm text-foreground/70 mb-2">
                          Scheduled payment based on quarterly delivery terms
                        </div>
                        <div className="flex justify-between text-sm">
                          <div className="text-foreground/60">Contract ID: SC-419827</div>
                          <div className="font-medium">$23,150.00 USD</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleSmartContract}
                    disabled={isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="mr-2 w-4 h-4" />
                        Execute Payment Contract
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Contract History
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
          <div className="bg-card border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-6 py-3 text-xs font-medium text-foreground/70 uppercase tracking-wider">Time</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-foreground/70 uppercase tracking-wider">Action</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-foreground/70 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-foreground/70 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 text-sm">Today, 9:42 AM</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-sm">Location Update</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">Coffee Beans (PROD-123456) arrived at Distribution Center</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm">Yesterday, 3:15 PM</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Upload className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-sm">Product Upload</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                      Completed
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">New product: Sustainable Cotton T-Shirt registered</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm">Yesterday, 10:27 AM</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <ShieldCheck className="w-4 h-4 mr-2 text-amber-600" />
                      <span className="text-sm">Smart Contract</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
                      Pending
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">Payment processing for Cotton Supplier (SC-285941)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupplierDashboard;
