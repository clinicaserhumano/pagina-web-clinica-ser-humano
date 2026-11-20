"use client";

import { motion } from "framer-motion";
import { getWhatsappUrl, WHATSAPP_MESSAGES } from "@/lib/constants";

function WhatsAppIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.52 3.62 1.42 5.12L2 22l5.13-1.5a9.9 9.9 0 0 0 4.91 1.3h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm5.81 14.06c-.25.7-1.45 1.34-2 1.43-.51.08-1.15.12-1.85-.12-.43-.14-.97-.32-1.67-.63-2.93-1.27-4.84-4.22-4.99-4.42-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.06.92 2.21.08.15.13.32.03.52-.1.2-.15.32-.3.49-.15.17-.32.38-.46.51-.15.13-.3.28-.13.58.18.3.8 1.32 1.71 2.13 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.05.18-.18.78-.91.99-1.22.2-.31.41-.26.69-.16.28.1 1.77.84 2.07 1 .3.15.5.23.57.36.08.13.08.74-.17 1.44Z" />
    </svg>
  );
}

export default function WhatsAppButton() {
  return (
    <motion.a
      href={getWhatsappUrl(WHATSAPP_MESSAGES.home)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      initial={{ scale: 0.5, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg"
    >
      <WhatsAppIcon />
    </motion.a>
  );
}
