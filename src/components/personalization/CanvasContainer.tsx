import { useEffect, useRef } from "react";
import { Canvas, Text } from "fabric";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface CanvasContainerProps {
  canvas: Canvas | null;
  setCanvas: (canvas: Canvas | null) => void;
  isMobile: boolean;
  text: string;
  selectedFont: string;
  onObjectDelete: () => void;
}

const CanvasContainer = ({ 
  canvas, 
  setCanvas, 
  isMobile, 
  text, 
  selectedFont,
  onObjectDelete 
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

    const placeholderText = new Text("Tapez votre texte ici...", {
      left: fabricCanvas.width! / 2,
      top: fabricCanvas.height! / 2,
      fontSize: 20,
      fill: "#999999",
      fontFamily: selectedFont,
      originX: 'center',
      originY: 'center',
      selectable: false,
      opacity: 0.7
    });

    fabricCanvas.add(placeholderText);
    fabricCanvas.renderAll();

    fabricCanvas.on('selection:created', (e) => {
      const obj = e.selected?.[0];
      if (deleteButtonRef.current) {
        const bounds = obj?.getBoundingRect();
        if (bounds) {
          deleteButtonRef.current.style.display = 'block';
          deleteButtonRef.current.style.left = `${bounds.left + bounds.width + 10}px`;
          deleteButtonRef.current.style.top = `${bounds.top}px`;
        }
      }
    });

    fabricCanvas.on('selection:cleared', () => {
      if (deleteButtonRef.current) {
        deleteButtonRef.current.style.display = 'none';
      }
    });

    fabricCanvas.on('object:moving', (e) => {
      if (deleteButtonRef.current && e.target) {
        const bounds = e.target.getBoundingRect();
        deleteButtonRef.current.style.left = `${bounds.left + bounds.width + 10}px`;
        deleteButtonRef.current.style.top = `${bounds.top}px`;
      }
    });

    setCanvas(fabricCanvas);

    const handleResize = () => {
      const newWidth = isMobile ? window.innerWidth - 32 : 500;
      const newHeight = isMobile ? window.innerHeight * 0.5 : 600;
      fabricCanvas.setDimensions({ width: newWidth, height: newHeight });
      fabricCanvas.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      fabricCanvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile, selectedFont, setCanvas]);

  useEffect(() => {
    if (!canvas) return;

    const existingTexts = canvas.getObjects().filter(obj => obj instanceof Text);
    existingTexts.forEach(textObj => canvas.remove(textObj));

    if (text) {
      const fabricText = new Text(text, {
        left: canvas.width! / 2,
        top: canvas.height! / 2,
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
        left: canvas.width! / 2,
        top: canvas.height! / 2,
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
  }, [text, canvas, selectedFont]);

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