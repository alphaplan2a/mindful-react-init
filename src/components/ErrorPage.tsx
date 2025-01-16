import { Button } from "@/components/ui/button";

export const ErrorPage = ({ error }: { error?: Error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white/20 via-transparent to-white/20">
      <div className="glass-effect p-8 rounded-lg max-w-lg w-full mx-4 text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-[#700100]">Oops !</h1>
          <p className="text-lg text-gray-700">
            Une erreur inattendue s'est produite.
          </p>
          <p className="text-gray-600">
            {error?.message || "Nous nous excusons pour ce désagrément."}
          </p>
          <div className="pt-4">
            <p className="text-sm text-gray-500">
              Contactez notre technicien directement :
            </p>
            <a 
              href="tel:+21629249512" 
              className="text-lg font-semibold text-[#700100] hover:underline"
            >
              +216 29 249 512
            </a>
          </div>
        </div>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-[#700100] hover:bg-[#8B0000] text-white px-6 py-2"
        >
          Rafraîchir la page
        </Button>
      </div>
    </div>
  );
};