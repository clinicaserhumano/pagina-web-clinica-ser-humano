"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent } from "@/lib/consent";

/** Evento para volver a abrir el banner (enlace "Configurar cookies" del footer) */
export const OPEN_COOKIES_EVENT = "sh-open-cookies";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
    const abrir = () => setVisible(true);
    window.addEventListener(OPEN_COOKIES_EVENT, abrir);
    return () => window.removeEventListener(OPEN_COOKIES_EVENT, abrir);
  }, []);

  const accept = () => {
    setConsent("accepted");
    setVisible(false);
  };

  const reject = () => {
    setConsent("rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      // zIndex máximo: el chat de HighLevel se superponía y tapaba los botones
      style={{ backgroundColor: "#3e3d3b", zIndex: 2147483647 }}
      className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.35)] px-4 py-5 sm:px-6"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
        <p className="flex-1 text-sm leading-relaxed text-white/85">
          Usamos cookies analíticas y de publicidad (Google y Meta) para entender cómo se usa el sitio y mejorar nuestros anuncios. Solo se activan si las aceptas.
          Las cookies necesarias siempre están activas.{" "}
          <Link
            href="/politica-de-privacidad#cookies"
            className="font-medium underline underline-offset-2 hover:text-white"
          >
            Ver política de cookies
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            onClick={reject}
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Solo necesarias
          </button>
          <button
            onClick={accept}
            className="rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e25c08]"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
