
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import QRScanner from '@/components/QRScanner';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { CheckCircle, XCircle } from 'lucide-react';

const Scanner = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'verified' | 'fake' | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  const handleScan = (data: string) => {
    setScanning(false);
    setProductId(data);

    // Simulate verification process
    setVerificationStatus('pending');
    
    setTimeout(() => {
      // For demo, let's always verify successfully
      setVerificationStatus('verified');
      
      // Simulate a successful verification notification
      toast.success('Product verified successfully!', {
        description: `Product ID: ${data} is authentic.`,
        action: {
          label: 'View Details',
          onClick: () => navigate('/product-details', { state: { productId: data } })
        }
      });
    }, 2000);
  };

  const toggleScanner = () => {
    setScanning(!scanning);
    if (verificationStatus) {
      setVerificationStatus(null);
      setProductId(null);
    }
  };

  const handleViewDetails = () => {
    if (productId) {
      navigate('/product-details', { state: { productId } });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-24 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Product Verification</h1>
          <p className="text-foreground/70">
            Scan a QR code or enter a product ID to verify authenticity
          </p>
        </div>

        {/* QR Scanner Component */}
        <div className="max-w-md mx-auto">
          <QRScanner 
            onScan={handleScan} 
            scanning={scanning}
            onToggleScan={toggleScanner}
          />
        </div>

        {/* Verification Result */}
        {verificationStatus && (
          <div className="mt-12 max-w-md mx-auto">
            <div 
              className={`rounded-lg p-6 border ${
                verificationStatus === 'pending' ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900' :
                verificationStatus === 'verified' ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900' :
                'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900'
              } transition-all duration-300`}
            >
              <div className="flex items-center gap-4">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    verificationStatus === 'pending' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                    verificationStatus === 'verified' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' :
                    'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300'
                  }`}
                >
                  {verificationStatus === 'pending' ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin-slow"></div>
                  ) : verificationStatus === 'verified' ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    <XCircle className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-semibold text-lg ${
                    verificationStatus === 'pending' ? 'text-blue-700 dark:text-blue-300' :
                    verificationStatus === 'verified' ? 'text-green-700 dark:text-green-300' :
                    'text-red-700 dark:text-red-300'
                  }`}>
                    {verificationStatus === 'pending' ? 'Verifying Product...' :
                     verificationStatus === 'verified' ? 'Product Authenticated' :
                     'Verification Failed'}
                  </h3>
                  
                  <p className={
                    verificationStatus === 'pending' ? 'text-blue-600/80 dark:text-blue-400/80' :
                    verificationStatus === 'verified' ? 'text-green-600/80 dark:text-green-400/80' :
                    'text-red-600/80 dark:text-red-400/80'
                  }>
                    {verificationStatus === 'pending' ? 'Please wait while we verify the product authenticity...' :
                     verificationStatus === 'verified' ? `Product ID: ${productId} is genuine and verified on blockchain.` :
                     'This product could not be verified. It may be counterfeit.'}
                  </p>
                </div>
              </div>

              {verificationStatus === 'verified' && (
                <div className="mt-6">
                  <Button 
                    onClick={handleViewDetails}
                    className="w-full"
                  >
                    View Product Journey
                  </Button>
                </div>
              )}

              {verificationStatus === 'fake' && (
                <div className="mt-6">
                  <Button 
                    variant="destructive"
                    className="w-full"
                    onClick={() => toast.error('Report submitted. Thank you for helping combat counterfeit products.')}
                  >
                    Report Counterfeit
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Security Information */}
        <div className="mt-12 max-w-lg mx-auto text-center">
          <h3 className="text-lg font-semibold mb-2">Blockchain-Secured Verification</h3>
          <p className="text-foreground/70 text-sm">
            Our verification system uses advanced blockchain technology to ensure product authenticity.
            Each scan is securely logged and verified against our distributed ledger.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Scanner;
