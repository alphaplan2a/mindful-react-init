import React, { useState } from 'react';
import { VideoModal } from './VideoModal';
import { VideoPreview } from './VideoPreview';

const VIDEO_URL = "https://respizenmedical.com/fiori/Prestige/video.mp4";

interface WelcomePackPrestigeProps {
  onCompose: () => void;
}

const WelcomePackPrestige = ({ onCompose }: WelcomePackPrestigeProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="flex flex-col justify-between h-full lg:sticky lg:top-6">
              <div className="space-y-5 lg:space-y-6">
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                  Le Pack Prestige
                </h1>
                <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed">
                  Découvrez notre Pack Prestige exclusif, une collection raffinée 
                  qui incarne l'élégance et le luxe. Chaque article est sélectionné 
                  avec soin pour offrir une expérience unique. Personnalisez votre 
                  choix et profitez d'une présentation élégante dans notre coffret 
                  cadeau signature.
                </p>
              </div>
              <button
                className="w-full lg:w-auto mt-6 px-8 py-3 bg-[#67000D] text-white text-xl font-medium rounded-none hover:bg-[#4a000a] transition-colors duration-200"
                onClick={onCompose}
              >
                Composez votre coffret
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              {/* Desktop: Left side images */}
              <div className="hidden lg:flex lg:flex-col lg:space-y-1 lg:mr-[-40%]">
                <img 
                  src="https://respizenmedical.com/fiori/Prestige/1.png"
                  alt="Product showcase 1"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Prestige/2.png"
                  alt="Product showcase 2"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Prestige/3.png"
                  alt="Product showcase 3"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
              </div>

              {/* Mobile: Horizontal images row */}
              <div className="flex lg:hidden flex-row justify-between mb-4 w-full">
                <img 
                  src="https://respizenmedical.com/fiori/Prestige/1.png"
                  alt="Product showcase 1"
                  className="w-[32%] h-[120px] object-cover"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Prestige/2.png"
                  alt="Product showcase 2"
                  className="w-[32%] h-[120px] object-cover"
                />
                <img 
                  src="https://respizenmedical.com/fiori/Prestige/3.png"
                  alt="Product showcase 3"
                  className="w-[32%] h-[120px] object-cover"
                />
              </div>

              {/* Video section */}
              <div className="h-[480px] lg:h-full lg:col-span-1">
                <VideoPreview
                  videoUrl={VIDEO_URL}
                  onClick={() => setIsVideoOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={VIDEO_URL}
      />
    </>
  );
};

export default WelcomePackPrestige;