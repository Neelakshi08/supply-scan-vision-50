
import React, { useState, useEffect } from 'react';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface QRScannerProps {
  onScan: (data: string) => void;
  scanning?: boolean;
  onToggleScan?: () => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ 
  onScan, 
  scanning = false,
  onToggleScan
}) => {
  const [hasCamera, setHasCamera] = useState<boolean>(true);
  const [inputId, setInputId] = useState<string>('');
  const [mockScanned, setMockScanned] = useState<boolean>(false);
  
  // For demo purposes, simulate camera detection
  useEffect(() => {
    // In a real app, check if the browser supports getUserMedia
    const checkCamera = async () => {
      try {
        // This would be the real camera check
        // const devices = await navigator.mediaDevices.enumerateDevices();
        // const hasVideoInput = devices.some(device => device.kind === 'videoinput');
        // setHasCamera(hasVideoInput);
        
        setHasCamera(true);
      } catch (err) {
        setHasCamera(false);
        console.error('Error checking camera:', err);
      }
    };
    
    checkCamera();
  }, []);

  // Simulate QR code scan for demo
  useEffect(() => {
    if (scanning && !mockScanned) {
      const timer = setTimeout(() => {
        setMockScanned(true);
        const mockProductId = `PROD-${Math.floor(Math.random() * 900000) + 100000}`;
        onScan(mockProductId);
        toast.success(`Product scanned: ${mockProductId}`);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [scanning, mockScanned, onScan]);

  const handleManualEntry = () => {
    if (inputId.trim()) {
      onScan(inputId.trim());
      setInputId('');
    } else {
      toast.error('Please enter a valid product ID');
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {hasCamera ? (
        <div className="w-full aspect-square relative bg-black rounded-xl overflow-hidden mb-8">
          {/* Mock camera feed background */}
          <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-900">
            {scanning && (
              <>
                <div className="qr-scanner-box">
                  <div className="qr-scanner-line"></div>
                </div>
                <div className="absolute top-4 left-0 right-0 text-center text-white/80 text-sm">
                  Point camera at QR code
                </div>
              </>
            )}
          </div>
          
          {!scanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-4">
              <QrCode size={64} className="opacity-50" />
              <p className="text-white/60 text-center max-w-xs">
                Scan QR codes on products to instantly view their supply chain journey
              </p>
              <Button 
                onClick={onToggleScan} 
                className="mt-4 neu-button"
                size="lg"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Start Scanning
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="w-full bg-muted rounded-xl p-8 mb-8 text-center">
          <QrCode size={64} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Camera not available</h3>
          <p className="text-muted-foreground mb-4">
            We couldn't access your camera. You can enter a product ID manually.
          </p>
        </div>
      )}

      <div className="w-full flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputId}
            onChange={(e) => setInputId(e.target.value)}
            placeholder="Enter product ID (e.g., PROD-123456)"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          <Button onClick={handleManualEntry}>Verify</Button>
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Can't scan? Enter the product ID located on the packaging.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
