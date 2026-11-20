"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/gtm";
import { capiEvent, fbqEvent, generateEventId } from "@/lib/meta";

/** Mide los clics en TODOS los enlaces de WhatsApp y de teléfono del sitio.
 *  Un único listener global: cubre cualquier botón actual o futuro sin tener
 *  que añadir onClick en cada página.
 *
 *  Envía a GTM (dataLayer):
 *   - whatsapp_click  { page_path, link_text, servicio }
 *   - phone_click     { page_path, link_text, servicio }
 *  y a Meta el evento "Contact" (pixel + API de conversiones, deduplicado por event_id). */
export default function ConversionTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const tipo = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)
        ? "whatsapp_click"
        : /^tel:/i.test(href)
          ? "phone_click"
          : null;
      if (!tipo) return;

      const path = window.location.pathname;
      const servicio = path.match(/^\/servicios\/([^/]+)/)?.[1] ?? "general";
      const linkText =
        (link.getAttribute("aria-label") || link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80) ||
        "(sin texto)";

      pushEvent(tipo, { page_path: path, link_text: linkText, servicio });

      const eventId = generateEventId();
      fbqEvent("Contact", { content_name: servicio }, eventId);
      capiEvent({ event_name: "Contact", event_id: eventId, event_source_url: window.location.href });
    };

    // Fase de captura: se registra el clic aunque algún componente detenga la propagación
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
