import React from 'react';
import TopNavbar from '../components/TopNavbar';
import BrandNavbarSection from '../components/productsPages/BrandNavbarSection';
import MainNavbar from '@/components/MainNavbar';
import Footer from '../components/Footer';

const MondeFioriDNA = () => {
  return (
    <div className="min-h-screen bg-[#f6f7f9] flex flex-col relative">
      <TopNavbar />
      <BrandNavbarSection />
      <div className="hidden lg:block">
        <MainNavbar/>
      </div>
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900">
                Notre ADN
              </h1>
              <div className="text-lg text-gray-600 space-y-4">
                <p>
                  Fiori se distingue par ses articles personnalisés, son packaging luxueux et la matière première 
                  raffinée qu'elle utilise pour proposer un produit de haute qualité.
                </p>
                <p>
                  De plus, nous proposons un service client prestigieux en suivant la commande dés son lancement 
                  jusqu'a la livraison.
                </p>
                <p>
                  Le service après vente est toujours disponible pour s'assurer la satisfaction des clients et 
                  s'enquêter à propos les réclamations et les propositions des clients.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] w-full">
              <img 
                 src="/DNA.jpg"
                alt="Fiori DNA"
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MondeFioriDNA;