import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface Plan {
  type: string;
  price: number;
  name: string;
}

interface PricingModalProps {
  plan: Plan;
  isOpen: boolean;
  onClose: () => void;
}

interface PixResponse {
  pixKey: string;
  whatsappNumber: string;
  subscriptionId: string;
}

export default function PricingModal({ plan, isOpen, onClose }: PricingModalProps) {
  const [pixData, setPixData] = useState<PixResponse | null>(null);
  const { toast } = useToast();

  const pixMutation = useMutation({
    mutationFn: async (planData: { planType: string; price: number }) => {
      const response = await apiRequest("POST", "/api/pix-key", planData);
      return response.json();
    },
    onSuccess: (data: PixResponse) => {
      setPixData(data);
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Erro ao gerar chave PIX. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (isOpen && plan) {
      pixMutation.mutate({
        planType: plan.type,
        price: plan.price,
      });
    }
  }, [isOpen, plan]);

  const copyPixKey = async () => {
    if (!pixData?.pixKey) return;
    
    try {
      await navigator.clipboard.writeText(pixData.pixKey);
      toast({
        title: "Copiado!",
        description: "Chave PIX copiada para a área de transferência",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao copiar chave PIX",
        variant: "destructive",
      });
    }
  };

  const openWhatsApp = () => {
    if (!pixData?.whatsappNumber) return;

    const message = encodeURIComponent(
      `Olá! Acabei de fazer o PIX para renovação do plano ${plan.name} (R$${plan.price}) da ZerionTV. Segue o comprovante de pagamento:`
    );
    
    const whatsappUrl = `https://wa.me/${pixData.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="modal-pricing">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-qrcode text-green-600 text-2xl" data-testid="icon-qr"></i>
            </div>
            <span data-testid="title-payment-pix">Pagamento PIX</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          <p className="text-muted-foreground" data-testid="text-plan-details">
            Plano <span className="font-semibold">{plan.name}</span> - 
            <span className="font-semibold text-primary"> R${plan.price}</span>
          </p>
          
          {pixMutation.isPending ? (
            <div className="flex flex-col items-center space-y-4" data-testid="loading-pix">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-sm text-muted-foreground">Gerando chave PIX...</p>
            </div>
          ) : pixData ? (
            <div className="bg-muted p-4 rounded-lg" data-testid="container-pix-key">
              <p className="text-sm text-muted-foreground mb-2">Chave PIX:</p>
              <div className="flex items-center justify-between bg-white p-3 rounded border">
                <span className="font-mono text-sm break-all" data-testid="text-pix-key">
                  {pixData.pixKey}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyPixKey}
                  className="text-primary hover:text-blue-700 ml-2 flex-shrink-0"
                  data-testid="button-copy-pix"
                >
                  <i className="fas fa-copy"></i>
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-destructive" data-testid="text-error">
              Erro ao carregar dados do PIX
            </p>
          )}

          <div className="space-y-4">
            <Button
              onClick={openWhatsApp}
              disabled={!pixData}
              className="w-full bg-green-600 text-white py-3 font-semibold hover:bg-green-700 transition-colors"
              data-testid="button-whatsapp"
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Enviar Comprovante via WhatsApp
            </Button>
            
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
              data-testid="button-close-modal"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
