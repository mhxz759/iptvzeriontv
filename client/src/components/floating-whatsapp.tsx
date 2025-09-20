export default function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const whatsappNumber = "5511920752428"; // Real WhatsApp number provided by user
    const message = encodeURIComponent("Olá! Gostaria de renovar meu IPTV ZerionTV");
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="floating-whatsapp bg-green-500 hover:bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-colors"
      data-testid="button-floating-whatsapp"
    >
      <i className="fab fa-whatsapp text-2xl"></i>
    </button>
  );
}
