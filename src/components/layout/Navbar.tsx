"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { NAV_LINKS, SUBMARCAS, RESP_SOCIAL_PROYECTOS, getWhatsappUrl } from "@/lib/constants";
import { pushEvent } from "@/lib/gtm";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);
  const pathname = usePathname();

  // Clicks 1-7: silencio. Click 8: bola con "13". Luego 12,11...1. Siguiente: modal.
  // Total: 7 silenciosos + 13 countdown + 1 final = 21 clicks
  const SILENT = 7;
  const TOTAL  = SILENT + 13 + 1; // 21
  const countdown = logoClicks > SILENT ? TOTAL - logoClicks : null;
  const showBall  = countdown !== null && countdown > 0;

  const handleLogoClick = () => {
    if (pathname !== "/") return;
    setLogoClicks((n) => {
      const next = n + 1;
      if (next >= TOTAL) { setEasterEgg(true); return 0; }
      return next;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logos/clinica.webp"
            alt="Clínica Ser Humano"
            width={150}
            height={55}
            priority
            className="h-10 w-auto"
            onClick={handleLogoClick}
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {/* Inicio, Nosotros */}
          {NAV_LINKS.slice(0, 2).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}

          {/* Servicios dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/servicios"
              className="flex items-center gap-1 text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-orange"
            >
              Servicios
              <ChevronDown size={16} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </Link>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full w-64 rounded-xl bg-white p-2 shadow-lg"
                >
                  {SUBMARCAS.map((marca) => (
                    <Link
                      key={marca.slug}
                      href={marca.href}
                      className="block rounded-lg px-4 py-3 text-sm text-brand-gray-dark transition-colors hover:bg-brand-base hover:text-brand-orange"
                    >
                      {marca.nombre}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-brand-base pt-1">
                    <Link
                      href="/servicios"
                      className="block rounded-lg px-4 py-2.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-base"
                    >
                      Ver todos los servicios →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Novedades */}
          <Link
            href={NAV_LINKS[2].href}
            className="text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-orange"
          >
            {NAV_LINKS[2].label}
          </Link>

          {/* Resp. Social dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSocialOpen(true)}
            onMouseLeave={() => setSocialOpen(false)}
          >
            <Link
              href="/responsabilidad-social"
              className="flex items-center gap-1 text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-orange"
            >
              Resp. Social
              <ChevronDown size={16} className={`transition-transform ${socialOpen ? "rotate-180" : ""}`} />
            </Link>
            <AnimatePresence>
              {socialOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full w-64 rounded-xl bg-white p-2 shadow-lg"
                >
                  {RESP_SOCIAL_PROYECTOS.map((p) => (
                    <Link
                      key={p.slug}
                      href={p.href}
                      className="block rounded-lg px-4 py-3 text-sm text-brand-gray-dark transition-colors hover:bg-brand-base hover:text-brand-orange"
                    >
                      {p.nombre}
                    </Link>
                  ))}
                  <div className="mt-1 border-t border-brand-base pt-1">
                    <Link
                      href="/responsabilidad-social"
                      className="block rounded-lg px-4 py-2.5 text-xs font-semibold text-brand-orange transition-colors hover:bg-brand-base"
                    >
                      Ver todos los proyectos →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Contacto */}
          <Link
            href={NAV_LINKS[3].href}
            className="text-sm font-medium text-brand-gray-dark transition-colors hover:text-brand-orange"
          >
            {NAV_LINKS[3].label}
          </Link>
        </div>

        <div className="hidden md:block">
          <Button href={getWhatsappUrl()} target="_blank" rel="noopener noreferrer" size="sm" onClick={() => pushEvent("reservar_cita_click", { location: "navbar_desktop" })}>
            Reservar cita
          </Button>
        </div>

        <button
          className="text-brand-gray-dark md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-brand-gray-light bg-white md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-3 text-brand-gray-dark hover:bg-brand-base hover:text-brand-orange"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/servicios"
                onClick={() => setMobileOpen(false)}
                className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-brand-orange hover:underline"
              >
                Servicios
              </Link>
              {SUBMARCAS.map((marca) => (
                <Link
                  key={marca.slug}
                  href={marca.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-3 text-brand-gray-dark hover:bg-brand-base hover:text-brand-orange"
                >
                  {marca.nombre}
                </Link>
              ))}

              <Link
                href={NAV_LINKS[2].href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-3 text-brand-gray-dark hover:bg-brand-base hover:text-brand-orange"
              >
                {NAV_LINKS[2].label}
              </Link>

              <Link
                href="/responsabilidad-social"
                onClick={() => setMobileOpen(false)}
                className="px-2 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-brand-orange hover:underline"
              >
                Resp. Social
              </Link>
              {RESP_SOCIAL_PROYECTOS.map((p) => (
                <Link
                  key={p.slug}
                  href={p.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-3 text-brand-gray-dark hover:bg-brand-base hover:text-brand-orange"
                >
                  {p.nombre}
                </Link>
              ))}

              <Link
                href={NAV_LINKS[3].href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-2 py-3 text-brand-gray-dark hover:bg-brand-base hover:text-brand-orange"
              >
                {NAV_LINKS[3].label}
              </Link>

              <Button
                href={getWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full"
                onClick={() => pushEvent("reservar_cita_click", { location: "navbar_mobile" })}
              >
                Reservar cita
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg — bola countdown */}
      <AnimatePresence>
        {showBall && (
          <motion.div
            key={countdown}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="fixed inset-0 z-[90] flex items-center justify-center pointer-events-none"
          >
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-orange shadow-2xl">
              <span className="text-4xl font-black text-white">{countdown}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter egg modal */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
            onClick={() => setEasterEgg(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setEasterEgg(false)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>

              <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-orange">
                🥚 Easter egg desbloqueado
              </div>

              <div className="relative mx-auto mt-4 mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-brand-orange/20 bg-brand-orange/10">
                <Image
                  src="/team/jorge-urgiles.webp"
                  alt="Jorge Urgilés Ruiz"
                  fill
                  className="object-cover"
                />
              </div>

              <h2 className="text-lg font-black text-brand-gray-dark">
                Jorge Urgilés Ruiz
              </h2>
              <p className="mt-1 text-sm text-brand-gray-dark/60">
                Ingeniero en Software
              </p>
              <p className="mt-3 text-xs leading-relaxed text-brand-gray-dark/50">
                Diseñado y desarrollado con dedicación.
              </p>

              <div className="mt-5 flex flex-col items-center gap-2.5">
                <a
                  href="https://www.linkedin.com/in/jorge-andres-urgiles-ruiz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.45 20v-6.4c0-3.43-1.83-5.03-4.27-5.03a3.7 3.7 0 0 0-3.33 1.83h-.05V8.5H9.59c.05 1.02 0 11.5 0 11.5h3.21v-6.43c0-.34.02-.68.13-.92.28-.68.91-1.39 1.97-1.39 1.39 0 1.94 1.06 1.94 2.6V20h3.61Z"/>
                  </svg>
                  Ver perfil en LinkedIn
                </a>
                <a
                  href="https://jorge-urgiles-ruiz.vercel.app/?direct=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-brand-orange px-5 py-2.5 text-sm font-bold text-brand-orange transition-colors hover:bg-brand-orange hover:text-white"
                >
                  Ver landing page
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}