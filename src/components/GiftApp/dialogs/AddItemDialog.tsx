import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from '@/types/product';
import SizeSelector from '../../product-detail/SizeSelector';
import PersonalizationButton from '../../product-detail/PersonalizationButton';
import { canItemBePersonalized, getPersonalizationMessage } from '@/utils/personalizationConfig';

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  droppedItem: Product | null;
  selectedSize: string;
  personalization: string;
  onSizeSelect: (size: string) => void;
  onPersonalizationChange: (text: string) => void;
  onConfirm: () => void;
  isEditing?: boolean;
}

const AddItemDialog = ({
  open,
  onOpenChange,
  droppedItem,
  selectedSize,
  personalization,
  onSizeSelect,
  onPersonalizationChange,
  onConfirm,
  isEditing = false,
}: AddItemDialogProps) => {
  const getAvailableSizes = (product: Product | null): string[] => {
    if (!product || !product.sizes) return [];

    if (['cravates', 'portefeuilles', 'porte-cles'].includes(product.itemgroup_product)) {
      if (!selectedSize) {
        onSizeSelect('unique');
      }
      return [];
    }

    return product.itemgroup_product === 'costumes'
      ? Object.entries(product.sizes)
          .filter(([key, stock]) => ['48', '50', '52', '54', '56', '58'].includes(key) && stock > 0)
          .map(([size]) => size)
      : Object.entries(product.sizes)
          .filter(([key, stock]) => ['s', 'm', 'l', 'xl', 'xxl', '3xl'].includes(key.toLowerCase()) && stock > 0)
          .map(([size]) => size.toUpperCase());
  };

  const availableSizes = getAvailableSizes(droppedItem);
  const canPersonalize = droppedItem ? canItemBePersonalized(droppedItem.itemgroup_product) : false;
  const personalizationMessage = droppedItem ? getPersonalizationMessage(droppedItem.itemgroup_product) : undefined;
  const needsSizeSelection = droppedItem ? !['cravates', 'portefeuilles', 'porte-cles'].includes(droppedItem.itemgroup_product) : false;
  const isNoSizeItem = droppedItem ? ['portefeuilles', 'cravates', 'porte-cles'].includes(droppedItem.itemgroup_product) : false;

  const canConfirm = () => {
    if (isNoSizeItem) return true;
    if (needsSizeSelection && !selectedSize) return false;
    if (needsSizeSelection && availableSizes.length === 0) return false;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white/95">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif text-[#6D0201] mb-4">
            {isEditing ? 'Modifier l\'article' : needsSizeSelection ? 'Personnalisez votre article' : 'Confirmer la sélection'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {needsSizeSelection && availableSizes.length > 0 && (
            <SizeSelector
              selectedSize={selectedSize}
              sizes={availableSizes}
              onSizeSelect={onSizeSelect}
              isCostume={droppedItem?.itemgroup_product === 'costumes'}
            />
          )}
          
          {canPersonalize && (
            <PersonalizationButton
              productId={droppedItem?.id || 0}
              onSave={onPersonalizationChange}
              initialText={personalization}
              itemgroup_product={droppedItem?.itemgroup_product}
            />
          )}

          {needsSizeSelection && availableSizes.length === 0 && !isNoSizeItem && (
            <p className="text-red-500">Aucune taille disponible pour ce produit</p>
          )}

          <button
            onClick={onConfirm}
            className={`w-full py-4 rounded-xl text-white font-medium ${
              !canConfirm()
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#6D0201] hover:bg-[#590000]'
            }`}
            disabled={!canConfirm()}
          >
            {isEditing ? 'Enregistrer les modifications' : 'Confirmer'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddItemDialog;