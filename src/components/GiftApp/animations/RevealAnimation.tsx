import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RevealAnimationProps {
  onAnimationComplete: () => void;
}

const RevealAnimation = ({ onAnimationComplete }: RevealAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onAnimationComplete();
    }, 2000); // Animation duration

    return () => clearTimeout(timer);
  }, [onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.2,
            transition: {
              duration: 0.8,
              ease: "easeInOut"
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.5,
                ease: "easeOut"
              }
            }}
            exit={{
              scale: 1.5,
              opacity: 0,
              transition: {
                duration: 0.8,
                ease: "easeInOut"
              }
            }}
            className="w-64 h-64 flex items-center justify-center"
          >
            <motion.img
              src="/logowhite.svg"
              alt="Logo"
              className="w-full h-full object-contain"
              initial={{ rotate: -10 }}
              animate={{
                rotate: 10,
                transition: {
                  repeat: 1,
                  repeatType: "reverse",
                  duration: 0.5
                }
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RevealAnimation;