import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const ErrorPage = ({ error }: { error?: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-lg w-full mx-4 p-8 rounded-lg border border-gray-100 shadow-lg">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-[#700100]" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-[#700100]">
              Une erreur est survenue
            </h1>
            
            <p className="text-gray-600">
              {error?.message || "Nous nous excusons pour la gêne occasionnée."}
            </p>
            
            <div className="pt-4 space-y-2">
              <p className="text-sm text-gray-500">
                Pour une assistance immédiate, contactez notre support technique :
              </p>
              <a 
                href="tel:+21629249512" 
                className="block text-lg font-semibold text-[#700100] hover:underline"
              >
                +216 29 249 512
              </a>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={() => window.location.reload()} 
              className="bg-[#700100] hover:bg-[#8B0000] text-white px-8 py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Rafraîchir la page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};