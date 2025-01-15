import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PenLine, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PersonalizationInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PersonalizationInput = ({ value, onChange }: PersonalizationInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        className={`w-full border-2 transition-colors duration-300 ${
          isOpen 
            ? 'border-[#700100] text-[#700100] hover:bg-[#700100] hover:text-white'
            : 'border-gray-300 hover:border-[#700100] hover:text-[#700100]'
        }`}
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 mr-2" />
            Annuler la personnalisation
          </>
        ) : (
          <>
            <PenLine className="w-4 h-4 mr-2" />
            {value ? 'Modifier la personnalisation' : 'Ajouter une personnalisation'}
          </>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <Label className="text-base font-semibold text-gray-900">
                Votre message personnalisé
              </Label>
              <Textarea
                placeholder="Ajoutez votre texte personnalisé ici..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="min-h-[120px] resize-none border-[#700100] focus:ring-[#700100] bg-white text-black transition-all duration-300"
              />
              <p className="text-sm text-gray-500 italic">
                Exemple:  Exemple: "Flen Falten"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && value && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-50 p-3 rounded-lg border border-gray-200"
        >
          <p className="text-sm text-gray-600">
            Message personnalisé: {value}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default PersonalizationInput;