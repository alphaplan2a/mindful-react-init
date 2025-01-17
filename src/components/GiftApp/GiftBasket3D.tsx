import React, { useState } from 'react';
import { Product } from '@/types/product';
import { playTickSound } from '@/utils/audio';
import { toast } from '@/hooks/use-toast';
import GiftPackContainer from './containers/GiftPackContainer';
import AddItemDialog from './dialogs/AddItemDialog';
import ProductDetailsDialog from './dialogs/ProductDetailsDialog';
import AddItemParticles from '../effects/AddItemParticles';
import BoxRevealAnimation from './animations/BoxRevealAnimation';
import { packSpaceLabels } from '@/config/packSpaceLabels';
import { packSpaceDimensions } from '@/config/packSpaceDimensions';

interface GiftBasket3DProps {
  items: Product[];
  onItemDrop: (item: Product, size: string, personalization: string) => void;
  onRemoveItem?: (index: number) => void;
  containerCount: number;
  onContainerSelect: (index: number) => void;
  onEditItem?: (item: Product, index: number, size: string, personalization: string) => void;
}

const GiftBasket3D = ({ 
  items, 
  onItemDrop, 
  onRemoveItem,
  containerCount,
  onContainerSelect,
  onEditItem
}: GiftBasket3DProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [personalization, setPersonalization] = useState('');
  const [droppedItem, setDroppedItem] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [targetContainer, setTargetContainer] = useState<number>(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [particlePosition, setParticlePosition] = useState<{ x: number; y: number } | null>(null);

  const packType = sessionStorage.getItem('selectedPackType') || 'Pack Prestige';
  const spaceLabels = packSpaceLabels[packType];
  const spaceDimensions = packSpaceDimensions[packType];

  const handleDrop = (containerId: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData('product'));
    setDroppedItem(item);
    setTargetContainer(containerId);
    onContainerSelect(containerId);
    setShowAddDialog(true);
    playTickSound();
    
    const rect = e.currentTarget.getBoundingClientRect();
    setParticlePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setTimeout(() => {
      setParticlePosition(null);
    }, 1000);
  };

  const handleConfirm = () => {
    if (droppedItem && selectedSize) {
      if (editingIndex !== null && onEditItem) {
        onEditItem(droppedItem, editingIndex, selectedSize, personalization);
        setEditingIndex(null);
      } else {
        onItemDrop(droppedItem, selectedSize, personalization);
      }
      setShowAddDialog(false);
      setSelectedSize('');
      setPersonalization('');
      setDroppedItem(null);
      toast({
        title: editingIndex !== null ? "Article modifié" : "Article ajouté au pack",
        description: editingIndex !== null 
          ? "Les modifications ont été enregistrées avec succès"
          : "L'article a été ajouté avec succès à votre pack cadeau",
        style: {
          backgroundColor: '#700100',
          color: 'white',
          border: '1px solid #590000',
        },
        duration: 3000,
      });
    } else {
      toast({
        title: "Taille requise",
        description: "Veuillez sélectionner une taille avant d'ajouter l'article",
        variant: "destructive",
      });
    }
  };

  const handleEditItem = (item: Product, index: number) => {
    setDroppedItem(item);
    setEditingIndex(index);
    setSelectedSize(item.size || '');
    setPersonalization(item.personalization || '');
    setShowAddDialog(true);
  };

  return (
    <div className="space-y-2">
      <div className="p-6 bg-black/95 border border-gray-800 rounded-xl shadow-2xl relative">
        <BoxRevealAnimation containerCount={containerCount} />
        
        {containerCount === 3 ? (
          <div className="flex gap-3">
            <div className={`${spaceDimensions.main.width} ${spaceDimensions.main.height}`}>
              <GiftPackContainer
                title={spaceLabels?.mainSpace || "ESPACE PRINCIPAL"}
                item={items[0]}
                onDrop={handleDrop(0)}
                onRemoveItem={() => onRemoveItem?.(0)}
                onEditItem={handleEditItem}
                containerIndex={0}
                className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
              />
              {particlePosition && targetContainer === 0 && (
                <AddItemParticles position={particlePosition} />
              )}
            </div>
            
            <div className={`${spaceDimensions.secondary?.width || 'w-[40%]'} flex flex-col gap-3`}>
              <div className={spaceDimensions.secondary?.height || 'h-[291px]'}>
                <GiftPackContainer
                  title={spaceLabels?.secondarySpace || "ESPACE SECONDAIRE"}
                  item={items[1]}
                  onDrop={handleDrop(1)}
                  onRemoveItem={() => onRemoveItem?.(1)}
                  onEditItem={handleEditItem}
                  containerIndex={1}
                  className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                />
                {particlePosition && targetContainer === 1 && (
                  <AddItemParticles position={particlePosition} />
                )}
              </div>
              <div className={spaceDimensions.tertiary?.height || 'h-[291px]'}>
                <GiftPackContainer
                  title={spaceLabels?.tertiarySpace || "ESPACE TERTIAIRE"}
                  item={items[2]}
                  onDrop={handleDrop(2)}
                  onRemoveItem={() => onRemoveItem?.(2)}
                  onEditItem={handleEditItem}
                  containerIndex={2}
                  className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                />
                {particlePosition && targetContainer === 2 && (
                  <AddItemParticles position={particlePosition} />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {Array.from({ length: containerCount }).map((_, index) => (
              <div key={index} className={`relative ${spaceDimensions.main.height}`}>
                <GiftPackContainer
                  title={spaceLabels?.mainSpace || "ESPACE PRINCIPAL"}
                  item={items[index]}
                  onDrop={handleDrop(index)}
                  onRemoveItem={() => onRemoveItem?.(index)}
                  onEditItem={handleEditItem}
                  containerIndex={index}
                  className="h-full bg-black/90 backdrop-blur-sm shadow-2xl rounded-xl border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-gray-700"
                />
                {particlePosition && targetContainer === index && (
                  <AddItemParticles position={particlePosition} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        droppedItem={droppedItem}
        selectedSize={selectedSize}
        personalization={personalization}
        onSizeSelect={setSelectedSize}
        onPersonalizationChange={setPersonalization}
        onConfirm={handleConfirm}
        isEditing={editingIndex !== null}
      />

      <ProductDetailsDialog
        open={showProductModal}
        onOpenChange={setShowProductModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default GiftBasket3D;
