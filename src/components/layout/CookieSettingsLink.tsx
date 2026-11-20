"use client";

import { OPEN_COOKIES_EVENT } from "@/components/layout/CookieBanner";

/** Enlace del footer para volver a elegir aceptar o rechazar cookies */
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))} className={className}>
      Configurar cookies
    </button>
  );
}
