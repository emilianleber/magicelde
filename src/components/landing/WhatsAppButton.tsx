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
      className="fixed bottom-24 left-6 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center"
      aria-label="WhatsApp Kontakt"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white" aria-hidden="true">
  <path d="M19.11 17.21c-.27-.14-1.58-.78-1.82-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.31.2-.58.07-.27-.14-1.12-.41-2.14-1.31-.79-.7-1.33-1.57-1.48-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.02-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.62 1.11 2.8c.14.18 1.9 2.9 4.6 4.06.64.28 1.14.44 1.53.56.64.2 1.22.17 1.68.1.51-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.03 3.2c-7 0-12.67 5.67-12.67 12.67 0 2.22.58 4.39 1.67 6.29L3.2 28.8l6.81-1.79a12.62 12.62 0 0 0 6.02 1.53h.01c7 0 12.67-5.67 12.67-12.67S23.03 3.2 16.03 3.2zm0 23.2h-.01a10.5 10.5 0 0 1-5.35-1.47l-.38-.22-4.04 1.06 1.08-3.94-.25-.4a10.47 10.47 0 0 1-1.61-5.56c0-5.8 4.72-10.52 10.53-10.52 2.81 0 5.44 1.09 7.43 3.08a10.44 10.44 0 0 1 3.08 7.44c0 5.8-4.72 10.53-10.52 10.53z"/>
</svg>

      {/* Tooltip */}
      <span className="absolute left-16 bg-foreground text-background px-3 py-1.5 rounded-md text-sm opacity-0 hover:opacity-100 transition">
        WhatsApp schreiben
      </span>
    </a>
  );
};

export default WhatsAppButton;
