const WhatsAppButton = () => {
  const phoneNumber = "4915563744696"; // ✅ richtige Nummer
  const message = encodeURIComponent(
    "Hallo Emilian! Ich interessiere mich für eine Buchung als Zauberer für mein Event."
  );

  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center"
      aria-label="WhatsApp Kontakt"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67-.099-.197.049-.76.296-.877.346-.123.05-.213.074-.31-.074-.099-.149-.38-.466-.738-.746-.281-.25-.594-.56-.843-.83-.226-.243-.447-.537-.628-.82-.196-.297-.049-.458.149-.607.173-.124.38-.322.57-.483.197-.161.26-.27.396-.446.123-.173.062-.322-.025-.471-.099-.149-.67-1.612-.916-2.205-.235-.567-.475-.492-.67-.502-.173-.009-.37-.011-.57-.011-.197 0-.52.074-.793.346-.273.273-1.04 1.016-1.04 2.477 0 1.46 1.065 2.874 1.213 3.074.149.198 2.095 3.197 5.077 4.479.709.306 1.262.489 1.694.626.712.227 1.36.195 1.87.118.571-.085 1.758-.718 2.007-1.411.248-.694.248-1.289.173-1.411-.074-.123-.273-.198-.57-.347z"/>
      </svg>

      {/* Tooltip */}
      <span className="absolute left-16 bg-foreground text-background px-3 py-1.5 rounded-md text-sm opacity-0 hover:opacity-100 transition">
        WhatsApp schreiben
      </span>
    </a>
  );
};

export default WhatsAppButton;
