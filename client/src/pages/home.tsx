import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PricingModal from "@/components/pricing-modal";
import FloatingWhatsApp from "@/components/floating-whatsapp";

interface Plan {
  type: string;
  price: number;
  name: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}

export default function Home() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showModal, setShowModal] = useState(false);

  const { data: plans = [], isLoading } = useQuery<Plan[]>({
    queryKey: ["/api/plans"],
  });

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando planos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="gradient-bg relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-white">
            <div className="mb-6">
              <i className="fas fa-tv text-6xl mb-4 opacity-90" data-testid="icon-tv"></i>
              <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="title-main">
                Zerion<span className="text-accent">TV</span>
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6" data-testid="title-subtitle">
              Renovação IPTV Premium
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90" data-testid="text-description">
              + de 10.000 canais | Qualidade HD/4K | Suporte 24h
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-lg">
              <div className="flex items-center" data-testid="feature-no-buffering">
                <i className="fas fa-check-circle text-accent mr-2"></i>
                <span>Sem Travamento</span>
              </div>
              <div className="flex items-center" data-testid="feature-all-devices">
                <i className="fas fa-check-circle text-accent mr-2"></i>
                <span>Todos os Dispositivos</span>
              </div>
              <div className="flex items-center" data-testid="feature-instant-activation">
                <i className="fas fa-check-circle text-accent mr-2"></i>
                <span>Ativação Imediata</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </header>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="title-plans">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="text-plans-description">
              Renove agora e garante acesso ilimitado aos melhores canais
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.type}
                className={`p-8 card-hover cursor-pointer relative ${
                  plan.popular ? 'border-2 border-accent' : 'border border-border'
                }`}
                onClick={() => handlePlanSelect(plan)}
                data-testid={`card-plan-${plan.type}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-semibold" data-testid="badge-popular">
                      MAIS POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                    plan.type === 'monthly' ? 'bg-blue-100' :
                    plan.type === 'quarterly' ? 'bg-cyan-100' : 'bg-green-100'
                  }`}>
                    <i className={`fas fa-calendar${
                      plan.type === 'monthly' ? '-alt' :
                      plan.type === 'quarterly' ? '-week' : ''
                    } text-2xl ${
                      plan.type === 'monthly' ? 'text-primary' :
                      plan.type === 'quarterly' ? 'text-accent' : 'text-green-600'
                    }`} data-testid={`icon-plan-${plan.type}`}></i>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground mb-2" data-testid={`text-plan-name-${plan.type}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${
                      plan.type === 'monthly' ? 'text-primary' :
                      plan.type === 'quarterly' ? 'text-accent' : 'text-green-600'
                    }`} data-testid={`text-plan-price-${plan.type}`}>
                      R${plan.price}
                    </span>
                    <span className="text-muted-foreground">
                      /{plan.type === 'monthly' ? 'mês' : plan.type === 'quarterly' ? '3 meses' : 'ano'}
                    </span>
                    {plan.savings && (
                      <div className="text-sm text-green-600 font-semibold" data-testid={`text-savings-${plan.type}`}>
                        {plan.savings}
                      </div>
                    )}
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center" data-testid={`feature-${plan.type}-${index}`}>
                        <i className={`fas ${
                          index === plan.features.length - 1 && plan.type === 'quarterly' ? 'fa-star text-yellow-500' :
                          index >= plan.features.length - 2 && plan.type === 'annual' && index === plan.features.length - 2 ? 'fa-crown text-yellow-500' :
                          index === plan.features.length - 1 && plan.type === 'annual' ? 'fa-gift text-purple-500' :
                          'fa-check text-green-500'
                        } mr-3`}></i>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    className={`w-full py-3 font-semibold transition-colors ${
                      plan.type === 'monthly' ? 'bg-primary hover:bg-blue-700 text-primary-foreground' :
                      plan.type === 'quarterly' ? 'bg-accent hover:bg-cyan-600 text-accent-foreground' :
                      'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                    data-testid={`button-select-${plan.type}`}
                  >
                    Escolher Plano
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4" data-testid="title-features">
              Por que escolher a ZerionTV?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center" data-testid="feature-instant">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-bolt text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Ativação Instantânea</h3>
              <p className="text-muted-foreground">
                Após o pagamento, sua renovação é ativada em até 5 minutos
              </p>
            </div>
            
            <div className="text-center" data-testid="feature-support">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-headset text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">Suporte 24/7</h3>
              <p className="text-muted-foreground">
                Equipe especializada disponível 24 horas por dia
              </p>
            </div>
            
            <div className="text-center" data-testid="feature-secure">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-shield-alt text-white text-3xl"></i>
              </div>
              <h3 className="text-xl font-semibold mb-4">100% Seguro</h3>
              <p className="text-muted-foreground">
                Pagamento seguro via PIX com proteção total
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="gradient-bg text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold mb-2" data-testid="text-footer-title">
              Zerion<span className="text-accent">TV</span>
            </h3>
            <p className="opacity-90" data-testid="text-footer-subtitle">
              A melhor experiência em IPTV do Brasil
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-6">
            <a href="#" className="hover:text-accent transition-colors" data-testid="link-whatsapp-footer">
              <i className="fab fa-whatsapp text-2xl"></i>
            </a>
            <a href="#" className="hover:text-accent transition-colors" data-testid="link-telegram-footer">
              <i className="fab fa-telegram text-2xl"></i>
            </a>
            <a href="#" className="hover:text-accent transition-colors" data-testid="link-email-footer">
              <i className="fas fa-envelope text-2xl"></i>
            </a>
          </div>
          
          <p className="text-sm opacity-75" data-testid="text-copyright">
            © 2024 ZerionTV. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Modals and Components */}
      {selectedPlan && (
        <PricingModal
          plan={selectedPlan}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedPlan(null);
          }}
        />
      )}
      
      <FloatingWhatsApp />
    </div>
  );
}
