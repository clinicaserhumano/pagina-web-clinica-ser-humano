"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Barra naranja superior que aparece al instante al hacer clic en un enlace
 *  interno y se completa cuando llega la nueva página. Da respuesta inmediata
 *  aunque el servidor tarde en responder. */
export default function NavigationProgress() {
  const pathname = usePathname();
  const [progreso, setProgreso] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Inicio: clic en un enlace interno hacia otra página
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;

      if (timer.current) clearInterval(timer.current);
      setProgreso(8);
      // Avanza rápido al principio y cada vez más lento, sin llegar al 100%
      timer.current = setInterval(() => setProgreso((p) => (p === null ? p : p + (90 - p) * 0.08)), 200);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Fin: la ruta cambió
  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    setProgreso((p) => (p === null ? null : 100));
    const t = setTimeout(() => setProgreso(null), 300);
    return () => clearTimeout(t);
  }, [pathname]);

  if (progreso === null) return null;
  return (
    <div
      role="progressbar"
      aria-label="Cargando página"
      aria-valuenow={Math.round(progreso)}
      className="pointer-events-none fixed left-0 top-0 z-[2147483647] h-[3px] bg-brand-orange shadow-[0_0_8px_rgba(255,107,18,0.6)] transition-[width,opacity] duration-200 ease-out"
      style={{ width: `${progreso}%`, opacity: progreso >= 100 ? 0 : 1 }}
    />
  );
}
