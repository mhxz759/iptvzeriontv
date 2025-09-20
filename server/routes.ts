import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const pixKeyRequestSchema = z.object({
  planType: z.enum(['monthly', 'quarterly', 'annual']),
  price: z.number(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get PIX key for a specific plan
  app.post("/api/pix-key", async (req, res) => {
    try {
      console.log("PIX request body:", req.body);
      const { planType, price } = pixKeyRequestSchema.parse(req.body);
      
      // Using real PIX key and WhatsApp number provided by user
      const pixKey = process.env.PIX_KEY || "0a75a2c4-cc9b-448a-ae90-ca3102b20592";
      const whatsappNumber = process.env.WHATSAPP_NUMBER || "5511920752428";
      
      const subscription = await storage.createSubscription({
        planType,
        price,
        pixKey,
        whatsappNumber,
      });

      res.json({
        pixKey: subscription.pixKey,
        whatsappNumber: subscription.whatsappNumber,
        subscriptionId: subscription.id,
      });
    } catch (error) {
      console.error("PIX endpoint error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      res.status(400).json({ error: "Invalid request data", details: errorMessage });
    }
  });

  // Get plans configuration
  app.get("/api/plans", async (req, res) => {
    const plans = [
      {
        type: 'monthly',
        price: 8,
        name: 'Mensal',
        features: [
          '+ de 10.000 canais',
          'Qualidade HD/4K',
          'Suporte 24h',
          'Todos os dispositivos'
        ]
      },
      {
        type: 'quarterly',
        price: 21,
        name: 'Trimestral',
        features: [
          '+ de 10.000 canais',
          'Qualidade HD/4K',
          'Suporte prioritário',
          'Todos os dispositivos',
          'Canais Premium inclusos'
        ],
        popular: true,
        savings: 'Economize R$3'
      },
      {
        type: 'annual',
        price: 79,
        name: 'Anual',
        features: [
          '+ de 10.000 canais',
          'Qualidade HD/4K',
          'Suporte VIP',
          'Todos os dispositivos',
          'Todos os Premium',
          'Bônus especiais'
        ],
        savings: 'Economize R$17'
      }
    ];

    res.json(plans);
  });

  const httpServer = createServer(app);
  return httpServer;
}
