"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { SERVICIOS_AREAS, SUBMARCAS } from "@/lib/constants";
import ServicioDesplegable from "@/components/ui/ServicioDesplegable";

/** Tarjetas de las 4 submarcas para la home: cada una se despliega para mostrar sus servicios. */
export default function ServiciosTarjetas() {
  const [abierta, setAbierta] = useState<string | null>(null);
  // Solo un servicio desplegado a la vez
  const [servicioAbierto, setServicioAbierto] = useState<string | null>(null);

  return (
    <div className="grid items-start gap-6 md:grid-cols-2">
      {SUBMARCAS.map((marca, i) => {
        const area = SERVICIOS_AREAS.find((a) => a.marca === marca.slug);
        const open = abierta === marca.slug;
        const panelId = `servicios-${marca.slug}`;

        return (
          <motion.div
            key={marca.slug}
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
            className={`flex flex-col gap-4 rounded-2xl border p-6 transition-shadow ${
              open ? "border-brand-orange/40 shadow-lg" : "border-brand-gray-light/50 shadow-sm hover:shadow-lg"
            }`}
          >
            <Image src={marca.logo} alt={marca.nombre} width={140} height={52} className="h-10 w-auto self-start" />
            <div>
              {area && (
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-orange">{area.area}</p>
              )}
              <p className="mt-1.5 text-sm text-brand-gray-dark/75">{marca.descripcion}</p>
            </div>

            {/* Servicios desplegables */}
            <AnimatePresence initial={false}>
              {open && area && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <ul className="grid items-start gap-x-6 gap-y-0.5 border-t border-brand-gray-light/50 pt-4 sm:grid-cols-2">
                    {area.servicios.map((s) => (
                      <li key={s.nombre}>
                        <ServicioDesplegable
                          size="sm"
                          servicio={s}
                          open={servicioAbierto === s.nombre}
                          onToggle={() => setServicioAbierto((k) => (k === s.nombre ? null : s.nombre))}
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Link
                href={marca.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#e25c08]"
              >
                Más información<span className="sr-only"> sobre {marca.nombre}</span>
                <ArrowRight size={15} />
              </Link>
              {area && (
                <button
                  type="button"
                  onClick={() => setAbierta(open ? null : marca.slug)}
                  aria-expanded={open}
                  aria-controls={panelId}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-gray-dark/20 px-5 py-2.5 text-sm font-medium text-brand-gray-dark/75 transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  {open ? "Ocultar servicios" : "Ver servicios"}
                  <ChevronDown size={15} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
