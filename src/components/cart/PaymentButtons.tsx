import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { initKonnectPayment } from '@/services/konnectApi';
import PaymentLoadingScreen from '../payment/PaymentLoadingScreen';

interface PaymentButtonsProps {
  enabled: boolean;
  cartItems: any[];
  userDetails: any;
  total: number;
  shipping: number;
  finalTotal: number;
  hasPersonalization: boolean;
}

// Development flag for bypassing payment
const BYPASS_PAYMENT = 0; // Set to 1 to use real payment processing

const PaymentButtons = ({ 
  enabled, 
  cartItems, 
  userDetails, 
  finalTotal
}: PaymentButtonsProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleKonnectPayment = async () => {
    if (!enabled || !userDetails) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos coordonnées d'abord",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    console.log('Payment process started. BYPASS_PAYMENT =', BYPASS_PAYMENT);

    try {
      const orderId = `ORDER-${Date.now()}`;

      if (BYPASS_PAYMENT === 0) {
        console.log('Payment bypassed for testing - simulating successful payment');
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading

        // Store order details in session storage
        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cartItems,
          orderId,
          payUrl: 'test-mode'
        }));

        // Redirect to success page
        navigate('/payment-success');
      } else {
        console.log('Initiating real payment process');
        await new Promise(resolve => setTimeout(resolve, 6000));

        const response = await initKonnectPayment({
          amount: finalTotal,
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          email: userDetails.email,
          orderId,
        });

        sessionStorage.setItem('pendingOrder', JSON.stringify({
          cartItems,
          orderId
        }));

        window.location.href = response.payUrl;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Erreur de paiement",
        description: "Échec de l'initialisation du paiement. Veuillez réessayer.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <PaymentLoadingScreen />}
      </AnimatePresence>

      <div className="space-y-3">
        <motion.button
          initial={{ opacity: 0.5 }}
          animate={{ opacity: enabled ? 1 : 0.5 }}
          whileHover={enabled ? { scale: 1.02 } : {}}
          onClick={handleKonnectPayment}
          disabled={!enabled || isLoading}
          className="w-full bg-[#700100] text-white px-4 py-3 rounded-md hover:bg-[#591C1C] transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
        >
          <CreditCard size={20} />
          {BYPASS_PAYMENT === 0 ? 
            `Payer (Mode Test) (${finalTotal.toFixed(2)} TND)` : 
            `Payer avec carte bancaire (${finalTotal.toFixed(2)} TND)`}
        </motion.button>
      </div>
    </>
  );
};

export default PaymentButtons;