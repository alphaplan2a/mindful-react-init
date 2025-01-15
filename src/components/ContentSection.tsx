import React from 'react';
import { motion } from 'framer-motion';

const FloatingCard = ({ title, description, delay = 0 }) => {
  return (
    <div 
      className="floating-card glass p-8 rounded-2xl w-full max-w-sm mx-auto animate-fadeIn opacity-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-soft-600">{description}</p>
    </div>
  );
};

const ContentSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <FloatingCard
            title="Innovation"
            description="Découvrez nos dernières innovations en matière de mode masculine."
            delay={0}
          />
          <FloatingCard
            title="Qualité"
            description="Des matériaux premium sélectionnés avec soin pour votre confort."
            delay={200}
          />
          <FloatingCard
            title="Style"
            description="Un style unique qui vous distingue en toute occasion."
            delay={400}
          />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;