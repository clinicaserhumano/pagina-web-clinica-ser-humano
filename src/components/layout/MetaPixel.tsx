"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { generateEventId, capiEvent, META_PIXEL_ID } from "@/lib/meta";
import { CONSENT_EVENT, hasConsent } from "@/lib/consent";

/** fbq solo existe después de cargar el script de Meta */
const fbqCargado = () => typeof (window as { fbq?: unknown }).fbq === "function";

/** Píxel de Meta: solo se carga si la persona aceptó las cookies
 *  (al instante si ya aceptó antes, o en cuanto acepta en el banner). */
export default function MetaPixel() {
  const pathname = usePathname();
  const [activo, setActivo] = useState(false);
  const isFirst = useRef(true);

  // Activación según el consentimiento
  useEffect(() => {
    if (hasConsent()) setActivo(true);
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") setActivo(true);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  // Carga del script + primer PageView
  useEffect(() => {
    if (!activo || fbqCargado()) return;
    /* eslint-disable */
    // Código oficial de Meta (fbevents.js)
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function (...args: unknown[]) {
        n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      const s = b.getElementsByTagName(e)[0];
      s.parentNode!.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq("init", META_PIXEL_ID);
    const eventId = generateEventId();
    window.fbq("track", "PageView", {}, { eventID: eventId });
    capiEvent({ event_name: "PageView", event_id: eventId, event_source_url: window.location.href });
  }, [activo]);

  // PageView en cada cambio de página (navegación interna)
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (!fbqCargado()) return; // aún sin consentimiento (el primer PageView lo envía la carga)
    const eventId = generateEventId();
    window.fbq("track", "PageView", {}, { eventID: eventId });
    capiEvent({ event_name: "PageView", event_id: eventId, event_source_url: window.location.href });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
