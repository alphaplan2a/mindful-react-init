import React, { useState } from 'react';
import { VideoModal } from './VideoModal';
import { VideoPreview } from './VideoPreview';

const VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";

interface WelcomePackCravatteProps {
  onCompose: () => void;
}

const WelcomePackCravatte = ({ onCompose }: WelcomePackCravatteProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="min-h-screen bg-[#f6f7f9]">
        <div className="max-w-7xl mx-auto px-4 py-5 lg:py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="flex flex-col justify-between h-full lg:sticky lg:top-6">
              <div className="space-y-5 lg:space-y-6">
                <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                  Le Pack Cravatte
                </h1>
                <p className="text-lg lg:text-2xl text-gray-600 leading-relaxed">
                  Découvrez notre Pack Cravatte distinctif, une collection soigneusement 
                  sélectionnée de cravates élégantes. Chaque cravatte est choisie pour 
                  sa qualité exceptionnelle et son style intemporel. Personnalisez votre 
                  choix et recevez-le dans notre coffret cadeau signature.
                </p>
              </div>
              <button
                className="w-full lg:w-auto mt-6 px-8 py-3 bg-[#67000D] text-white text-xl font-medium rounded-none hover:bg-[#4a000a] transition-colors duration-200"
                onClick={onCompose}
              >
                Composez votre coffret
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
              <div className="space-y-1 mr-[-40%]">
                <img 
                  src="https://placehold.co/600x400/67000D/ffffff?text=Tie+1"
                  alt="Tie showcase 1"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://placehold.co/600x400/333333/ffffff?text=Tie+2"
                  alt="Tie showcase 2"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
                <img 
                  src="https://placehold.co/600x400/67000D/ffffff?text=Tie+3"
                  alt="Tie showcase 3"
                  className="w-[35%] h-[160px] object-cover mx-auto"
                />
              </div>
              <div className="h-[480px] sm:h-full">
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

export default WelcomePackCravatte;