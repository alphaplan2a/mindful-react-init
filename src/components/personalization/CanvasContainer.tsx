import { useEffect, useRef } from "react";
import { Canvas, Text, Rect } from "fabric";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { productZones } from "./types/productZones";

interface CanvasContainerProps {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  isMobile: boolean;
  text: string;
  selectedFont: string;
  onObjectDelete: () => void;
  selectedCategory: string | null;
}

const CanvasContainer = ({ 
  canvas, 
  setCanvas, 
  isMobile, 
  text, 
  selectedFont,
  onObjectDelete,
  selectedCategory 
}: CanvasContainerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvasWidth = isMobile ? window.innerWidth - 32 : 500;
    const canvasHeight = isMobile ? window.innerHeight * 0.5 : 600;

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: "#f8f9fa",
      preserveObjectStacking: true,
    });

    // Find the selected product zone
    const productZone = productZones.find(zone => zone.id === selectedCategory);

    if (productZone) {
      // Create a clipping rectangle for the customization zone
      const clipRect = new Rect({
        width: productZone.zone.width,
        height: productZone.zone.height,
        left: productZone.zone.left,
        top: productZone.zone.top,
        absolutePositioned: true,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
      });

      fabricCanvas.clipPath = clipRect;
      
      // Add a visible border rectangle
      const borderRect = new Rect({
        width: productZone.zone.width,
        height: productZone.zone.height,
        left: productZone.zone.left,
        top: productZone.zone.top,
        fill: 'transparent',
        stroke: '#000000',
        strokeWidth: 2,
        strokeDashArray: [5, 5],
        selectable: false,
        evented: false,
      });
      
      fabricCanvas.add(borderRect);
      fabricCanvas.sendObjectToBack(borderRect);

      // Initialize placeholder text within the zone
      const placeholderText = new Text("Tapez votre texte ici...", {
        left: productZone.zone.left + productZone.zone.width / 2,
        top: productZone.zone.top + productZone.zone.height / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });

      fabricCanvas.add(placeholderText);
    }

    // Add object movement constraints
    fabricCanvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj || !productZone) return;

      const objBounds = obj.getBoundingRect(true, true);
      const zone = productZone.zone;

      // Calculate the object's center position
      const objCenterX = objBounds.left + objBounds.width / 2;
      const objCenterY = objBounds.top + objBounds.height / 2;

      // Calculate zone boundaries
      const zoneLeft = zone.left;
      const zoneRight = zone.left + zone.width;
      const zoneTop = zone.top;
      const zoneBottom = zone.top + zone.height;

      // Adjust position to keep the object within bounds
      if (objBounds.left < zoneLeft) {
        obj.set('left', obj.left + (zoneLeft - objBounds.left));
      }
      if (objBounds.top < zoneTop) {
        obj.set('top', obj.top + (zoneTop - objBounds.top));
      }
      if (objBounds.left + objBounds.width > zoneRight) {
        obj.set('left', obj.left - ((objBounds.left + objBounds.width) - zoneRight));
      }
      if (objBounds.top + objBounds.height > zoneBottom) {
        obj.set('top', obj.top - ((objBounds.top + objBounds.height) - zoneBottom));
      }

      fabricCanvas.renderAll();
    });

    // Add scaling constraints
    fabricCanvas.on('object:scaling', (e) => {
      const obj = e.target;
      if (!obj || !productZone) return;

      const objBounds = obj.getBoundingRect(true, true);
      const zone = productZone.zone;
      
      // Store current scale
      const currentScaleX = obj.scaleX || 1;
      const currentScaleY = obj.scaleY || 1;

      // Check if the scaled object is within bounds
      const isWithinBounds = 
        objBounds.left >= zone.left &&
        objBounds.top >= zone.top &&
        objBounds.left + objBounds.width <= zone.left + zone.width &&
        objBounds.top + objBounds.height <= zone.top + zone.height;

      if (!isWithinBounds) {
        // If object goes outside bounds, revert to previous valid scale
        if (typeof obj.get('lastScaleX') === 'number') {
          obj.set('scaleX', obj.get('lastScaleX'));
        }
        if (typeof obj.get('lastScaleY') === 'number') {
          obj.set('scaleY', obj.get('lastScaleY'));
        }
      } else {
        // Store current scale as last valid scale
        obj.set('lastScaleX', currentScaleX);
        obj.set('lastScaleY', currentScaleY);
      }
      
      fabricCanvas.renderAll();
    });

    fabricCanvas.renderAll();
    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, [isMobile, selectedFont, selectedCategory]);

  useEffect(() => {
    if (!canvas || !selectedCategory) return;

    const productZone = productZones.find(zone => zone.id === selectedCategory);
    if (!productZone) return;

    const existingTexts = canvas.getObjects().filter(obj => obj instanceof Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
      const fabricText = new Text(text, {
        left: productZone.zone.left + productZone.zone.width / 2,
        top: productZone.zone.top + productZone.zone.height / 2,
        fontSize: 16,
        fill: "#000000",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        hasControls: true,
        hasBorders: true,
        lockUniScaling: false,
        transparentCorners: false,
        cornerColor: 'rgba(102,153,255,0.5)',
        cornerSize: 12,
        padding: 5
      });

      canvas.add(fabricText);
      canvas.setActiveObject(fabricText);
    } else {
      const placeholderText = new Text("Tapez votre texte ici...", {
        left: productZone.zone.left + productZone.zone.width / 2,
        top: productZone.zone.top + productZone.zone.height / 2,
        fontSize: 20,
        fill: "#999999",
        fontFamily: selectedFont,
        originX: 'center',
        originY: 'center',
        selectable: false,
        opacity: 0.7
      });
      canvas.add(placeholderText);
    }

    canvas.renderAll();
  }, [text, canvas, selectedFont, selectedCategory]);

  return (
    <Card className="p-4 lg:p-6">
      <div className="w-full flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative min-h-[600px]">
        <canvas 
          ref={canvasRef} 
          className="max-w-full touch-manipulation shadow-lg"
        />
        <button
          ref={deleteButtonRef}
          onClick={onObjectDelete}
          className="absolute hidden bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors w-6 h-6 flex items-center justify-center"
          style={{
            zIndex: 1000,
            right: '10px',
            top: '10px',
            padding: 0,
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </Card>
  );
};

export default CanvasContainer;
